import { useState, useEffect } from 'react';

export default function MainBanner() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormClosing, setIsFormClosing] = useState(false);
  const [isFormAnimating, setIsFormAnimating] = useState(false);
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  const openForm = () => {
    setIsFormOpen(true);
    setIsFormClosing(false);
    setIsFormAnimating(true);
    setIsIframeLoading(true); // 重置載入狀態
    // 防止頁面滾動
    document.body.style.overflow = 'hidden';

    // 短暫延遲後開始進入動畫
    setTimeout(() => {
      setIsFormAnimating(false);
    }, 50);
  };

  const closeForm = () => {
    setIsFormClosing(true);
    // 延遲關閉，讓動畫完成
    setTimeout(() => {
      setIsFormOpen(false);
      setIsFormClosing(false);
      setIsFormAnimating(false);
      // 恢復頁面滾動
      document.body.style.overflow = 'unset';
    }, 300); // 300ms 動畫時間
  };

  const openFormInNewTab = () => {
    window.open('https://forms.gle/LygGnmgDWgiFjpQD7', '_blank', 'noopener,noreferrer');
  };

  // 處理 ESC 鍵關閉模態窗口
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isFormOpen) {
        closeForm();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isFormOpen]);

  // 清理滾動鎖定
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <>
      <section className="relative h-[450px] mb-8 rounded-3xl overflow-hidden">
        {/* 主漸層背景 */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-green-500" />

        {/* 動態光暈效果 */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />

        {/* 玻璃效果疊層 */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

        {/* 裝飾性幾何元素 */}
        <div className="absolute top-10 right-10 w-20 h-20 border-2 border-white/20 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute bottom-10 left-10 w-16 h-16 border-2 border-white/20 rotate-45 animate-bounce"></div>
        <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-white/10 rounded-full animate-pulse"></div>

        {/* 主要內容 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 z-10">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-500">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white via-blue-100 to-green-100 bg-clip-text text-transparent">
              GDG on Campus NKNU
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">Google Developer Group 高師大分部</p>
            <button
              onClick={openForm}
              className="px-10 py-4 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white rounded-2xl font-medium shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ring-2 ring-white/20 backdrop-blur-sm"
            >
              加入我們的行列
            </button>
          </div>
        </div>
      </section>

      {/* 社員招募表單模態窗口 */}
      {isFormOpen && (
        <div
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto transition-all duration-300 ease-out ${
            isFormClosing || isFormAnimating ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ zIndex: 99999 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeForm();
            }
          }}
        >
          <div
            className={`bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative my-8 transition-all duration-300 ease-out transform ${
              isFormClosing
                ? 'opacity-0 scale-95 translate-y-4'
                : isFormAnimating
                ? 'opacity-0 scale-95 -translate-y-4'
                : 'opacity-100 scale-100 translate-y-0'
            }`}
            style={{ zIndex: 100000 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 模態窗口頭部 */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-green-500">
              <h2 className="text-2xl font-bold text-white">加入 GDG on Campus NKNU</h2>
              <button
                onClick={closeForm}
                className="text-white hover:text-gray-200 transition-all duration-200 p-2 hover:bg-white/10 rounded-full hover:scale-110 active:scale-95"
              >
                <svg className="w-6 h-6 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Google 表單嵌入區域 */}
            <div className="relative h-[600px] bg-white">
              {/* 載入動畫 */}
              {isIframeLoading && (
                <div className="absolute inset-0 bg-gray-50 flex items-center justify-center z-10">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                    <p className="text-gray-600 text-lg">載入表單中...</p>
                    <p className="text-gray-400 text-sm mt-2">請稍候片刻</p>
                  </div>
                </div>
              )}

              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSe58yL-rMyaMqcttFvVcAw_jlHXGicri0DIDU8iNznoVbcE4A/viewform?embedded=true"
                className={`w-full h-full border-0 rounded-b-2xl transition-opacity duration-500 ${
                  isIframeLoading ? 'opacity-0' : 'opacity-100'
                }`}
                frameBorder="0"
                marginHeight="0"
                marginWidth="0"
                title="GDG on Campus NKNU 社員招募表單"
                loading="lazy"
                onLoad={() => {
                  // 延遲隱藏載入動畫，讓使用者看到載入完成的過程
                  setTimeout(() => {
                    setIsIframeLoading(false);
                  }, 500);
                }}
              >
                正在載入表單...
              </iframe>
            </div>

            {/* 備選連結 */}
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-center gap-4">
                <p className="text-sm text-gray-600">
                  如果表單無法正常顯示，請
                </p>
                <button
                  onClick={openFormInNewTab}
                  className="text-sm text-blue-600 hover:text-blue-800 underline font-medium transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  在新分頁開啟表單
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
