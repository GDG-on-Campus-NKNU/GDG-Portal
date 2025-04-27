import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import authRoutes from "./routes/auth_routes.js";
import "./config/passport.js";
import { authenticateJWT } from './middlewares/auth.js';

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes);

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

const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(`✅ Server running on http://localhost:${port}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`⚠️ Port ${port} is in use, trying port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error(`❌ Server error: ${err.message}`);
    }
  });
};

startServer(PORT);
