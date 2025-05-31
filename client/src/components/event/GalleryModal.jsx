import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function GalleryModal({ image, gallery, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // 找到當前圖片在相簿中的索引
  useEffect(() => {
    if (image && gallery && gallery.images) {
      const index = gallery.images.findIndex(img => img.id === image.id);
      setCurrentImageIndex(index !== -1 ? index : 0);
    }
  }, [image, gallery]);

  // 鍵盤事件處理
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentImageIndex, gallery]);

  // 阻止背景滾動
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const goToPrevious = () => {
    if (gallery && gallery.images && gallery.images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? gallery.images.length - 1 : prev - 1
      );
      setIsLoading(true);
    }
  };

  const goToNext = () => {
    if (gallery && gallery.images && gallery.images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === gallery.images.length - 1 ? 0 : prev + 1
      );
      setIsLoading(true);
    }
  };

  const currentImage = gallery?.images?.[currentImageIndex];

  if (!currentImage || !gallery) return null;

  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: { 
      opacity: 0, 
      x: -100,
      transition: { duration: 0.2 }
    }
  };

  const NavButton = ({ direction, onClick, disabled }) => (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        absolute top-1/2 transform -translate-y-1/2 z-20
        w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm
        flex items-center justify-center text-white text-xl
        hover:bg-black/70 transition-all duration-300
        disabled:opacity-30 disabled:cursor-not-allowed
        ${direction === 'left' ? 'left-4' : 'right-4'}
      `}
    >
      {direction === 'left' ? '‹' : '›'}
    </motion.button>
  );

  const ThumbnailStrip = () => {
    if (!gallery.images || gallery.images.length <= 1) return null;

    return (
      <div className="flex justify-center mt-4 px-4">
        <div className="flex space-x-2 max-w-full overflow-x-auto pb-2">
          {gallery.images.map((img, index) => (
            <motion.button
              key={img.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentImageIndex(index);
                setIsLoading(true);
              }}
              className={`
                flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden
                border-2 transition-all duration-300
                ${index === currentImageIndex 
                  ? 'border-white shadow-lg' 
                  : 'border-transparent opacity-70 hover:opacity-100'
                }
              `}
            >
              <img 
                src={img.url} 
                alt={img.caption || `圖片 ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalVariants}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        {/* 頂部工具列 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/70 to-transparent p-4"
        >
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-bold">{gallery.title}</h3>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                {currentImageIndex + 1} / {gallery.images.length}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* 下載按鈕 */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = currentImage.url;
                  link.download = `${gallery.title}-${currentImageIndex + 1}.jpg`;
                  link.click();
                }}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                title="下載圖片"
              >
                📥
              </motion.button>
              
              {/* 關閉按鈕 */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                title="關閉 (ESC)"
              >
                ✕
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* 主要圖片區域 */}
        <div className="flex-1 flex items-center justify-center p-4 pt-20 pb-32 relative">
          {/* 載入指示器 */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}

          {/* 導航按鈕 */}
          {gallery.images && gallery.images.length > 1 && (
            <>
              <NavButton 
                direction="left" 
                onClick={goToPrevious}
                disabled={gallery.images.length <= 1}
              />
              <NavButton 
                direction="right" 
                onClick={goToNext}
                disabled={gallery.images.length <= 1}
              />
            </>
          )}

          {/* 圖片 */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage.id}
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="max-w-full max-h-full flex items-center justify-center"
            >
              <img
                src={currentImage.url}
                alt={currentImage.caption || `圖片 ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                onLoad={() => setIsLoading(false)}
                onError={() => setIsLoading(false)}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 底部資訊列 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/70 to-transparent p-4"
        >
          {/* 圖片資訊 */}
          {currentImage.caption && (
            <div className="text-center mb-4">
              <p className="text-white text-lg font-medium">{currentImage.caption}</p>
              {currentImage.tags && currentImage.tags.length > 0 && (
                <div className="flex justify-center space-x-2 mt-2">
                  {currentImage.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 縮圖條 */}
          <ThumbnailStrip />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
