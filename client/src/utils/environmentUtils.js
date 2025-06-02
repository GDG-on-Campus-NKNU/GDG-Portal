/**
 * 環境工具函數，用於檢查當前是開發還是生產環境
 */

/**
 * 檢查當前環境是否為開發環境
 * @returns {boolean} 如果是開發環境則返回 true，否則返回 false
 */
export const isDevelopment = () => {
  // 檢查是否為明確的開發環境
  if (
    import.meta.env.DEV === true || 
    import.meta.env.MODE === 'development' ||
    window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1'
  ) {
    return true;
  }
  
  return false;
};

/**
 * 檢查當前環境是否為生產環境
 * @returns {boolean} 如果是生產環境則返回 true，否則返回 false
 */
export const isProduction = () => {
  return !isDevelopment();
};

export default {
  isDevelopment,
  isProduction
};
