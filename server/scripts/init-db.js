import sequelize from '../config/database.js';
import '../model/userModel.js';

const initDatabase = async () => {
  try {
    // 測試連接
    await sequelize.authenticate();
    console.log('✅ 資料庫連接成功');
    
    // 同步模型（小心使用）
    await sequelize.sync({ alter: true });
    console.log('✅ 資料庫模型同步完成');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ 資料庫初始化失敗:', error);
    process.exit(1);
  }
};

initDatabase();
