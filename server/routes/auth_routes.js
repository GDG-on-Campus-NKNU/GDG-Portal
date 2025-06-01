import passport from "passport";
import express from "express";
import { generateToken } from "../utils/jwt.js";
import userController from "../controllers/userController.js";
import { authenticateJWT, optionalAuth } from "../middlewares/auth.js";

const router = express.Router();
export default router;

// 傳統登入註冊路由
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", authenticateJWT, userController.logout);

// Token 管理
router.post("/refresh", userController.refreshToken);
router.get("/me", authenticateJWT, userController.getCurrentUser);

// 使用者資料管理
router.put("/profile", authenticateJWT, userController.updateProfile);
router.post("/change-password", authenticateJWT, userController.changePassword);

// Google OAuth 路由
router.get("/login", (req, res) => {
  return res.render("login");
});

router.get(
  "/google",
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

