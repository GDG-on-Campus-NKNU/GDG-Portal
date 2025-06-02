import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import { User, Profile } from '../model/associations.js';
import { transformUser } from '../utils/dataTransform.js';
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
        email_verified: false
      });

      // 創建空的 Profile
      await Profile.create({
        user_id: user.id
      });

      // 生成 Token
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      // 儲存 Refresh Token
      await user.update({ refresh_token: refreshToken });

      // 重新載入使用者並包含 profile
      const userWithProfile = await User.findByPk(user.id, {
        include: [{
          model: Profile,
          as: 'profile'
        }]
      });

      // 設定 Cookie
      res.cookie('accessToken', accessToken, {
        ...cookieOptions,
        maxAge: 15 * 60 * 1000 // 15 分鐘
      });
      res.cookie('refreshToken', refreshToken, cookieOptions);

      res.status(201).json({
        message: '註冊成功',
        user: transformUser(userWithProfile),
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

      // 尋找使用者並包含 profile
      const user = await User.findOne({ 
        where: { email },
        include: [{
          model: Profile,
          as: 'profile'
        }]
      });
      if (!user) {
        return res.status(401).json({ message: '電子郵件或密碼錯誤' });
      }

      // 檢查密碼
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: '電子郵件或密碼錯誤' });
      }

      // 檢查帳號狀態
      if (!user.is_active) {
        return res.status(401).json({ message: '帳號已被停用' });
      }

      // 如果使用者沒有 profile，創建一個
      if (!user.profile) {
        await Profile.create({
          user_id: user.id
        });
        // 重新載入使用者並包含 profile
        await user.reload({
          include: [{
            model: Profile,
            as: 'profile'
          }]
        });
      }

      // 生成 Token
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      // 更新最後登入時間和 Refresh Token
      await user.update({ 
        last_login: new Date(),
        refresh_token: refreshToken 
      });

      // 設定 Cookie
      res.cookie('accessToken', accessToken, {
        ...cookieOptions,
        maxAge: 15 * 60 * 1000 // 15 分鐘
      });
      res.cookie('refreshToken', refreshToken, cookieOptions);

      res.json({
        message: '登入成功',
        user: transformUser(user),
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
          { refresh_token: null },
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
          refresh_token: refreshToken
        }
      });

      if (!user) {
        return res.status(401).json({ message: '無效的 Refresh Token' });
      }

      // 生成新的 Token
      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);

      // 更新資料庫中的 Refresh Token
      await user.update({ refresh_token: newRefreshToken });

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
        attributes: { exclude: ['password', 'refresh_token'] },
        include: [{
          model: Profile,
          as: 'profile'
        }]
      });

      if (!user) {
        return res.status(404).json({ message: '使用者不存在' });
      }

      // 如果使用者沒有 profile，創建一個
      if (!user.profile) {
        await Profile.create({
          user_id: user.id
        });
        // 重新載入使用者並包含 profile
        await user.reload({
          include: [{
            model: Profile,
            as: 'profile'
          }]
        });
      }

      res.json({
        user: transformUser(user)
      });
    } catch (error) {
      console.error('獲取使用者資訊錯誤:', error);
      res.status(500).json({ message: '獲取使用者資訊失敗' });
    }
  }

  // 更新使用者資料
  async updateProfile(req, res) {
    try {
      const { 
        name, 
        avatarUrl, 
        bio, 
        location, 
        company, 
        website,
        phone,
        linkedinUrl,
        githubUrl,
        twitterUrl,
        skills,
        interests,
        education,
        experience
      } = req.body;
      const userId = req.user.id;

      const user = await User.findByPk(userId, {
        include: [{
          model: Profile,
          as: 'profile'
        }]
      });
      if (!user) {
        return res.status(404).json({ message: '使用者不存在' });
      }

      // 更新 User 表的基本資料
      const userUpdateData = {};
      if (name !== undefined) userUpdateData.name = name;
      if (avatarUrl !== undefined) userUpdateData.avatar_url = avatarUrl;

      if (Object.keys(userUpdateData).length > 0) {
        await user.update(userUpdateData);
      }

      // 如果使用者沒有 profile，創建一個
      if (!user.profile) {
        await Profile.create({
          user_id: user.id
        });
        await user.reload({
          include: [{
            model: Profile,
            as: 'profile'
          }]
        });
      }

      // 更新 Profile 表的資料
      const profileUpdateData = {};
      if (bio !== undefined) profileUpdateData.bio = bio;
      if (location !== undefined) profileUpdateData.location = location;
      if (company !== undefined) profileUpdateData.company = company;
      if (website !== undefined) profileUpdateData.website = website;
      if (phone !== undefined) profileUpdateData.phone = phone;
      if (linkedinUrl !== undefined) profileUpdateData.linkedin_url = linkedinUrl;
      if (githubUrl !== undefined) profileUpdateData.github_url = githubUrl;
      if (twitterUrl !== undefined) profileUpdateData.twitter_url = twitterUrl;
      if (skills !== undefined) profileUpdateData.skills = skills;
      if (interests !== undefined) profileUpdateData.interests = interests;
      if (education !== undefined) profileUpdateData.education = education;
      if (experience !== undefined) profileUpdateData.experience = experience;

      if (Object.keys(profileUpdateData).length > 0) {
        await user.profile.update(profileUpdateData);
      }

      // 重新載入使用者資料
      await user.reload({
        include: [{
          model: Profile,
          as: 'profile'
        }]
      });

      res.json({
        message: '資料更新成功',
        user: transformUser(user)
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
          [Op.or]: [
            { google_id: googleId },
            { email: email }
          ]
        }
      });

      if (!user) {
        // 創建新使用者
        user = await User.create({
          google_id: googleId,
          email,
          name,
          avatar_url: avatarUrl,
          role: 'member',
          email_verified: true // Google 帳號視為已驗證
        });
      } else {
        // 更新現有使用者的 Google 資訊
        await user.update({
          google_id: googleId,
          avatar_url: avatarUrl,
          last_login: new Date()
        });
      }

      // 生成 Token
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      // 儲存 Refresh Token
      await user.update({ refresh_token: refreshToken });

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

  // 獲取使用者列表 (供管理員選擇 CoreTeam 成員使用)
  async getUsersList(req, res) {
    try {
      const { page = 1, limit = 20, keyword = '', excludeCoreTeam = false } = req.query;

      // 構建查詢條件
      const whereClause = {
        is_active: true
      };

      // 關鍵字搜尋
      if (keyword) {
        whereClause[Op.or] = [
          { name: { [Op.like]: `%${keyword}%` } },
          { email: { [Op.like]: `%${keyword}%` } }
        ];
      }

      // 排除已經是 CoreTeam 成員的使用者
      if (excludeCoreTeam === 'true') {
        const { CoreTeam } = await import('../model/index.js');
        const coreTeamUserIds = await CoreTeam.findAll({
          attributes: ['user_id'],
          where: {
            user_id: { [Op.ne]: null }
          },
          raw: true
        });
        const excludeIds = coreTeamUserIds.map(ct => ct.user_id);
        if (excludeIds.length > 0) {
          whereClause.id = { [Op.notIn]: excludeIds };
        }
      }

      const offset = (parseInt(page) - 1) * parseInt(limit);

      const { count, rows } = await User.findAndCountAll({
        where: whereClause,
        attributes: ['id', 'name', 'email', 'avatar_url', 'role'],
        limit: parseInt(limit),
        offset: offset,
        order: [['name', 'ASC']]
      });

      const users = rows.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatar_url,
        role: user.role
      }));

      res.json({
        users,
        pagination: {
          total: count,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(count / parseInt(limit))
        }
      });
    } catch (error) {
      console.error('獲取使用者列表錯誤:', error);
      res.status(500).json({ message: '獲取使用者列表失敗' });
    }
  }
}

export default new UserController();
