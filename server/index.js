import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

// ES6 模組中取得 __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

import authRoutes from "./routes/auth_routes.js";
import eventRoutes from "./routes/eventRoutes.js"; // 引入活動路由
import announcementRoutes from "./routes/announcementRoutes.js"; // 引入公告路由
import coreteamRoutes from "./routes/coreteamRoutes.js"; // 引入幹部路由
import galleryRoutes from "./routes/galleryRoutes.js"; // 引入照片集路由
import uploadRoutes from "./routes/uploadRoutes.js"; // 引入檔案上傳路由
import "./config/passport.js";
import { authenticateJWT } from './middlewares/auth.js';
import { initializeDatabase } from './model/index.js';
import { getLogger, requestDetailsLogger, responseLogger } from './middlewares/logger.js';
import { notFoundHandler, globalErrorHandler } from './middlewares/errorHandler.js';

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173', // 允許的來源
  credentials: true, // 允許攜帶 Cookie
}));

// 日誌中間件
app.use(getLogger());

// 開發環境下的詳細日誌
if (process.env.NODE_ENV === 'development') {
  app.use(requestDetailsLogger);
  app.use(responseLogger);
}

// 重要：cookie-parser 必須在路由之前設定
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.json())

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes); // 活動路由
app.use("/api/announcements", announcementRoutes); // 公告路由
app.use("/api/coreteam", coreteamRoutes); // 幹部路由
app.use("/api/gallery", galleryRoutes); // 照片集路由
app.use("/api/upload", uploadRoutes); // 檔案上傳路由

app.get('/', (req, res) => {
  res.send('伺服器運行中 🚀');
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from GDG Backend! We\'ll go from here now.' })
})

// 這邊暫時用來測試 JWT 的 middleware 之後可刪 (postman 測過了可行 04/28 4:14)
app.get('/api/test', authenticateJWT, (req, res) =>{
  res.json({
    message: "已經通過JWT身份驗證",
    user: req.user
  });
})

app.get('/api/placeholder/:w/:h', (req, res) => {
  const { w, h } = req.params;
  // 這裡可以回傳一張 SVG 或 PNG 佔位圖
  res.type('svg').send(
    `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#eee"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#aaa" font-size="20">${w}x${h}</text>
    </svg>`
  );
});

// 404 處理 - 只處理 API 路由
app.use('/api/*', notFoundHandler);

// SPA 路由處理 - 所有非 API 請求都返回 index.html
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'public', 'index.html');
  
  // 檢查檔案是否存在
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    // 如果沒有打包檔案，返回開發提示
    res.status(404).json({
      error: '前端檔案不存在',
      message: '請先打包前端應用程式並放入 public 資料夾',
      hint: '執行: npm run build (在 client 資料夾中)'
    });
  }
});

// 全域錯誤處理中介軟體
app.use(globalErrorHandler);

const startServer = async (port) => {
  try {
    // 先初始化資料庫
    const dbConnected = await initializeDatabase();
    if (!dbConnected) {
      console.error('❌ 資料庫連線失敗，伺服器無法啟動');
      process.exit(1);
    }

    const server = app.listen(port, () => {
      console.log(`✅ Server running on http://localhost:${port}`);
      console.log(`🔗 Frontend URL: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
      console.log(`🔐 Auth endpoints: http://localhost:${port}/api/auth`);
      console.log(`📊 API endpoints: http://localhost:${port}/api`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`⚠️ Port ${port} is in use, trying port ${port + 1}...`);
        setTimeout(() => startServer(parseInt(port) + 1), 1000);
      } else {
        console.error(`❌ Server error: ${err.message}`);
        process.exit(1);
      }
    });

    // 優雅關閉處理
    process.on('SIGINT', () => {
      console.log('\n⚠️ 正在關閉伺服器...');
      server.close(async () => {
        const { sequelize } = await import('./model/index.js');
        await sequelize.close();
        console.log('✅ 伺服器已安全關閉');
        process.exit(0);
      });
    });

  } catch (error) {
    console.error('❌ 伺服器啟動失敗:', error);
    process.exit(1);
  }
};

startServer(PORT);
