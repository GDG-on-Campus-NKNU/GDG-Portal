import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * 圖片上傳組件
 * @param {Object} props
 * @param {string} props.label - 輸入欄位標籤
 * @param {string} props.initialImage - 初始圖片URL
 * @param {function} props.onImageChange - 圖片變更時的回調函數
 * @param {string} props.aspectRatio - 預覽顯示的寬高比，例如 "1:1"、"16:9"
 * @param {boolean} props.circle - 是否顯示為圓形預覽
 * @param {string} props.placeholder - 提示文字
 * @param {string} props.defaultImage - 預設圖片
 * @returns {JSX.Element}
 */
export default function ImageUploader({
  label,
  initialImage,
  onImageChange,
  aspectRatio = "1:1",
  circle = false,
  placeholder = "點擊或拖曳圖片至此處...",
  defaultImage = null
}) {
  const [preview, setPreview] = useState(initialImage || defaultImage);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const fileInputRef = useRef(null);

  // 計算預覽區域的比例樣式
  const getAspectRatioStyle = () => {
    if (!aspectRatio || aspectRatio === '1:1') {
      return { paddingTop: '100%' }; // 1:1 的正方形
    }
    
    const [width, height] = aspectRatio.split(':').map(Number);
    const percentage = (height / width) * 100;
    return { paddingTop: `${percentage}%` };
  };

  useEffect(() => {
    setPreview(initialImage || defaultImage);
    setLoadError(false);
  }, [initialImage, defaultImage]);

  // 處理圖片選擇變更
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // 檢查檔案類型
    if (!file.type.match('image/*')) {
      setLoadError(true);
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target.result);
      setLoadError(false);
      onImageChange && onImageChange(file);
    };
    reader.readAsDataURL(file);
  };

  // 處理按鈕點擊事件
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // 拖放相關事件處理
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (!file.type.match('image/*')) {
        setLoadError(true);
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target.result);
        setLoadError(false);
        onImageChange && onImageChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  // 處理圖片載入錯誤
  const handleImageError = () => {
    setLoadError(true);
  };

  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      
      <div
        className={`relative border-2 rounded-lg overflow-hidden ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : isHovering
              ? 'border-gray-400 bg-gray-50'
              : 'border-gray-300 bg-gray-50'
        } transition-colors`}
        style={getAspectRatioStyle()}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        {/* 隱藏的檔案輸入 */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
          aria-label={`上傳${label || '圖片'}`}
        />
        
        {/* 預覽區域 */}
        <div className="absolute inset-0 flex items-center justify-center">
          {loadError ? (
            <div className="text-center px-4">
              <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="mt-1 text-sm text-red-600">圖片載入失敗</p>
            </div>
          ) : preview ? (
            <img
              src={preview}
              alt={label || "上傳圖片"}
              className={`w-full h-full object-cover ${circle ? 'rounded-full' : ''}`}
              onError={handleImageError}
            />
          ) : (
            <div className="text-center px-4">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="mt-1 text-sm text-gray-500">{placeholder}</p>
            </div>
          )}
        </div>
        
        {/* 上傳懸停覆蓋層 */}
        <motion.div
          className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity ${
            (isHovering || isDragging) && preview ? 'opacity-100' : 'opacity-0'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: (isHovering || isDragging) && preview ? 0.7 : 0 }}
        >
          <div className="text-center text-white">
            <svg className="mx-auto h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <p className="mt-1 text-sm">點擊更換圖片</p>
          </div>
        </motion.div>
      </div>
      
      {/* 刪除按鈕 */}
      {preview && preview !== defaultImage && (
        <button
          type="button"
          className="mt-2 text-sm text-red-600 hover:text-red-800 flex items-center"
          onClick={(e) => {
            e.stopPropagation();
            setPreview(defaultImage);
            setLoadError(false);
            onImageChange && onImageChange(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
          }}
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          移除圖片
        </button>
      )}
    </div>
  );
}
