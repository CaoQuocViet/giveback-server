const crypto = require('crypto');
const axios = require('axios');
const moment = require('moment');
const qs = require('qs');
const config = require('../config/zalopay.config');

const createZaloPayOrder = async (amount, description, note, campaignId) => {
  try {
    // Format app_trans_id theo yêu cầu: yyMMdd_xxxx
    const transID = Math.floor(Math.random() * 1000000);
    const app_trans_id = `${moment().format('YYMMDD')}_${transID}`;

    // Tạo embed_data với đầy đủ thông tin cho redirect
    const embed_data = {
      redirecturl: `${config.redirect_url}?campaignId=${campaignId}`,
      bankgroup: "zalopayapp", // Thêm bankgroup để ưu tiên mở app ZaloPay
      returnurl: `${config.redirect_url}?campaignId=${campaignId}`, // Thêm returnurl để đảm bảo redirect sau khi thanh toán
      note: note // Thêm note vào embed_data
    };

    // Tạo order data
    const order = {
      app_id: process.env.ZALOPAY_APP_ID,
      app_trans_id,
      app_user: "user123",
      app_time: Date.now(),
      item: JSON.stringify([]),
      embed_data: JSON.stringify(embed_data),
      amount: parseInt(amount),
      description: description,
      bank_code: "",
      callback_url: config.callback_url
    };

    // Tạo chuỗi MAC theo thứ tự của ZaloPay
    const data = order.app_id + "|" + order.app_trans_id + "|" + 
                order.app_user + "|" + order.amount + "|" + 
                order.app_time + "|" + order.embed_data + "|" + order.item;
    
    order.mac = crypto.createHmac('sha256', process.env.ZALOPAY_KEY1)
      .update(data)
      .digest('hex');

    // Gọi API với application/x-www-form-urlencoded
    const response = await axios({
      method: 'post',
      url: process.env.ZALOPAY_CREATE_ORDER_URL,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: qs.stringify(order)
    });

    console.log('ZaloPay Request:', order);
    console.log('ZaloPay Response:', response.data);

    if (response.data.return_code !== 1) {
      throw new Error(response.data.return_message || "Giao dịch thất bại");
    }

    return {
      app_trans_id,
      order_url: response.data.order_url
    };

  } catch (error) {
    console.error('Error creating ZaloPay order:', error);
    if (error.response) {
      console.error('ZaloPay API Error Response:', error.response.data);
    }
    throw error;
  }
};

// Verify callback từ ZaloPay
const verifyCallback = (data) => {
  const dataStr = data.app_id + "|" + data.app_trans_id + "|" + data.amount + "|" +
                 data.app_time + "|" + data.embed_data + "|" + data.status;
  const mac = crypto.createHmac('sha256', config.key2)
    .update(dataStr)
    .digest('hex');
  return mac === data.mac;
};

// Query trạng thái đơn hàng
const queryOrderStatus = async (app_trans_id) => {
  try {
    const data = {
      app_id: config.app_id,
      app_trans_id,
      timestamp: Date.now()
    };

    const dataStr = config.app_id + "|" + app_trans_id + "|" + data.timestamp;
    data.mac = crypto.createHmac('sha256', config.key1)
      .update(dataStr)
      .digest('hex');

    const response = await axios.post(config.endpoint.sandbox.query_status, null, {
      params: data
    });

    return response.data;
  } catch (error) {
    console.error('Error querying order status:', error);
    throw error;
  }
};

module.exports = {
  createZaloPayOrder,
  verifyCallback,
  queryOrderStatus
}; 