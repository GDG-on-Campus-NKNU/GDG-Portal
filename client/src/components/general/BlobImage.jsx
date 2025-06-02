import { useState, useEffect } from 'react';

/**
 * 用於顯示 Blob 或 Base64 格式的圖片
 * @param {Object} props
 * @param {string|Blob} props.src - 圖片來源（Base64 字串或 Blob 物件）
 * @param {string} props.alt - 圖片替代文字
 * @param {string} props.fallbackSrc - 預設圖片 URL，當 src 載入失敗時顯示
 * @param {string} props.className - 自定義 CSS 類別
 * @param {Object} props.style - 自定義樣式物件
 * @returns {JSX.Element}
 */
export default function BlobImage({ 
  src, 
  alt, 
  fallbackSrc, 
  className = '', 
  style = {},
  ...props 
}) {
  const [imageSrc, setImageSrc] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    const processImageSource = async () => {
      try {
        if (!src) {
          if (isMounted) {
            setError(true);
            setImageSrc(fallbackSrc || '');
          }
          return;
        }
        
        // 如果是 Blob 物件
        if (src instanceof Blob) {
          const reader = new FileReader();
          reader.onload = () => {
            if (isMounted) {
              setImageSrc(reader.result);
              setError(false);
            }
          };
          reader.onerror = () => {
            if (isMounted) {
              setError(true);
              setImageSrc(fallbackSrc || '');
            }
          };
          reader.readAsDataURL(src);
        } 
        // 如果是 Base64 字串或 URL
        else if (typeof src === 'string') {
          if (isMounted) {
            setImageSrc(src);
            setError(false);
          }
        } 
        // 其他類型
        else {
          if (isMounted) {
            setError(true);
            setImageSrc(fallbackSrc || '');
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error('處理圖片錯誤:', err);
          setError(true);
          setImageSrc(fallbackSrc || '');
        }
      }
    };

    processImageSource();
    
    return () => {
      isMounted = false;
    };
  }, [src, fallbackSrc]);

  const handleError = () => {
    setError(true);
    if (fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
  };

  return (
    <img
      src={error ? fallbackSrc : imageSrc}
      alt={alt || 'Image'}
      className={className}
      style={style}
      onError={handleError}
      {...props}
    />
  );
}
