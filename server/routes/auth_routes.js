import passport from "passport";
import express from "express";
import { generateToken } from "../utils/jwt.js";

const router = express.Router();
export default router;

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
  passport.authenticate("google", {session: false, failureRedirect: "/" }),
  (req, res) => {
    const token = generateToken(req.user);
    // 用 query string 回傳
    res.redirect(`http://localhost:5173?token=${token}`);
  }
);

