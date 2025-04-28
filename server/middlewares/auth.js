import jwt from "jsonwebtoken";

export function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    //HTTP Header 格式 → Authorization: Bearer <JWT>
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // 把解析後的 user 資料存進 req
      next(); // 通過驗證，進入下一個 middleware 或 controller
    } catch (err) {
      return res.status(401).json({ message: "無效或過期的 token" });
    }
  } else {
    return res.status(401).json({ message: "未提供授權 token" });
  }
}
