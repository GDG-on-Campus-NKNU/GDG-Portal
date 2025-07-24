/**
 * API 服務層 - 統一管理 API 呼叫
 */

// API 基礎設定
const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000
};

/**
 * 通用 API 請求函數
 * @param {string} endpoint - API 端點
 * @param {object} options - 請求選項
 * @returns {Promise} 回應結果
 */
const apiRequest = async (endpoint, options = {}) => {
  const url = endpoint.startsWith('http') ? endpoint : `${API_CONFIG.baseURL}${endpoint}`;
  
  const defaultOptions = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  };

  const config = { ...defaultOptions, ...options };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

    const response = await fetch(url, {
      ...config,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('請求超時');
    }
    throw error;
  }
};

/**
 * API 服務物件
 */
export const apiService = {
  // GET 請求
  get: (endpoint, options = {}) => {
    return apiRequest(endpoint, { method: 'GET', ...options });
  },

  // POST 請求
  post: (endpoint, data, options = {}) => {
    return apiRequest(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options
    });
  },

  // PUT 請求
  put: (endpoint, data, options = {}) => {
    return apiRequest(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options
    });
  },

  // PATCH 請求
  patch: (endpoint, data, options = {}) => {
    return apiRequest(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
      ...options
    });
  },

  // DELETE 請求
  delete: (endpoint, options = {}) => {
    return apiRequest(endpoint, { method: 'DELETE', ...options });
  },

  // 上傳檔案
  upload: (endpoint, formData, options = {}) => {
    const headers = { ...options.headers };
    delete headers['Content-Type']; // 讓瀏覽器自動設定

    return apiRequest(endpoint, {
      method: 'POST',
      body: formData,
      headers,
      ...options
    });
  }
};

/**
 * 環境配置工具
 */
export const apiConfig = {
  isProduction: import.meta.env.PROD,
  isDevelopment: import.meta.env.DEV,
  baseURL: API_CONFIG.baseURL,
  showDevTools: import.meta.env.VITE_ENABLE_DEV_TOOLS === 'true',
  showDevLogin: import.meta.env.VITE_SHOW_DEV_LOGIN === 'true'
};

export default apiService;
