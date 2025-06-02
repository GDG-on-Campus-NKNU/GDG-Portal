import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 確保目錄存在
 * @param {string} dirPath - 目錄路徑
 */
const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

/**
 * 從 Base64 字符串保存圖片
 * @param {string} base64String - Base64 編碼的圖片數據
 * @param {string} category - 圖片類別 (avatar, banner, gallery, event 等)
 * @returns {string|null} 保存的文件的 URL 路徑
 */
export const saveBase64Image = (base64String, category = 'uploads') => {
  if (!base64String) return null;
  
  try {
    // 處理 data URI 格式 (data:image/jpeg;base64,...)
    const matches = base64String.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    
    // 如果不是 Base64 格式，則返回原始字符串（可能是 URL）
    if (!matches || matches.length !== 3) {
      return base64String;
    }
    
    const mimeType = matches[1];
    const base64Data = matches[2];
    const fileData = Buffer.from(base64Data, 'base64');
    
    // 根據 MIME 類型獲取文件擴展名
    let fileExt;
    switch (mimeType) {
      case 'image/jpeg':
      case 'image/jpg':
        fileExt = '.jpg';
        break;
      case 'image/png':
        fileExt = '.png';
        break;
      case 'image/gif':
        fileExt = '.gif';
        break;
      case 'image/webp':
        fileExt = '.webp';
        break;
      default:
        fileExt = '.jpg'; // 默認 .jpg
    }
    
    // 確定保存目錄
    let uploadDir = '/workspaces/GDG-Portal/client/public/assets/';
    
    switch (category) {
      case 'avatar':
        uploadDir += 'members/';
        break;
      case 'banner':
        uploadDir += 'members/';
        break;
      case 'gallery':
        uploadDir += 'gallery/';
        break;
      case 'event':
        uploadDir += 'events/';
        break;
      case 'announcement':
        uploadDir += 'announcements/';
        break;
      default:
        uploadDir += 'uploads/';
    }
    
    ensureDirectoryExists(uploadDir);
    
    // 生成唯一文件名
    const fileName = `${category}-${uuidv4()}${fileExt}`;
    const filePath = path.join(uploadDir, fileName);
    
    // 寫入文件
    fs.writeFileSync(filePath, fileData);
    
    // 返回相對於 assets 目錄的路徑
    return `/assets/${category === 'avatar' || category === 'banner' ? 'members/' : category + '/'}${fileName}`;
    
  } catch (error) {
    console.error('保存 Base64 圖片失敗:', error);
    return null;
  }
};

/**
 * 刪除圖片文件
 * @param {string} filePath - 圖片文件路徑
 * @returns {boolean} 刪除是否成功
 */
export const deleteImage = (filePath) => {
  try {
    if (!filePath || typeof filePath !== 'string') return false;
    
    // 如果是 URL 路徑，轉換為文件系統路徑
    let absolutePath = filePath;
    if (filePath.startsWith('/assets/')) {
      absolutePath = path.join('/workspaces/GDG-Portal/client/public', filePath);
    } else if (filePath.startsWith('http')) {
      // 如果是遠程 URL，不處理
      return true;
    }
    
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('刪除圖片失敗:', error);
    return false;
  }
};

/**
 * 檢測字符串是否為 Base64 編碼圖片
 * @param {string} str - 要檢測的字符串
 * @returns {boolean} 是否為 Base64 圖片
 */
export const isBase64Image = (str) => {
  if (!str || typeof str !== 'string') return false;
  
  // 檢測是否為 data URI 格式的 Base64
  const pattern = /^data:image\/(jpeg|jpg|png|gif|webp);base64,/;
  return pattern.test(str);
};

export default {
  saveBase64Image,
  deleteImage,
  isBase64Image
};
