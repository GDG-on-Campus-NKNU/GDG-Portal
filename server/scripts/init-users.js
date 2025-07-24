#!/usr/bin/env node
/**
 * 用戶資料初始化腳本
 * 建立測試用戶和顏榕嶙的管理員帳戶
 */

import { fileURLToPath } from 'url';
import path from 'path';
import bcrypt from 'bcryptjs';

// 設定執行環境
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 確保在正確的目錄執行
process.chdir(path.join(__dirname, '..'));

// 導入模型
const { User, Profile } = await import('../model/index.js');

/**
 * 測試用戶資料
 */
const mockUserData = [
  {
    // 主管理員 - 顏榕嶙
    user: {
      email: 'ptyc4076@gmail.com',
      password: 'Bernie123!',
      name: '顏榕嶙 (Bernie)',
      role: 'admin',
      is_active: true,
      email_verified: true,
      avatar_url: '/assets/members/yen_profile.png'
    },
    profile: {
      bio: 'Full Stack Lead & Creative Director - 跨域推動技術教育、敘事設計與創作應用，聚焦於AI、Web全端開發與創意整合。全端工程師、創作者。熱愛開發創新專案與跨領域合作，擅長用技術打造故事世界，並以敘事與音樂激發學習熱情。',
      location: '高雄市',
      company: 'GDSC NKNU',
      website: 'https://github.com/Unforgettableeternalproject',
      linkedin_url: 'https://www.linkedin.com/in/bernie-yen-8325122b4/',
      github_url: 'https://github.com/Unforgettableeternalproject',
      twitter_url: 'https://x.com/Lightingbird11',
      facebook_url: 'https://www.facebook.com/TheOverlordOfTheImagintion47/',
      skills: JSON.stringify([
        'Full Stack Development',
        'JavaScript',
        'TypeScript', 
        'Python',
        'React',
        'Node.js',
        'AI Integration',
        'Technical Writing',
        'Storytelling',
        'Music Composition'
      ]),
      interests: JSON.stringify([
        'Web Development',
        'AI & Machine Learning',
        'Creative Technology',
        'Music Production',
        'Storytelling',
        'Education'
      ])
    }
  },
  {
    // 開發測試管理員
    user: {
      email: 'admin@gdg.dev.tw',
      password: 'Admin123!',
      name: '管理員 Bernie',
      role: 'admin',
      is_active: true,
      email_verified: true,
      avatar_url: '/assets/members/member1.png'
    },
    profile: {
      bio: '負責 GDG Portal 系統管理與維護，確保平台穩定運行並提供技術支援。',
      location: '高雄市',
      company: 'GDSC NKNU',
      skills: JSON.stringify([
        'React',
        'Node.js',
        'MongoDB',
        'System Administration',
        'DevOps'
      ])
    }
  },
  {
    // 核心團隊成員
    user: {
      email: 'core@gdg.dev.tw',
      password: 'Core123!',
      name: '核心成員 Xavier',
      role: 'core',
      is_active: true,
      email_verified: true,
      avatar_url: '/assets/members/member2.png'
    },
    profile: {
      bio: '專注於前端開發與使用者體驗設計，致力於創造優秀的用戶介面。',
      location: '高雄市',
      company: 'GDSC NKNU',
      skills: JSON.stringify([
        'React',
        'Vue.js',
        'UI/UX Design',
        'TypeScript'
      ])
    }
  },
  {
    // 一般會員
    user: {
      email: 'member@gdg.dev.tw',
      password: 'Member123!',
      name: '會員 Diasiver',
      role: 'member',
      is_active: true,
      email_verified: true,
      avatar_url: null
    },
    profile: {
      bio: '熱愛學習新技術的大學生，對機器學習和 Web 開發充滿興趣。',
      location: '高雄市',
      company: '國立高雄師範大學',
      skills: JSON.stringify([
        'JavaScript',
        'Python',
        'Machine Learning'
      ])
    }
  }
];

/**
 * 建立用戶和個人檔案
 */
async function createUser(userData) {
  try {
    // 加密密碼
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(userData.user.password, saltRounds);
    
    // 建立用戶
    const user = await User.create({
      ...userData.user,
      password: hashedPassword
    });

    console.log(`✅ 建立用戶: ${user.name} (${user.email})`);

    // 建立個人檔案
    const profile = await Profile.create({
      ...userData.profile,
      user_id: user.id
    });

    console.log(`✅ 建立個人檔案: ${user.name}`);

    return { user, profile };
  } catch (error) {
    console.error(`❌ 建立用戶失敗 (${userData.user.email}):`, error.message);
    return null;
  }
}

/**
 * 主執行函數
 */
async function initializeUsers() {
  console.log('🚀 開始初始化用戶資料...\n');

  try {
    // 檢查資料庫連線
    const { sequelize } = await import('../model/index.js');
    await sequelize.authenticate();
    console.log('✅ 資料庫連線成功\n');

    // 建立所有測試用戶
    for (const userData of mockUserData) {
      const existingUser = await User.findOne({ 
        where: { email: userData.user.email } 
      });

      if (existingUser) {
        console.log(`⚠️ 用戶已存在: ${userData.user.email}`);
        continue;
      }

      await createUser(userData);
      console.log(''); // 空行分隔
    }

    console.log('🎉 用戶資料初始化完成！');
    console.log('\n📋 可用測試帳戶：');
    console.log('👑 主管理員: ptyc4076@gmail.com / Bernie123!');
    console.log('🔧 開發管理員: admin@gdg.dev.tw / Admin123!');
    console.log('⭐ 核心團隊: core@gdg.dev.tw / Core123!');
    console.log('👤 一般會員: member@gdg.dev.tw / Member123!');

  } catch (error) {
    console.error('❌ 初始化失敗:', error);
    process.exit(1);
  }
}

// 執行初始化
initializeUsers()
  .then(() => {
    console.log('\n✅ 腳本執行完成');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ 腳本執行失敗:', error);
    process.exit(1);
  });
