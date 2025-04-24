import passport from "passport";
import express from "express";

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
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    return res.redirect("http://localhost:5173");
  }
);

