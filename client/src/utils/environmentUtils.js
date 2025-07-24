/**
 * 環境工具函數，用於檢查當前是開發還是生產環境
 */

/**
 * 檢查當前環境是否為開發環境
 * @returns {boolean} 如果是開發環境則返回 true，否則返回 false
 */
export const isDevelopment = () => {
  // 只檢查 Vite 的環境變數，不依賴 hostname
  // 因為生產構建也可能在 localhost 上運行
  return import.meta.env.DEV === true || import.meta.env.MODE === 'development';
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
