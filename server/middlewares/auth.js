import jwt from "jsonwebtoken";
import { verifyToken, verifyRefreshToken } from "../utils/jwt.js";
import User from "../model/userModel.js";

// 從 Cookie 或 Header 中提取 Token
export function extractToken(req) {
  // 優先從 Cookie 中讀取
  if (req.cookies && req.cookies.accessToken) {
    return req.cookies.accessToken;
  }
  
  // 備用方案：從 Authorization Header 讀取
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }
  
  return null;
}

// JWT 認證中介軟體
export function authenticateJWT(req, res, next) {
  const token = extractToken(req);

  if (!token) {
    return res.status(401).json({ message: "未提供授權 token" });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token 已過期", code: 'TOKEN_EXPIRED' });
    }
    return res.status(401).json({ message: "無效的 token" });
  }
}

// 可選認證中介軟體 (不強制要求登入)
export function optionalAuth(req, res, next) {
  const token = extractToken(req);
  
  if (token) {
    try {
      const decoded = verifyToken(token);
      req.user = decoded;
    } catch (err) {
      // 忽略錯誤，繼續執行
    }
  }
  
  next();
}

// 角色權限檢查中介軟體
export function requireRole(allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "需要登入" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: "權限不足",
        required: allowedRoles,
        current: req.user.role
      });
    }

    next();
  };
}

// 管理員權限檢查
export function requireAdmin(req, res, next) {
  return requireRole(['admin'])(req, res, next);
}

// 核心團隊權限檢查 (core 或 admin)
export function requireCore(req, res, next) {
  return requireRole(['admin', 'core'])(req, res, next);
}

// 成員權限檢查 (member, core 或 admin)
export function requireMember(req, res, next) {
  return requireRole(['admin', 'core', 'member'])(req, res, next);
}

// 檢查使用者是否為資源擁有者或管理員
export function requireOwnerOrAdmin(userIdField = 'userId') {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "需要登入" });
    }

    // 管理員可以存取所有資源
    if (req.user.role === 'admin') {
      return next();
    }

    // 檢查是否為資源擁有者
    const resourceUserId = req.params[userIdField] || req.body[userIdField];
    if (req.user.id == resourceUserId) {
      return next();
    }

    return res.status(403).json({ message: "只能存取自己的資源" });
  };
}
