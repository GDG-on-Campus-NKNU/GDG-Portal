import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

// 獲取當前檔案的目錄路徑
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 確保環境變數正確載入
dotenv.config({ path: path.join(__dirname, "../.env") });

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "mysql",
  logging: process.env.NODE_ENV === "development" ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    timestamps: true,
    underscored: false,
  },
});

export default sequelize;
