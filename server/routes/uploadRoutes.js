import express from 'express';
import { authenticateJWT, requireAdmin, requireCore } from '../middlewares/auth.js';
import { 
  uploadSingle, 
  uploadMultiple, 
  uploadFields, 
  handleUploadError,
  getFileUrl 
} from '../utils/fileUpload.js';

const router = express.Router();

// 單個檔案上傳 - 需要管理員或核心成員權限
router.post('/single', authenticateJWT, requireCore, uploadSingle('file'), handleUploadError, (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: '沒有上傳檔案' });
    }

    const fileUrl = getFileUrl(req.file.path);
    
    res.status(200).json({
      message: '檔案上傳成功',
      file: {
        originalName: req.file.originalname,
        fileName: req.file.filename,
        path: fileUrl,
        size: req.file.size,
        mimetype: req.file.mimetype
      }
    });
  } catch (error) {
    console.error('檔案上傳錯誤:', error);
    res.status(500).json({ message: '檔案上傳失敗', error: error.message });
  }
});

// 多個檔案上傳 - 用於相簿
router.post('/multiple', authenticateJWT, requireCore, uploadMultiple('files', 10), handleUploadError, (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: '沒有上傳檔案' });
    }

    const files = req.files.map(file => ({
      originalName: file.originalname,
      fileName: file.filename,
      path: getFileUrl(file.path),
      size: file.size,
      mimetype: file.mimetype
    }));

    res.status(200).json({
      message: `成功上傳 ${files.length} 個檔案`,
      files: files
    });
  } catch (error) {
    console.error('多檔案上傳錯誤:', error);
    res.status(500).json({ message: '檔案上傳失敗', error: error.message });
  }
});

// 多欄位檔案上傳 - 用於表單包含多種檔案類型
router.post('/fields', authenticateJWT, requireCore, uploadFields([
  { name: 'avatar', maxCount: 1 },
  { name: 'cover_image', maxCount: 1 },
  { name: 'gallery_images', maxCount: 10 }
]), handleUploadError, (req, res) => {
  try {
    const uploadedFiles = {};

    // 處理不同欄位的檔案
    Object.keys(req.files).forEach(fieldName => {
      uploadedFiles[fieldName] = req.files[fieldName].map(file => ({
        originalName: file.originalname,
        fileName: file.filename,
        path: getFileUrl(file.path),
        size: file.size,
        mimetype: file.mimetype
      }));
    });

    res.status(200).json({
      message: '檔案上傳成功',
      files: uploadedFiles
    });
  } catch (error) {
    console.error('多欄位檔案上傳錯誤:', error);
    res.status(500).json({ message: '檔案上傳失敗', error: error.message });
  }
});

// 大頭貼上傳 - 專門用於成員頭像
router.post('/avatar', authenticateJWT, uploadSingle('avatar'), handleUploadError, (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: '沒有上傳頭像檔案' });
    }

    const avatarUrl = getFileUrl(req.file.path);
    
    res.status(200).json({
      message: '頭像上傳成功',
      avatarUrl: avatarUrl,
      file: {
        originalName: req.file.originalname,
        fileName: req.file.filename,
        size: req.file.size
      }
    });
  } catch (error) {
    console.error('頭像上傳錯誤:', error);
    res.status(500).json({ message: '頭像上傳失敗', error: error.message });
  }
});

// 封面圖片上傳 - 用於活動、公告等
router.post('/cover', authenticateJWT, requireCore, uploadSingle('cover_image'), handleUploadError, (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: '沒有上傳封面圖片' });
    }

    const coverUrl = getFileUrl(req.file.path);
    
    res.status(200).json({
      message: '封面圖片上傳成功',
      coverUrl: coverUrl,
      file: {
        originalName: req.file.originalname,
        fileName: req.file.filename,
        size: req.file.size
      }
    });
  } catch (error) {
    console.error('封面圖片上傳錯誤:', error);
    res.status(500).json({ message: '封面圖片上傳失敗', error: error.message });
  }
});

// 相簿圖片上傳 - 用於活動相簿
router.post('/gallery', authenticateJWT, requireCore, uploadMultiple('gallery_images', 20), handleUploadError, (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: '沒有上傳相簿圖片' });
    }

    const images = req.files.map(file => ({
      originalName: file.originalname,
      fileName: file.filename,
      url: getFileUrl(file.path),
      size: file.size
    }));

    res.status(200).json({
      message: `成功上傳 ${images.length} 張相簿圖片`,
      images: images
    });
  } catch (error) {
    console.error('相簿圖片上傳錯誤:', error);
    res.status(500).json({ message: '相簿圖片上傳失敗', error: error.message });
  }
});

export default router;
