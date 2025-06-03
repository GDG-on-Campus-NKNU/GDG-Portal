import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config();

export default passport;

// 動態設置 callback URL
const getCallbackURL = () => {
  // 優先使用環境變數設定的 URL
  if (process.env.OAUTH_CALLBACK_URL) {
    return process.env.OAUTH_CALLBACK_URL;
  }

  // 根據環境動態生成
  if (process.env.NODE_ENV === 'production') {
    // 生產環境，從 CLIENT_URL 推導後端 URL
    if (process.env.CLIENT_URL) {
      const clientUrl = process.env.CLIENT_URL.replace(/\/$/, ''); // 移除結尾的斜線
      // 如果 CLIENT_URL 是 ngrok，我們假設後端也在相同的域名
      if (clientUrl.includes('ngrok')) {
        return `${clientUrl}/api/auth/google/redirect`;
      }
    }
    // 如果無法推導，使用預設值
    return "http://localhost:5000/api/auth/google/redirect";
  } else {
    // 開發環境
    return "http://localhost:5000/api/auth/google/redirect";
  }
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: getCallbackURL(),
    },
    (accessToken, refreshToken, profile, done) => {
        console.log('Google Profile:', profile);
        console.log('Callback URL used:', getCallbackURL());
        return done(null, profile);
    }
  )
);
