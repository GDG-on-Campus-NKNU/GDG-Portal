import { useState, useEffect } from 'react';
import { urlToBlob, blobToUrl, releaseUrl } from '../../utils/blobImageUtils';

/**
 * 用於顯示 Blob、Base64 或 URL 格式的圖片
 * @param {Object} props
 * @param {string|Blob} props.src - 圖片來源（URL、Base64 字串或 Blob 物件）
 * @param {string} props.alt - 圖片替代文字
 * @param {string} props.fallbackSrc - 預設圖片 URL，當 src 載入失敗時顯示
 * @param {string} props.className - 自定義 CSS 類別
 * @param {Object} props.style - 自定義樣式物件
 * @param {boolean} props.convertToBlob - 是否將URL轉換為Blob (默認: false)
 * @returns {JSX.Element}
 */
export default function BlobImage({ 
  src, 
  alt, 
  fallbackSrc, 
  className = '', 
  style = {},
  convertToBlob = false,
  ...props 
}) {
  const [imageSrc, setImageSrc] = useState('');
  const [error, setError] = useState(false);
  const [blobUrl, setBlobUrl] = useState(null);

  useEffect(() => {
    let isMounted = true;
    
    // 釋放之前建立的 blob URL
    if (blobUrl) {
      releaseUrl(blobUrl);
      if (isMounted) {
        setBlobUrl(null);
      }
    }

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
          const url = blobToUrl(src);
          if (isMounted) {
            setBlobUrl(url);
            setImageSrc(url);
            setError(false);
          }
        } 
        // 如果是字符串（URL或Base64）並且需要轉換為Blob
        else if (typeof src === 'string' && convertToBlob) {
          // 如果已經是blob URL，則不需要轉換
          if (src.startsWith('blob:')) {
            if (isMounted) {
              setImageSrc(src);
              setError(false);
            }
          } 
          // 否則轉換為blob
          else {
            try {
              const blob = await urlToBlob(src);
              if (blob && isMounted) {
                const url = blobToUrl(blob);
                setBlobUrl(url);
                setImageSrc(url);
                setError(false);
              } else if (isMounted) {
                setImageSrc(src);
                setError(false);
              }
            } catch (err) {
              console.error('轉換圖片為Blob失敗:', err);
              if (isMounted) {
                setImageSrc(src);
                setError(false);
              }
            }
          }
        }
        // 如果是字符串但不需要轉換為Blob
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
            setImageSrc(fallbackSrc || null);
          }
        }
      } catch (err) {
        console.error('處理圖片錯誤:', err);
        if (isMounted) {
          setError(true);
          setImageSrc(fallbackSrc || null);
        }
      }
    };

    processImageSource();
    
    return () => {
      isMounted = false;
      if (blobUrl) {
        releaseUrl(blobUrl);
      }
    };
  }, [src, fallbackSrc, convertToBlob]);

  const handleError = () => {
    setError(true);
    if (fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
  };

  // 確保 src 不是空字串
  const finalSrc = error ? fallbackSrc : imageSrc;
  const shouldRender = finalSrc && finalSrc.trim() !== '';

  if (!shouldRender) {
    return null;
  }

  return (
    <img
      src={finalSrc}
      alt={alt || 'Image'}
      className={className}
      style={style}
      onError={handleError}
      {...props}
    />
  );
}
