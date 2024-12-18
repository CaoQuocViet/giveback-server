const { Donation, Campaign, PaymentMethod } = require('../models');
const { createZaloPayOrder, queryOrderStatus, verifyCallback } = require('../utils/zalopay.utils');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

class DonationController {
  // Tạo donation và redirect đến ZaloPay
  async createDonation(req, res) {
    const { campaignId, amount, message, paymentMethodId, isAnonymous = false } = req.body;
    const donorId = req.user.id;

    try {
      // Validate campaign
      const campaign = await Campaign.findByPk(campaignId);
      if (!campaign) {
        return res.status(404).json({
          success: false,
          message: "Chiến dịch không tồn tại"
        });
      }

      if (campaign.status !== 'ONGOING') {
        return res.status(400).json({
          success: false,
          message: "Chiến dịch không trong trạng thái nhận đóng góp"
        });
      }

      // Validate payment method
      const paymentMethod = await PaymentMethod.findByPk(paymentMethodId);
      if (!paymentMethod || paymentMethod.name !== 'ZALOPAY') {
        return res.status(400).json({
          success: false,
          message: "Phương thức thanh toán không hợp lệ"
        });
      }

      // Tạo đơn hàng trên ZaloPay trước để lấy app_trans_id
      const description = message || "Không có lời nhắn"; // Sử dụng message làm description
      const zaloPayOrder = await createZaloPayOrder(amount, description, message, campaignId);

      // Tạo donation record với trạng thái SUCCESS và lưu app_trans_id
      const donation = await Donation.create({
        id: uuidv4(),
        campaignId,
        donorId,
        amount,
        message,
        note: message,
        paymentMethodId,
        isAnonymous,
        status: 'SUCCESS',
        invoiceCode: `INV${moment().format('YYMMDD')}${String(Math.floor(Math.random() * 100000)).padStart(5, '0')}`,
        paymentTransactionId: zaloPayOrder.app_trans_id // Lưu app_trans_id
      });

      // Trả về URL thanh toán để FE redirect
      return res.json({
        success: true,
        data: {
          donation_id: donation.id,
          order_url: zaloPayOrder.order_url
        }
      });

    } catch (error) {
      console.error('Error creating donation:', error);
      return res.status(500).json({
        success: false,
        message: "Đã có lỗi xảy ra",
        error: error.message
      });
    }
  }

  // Xử lý callback từ ZaloPay
  async handleCallback(req, res) {
    try {
      const data = req.body;
      console.log('ZaloPay callback data:', data); // Log để debug
      
      // Verify callback data
      if (!verifyCallback(data)) {
        return res.status(400).json({ 
          return_code: 2,
          return_message: "Invalid callback signature"
        });
      }

      // Tìm donation record bằng app_trans_id
      const donation = await Donation.findOne({
        where: { paymentTransactionId: data.app_trans_id }
      });

      if (!donation) {
        return res.status(404).json({
          return_code: 2,
          return_message: "Donation not found"
        });
      }

      // Cập nhật trạng thái donation
      if (data.status === 1) { // Thành công
        // Tạo invoice code theo format: INVyyMMddxxxxx
        const invoiceCode = `INV${moment().format('YYMMDD')}${String(Math.floor(Math.random() * 100000)).padStart(5, '0')}`;
        
        // Cập nhật donation với invoiceCode và paymentTransactionId từ ZaloPay
        await donation.update({ 
          status: 'SUCCESS',
          invoiceCode,
          paymentTransactionId: data.zptransid // Cập nhật mã giao dịch từ ZaloPay
        });
        
        // Log để debug
        console.log('Updated donation:', {
          id: donation.id,
          status: 'SUCCESS',
          invoiceCode,
          paymentTransactionId: data.zptransid
        });
        
        // Cập nhật số tiền campaign
        const campaign = await Campaign.findByPk(donation.campaignId);
        await campaign.increment('currentAmount', { by: donation.amount });
      } else {
        await donation.update({ status: 'FAILED' });
      }

      return res.json({ 
        return_code: 1,
        return_message: "Success"
      });

    } catch (error) {
      console.error('Error handling callback:', error);
      return res.status(500).json({
        return_code: 2,
        return_message: "Internal server error"
      });
    }
  }

  // API kiểm tra trạng thái donation
  async checkStatus(req, res) {
    const { donationId } = req.params;

    try {
      const donation = await Donation.findByPk(donationId);
      if (!donation) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy khoản đóng góp"
        });
      }

      // Nếu đang pending, kiểm tra với ZaloPay
      if (donation.status === 'PENDING') {
        const status = await queryOrderStatus(donation.paymentTransactionId);
        if (status.return_code === 1) {
          await donation.update({ status: 'SUCCESS' });
          
          // Cập nhật số tiền campaign
          const campaign = await Campaign.findByPk(donation.campaignId);
          await campaign.increment('currentAmount', { by: donation.amount });
        } else if (status.return_code === 2) {
          await donation.update({ status: 'FAILED' });
        }
      }

      return res.json({
        success: true,
        data: {
          status: donation.status,
          amount: donation.amount,
          created_at: donation.createdAt
        }
      });

    } catch (error) {
      console.error('Error checking donation status:', error);
      return res.status(500).json({
        success: false,
        message: "Đã có lỗi xảy ra",
        error: error.message
      });
    }
  }
}

module.exports = new DonationController(); 