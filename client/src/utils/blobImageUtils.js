/**
 * 圖片處理工具函數
 * 用於將圖片URL轉換為Blob對象或從Blob對象獲取URL
 */

/**
 * 將圖片URL轉換為Blob對象
 * @param {string} imageUrl - 圖片的URL，可以是相對路徑或絕對路徑
 * @returns {Promise<Blob>} 包含圖片內容的Blob對象
 */
export const urlToBlob = async (imageUrl) => {
  try {
    // 如果URL為空或不是字串，返回null
    if (!imageUrl || typeof imageUrl !== 'string') {
      return null;
    }

    // 如果已經是Data URL，則直接轉換為Blob
    if (imageUrl.startsWith('data:')) {
      const response = await fetch(imageUrl);
      return await response.blob();
    }

    // 如果是相對路徑，確保使用正確的基礎URL
    const fullUrl = imageUrl.startsWith('http') || imageUrl.startsWith('blob:') 
      ? imageUrl 
      : (imageUrl.startsWith('/') ? window.location.origin + imageUrl : window.location.origin + '/' + imageUrl);

    // 獲取圖片並轉換為Blob
    const response = await fetch(fullUrl);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return await response.blob();
  } catch (error) {
    console.error('轉換圖片URL為Blob失敗:', error);
    return null;
  }
};

/**
 * 從Blob對象獲取URL
 * @param {Blob} blob - 包含圖片內容的Blob對象
 * @returns {string|null} 圖片的Data URL或null（如果失敗）
 */
export const blobToUrl = (blob) => {
  if (!blob) return null;
  return URL.createObjectURL(blob);
};

/**
 * 懶加載圖片 - 只有當需要顯示時才加載圖片
 * @param {string} imageUrl - 圖片的URL
 * @returns {Promise<string>} 包含圖片的Data URL或原始URL
 */
export const lazyLoadImage = async (imageUrl) => {
  try {
    const blob = await urlToBlob(imageUrl);
    return blob ? blobToUrl(blob) : imageUrl;
  } catch (error) {
    console.error('懶加載圖片失敗:', error);
    return imageUrl;
  }
};

/**
 * 預加載多個圖片
 * @param {Array<string>} imageUrls - 要預加載的圖片URL數組
 * @returns {Promise<Array<{url: string, blob: Blob}>>} 包含原始URL和對應Blob的對象數組
 */
export const preloadImages = async (imageUrls) => {
  if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
    return [];
  }

  try {
    const results = await Promise.allSettled(
      imageUrls.map(url => urlToBlob(url).then(blob => ({ url, blob })))
    );

    return results
      .filter(result => result.status === 'fulfilled')
      .map(result => result.value)
      .filter(item => item.blob !== null);
  } catch (error) {
    console.error('預加載圖片失敗:', error);
    return [];
  }
};

/**
 * 釋放由blobToUrl創建的URL
 * @param {string} url - 由URL.createObjectURL創建的URL
 */
export const releaseUrl = (url) => {
  if (url && typeof url === 'string' && url.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
};

export default {
  urlToBlob,
  blobToUrl,
  lazyLoadImage,
  preloadImages,
  releaseUrl
};
