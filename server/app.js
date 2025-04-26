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

const app = express()
const PORT = process.env.PORT || 5000

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

// Serve static files from the client/public directory
const __dirname = path.resolve();
app.use('/resources', express.static(path.join(__dirname, '../client/public/resources')));
console.log('Serving static files from:', path.join(__dirname, '../client/public/resources'));

startServer(PORT);
