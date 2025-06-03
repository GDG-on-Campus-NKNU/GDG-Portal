#!/usr/bin/env node

/**
 * 將 Google Forms 短網址轉換為嵌入格式
 */

const shortUrl = 'https://forms.gle/LygGnmgDWgiFjpQD7';
const formId = shortUrl.split('/').pop(); // 獲取最後的 ID

console.log('原始短網址:', shortUrl);
console.log('表單 ID:', formId);

// 構建嵌入格式的 URL
const embedUrl = `https://docs.google.com/forms/d/e/1FAIpQLSeL${formId}/viewform?embedded=true`;
console.log('嵌入 URL:', embedUrl);

// 注意：Google Forms 的短網址與實際的表單 ID 可能不同
// 最好的方式是從 Google Forms 的分享選項中獲取嵌入代碼
