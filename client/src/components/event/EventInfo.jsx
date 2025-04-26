export function EventTypeInfo() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        我們的活動足跡
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        GDG on Campus NKNU 自成立以來，已舉辦超過 50 場不同類型的技術活動，
        包括工作坊、講座、黑客松和社交聚會等。這些活動不僅傳播了 Google 技術知識，
        也培養了許多校園技術人才。
      </p>
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-sm mb-2">活動類型</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li className="flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            <span>技術工作坊 - 提供實作訓練</span>
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            <span>技術講座 - 邀請業界講師分享</span>
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
            <span>專案開發 - 團隊專案實作</span>
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
            <span>社交活動 - 技術社群交流</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export function EventGalleryPreview() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">活動成果展示</h3>
        <p className="text-sm text-gray-600 mb-4">
          查看我們過去活動的成果和參加者的反饋。從程式碼到社群建設，
          每一個活動都為校園技術生態帶來了積極的影響。
        </p>
      </div>
      <div className="grid grid-cols-2 gap-1">
        <img src="/assets/events/workshop1.jpg" alt="工作坊" className="w-full h-32 object-cover" />
        <img src="/assets/events/lecture1.jpg" alt="講座" className="w-full h-32 object-cover" />
        <img src="/assets/events/hackathon1.jpg" alt="黑客松" className="w-full h-32 object-cover" />
        <img src="/assets/events/social1.jpg" alt="社交活動" className="w-full h-32 object-cover" />
      </div>
      <div className="p-4">
        <a
          href="/events/gallery"
          className="text-blue-600 hover:text-blue-800 text-sm flex items-center justify-center"
        >
          查看更多活動照片
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export function EventResourceDownload() {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-md p-6 text-white">
      <h3 className="text-lg font-bold mb-4">活動資源下載</h3>
      <p className="text-gray-300 text-sm mb-4">
        獲取我們過去活動的投影片、程式碼範例和學習資源，繼續您的技術學習之旅。
      </p>
      <ul className="space-y-3">
        <li className="flex items-center p-3 bg-white/10 rounded-lg">
          <svg className="w-5 h-5 text-white mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
          </svg>
          <span className="text-sm flex-1">簡易視窗應用程式開發講義</span>
          <a href="resources/window_slides.pdf" download className="text-blue-300 hover:text-blue-200">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </li>
        <li className="flex items-center p-3 bg-white/10 rounded-lg">
          <svg className="w-5 h-5 text-white mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
          </svg>
          <span className="text-sm flex-1">Git 控管與工作流簡報</span>
          <a href="/resources/git_slides.pdf" download className="text-blue-300 hover:text-blue-200">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </li>
        <li className="flex items-center p-3 bg-white/10 rounded-lg">
          <svg className="w-5 h-5 text-white mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
          </svg>
          <span className="text-sm flex-1">伺服器與通訊原理講義</span>
          <a href="/resources/server_slides.pdf" download className="text-blue-300 hover:text-blue-200">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </li>
      </ul>
    </div>
  );
}
