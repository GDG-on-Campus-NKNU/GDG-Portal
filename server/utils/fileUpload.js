// 檔案上傳工具
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 確保上傳目錄存在
const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// 設定檔案儲存位置和檔名
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 根據檔案類型決定儲存路徑
    let uploadPath = '/workspaces/GDG-Portal/client/public/assets/';
    
    if (file.fieldname === 'avatar' || file.fieldname === 'profile_image') {
      uploadPath += 'members/';
    } else if (file.fieldname === 'cover_image' && req.body.type === 'gallery') {
      uploadPath += 'gallery/';
    } else if (file.fieldname === 'cover_image' && req.body.type === 'event') {
      uploadPath += 'events/';
    } else if (file.fieldname === 'cover_image' && req.body.type === 'announcement') {
      uploadPath += 'announcements/';
    } else {
      uploadPath += 'uploads/';
    }
    
    ensureDirectoryExists(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // 生成唯一檔名：時間戳 + 隨機數 + 原始副檔名
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  }
});

// 檔案過濾器 - 只允許圖片檔案
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('只允許上傳圖片檔案 (jpeg, jpg, png, gif, webp)'));
  }
};

// 建立 multer 上傳實例
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB 檔案大小限制
  },
  fileFilter: fileFilter
});

// 單個檔案上傳中間件
export const uploadSingle = (fieldName) => upload.single(fieldName);

// 多個檔案上傳中間件
export const uploadMultiple = (fieldName, maxCount = 10) => upload.array(fieldName, maxCount);

// 多個不同欄位檔案上傳
export const uploadFields = (fields) => upload.fields(fields);

// 檔案上傳錯誤處理中間件
export const handleUploadError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: '檔案太大，最大允許 5MB' });
    } else if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ message: '檔案數量超過限制' });
    } else if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ message: '意外的檔案欄位' });
    }
  } else if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

// 將檔案路徑轉換為 URL
export const getFileUrl = (filePath) => {
  if (!filePath) return null;
  
  // 如果已經是完整 URL，直接返回
  if (filePath.startsWith('http')) {
    return filePath;
  }
  
  // 將絕對路徑轉換為相對於 assets 的路徑
  const assetsPath = '/workspaces/GDG-Portal/client/public/assets/';
  if (filePath.startsWith(assetsPath)) {
    return '/assets/' + path.relative(assetsPath, filePath);
  }
  
  // 如果已經是 /assets/ 開頭的路徑，直接返回
  if (filePath.startsWith('/assets/')) {
    return filePath;
  }
  
  // 其他情況，假設是相對於 assets 的路徑
  return '/assets/' + filePath;
};

// 刪除檔案
export const deleteFile = (filePath) => {
  try {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  } catch (error) {
    console.error('刪除檔案失敗:', error);
    return false;
  }
};

export default {
  upload,
  uploadSingle,
  uploadMultiple,
  uploadFields,
  handleUploadError,
  getFileUrl,
  deleteFile
};
