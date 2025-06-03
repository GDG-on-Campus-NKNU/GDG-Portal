/**
 * 將檔案轉換為 Base64 格式的字串
 * @param {File} file - 檔案物件
 * @returns {Promise<string>} Base64 編碼的字串
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('沒有提供檔案'));
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
};

/**
 * 壓縮圖片以減小大小
 * @param {File} file - 原始圖片檔案
 * @param {Object} options - 壓縮選項
 * @param {number} options.maxWidth - 最大寬度（預設為 1200px）
 * @param {number} options.maxHeight - 最大高度（預設為 1200px）
 * @param {number} options.quality - 壓縮品質（0-1，預設為 0.8）
 * @returns {Promise<Blob>} 壓縮後的圖片 Blob
 */
export const compressImage = (file, options = {}) => {
  const { maxWidth = 1200, maxHeight = 1200, quality = 0.8 } = options;
  
  return new Promise((resolve, reject) => {
    if (!file || !file.type.match('image.*')) {
      reject(new Error('提供的檔案不是圖片'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        // 計算新尺寸
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth) {
          height = Math.floor(height * (maxWidth / width));
          width = maxWidth;
        }
        
        if (height > maxHeight) {
          width = Math.floor(width * (maxHeight / height));
          height = maxHeight;
        }
        
        // 創建畫布
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        // 繪製圖片
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        // 轉換為 blob
        canvas.toBlob((blob) => {
          resolve(blob);
        }, file.type, quality);
      };
      
      img.onerror = () => {
        reject(new Error('圖片載入失敗'));
      };
      
      img.src = readerEvent.target.result;
    };
    
    reader.onerror = () => {
      reject(new Error('檔案讀取失敗'));
    };
    
    reader.readAsDataURL(file);
  });
};

/**
 * 將檔案轉換為 Blob 物件
 * @param {File} file - 檔案物件
 * @returns {Promise<Blob>} Blob 物件
 */
export const fileToBlob = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('沒有提供檔案'));
      return;
    }
    
    // 檔案已經是 Blob 的實例，可以直接使用
    resolve(file);
  });
};

/**
 * 將圖片檔案準備為可上傳的格式
 * @param {File} file - 圖片檔案
 * @param {Object} options - 處理選項
 * @param {boolean} options.compress - 是否壓縮圖片（預設為 true）
 * @param {string} options.outputFormat - 輸出格式，'base64' 或 'blob'（預設為 'base64'）
 * @returns {Promise<string|Blob>} 處理後的圖片（Base64 字串或 Blob 物件）
 */
export const prepareImageForUpload = async (file, options = {}) => {
  const { compress = true, outputFormat = 'base64' } = options;
  
  if (!file) return null;
  
  try {
    // 壓縮圖片
    let processedFile = file;
    if (compress) {
      processedFile = await compressImage(file);
    }
    
    // 根據輸出格式轉換
    if (outputFormat === 'base64') {
      return await fileToBase64(processedFile);
    } else {
      return processedFile; // 直接返回 blob
    }
  } catch (error) {
    console.error('圖片處理失敗:', error);
    throw error;
  }
};
