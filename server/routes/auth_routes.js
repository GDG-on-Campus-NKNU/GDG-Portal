import passport from "passport";
import express from "express";
import { generateToken } from "../utils/jwt.js";
import userController from "../controllers/userController.js";
import { authenticateJWT, optionalAuth } from "../middlewares/auth.js";
import { 
  validateUserRegistration, 
  validateUserLogin, 
  validatePasswordChange, 
  validateProfileUpdate 
} from "../middlewares/validation.js";

const router = express.Router();
export default router;

// 傳統登入註冊路由 (加入驗證中間件)
router.post("/register", validateUserRegistration, userController.register);
router.post("/login", validateUserLogin, userController.login);
router.post("/logout", authenticateJWT, userController.logout);

// Token 管理
router.post("/refresh", userController.refreshToken);
router.get("/me", authenticateJWT, userController.getCurrentUser);

// 使用者資料管理 (加入驗證中間件)
router.put("/profile", authenticateJWT, validateProfileUpdate, userController.updateProfile);
router.post("/change-password", authenticateJWT, validatePasswordChange, userController.changePassword);

// Google 帳號連接功能
router.post("/link-google", authenticateJWT, userController.linkGoogleAccount);
router.delete("/unlink-google", authenticateJWT, userController.unlinkGoogleAccount);

// 使用者列表 (供管理員使用)
router.get("/users", authenticateJWT, userController.getUsersList);

// Google OAuth 路由
router.get("/login", (req, res) => {
  return res.render("login");
});

router.get(
  "/google",
  (req, res, next) => {
    // 保存 linkAccount 標記到 session
    req.session = req.session || {};
    req.session.linkAccount = req.query.linkAccount === 'true';
    next();
  },
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

router.get(
  "/google/redirect",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  userController.handleGoogleCallback
);

// 檢查認證狀態 (可選認證)
router.get("/status", optionalAuth, (req, res) => {
  res.json({
    isAuthenticated: !!req.user,
    user: req.user || null
  });
});

// 獲取使用者公開個人頁面
router.get("/profile/:id", userController.getUserProfile);

