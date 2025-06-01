import bcrypt from 'bcryptjs';
import User from '../model/userModel.js';
import { 
  generateAccessToken, 
  generateRefreshToken, 
  verifyRefreshToken,
  cookieOptions 
} from '../utils/jwt.js';

class UserController {
  // 註冊使用者
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      // 檢查是否已存在
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: '該電子郵件已被註冊' });
      }

      // 加密密碼
      const hashedPassword = await bcrypt.hash(password, 12);

      // 創建使用者
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: 'member',
        emailVerified: false
      });

      // 生成 Token
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      // 儲存 Refresh Token
      await user.update({ refreshToken });

      // 設定 Cookie
      res.cookie('accessToken', accessToken, {
        ...cookieOptions,
        maxAge: 15 * 60 * 1000 // 15 分鐘
      });
      res.cookie('refreshToken', refreshToken, cookieOptions);

      res.status(201).json({
        message: '註冊成功',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatarUrl: user.avatarUrl
        },
        accessToken
      });
    } catch (error) {
      console.error('註冊錯誤:', error);
      res.status(500).json({ message: '註冊失敗' });
    }
  }

  // 登入使用者
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // 尋找使用者
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: '電子郵件或密碼錯誤' });
      }

      // 檢查密碼 (Google 使用者可能沒有密碼)
      if (!user.password) {
        return res.status(401).json({ message: '此帳號透過 Google 登入，請使用 Google 登入方式' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: '電子郵件或密碼錯誤' });
      }

      // 檢查帳號狀態
      if (!user.isActive) {
        return res.status(401).json({ message: '帳號已被停用' });
      }

      // 生成 Token
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      // 更新最後登入時間和 Refresh Token
      await user.update({ 
        lastLogin: new Date(),
        refreshToken 
      });

      // 設定 Cookie
      res.cookie('accessToken', accessToken, {
        ...cookieOptions,
        maxAge: 15 * 60 * 1000 // 15 分鐘
      });
      res.cookie('refreshToken', refreshToken, cookieOptions);

      res.json({
        message: '登入成功',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatarUrl: user.avatarUrl
        },
        accessToken
      });
    } catch (error) {
      console.error('登入錯誤:', error);
      res.status(500).json({ message: '登入失敗' });
    }
  }

  // 登出使用者
  async logout(req, res) {
    try {
      // 清除使用者的 Refresh Token
      if (req.user && req.user.id) {
        await User.update(
          { refreshToken: null },
          { where: { id: req.user.id } }
        );
      }

      // 清除 Cookie
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');

      res.json({ message: '登出成功' });
    } catch (error) {
      console.error('登出錯誤:', error);
      res.status(500).json({ message: '登出失敗' });
    }
  }

  // 刷新 Token
  async refreshToken(req, res) {
    try {
      const { refreshToken } = req.cookies;

      if (!refreshToken) {
        return res.status(401).json({ message: '未提供 Refresh Token' });
      }

      // 驗證 Refresh Token
      const decoded = verifyRefreshToken(refreshToken);
      
      // 從資料庫查找使用者並檢查 Refresh Token
      const user = await User.findOne({
        where: { 
          id: decoded.id,
          refreshToken: refreshToken
        }
      });

      if (!user) {
        return res.status(401).json({ message: '無效的 Refresh Token' });
      }

      // 生成新的 Token
      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);

      // 更新資料庫中的 Refresh Token
      await user.update({ refreshToken: newRefreshToken });

      // 設定新的 Cookie
      res.cookie('accessToken', newAccessToken, {
        ...cookieOptions,
        maxAge: 15 * 60 * 1000 // 15 分鐘
      });
      res.cookie('refreshToken', newRefreshToken, cookieOptions);

      res.json({
        message: 'Token 刷新成功',
        accessToken: newAccessToken
      });
    } catch (error) {
      console.error('Token 刷新錯誤:', error);
      res.status(401).json({ message: 'Token 刷新失敗' });
    }
  }

  // 獲取當前使用者資訊
  async getCurrentUser(req, res) {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: { exclude: ['password', 'refreshToken'] }
      });

      if (!user) {
        return res.status(404).json({ message: '使用者不存在' });
      }

      res.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatarUrl: user.avatarUrl,
          emailVerified: user.emailVerified,
          lastLogin: user.lastLogin,
          isActive: user.isActive
        }
      });
    } catch (error) {
      console.error('獲取使用者資訊錯誤:', error);
      res.status(500).json({ message: '獲取使用者資訊失敗' });
    }
  }

  // 更新使用者資料
  async updateProfile(req, res) {
    try {
      const { name, avatarUrl } = req.body;
      const userId = req.user.id;

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: '使用者不存在' });
      }

      await user.update({
        name: name || user.name,
        avatarUrl: avatarUrl || user.avatarUrl
      });

      res.json({
        message: '資料更新成功',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatarUrl: user.avatarUrl
        }
      });
    } catch (error) {
      console.error('更新資料錯誤:', error);
      res.status(500).json({ message: '更新資料失敗' });
    }
  }

  // 變更密碼
  async changePassword(req, res) {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.user.id;

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: '使用者不存在' });
      }

      // 檢查當前密碼
      if (user.password) {
        const isValidPassword = await bcrypt.compare(currentPassword, user.password);
        if (!isValidPassword) {
          return res.status(400).json({ message: '當前密碼錯誤' });
        }
      }

      // 加密新密碼
      const hashedNewPassword = await bcrypt.hash(newPassword, 12);
      await user.update({ password: hashedNewPassword });

      res.json({ message: '密碼更新成功' });
    } catch (error) {
      console.error('變更密碼錯誤:', error);
      res.status(500).json({ message: '變更密碼失敗' });
    }
  }

  // Google OAuth 回調處理 (優化版)
  async handleGoogleCallback(req, res) {
    try {
      const googleUser = req.user;
      const email = googleUser.emails?.[0]?.value;
      const name = googleUser.displayName;
      const avatarUrl = googleUser.photos?.[0]?.value;
      const googleId = googleUser.id;

      // 尋找或創建使用者
      let user = await User.findOne({ 
        where: { 
          $or: [
            { googleId: googleId },
            { email: email }
          ]
        }
      });

      if (!user) {
        // 創建新使用者
        user = await User.create({
          googleId,
          email,
          name,
          avatarUrl,
          role: 'member',
          emailVerified: true // Google 帳號視為已驗證
        });
      } else {
        // 更新現有使用者的 Google 資訊
        await user.update({
          googleId: googleId,
          avatarUrl: avatarUrl,
          lastLogin: new Date()
        });
      }

      // 生成 Token
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      // 儲存 Refresh Token
      await user.update({ refreshToken });

      // 設定 Cookie
      res.cookie('accessToken', accessToken, {
        ...cookieOptions,
        maxAge: 15 * 60 * 1000 // 15 分鐘
      });
      res.cookie('refreshToken', refreshToken, cookieOptions);

      // 重導向到前端，攜帶成功訊息
      res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5173'}?login=success`);
    } catch (error) {
      console.error('Google 回調錯誤:', error);
      res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5173'}?login=error`);
    }
  }
}

export default new UserController();
