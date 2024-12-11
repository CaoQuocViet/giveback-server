 // Sử dụng node-cache làm cache đơn giản
const NodeCache = require('node-cache');
const cache = new NodeCache();

module.exports = {
  get: async (key) => {
    return cache.get(key);
  },
  
  set: async (key, value, ttl) => {
    return cache.set(key, value, ttl);
  }
};