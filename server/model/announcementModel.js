class AnnouncementModel {
  constructor() {
    this.announcements = [
      {
        id: 1,
        title: 'Google I/O 2025 觀賞派對報名中!',
        date: '2025-05-01',
        excerpt: '一起來參加我們的 Google I/O 2025 觀賞派對，了解最新的 Google 技術發展與創新...',
        content: `<p>Google I/O 是 Google 一年一度的開發者盛會，今年我們將在校內舉辦實體觀賞派對，一起來看看 Google 的最新技術發展！</p>
        <p>本次活動將在 <strong>2025 年 5 月 25 日</strong> 舉行，活動內容包含：</p>
        <ul>
          <li>觀看 Google I/O 主題演講</li>
          <li>Google 開發者專家現場導讀與解說</li>
          <li>技術互動交流</li>
          <li>豐富的抽獎活動與 Google 周邊</li>
        </ul>
        <p>活動地點：學生活動中心 101 演講廳</p>
        <p>活動時間：2025/05/25 19:00-21:30</p>
        <p>報名至 5 月 20 日截止，名額有限，請盡早報名！</p>`,
        tags: ['event', 'tech'],
        isPinned: true,
        author: '活動組組長',
        coverImage: '/assets/announcements/io-viewing-party.jpg'
      },
      {
        id: 2,
        title: '2025 學期技術講座系列公布',
        date: '2025-04-20',
        excerpt: '本學期將舉辦 Android、Flutter、Firebase 與 AI 等多場技術講座，請密切關注報名時間...',
        content: `<p>2025 年新學期技術講座系列已規劃完成！我們精心設計了一系列技術主題，涵蓋多種當前熱門技術領域。</p>
        <h3>本學期技術講座系列一覽：</h3>
        <ol>
          <li><strong>Android 開發入門工作坊</strong> - 5月10日，實體講座，E101 教室</li>
          <li><strong>Flutter 跨平台分享會</strong> - 5月15日，線上 Zoom 講座</li>
          <li><strong>Firebase 後端實作課程</strong> - 5月20日，實體講座，E202 教室</li>
          <li><strong>全棧網頁應用實戰</strong> - 5月6日，實體講座，E202 教室</li>
        </ol>
        <p>每場講座都將提供實用的技術內容和實踐案例，由業界專業講者分享。所有講座對校內學生完全免費，但需要提前報名，名額有限！</p>`,
        tags: ['notice', 'course'],
        isPinned: true,
        author: '課程規劃小組',
        coverImage: '/assets/announcements/lecture-series.jpg'
      },
      {
        id: 3,
        title: '徵求技術分享講者',
        date: '2025-04-15',
        excerpt: '邀請有開發經驗的同學報名成為我們的技術講者，分享你的專案經驗與技術心得...',
        content: `<p>你有獨特的開發經驗想與同學分享嗎？你在某個技術領域有特殊專長嗎？我們邀請你來成為 GDG 的技術分享講者！</p>
        <p>成為講者的好處：</p>
        <ul>
          <li>豐富你的履歷與職場競爭力</li>
          <li>深化你對技術主題的理解</li>
          <li>獲得社群資源與人脈</li>
          <li>獲得Google官方講者證書</li>
        </ul>
        <p>我們歡迎各種技術主題的分享，包括但不限於：Web開發、行動應用開發、AI/ML、雲端技術、UX設計、資料科學等。</p>
        <p>如果你有興趣，請填寫<a href="#">講者申請表單</a>，我們將在收到申請後一週內回覆。</p>`,
        tags: ['notice'],
        isPinned: false,
        author: '技術委員會',
        coverImage: '/assets/announcements/speaker-recruitment.jpg'
      },
      {
        id: 4,
        title: 'GDG 技術挑戰賽 - 2025 APP 創新競賽開始報名',
        date: '2025-04-10',
        excerpt: '挑戰你的創意與技術能力！本年度 APP 創新競賽主題為「永續科技」，獎金高達 10 萬元，報名至 5 月 15 日止...',
        content: `<p>GDG 技術挑戰賽來囉！今年的主題是「永續科技」，我們尋找能運用技術解決環境、社會永續議題的創新應用。</p>
        <h3>比賽資訊：</h3>
        <ul>
          <li><strong>報名日期：</strong>即日起至 2025 年 5 月 15 日</li>
          <li><strong>初選繳交：</strong>2025 年 6 月 30 日前</li>
          <li><strong>決賽日期：</strong>2025 年 7 月 15 日</li>
          <li><strong>獎金：</strong>首獎 10 萬元、貳獎 5 萬元、參獎 3 萬元、佳作 1 萬元</li>
        </ul>
        <p>參賽者需提交一份應用程式原型和簡短說明文件，通過初選的隊伍將被邀請參加決賽現場簡報。</p>
        <p>我們歡迎各領域的同學組隊參加，無論你是否有程式設計經驗，只要你有好點子並願意學習，都可以找到適合你的角色！</p>`,
        tags: ['event', 'competition'],
        isPinned: true,
        author: '競賽委員會',
        coverImage: '/assets/announcements/app-challenge.jpg'
      },
      {
        id: 5,
        title: 'Google 暑期實習計劃申請資訊',
        date: '2025-03-31',
        excerpt: 'Google 2025 暑期實習計劃即將截止申請，我們將於 4/12 舉辦線上說明會，協助你準備申請材料與面試...',
        content: `<p>Google 2025 暑期實習計劃現已開放申請，截止日期為 2025 年 4 月 30 日。這是一個絕佳的機會加入 Google 團隊，獲得寶貴的實務經驗！</p>
        <h3>說明會資訊：</h3>
        <p><strong>時間：</strong>2025 年 4 月 12 日 晚上 7:00-9:00<br>
        <strong>地點：</strong>線上 Zoom 會議<br>
        <strong>主講：</strong>Google 台灣人力資源團隊 + 往屆實習生分享</p>
        <p>說明會內容：</p>
        <ul>
          <li>實習計劃介紹與申請流程</li>
          <li>履歷準備技巧</li>
          <li>面試準備與常見問題</li>
          <li>往屆實習生經驗分享</li>
          <li>Q&A 環節</li>
        </ul>
        <p>所有對 Google 實習有興趣的同學都歡迎參加！</p>`,
        tags: ['internship', 'notice'],
        isPinned: false,
        author: '職涯發展組',
        coverImage: '/assets/announcements/google-internship.jpg'
      },
      {
        id: 6,
        title: 'Flutter 3.0 新功能研討會',
        date: '2025-03-28',
        excerpt: 'Flutter 3.0 帶來了許多令人興奮的新功能，本次研討會將深入探討這些改進對開發流程的影響...',
        content: `<p>Flutter 最新版本推出了多項重要更新，包括性能提升、新增元件和更好的多平台支援。我們特別舉辦這場研討會，幫助你快速掌握這些新功能！</p>
        <h3>研討會重點：</h3>
        <ul>
          <li>Flutter 3.0 架構變更與效能優化</li>
          <li>Material You 設計系統整合</li>
          <li>跨平台功能強化，特別是 desktop 支援</li>
          <li>新增 Widget 與 API 介紹</li>
          <li>遷移策略與最佳實踐</li>
        </ul>
        <p><strong>時間：</strong>2025 年 4 月 8 日 下午 2:00-5:00<br>
        <strong>地點：</strong>E202 教室<br>
        <strong>講者：</strong>張小明 (Flutter 技術顧問)</p>
        <p>參加對象：具備基本 Flutter 開發經驗的開發者，或對 Flutter 有興趣的學生。</p>`,
        tags: ['tech', 'course'],
        isPinned: false,
        author: '技術組',
        coverImage: '/assets/announcements/flutter-seminar.jpg'
      },
      {
        id: 7,
        title: 'GDG 社群導師招募中',
        date: '2025-03-20',
        excerpt: '你有技術熱忱想分享給更多人嗎？我們正在招募 Android、Flutter、Web 開發領域的社群導師，加入我們的教學團隊...',
        content: `<p>我們正在尋找熱情的技術愛好者加入 GDG 社群導師團隊！作為導師，你將有機會指導和啟發對技術感興趣的同學，同時也能深化自己的技術理解。</p>
        <h3>我們正在尋找以下領域的導師：</h3>
        <ul>
          <li>Android 應用開發</li>
          <li>Flutter 跨平台開發</li>
          <li>Web 前端開發 (React/Vue/Angular)</li>
          <li>後端開發 (Node.js/Python/Java)</li>
          <li>雲端服務 (Google Cloud Platform)</li>
        </ul>
        <h3>導師職責：</h3>
        <ul>
          <li>每月帶領 1-2 次技術學習小組 (1.5-2 小時)</li>
          <li>回答社群成員的技術問題</li>
          <li>協助規劃和執行技術工作坊</li>
        </ul>
        <p>有興趣的同學請填寫<a href="#">導師申請表</a>，並附上簡短的自我介紹和技術經歷。</p>`,
        tags: ['community', 'notice'],
        isPinned: false,
        author: '社群發展組',
        coverImage: '/assets/announcements/mentor-recruitment.jpg'
      },
      {
        id: 8,
        title: '2025 程式設計工作坊系列活動',
        date: '2025-03-15',
        excerpt: '即日起至 6 月底，每週五晚間我們將舉辦不同主題的程式設計工作坊，涵蓋前後端、行動與雲端技術...',
        content: `<p>為了幫助更多同學掌握實用的程式設計技能，我們特別規劃了這個為期三個月的工作坊系列！</p>
        <h3>工作坊時間安排：</h3>
        <p>每週五晚間 18:30-21:00，地點：E101 教室</p>
        <h3>工作坊主題：</h3>
        <ol>
          <li><strong>3月22日：</strong>網頁基礎 - HTML5 & CSS3</li>
          <li><strong>3月29日：</strong>JavaScript 現代語法與應用</li>
          <li><strong>4月5日：</strong>React 入門與實作</li>
          <li><strong>4月12日：</strong>Node.js 後端開發基礎</li>
          <li><strong>4月19日：</strong>資料庫設計與 MongoDB</li>
          <li><strong>4月26日：</strong>RESTful API 設計與實作</li>
          <li><strong>5月3日：</strong>Android 基礎開發</li>
          <li><strong>5月10日：</strong>Flutter 跨平台開發</li>
          <li><strong>5月17日：</strong>Firebase 雲端服務整合</li>
          <li><strong>5月24日：</strong>Google Cloud 入門</li>
          <li><strong>5月31日：</strong>AI 與機器學習基礎</li>
          <li><strong>6月7日：</strong>TensorFlow.js 實作</li>
        </ol>
        <p>每場工作坊皆為獨立主題，可根據個人興趣選擇參加。活動免費，但需提前報名，名額每場限 30 人。</p>`,
        tags: ['event', 'course', 'tech'],
        isPinned: false,
        author: '教育訓練組',
        coverImage: '/assets/announcements/workshop-series.jpg'
      },
      {
        id: 9,
        title: '開源專案貢獻指南 - 新手如何參與開源社群',
        date: '2025-03-05',
        excerpt: '想參與開源專案但不知從何開始？本指南將帶你了解如何尋找適合的專案、提交你的首個 PR，以及與社群互動...',
        content: `<p>開源專案是提升程式設計能力和建立專業形象的絕佳途徑，但對於新手來說，加入開源社群可能有些困難。我們準備了這份詳細指南，幫助你開始你的開源之旅！</p>
        <h3>開源貢獻的好處：</h3>
        <ul>
          <li>提升程式設計與協作能力</li>
          <li>建立專業網絡和聲譽</li>
          <li>幫助解決實際問題</li>
          <li>增強個人履歷亮點</li>
        </ul>
        <h3>新手入門步驟：</h3>
        <ol>
          <li><strong>了解 Git 與 GitHub 基礎：</strong> 熟悉版本控制系統是參與開源的第一步</li>
          <li><strong>尋找適合的專案：</strong> 我們推薦從標有 "good first issue" 標籤的問題開始</li>
          <li><strong>遵循專案貢獻指南：</strong> 每個專案都有自己的規則和風格</li>
          <li><strong>從小處著手：</strong> 文檔改進、修復小錯誤都是很好的起點</li>
          <li><strong>提交你的第一個 Pull Request：</strong> 包含詳細說明和測試結果</li>
        </ol>
        <p>我們將在 3 月 20 日舉辦一場「開源貢獻工作坊」，帶你實際操作提交第一個 PR 的流程。</p>`,
        tags: ['tech', 'community'],
        isPinned: false,
        author: '開源推廣小組',
        coverImage: '/assets/announcements/open-source-guide.jpg'
      },
      {
        id: 10,
        title: '前端框架比較：React vs Vue vs Angular 2025 版',
        date: '2025-02-28',
        excerpt: '三大前端框架的最新比較，包含效能、生態系、學習曲線與企業採用情況，幫助你選擇最適合的技術棧...',
        content: `<p>前端領域的三大主流框架 React、Vue 和 Angular 各有特色，對於初學者來說選擇起來可能有些困難。我們整理了 2025 年最新的框架比較，幫助你做出明智的選擇。</p>
        <h3>框架比較維度：</h3>
        <ol>
          <li><strong>效能比較：</strong> 渲染速度、記憶體使用、打包大小等</li>
          <li><strong>學習曲線：</strong> 入門門檻、文檔完整性、社群支援</li>
          <li><strong>生態系統：</strong> 第三方庫、工具、擴展性</li>
          <li><strong>企業採用情況：</strong> 市場份額、就業機會、大型案例</li>
          <li><strong>未來發展趨勢：</strong> 近期更新、路線圖、社群活躍度</li>
        </ol>
        <h3>2025 年趨勢亮點：</h3>
        <ul>
          <li>React 的 Server Components 和 Suspense 功能已成熟</li>
          <li>Vue 3 的組合式 API 和 TypeScript 整合大幅提升</li>
          <li>Angular 已簡化配置流程，並優化了編譯速度</li>
        </ul>
        <p>無論你選擇哪個框架，理解核心概念和網頁開發基礎知識始終是最重要的。我們將在後續文章中深入探討每個框架的最佳實踐。</p>`,
        tags: ['tech', 'course'],
        isPinned: false,
        author: '前端研究小組',
        coverImage: '/assets/announcements/framework-comparison.jpg'
      }
    ];
  }

  // 獲取所有公告
  getAllAnnouncements(queryParams = {}) {
    const { page = 1, limit = 10, keyword = '', tags = [], isPinned } = queryParams;

    // 複製一份資料，避免修改原始資料
    let filteredAnnouncements = [...this.announcements];

    // 過濾置頂狀態
    if (isPinned === 'true') {
      filteredAnnouncements = filteredAnnouncements.filter(item => item.isPinned === true);
    } else if (isPinned === 'false') {
      filteredAnnouncements = filteredAnnouncements.filter(item => item.isPinned === false);
    }

    // 關鍵字搜尋
    if (keyword) {
      const lowerKeyword = keyword.toLowerCase();
      filteredAnnouncements = filteredAnnouncements.filter(announcement =>
        announcement.title.toLowerCase().includes(lowerKeyword) ||
        announcement.excerpt.toLowerCase().includes(lowerKeyword) ||
        announcement.content.toLowerCase().includes(lowerKeyword)
      );
    }

    // 標籤篩選
    if (tags && tags.length > 0) {
      const tagArray = typeof tags === 'string' ? tags.split(',') : tags;
      if (tagArray.length > 0) {
        filteredAnnouncements = filteredAnnouncements.filter(announcement =>
          tagArray.some(tag => announcement.tags.includes(tag))
        );
      }
    }

    // 排序邏輯：置頂優先，再按日期排序
    filteredAnnouncements.sort((a, b) => {
      // 首先比較置頂狀態
      if (a.isPinned !== b.isPinned) {
        return b.isPinned ? 1 : -1;
      }

      // 置頂狀態相同時，再按日期排序（新的在前）
      return new Date(b.date) - new Date(a.date);
    });

    // 計算總頁數
    const totalAnnouncements = filteredAnnouncements.length;
    const totalPages = Math.ceil(totalAnnouncements / limit) || 1;

    // 分頁
    const startIndex = (page - 1) * limit;
    const paginatedAnnouncements = filteredAnnouncements.slice(startIndex, startIndex + limit);

    return {
      announcements: paginatedAnnouncements,
      totalPages,
      currentPage: parseInt(page),
      totalAnnouncements
    };
  }

  // 根據 ID 獲取單個公告
  getAnnouncementById(id) {
    const announcement = this.announcements.find(item => item.id === parseInt(id));

    if (!announcement) {
      return null;
    }

    // 獲取前一個和後一個公告的 ID 用於導航
    const currentIndex = this.announcements.findIndex(item => item.id === parseInt(id));
    const prevAnnouncement = currentIndex > 0 ? this.announcements[currentIndex - 1] : null;
    const nextAnnouncement = currentIndex < this.announcements.length - 1 ? this.announcements[currentIndex + 1] : null;

    return {
      ...announcement,
      prev: prevAnnouncement ? { id: prevAnnouncement.id, title: prevAnnouncement.title } : null,
      next: nextAnnouncement ? { id: nextAnnouncement.id, title: nextAnnouncement.title } : null
    };
  }
}

// 匯出單例
export default new AnnouncementModel();
