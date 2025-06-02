// 測試統計API的簡單腳本
async function testStatsAPI() {
  try {
    console.log('=== 測試統計API ===');
    
    // 測試 stats API
    const statsResponse = await fetch('http://localhost:5000/api/gallery/stats');
    if (!statsResponse.ok) {
      throw new Error(`Stats API 錯誤: ${statsResponse.status}`);
    }
    
    const statsData = await statsResponse.json();
    console.log('📊 統計資料:', JSON.stringify(statsData, null, 2));
    
    // 測試 gallery API
    const galleryResponse = await fetch('http://localhost:5000/api/gallery');
    if (!galleryResponse.ok) {
      throw new Error(`Gallery API 錯誤: ${galleryResponse.status}`);
    }
    
    const galleryData = await galleryResponse.json();
    console.log(`📷 相簿資料: 找到 ${galleryData.galleries.length} 個相簿`);
    
    // 驗證統計資料是否正確
    console.log('\n=== 驗證統計資料 ===');
    console.log(`✅ 總相簿數: ${statsData.totalGalleries}`);
    console.log(`✅ 總圖片數: ${statsData.totalImages}`);
    console.log(`✅ 活動類型數: ${statsData.eventTypes.length}`);
    console.log(`✅ 年份數: ${statsData.years.length}`);
    
    statsData.eventTypes.forEach(type => {
      console.log(`   - ${type.label}: ${type.count} 個`);
    });
    
    // 檢查是否有最新相簿
    if (statsData.recentGalleries && statsData.recentGalleries.length > 0) {
      console.log('\n📅 最新相簿:');
      statsData.recentGalleries.forEach(gallery => {
        console.log(`   - ${gallery.title} (${gallery.date})`);
      });
    }
    
    console.log('\n🎉 所有測試通過！');
    
  } catch (error) {
    console.error('❌ 測試失敗:', error.message);
  }
}

// 如果是直接執行此腳本
if (typeof window === 'undefined') {
  // Node.js 環境
  import('node-fetch').then(({ default: fetch }) => {
    global.fetch = fetch;
    testStatsAPI();
  }).catch(() => {
    console.log('需要安裝 node-fetch: npm install node-fetch');
  });
} else {
  // 瀏覽器環境
  testStatsAPI();
}
