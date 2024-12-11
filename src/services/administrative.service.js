const fs = require('fs');
const path = require('path');
const cache = require('../utils/cache');

class AdministrativeService {
  constructor() {
    this.CACHE_KEY = 'administrative';
    this.CACHE_TTL = 24 * 60 * 60; // 24h
  }

  /**
   * Get administrative data from cache or file
   */
  async getData() {
    let data = await cache.get(this.CACHE_KEY);
    
    if (!data) {
      const filePath = path.join(__dirname, '../data/administrative/vn_administrative_tree.json');
      data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      await cache.set(this.CACHE_KEY, data, this.CACHE_TTL);
    }

    return data;
  }

  /**
   * Get list of provinces
   */
  async getProvinces() {
    const data = await this.getData();
    return Object.keys(data).map(code => ({
      code,
      name: data[code].name
    }));
  }

  /**
   * Get districts by province
   */
  async getDistricts(provinceCode) {
    const data = await this.getData();
    
    if (!data[provinceCode]) {
      throw new Error('Mã tỉnh/thành phố không hợp lệ');
    }

    return Object.keys(data[provinceCode].districts).map(code => ({
      code,
      name: data[provinceCode].districts[code].name
    }));
  }

  /**
   * Get wards by district
   */
  async getWards(provinceCode, districtCode) {
    const data = await this.getData();

    if (!data[provinceCode]) {
      throw new Error('Mã tỉnh/thành phố không hợp lệ');
    }

    if (!data[provinceCode].districts[districtCode]) {
      throw new Error('Mã quận/huyện không hợp lệ');
    }

    return Object.keys(data[provinceCode].districts[districtCode].wards).map(code => ({
      code,
      name: data[provinceCode].districts[districtCode].wards[code].name
    }));
  }
}

module.exports = new AdministrativeService(); 