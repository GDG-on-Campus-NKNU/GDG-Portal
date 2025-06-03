// Error handling middleware for GDG Portal backend
import { ValidationError } from 'sequelize';

// 404 錯誤處理 - 當沒有路由匹配時
export const notFoundHandler = (req, res, next) => {
  const error = new Error(`找不到路由 ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

// 全域錯誤處理中間件
export const globalErrorHandler = (error, req, res, next) => {
  // 設定預設錯誤狀態
  let status = error.status || error.statusCode || 500;
  let message = error.message || '伺服器內部錯誤';
  let details = null;

  // 開發環境中包含錯誤堆疊
  if (process.env.NODE_ENV === 'development') {
    details = {
      stack: error.stack,
      url: req.originalUrl,
      method: req.method,
      timestamp: new Date().toISOString()
    };
  }

  // Sequelize 驗證錯誤
  if (error instanceof ValidationError) {
    status = 400;
    message = '資料驗證失敗';
    details = {
      validationErrors: error.errors.map(err => ({
        field: err.path,
        message: err.message,
        value: err.value
      }))
    };
  }

  // JWT 相關錯誤
  if (error.name === 'JsonWebTokenError') {
    status = 401;
    message = '無效的認證令牌';
  } else if (error.name === 'TokenExpiredError') {
    status = 401;
    message = '認證令牌已過期';
  }

  // 資料庫連線錯誤
  if (error.name === 'SequelizeConnectionError') {
    status = 503;
    message = '資料庫連線失敗';
  }

  // 資料庫約束錯誤
  if (error.name === 'SequelizeUniqueConstraintError') {
    status = 409;
    message = '資料重複，違反唯一性約束';
    details = {
      fields: error.errors.map(err => err.path)
    };
  }

  // 資料庫外鍵約束錯誤
  if (error.name === 'SequelizeForeignKeyConstraintError') {
    status = 400;
    message = '外鍵約束錯誤，關聯資料不存在';
  }

  // 記錄錯誤（只在非 404 錯誤時記錄）
  if (status !== 404) {
    console.error(`[ERROR] ${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
    console.error(`Status: ${status}, Message: ${message}`);
    if (error.stack && process.env.NODE_ENV === 'development') {
      console.error(error.stack);
    }
  }

  // 回應錯誤
  const response = {
    success: false,
    message,
    status
  };

  if (details && process.env.NODE_ENV === 'development') {
    response.details = details;
  }

  res.status(status).json(response);
};

// 異步錯誤處理包裝器
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
