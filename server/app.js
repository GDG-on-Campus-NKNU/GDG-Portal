import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
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

app.use(cors())
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


// Serve static files from the client/public directory
const __dirname = path.resolve();
app.use('/resources', express.static(path.join(__dirname, '../client/public/resources')));
console.log('Serving static files from:', path.join(__dirname, '../client/public/resources'));

