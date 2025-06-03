import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar, BackgroundEffects } from '../components/general';

export default function AuthErrorPage() {
  const [searchParams] = useSearchParams();
  const [errorInfo, setErrorInfo] = useState({
    type: 'unknown',
    message: '登入過程中發生未知錯誤'
  });

  useEffect(() => {
    const type = searchParams.get('type') || 'unknown';
    const message = searchParams.get('message') || '登入過程中發生未知錯誤';

    setErrorInfo({
      type: decodeURIComponent(type),
      message: decodeURIComponent(message)
    });
  }, [searchParams]);

  const getErrorConfig = (type) => {
    switch (type) {
      case 'google-not-linked':
        return {
          icon: '🔗',
          title: 'Google 帳號未綁定',
          description: '此 Google 帳號尚未與本系統帳號綁定',
          actionText: '前往登入',
          actionLink: '/login',
          secondaryActionText: '了解如何綁定帳號',
          secondaryActionLink: '/help/google-linking'
        };
      case 'oauth-error':
        return {
          icon: '🔐',
          title: 'OAuth 驗證失敗',
          description: 'Google 登入驗證過程中發生錯誤',
          actionText: '重新嘗試登入',
          actionLink: '/login',
          secondaryActionText: '回到首頁',
          secondaryActionLink: '/'
        };
      default:
        return {
          icon: '⚠️',
          title: '登入失敗',
          description: '登入過程中發生未預期的錯誤',
          actionText: '返回登入頁',
          actionLink: '/login',
          secondaryActionText: '回到首頁',
          secondaryActionLink: '/'
        };
    }
  };

  const config = getErrorConfig(errorInfo.type);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50/30 to-slate-100/50 text-slate-800 relative overflow-hidden">
      <BackgroundEffects />
      <Navbar />

      <main className="flex items-center justify-center min-h-screen px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20 text-center"
        >
          {/* 錯誤圖標 */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-6xl mb-6"
          >
            {config.icon}
          </motion.div>

          {/* 錯誤標題 */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-slate-800 mb-4"
          >
            {config.title}
          </motion.h1>

          {/* 錯誤描述 */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-600 mb-2"
          >
            {config.description}
          </motion.p>

          {/* 詳細錯誤訊息 */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-slate-500 mb-8 bg-slate-50/50 rounded-lg p-3 border border-slate-200/50"
          >
            {errorInfo.message}
          </motion.p>

          {/* 操作按鈕 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-3"
          >
            {/* 主要操作 */}
            <Link
              to={config.actionLink}
              className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              {config.actionText}
            </Link>

            {/* 次要操作 */}
            <Link
              to={config.secondaryActionLink}
              className="block w-full text-slate-600 py-2 px-6 rounded-xl font-medium hover:text-slate-800 hover:bg-slate-100/50 transition-all duration-300"
            >
              {config.secondaryActionText}
            </Link>
          </motion.div>

          {/* 額外提示 */}
          {errorInfo.type === 'google-not-linked' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 p-4 bg-blue-50/50 rounded-xl border border-blue-200/50"
            >
              <h3 className="text-sm font-semibold text-blue-800 mb-2">
                如何綁定 Google 帳號？
              </h3>
              <ol className="text-xs text-blue-700 text-left space-y-1">
                <li>1. 使用電子郵件和密碼登入系統</li>
                <li>2. 進入個人設定頁面</li>
                <li>3. 在帳號連接區域點擊「綁定 Google 帳號」</li>
                <li>4. 完成 Google 授權後即可使用 Google 登入</li>
              </ol>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
