import jwt from "jsonwebtoken";

// 生成 Access Token (短期)
export function generateAccessToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    avatarUrl: user.avatarUrl
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '15m'
  });
}

// 生成 Refresh Token (長期)
export function generateRefreshToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    tokenType: 'refresh'
  };

  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
  });
}

// 根據 Google 使用者資訊生成 Token (向後相容)
export function generateToken(googleUser) {
  const payload = {
    id: googleUser.id,
    email: googleUser.emails?.[0]?.value,
    name: googleUser.displayName,
    picture: googleUser.photos?.[0]?.value,
    role: 'guest' // Google 登入預設為 guest
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '15m'
  });
}

// 驗證 Access Token
export function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

// 驗證 Refresh Token
export function verifyRefreshToken(token) {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET);
}

// 設定 Cookie 的通用選項
export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 天
};
