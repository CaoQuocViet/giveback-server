const administrativeService = require('../services/administrative.service');

class AdministrativeController {
  /**
   * Get list of provinces
   */
  async getProvinces(req, res) {
    try {
      const provinces = await administrativeService.getProvinces();
      
      return res.json({
        success: true,
        data: provinces
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Lỗi khi lấy danh sách tỉnh/thành phố',
        error: error.message
      });
    }
  }

  /**
   * Get districts by province
   */
  async getDistricts(req, res) {
    try {
      const { province } = req.params;
      
      const districts = await administrativeService.getDistricts(province);
      
      return res.json({
        success: true,
        data: districts
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Lỗi khi lấy danh sách quận/huyện',
        error: error.message
      });
    }
  }

  /**
   * Get wards by district
   */
  async getWards(req, res) {
    try {
      const { province, district } = req.params;
      
      const wards = await administrativeService.getWards(province, district);
      
      return res.json({
        success: true,
        data: wards
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Lỗi khi lấy danh sách phường/xã',
        error: error.message
      });
    }
  }
}

module.exports = new AdministrativeController(); 