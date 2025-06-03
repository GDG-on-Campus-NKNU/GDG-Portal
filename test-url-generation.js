console.log('🔍 Google OAuth 重定向測試');
console.log('========================');

// 模擬不同情況下的 URL 生成邏輯
function generateClientUrl(req, clientUrlEnv) {
  let clientUrl = clientUrlEnv;

  if (!clientUrl) {
    const protocol = req.protocol;
    const host = req.get('host');

    console.log(`原始 host: ${host}`);
    console.log(`原始 protocol: ${protocol}`);

    if (host.includes('ngrok') || host.includes('localhost')) {
      // 將後端端口 5000 替換為前端端口 5173
      clientUrl = `${protocol}://${host.replace(':5000', ':5173')}`;
    } else {
      clientUrl = `${protocol}://${host}`;
    }
  }

  console.log(`生成的 clientUrl: ${clientUrl}`);
  return clientUrl;
}

// 測試不同場景
console.log('\n📋 測試場景:');

// 場景 1: 本地開發
console.log('\n1. 本地開發:');
const localReq = {
  protocol: 'http',
  get: (header) => header === 'host' ? 'localhost:5000' : undefined
};
generateClientUrl(localReq, undefined);

// 場景 2: Ngrok
console.log('\n2. Ngrok:');
const ngrokReq = {
  protocol: 'https',
  get: (header) => header === 'host' ? 'abc123.ngrok.io' : undefined
};
generateClientUrl(ngrokReq, undefined);

// 場景 3: 有設定 CLIENT_URL
console.log('\n3. 設定 CLIENT_URL:');
const envReq = {
  protocol: 'https',
  get: (header) => header === 'host' ? 'abc123.ngrok.io' : undefined
};
generateClientUrl(envReq, 'http://localhost:5173');

console.log('\n⚠️  注意事項:');
console.log('- 當使用 Ngrok 時，host 通常不會包含端口號');
console.log('- Ngrok 預設會將所有流量轉發到 localhost:5000');
console.log('- 前端需要在不同的端口 (5173) 運行');
console.log('- 如果 Ngrok URL 沒有端口號，我們需要假設前端在相同域名的不同端口');

console.log('\n🔧 建議修復:');
console.log('對於 Ngrok，我們需要更聰明的邏輯:');
console.log('1. 檢查是否為 ngrok 域名');
console.log('2. 如果是，且沒有端口號，則前端可能在相同域名但不同路徑或子域名');
console.log('3. 或者需要手動設定 CLIENT_URL 為正確的前端 URL');
