import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

// 獲取當前檔案的目錄路徑
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 根據 NODE_ENV 選擇環境配置文件
let envFile;
switch (process.env.NODE_ENV) {
  case 'development':
    envFile = '.env.development';
    break;
  case 'docker':
    envFile = '.env.docker';
    break;
  case 'production':
    envFile = '.env.production';
    break;
  default:
    envFile = '.env';
}
const envPath = path.join(__dirname, `../${envFile}`);

// 確保環境變數正確載入
dotenv.config({ path: envPath });

console.log(`🔧 Loading environment from: ${envFile}`);
console.log(`📡 Database Host: ${process.env.DB_HOST}:${process.env.DB_PORT}`);

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "mysql",
  dialectOptions: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  },
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
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  },
});

export default sequelize;
