import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import path from 'path';
dotenv.config()

import authRoutes from "./routes/auth_routes.js";
import eventRoutes from "./routes/eventRoutes.js"; // 引入活動路由
import announcementRoutes from "./routes/announcementRoutes.js"; // 引入公告路由
import coreteamRoutes from "./routes/coreteamRoutes.js"; // 引入幹部路由
import "./config/passport.js";
import { authenticateJWT } from './middlewares/auth.js';
import sequelize from './config/database.js';

const app = express()
const PORT = process.env.PORT || 5000

// 嘗試連線資料庫
try {
  await sequelize.authenticate();
  console.log('✅ Database connection has been established successfully.');
} catch (error) {
  console.error('❌ Unable to connect to the database:', error);
}

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173', // 允許的來源
  credentials: true, // 允許攜帶 Cookie
}));

// 重要：cookie-parser 必須在路由之前設定
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.json())

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes); // 活動路由
app.use("/api/announcements", announcementRoutes); // 公告路由
app.use("/api/coreteam", coreteamRoutes); // 幹部路由

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

app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'public', 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('前端檔案不存在，請確認 public/index.html 是否存在');
  }
});

const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(`✅ Server running on http://localhost:${port}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`⚠️ Port ${port} is in use, trying port ${port + 1}...`);
      startServer(parseInt(port) + 1);
    } else {
      console.error(`❌ Server error: ${err.message}`);
    }
  });
};
