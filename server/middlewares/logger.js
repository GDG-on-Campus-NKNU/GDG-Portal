// Logging middleware for GDG Portal backend
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

// 創建日誌目錄
const logDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// 日誌寫入函數
const writeLog = (message, logType = 'access') => {
  const timestamp = new Date().toISOString();
  const date = timestamp.split('T')[0];
  const logFile = path.join(logDir, `${logType}-${date}.log`);
  
  const logEntry = `[${timestamp}] ${message}\n`;
  
  try {
    // 寫入檔案
    fs.appendFileSync(logFile, logEntry);
  } catch (error) {
    console.error('Failed to write log file:', error);
  }
  
  // 開發環境同時輸出到終端
  if (process.env.NODE_ENV === 'development') {
    console.log(message);
  }
};

// 自定義日誌格式
const customLogFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms';

// 開發環境日誌配置 - 同時輸出到終端和文件
export const developmentLogger = morgan('dev', {
  stream: {
    write: (message) => {
      // 開發環境輸出到終端
      process.stdout.write(message);
      // 同時寫入存取日誌檔案
      writeLog(message.trim(), 'access');
    }
  }
});

// 生產環境日誌配置
export const productionLogger = morgan(customLogFormat, {
  skip: (req, res) => {
    // 跳過健康檢查和靜態資源的日誌
    return req.url.includes('/health') || 
           req.url.includes('/favicon.ico') ||
           req.url.startsWith('/static/');
  },
  stream: {
    write: (message) => {
      // 寫入存取日誌檔案
      writeLog(message.trim(), 'access');
    }
  }
});

// 請求詳細資訊日誌中間件（僅在開發環境使用）
export const requestDetailsLogger = (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('\n=== 請求詳細資訊 ===');
    console.log(`時間: ${new Date().toISOString()}`);
    console.log(`方法: ${req.method}`);
    console.log(`URL: ${req.originalUrl}`);
    console.log(`IP: ${req.ip || req.connection.remoteAddress}`);
    console.log(`User-Agent: ${req.get('User-Agent') || '未知'}`);
    
    if (req.headers.authorization) {
      console.log(`認證: ${req.headers.authorization.substring(0, 20)}...`);
    }
    
    if (Object.keys(req.query).length > 0) {
      console.log(`查詢參數:`, req.query);
    }
    
    if (req.body && Object.keys(req.body).length > 0) {
      // 敏感資料遮罩
      const maskedBody = { ...req.body };
      if (maskedBody.password) maskedBody.password = '***';
      if (maskedBody.token) maskedBody.token = '***';
      console.log(`請求體:`, maskedBody);
    }
    
    console.log('==================\n');
  }
  next();
};

// API 回應日誌中間件
export const responseLogger = (req, res, next) => {
  const originalSend = res.send;
  
  res.send = function(data) {
    if (req.originalUrl.startsWith('/api/')) {
      const responseTime = Date.now() - req.startTime;
      const logMessage = `API ${req.method} ${req.originalUrl} - Status: ${res.statusCode} - ${responseTime}ms`;
      
      // 寫入 API 日誌檔案
      writeLog(logMessage, 'api');
      
      // 如果是錯誤狀態，記錄詳細資訊
      if (res.statusCode >= 400) {
        try {
          const responseBody = JSON.parse(data);
          if (responseBody.error || responseBody.message) {
            const errorMessage = `API Error - ${req.method} ${req.originalUrl} - ${responseBody.error || responseBody.message}`;
            writeLog(errorMessage, 'error');
          }
        } catch (e) {
          // 如果不是 JSON 格式就跳過
          const errorMessage = `API Error - ${req.method} ${req.originalUrl} - Status: ${res.statusCode}`;
          writeLog(errorMessage, 'error');
        }
      }
      
      // 開發環境輸出到終端
      if (process.env.NODE_ENV === 'development') {
        console.log(`\n=== API 回應 ===`);
        console.log(`URL: ${req.originalUrl}`);
        console.log(`狀態: ${res.statusCode}`);
        console.log(`回應時間: ${responseTime}ms`);
        
        try {
          const responseBody = JSON.parse(data);
          if (responseBody.message) {
            console.log(`訊息: ${responseBody.message}`);
          }
          if (responseBody.error) {
            console.log(`錯誤: ${responseBody.error}`);
          }
        } catch (e) {
          // 如果不是 JSON 格式就跳過
        }
        
        console.log('===============\n');
      }
    }
    
    originalSend.call(this, data);
  };
  
  req.startTime = Date.now();
  next();
};

// 根據環境選擇日誌中間件
export const getLogger = () => {
  return process.env.NODE_ENV === 'production' 
    ? productionLogger 
    : developmentLogger;
};
