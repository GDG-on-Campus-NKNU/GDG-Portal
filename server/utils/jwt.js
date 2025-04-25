import jwt from "jsonwebtoken";

// 根據 Google 傳回的使用者資訊產生 JWT
export function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.emails?.[0]?.value,
    name: user.displayName,
    picture: user.photos?.[0]?.value,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN ,
  });
}

// 驗證 JWT 並解析其中的使用者資訊
export function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}
