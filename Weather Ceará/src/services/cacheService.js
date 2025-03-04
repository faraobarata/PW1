const CACHE_PREFIX = 'weather_cache_';
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutos em milissegundos

export const cacheService = {
  setItem(key, data) {
    const cacheData = {
      timestamp: Date.now(),
      data: data
    };
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(cacheData));
  },

  getItem(key) {
    const cachedData = localStorage.getItem(CACHE_PREFIX + key);
    if (!cachedData) return null;

    const { timestamp, data } = JSON.parse(cachedData);
    const isExpired = Date.now() - timestamp > CACHE_DURATION;

    if (isExpired) {
      localStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }

    return data;
  },

  getCacheKey(city, type) {
    return `${type}_${city.toLowerCase()}`;
  },

  clearExpiredCache() {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(CACHE_PREFIX)) {
        const cachedData = localStorage.getItem(key);
        const { timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp > CACHE_DURATION) {
          localStorage.removeItem(key);
        }
      }
    });
  }
}; 