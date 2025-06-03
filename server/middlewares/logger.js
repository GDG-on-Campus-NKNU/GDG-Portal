// Logging middleware for GDG Portal backend
import morgan from 'morgan';

// 自定義日誌格式
const customLogFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms';

// 開發環境日誌配置
export const developmentLogger = morgan('dev');

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
      // 可以在這裡配置將日誌寫入檔案或外部日誌服務
      console.log(message.trim());
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
    if (process.env.NODE_ENV === 'development' && req.originalUrl.startsWith('/api/')) {
      console.log(`\n=== API 回應 ===`);
      console.log(`URL: ${req.originalUrl}`);
      console.log(`狀態: ${res.statusCode}`);
      console.log(`回應時間: ${Date.now() - req.startTime}ms`);
      
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
