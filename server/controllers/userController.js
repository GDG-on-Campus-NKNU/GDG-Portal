import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import { User, Profile } from '../model/index.js';
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

  // 檢查認證狀態 (用於前端狀態檢查)
  async getAuthStatus(req, res) {
    try {
      if (!req.user) {
        return res.json({
          isAuthenticated: false,
          user: null
        });
      }

      // 重新從資料庫獲取完整的使用者資料
      const user = await User.findByPk(req.user.id, {
        attributes: { exclude: ['password', 'refresh_token'] },
        include: [{
          model: Profile,
          as: 'profile'
        }]
      });

      if (!user || !user.is_active) {
        return res.json({
          isAuthenticated: false,
          user: null
        });
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
        isAuthenticated: true,
        user: transformUser(user)
      });
    } catch (error) {
      console.error('檢查認證狀態錯誤:', error);
      res.json({
        isAuthenticated: false,
        user: null
      });
    }
  }

  // 更新使用者資料
  async updateProfile(req, res) {
    try {
      const {
        name,
        avatarUrl,
        bannerUrl,
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

      // 導入 imageHandler 處理 Base64 圖片
      const { saveBase64Image, isBase64Image } = await import('../utils/imageHandler.js');

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

      // 處理頭像，如果是 Base64 格式則保存為文件
      if (avatarUrl !== undefined) {
        if (isBase64Image(avatarUrl)) {
          const savedImageUrl = saveBase64Image(avatarUrl, 'avatar');
          if (savedImageUrl) {
            userUpdateData.avatar_url = savedImageUrl;
          } else {
            return res.status(400).json({ message: '頭像圖片處理失敗' });
          }
        } else {
          userUpdateData.avatar_url = avatarUrl;
        }
      }

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

      // 處理橫幅，如果是 Base64 格式則保存為文件
      if (bannerUrl !== undefined) {
        if (isBase64Image(bannerUrl)) {
          const savedImageUrl = saveBase64Image(bannerUrl, 'banner');
          if (savedImageUrl) {
            profileUpdateData.banner_url = savedImageUrl;
          } else {
            return res.status(400).json({ message: '橫幅圖片處理失敗' });
          }
        } else {
          profileUpdateData.banner_url = bannerUrl;
        }
      }

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

      // 僅允許已存在的 google_id 登入，不自動註冊新帳號
      let user = await User.findOne({
        where: { google_id: googleId },
        include: [{ model: Profile, as: 'profile' }]
      });

      if (!user) {
        // 阻止未註冊的 Google 帳號登入
        const errorMessage = encodeURIComponent('此 Google 帳號尚未綁定，請先用本地帳號登入並在個人設定中綁定 Google。');

        // 取得前端URL
        let clientUrl = process.env.CLIENT_URL;
        if (!clientUrl) {
          const protocol = req.protocol;
          const host = req.get('host');

          // 檢查是否為 ngrok 域名
          if (host.includes('ngrok-free.app') || host.includes('ngrok.io') || host.includes('ngrok.app')) {
            // 對於 Ngrok，假設前端也在相同域名 (可能是不同的 tunnel)
            // 或者前端在相同 tunnel 的不同路徑
            clientUrl = `${protocol}://${host}`;
          } else if (host.includes('localhost')) {
            // 對於 localhost，將後端端口 5000 替換為前端端口 5173
            clientUrl = `${protocol}://${host.replace(':5000', ':5173')}`;
          } else {
            // 其他情況，使用當前 origin
            clientUrl = `${protocol}://${host}`;
          }
        }

        // 使用計算出的前端URL進行重定向
        return res.send(`
          <html>
          <body>
            <script>
              window.location.href = '${clientUrl}/auth/error?type=google-not-linked&message=${errorMessage}';
            </script>
            <div style="text-align: center; font-family: sans-serif; padding: 20px;">
              <h3>Google 帳號未綁定</h3>
              <p>正在重定向到錯誤頁面...</p>
            </div>
          </body>
          </html>
        `);
      }

      // 更新現有使用者的 Google 資訊（如有需要）
      await user.update({
        avatar_url: avatarUrl,
        last_login: new Date()
      });

      // 生成 Token
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      await user.update({ refresh_token: refreshToken });

      // 重新載入使用者資料，確保包含 profile 資訊
      user = await User.findByPk(user.id, {
        include: [{ model: Profile, as: 'profile' }]
      });

      // 設定 Cookie
      res.cookie('accessToken', accessToken, {
        ...cookieOptions,
        maxAge: 15 * 60 * 1000 // 15 分鐘
      });
      res.cookie('refreshToken', refreshToken, cookieOptions);

      // 檢查是否是帳號連接請求 (從 session 中獲取)
      const isLinkRequest = req.session?.linkAccount === true;

      // 取得前端URL - 優先使用環境變數，否則使用請求的origin但調整端口
      let clientUrl = process.env.CLIENT_URL;
      if (!clientUrl) {
        // 如果沒有設定CLIENT_URL，根據當前請求的host推斷前端URL
        const protocol = req.protocol;
        const host = req.get('host');

        // 檢查是否為 ngrok 域名
        if (host.includes('ngrok-free.app') || host.includes('ngrok.io') || host.includes('ngrok.app')) {
          // 對於 Ngrok，假設前端也在相同域名
          clientUrl = `${protocol}://${host}`;
        } else if (host.includes('localhost')) {
          // 對於 localhost，將後端端口 5000 替換為前端端口 5173
          clientUrl = `${protocol}://${host.replace(':5000', ':5173')}`;
        } else {
          // 其他情況，使用當前 origin
          clientUrl = `${protocol}://${host}`;
        }
      }

      if (isLinkRequest) {
        res.send(`
          <html>
          <body>
            <script>
              window.opener.postMessage({
                type: 'google-oauth-success',
                googleId: '${googleId}'
              }, '${clientUrl}');
              window.close();
            </script>
            <div style="text-align: center; font-family: sans-serif; padding: 20px;">
              <h3>Google 帳號驗證成功</h3>
              <p>請稍候，正在將您重定向回應用程式...</p>
            </div>
          </body>
          </html>
        `);
      } else {
        // 使用計算出的前端URL進行重定向
        res.send(`
          <html>
          <body>
            <script>
              window.location.href = '${clientUrl}/?login=success';
            </script>
            <div style="text-align: center; font-family: sans-serif; padding: 20px;">
              <h3>Google 登入成功</h3>
              <p>正在重定向...</p>
            </div>
          </body>
          </html>
        `);
      }
    } catch (error) {
      console.error('Google 回調錯誤:', error);
      const isLinkRequest = req.query.linkAccount === 'true';

      // 取得前端URL - 同樣的邏輯
      let clientUrl = process.env.CLIENT_URL;
      if (!clientUrl) {
        const protocol = req.protocol;
        const host = req.get('host');

        // 檢查是否為 ngrok 域名
        if (host.includes('ngrok-free.app') || host.includes('ngrok.io') || host.includes('ngrok.app')) {
          // 對於 Ngrok，假設前端也在相同域名
          clientUrl = `${protocol}://${host}`;
        } else if (host.includes('localhost')) {
          // 對於 localhost，將後端端口 5000 替換為前端端口 5173
          clientUrl = `${protocol}://${host.replace(':5000', ':5173')}`;
        } else {
          // 其他情況，使用當前 origin
          clientUrl = `${protocol}://${host}`;
        }
      }

      if (isLinkRequest) {
        res.send(`
          <html>
          <body>
            <script>
              window.opener.postMessage({
                type: 'google-oauth-error',
                error: 'Google 驗證失敗'
              }, '${clientUrl}');
              window.close();
            </script>
            <div style="text-align: center; font-family: sans-serif; padding: 20px;">
              <h3>Google 帳號驗證失敗</h3>
              <p>請關閉此視窗並重試</p>
            </div>
          </body>
          </html>
        `);
      } else {
        // 使用計算出的前端URL進行重定向
        res.send(`
          <html>
          <body>
            <script>
              window.location.href = '${clientUrl}/?login=error';
            </script>
            <div style="text-align: center; font-family: sans-serif; padding: 20px;">
              <h3>Google 登入失敗</h3>
              <p>正在重定向...</p>
            </div>
          </body>
          </html>
        `);
      }
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

  // Google 帳號連接 (已登入使用者綁定 Google 帳號)
  async linkGoogleAccount(req, res) {
    try {
      const userId = req.user.id;
      const { googleId } = req.body;

      // 檢查傳入參數是否有效
      if (!googleId) {
        return res.status(400).json({ message: '缺少必要的 Google ID 資訊' });
      }

      // 檢查使用者是否存在
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: '使用者不存在' });
      }

      // 檢查該 Google ID 是否已被其他帳號使用
      const existingGoogleUser = await User.findOne({
        where: {
          google_id: googleId,
          id: { [Op.ne]: userId } // 排除當前使用者
        }
      });

      if (existingGoogleUser) {
        return res.status(400).json({
          message: '此 Google 帳號已被其他使用者綁定'
        });
      }

      // 更新使用者的 Google ID
      await user.update({ google_id: googleId });

      // 重新載入使用者資料
      const updatedUser = await User.findByPk(userId, {
        include: [{
          model: Profile,
          as: 'profile'
        }]
      });

      res.json({
        message: 'Google 帳號連接成功',
        user: transformUser(updatedUser)
      });
    } catch (error) {
      console.error('Google 帳號連接錯誤:', error);
      res.status(500).json({ message: 'Google 帳號連接失敗' });
    }
  }

  // 取消 Google 帳號連接
  async unlinkGoogleAccount(req, res) {
    try {
      const userId = req.user.id;

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: '使用者不存在' });
      }

      // 檢查使用者是否有設定密碼
      if (!user.password) {
        return res.status(400).json({
          message: '請先設定密碼後再取消 Google 帳號連接'
        });
      }

      // 移除 Google ID
      await user.update({ google_id: null });

      // 重新載入使用者資料
      const updatedUser = await User.findByPk(userId, {
        include: [{
          model: Profile,
          as: 'profile'
        }]
      });

      res.json({
        message: 'Google 帳號連接已取消',
        user: transformUser(updatedUser)
      });
    } catch (error) {
      console.error('取消 Google 帳號連接錯誤:', error);
      res.status(500).json({ message: '取消 Google 帳號連接失敗' });
    }
  }

  // 獲取使用者公開個人頁面資訊
  async getUserProfile(req, res) {
    try {
      const userId = req.params.id;

      const user = await User.findByPk(userId, {
        attributes: { exclude: ['password', 'refresh_token', 'email'] }, // 排除敏感資訊
        include: [{
          model: Profile,
          as: 'profile'
        }]
      });

      if (!user || !user.is_active) {
        return res.status(404).json({ message: '使用者不存在或已停用' });
      }

      // 統計資料 (可選：使用者參與的活動、發布的內容等)
      // TODO: 可以加入使用者參與活動數量、發布內容數量等統計

      // 設置快取控制標頭，避免快取問題
      res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      });

      res.json({
        user: {
          id: user.id,
          name: user.name,
          role: user.role,
          avatarUrl: user.avatar_url,
          joinDate: user.created_at,
          lastActive: user.last_login,
          profile: user.profile ? {
            bio: user.profile.bio,
            location: user.profile.location,
            company: user.profile.company,
            website: user.profile.website,
            bannerUrl: user.profile.banner_url,
            linkedinUrl: user.profile.linkedin_url,
            githubUrl: user.profile.github_url,
            twitterUrl: user.profile.twitter_url,
            skills: user.profile.skills || [],
            interests: user.profile.interests || [],
            education: user.profile.education || [],
            experience: user.profile.experience || []
          } : null
        }
      });
    } catch (error) {
      console.error('獲取使用者個人頁面錯誤:', error);
      res.status(500).json({ message: '獲取使用者資料失敗' });
    }
  }
}

export default new UserController();
