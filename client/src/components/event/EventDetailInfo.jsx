import { motion } from 'framer-motion';

// 活動時間信息區塊
export function EventTimeInfo({ event, formatDateTimeRange, formatDateTime }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 
                      rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">活動時間</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 開始時間 */}
        <div className="p-4 bg-white/20 rounded-2xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">開始時間</h3>
          </div>
          <div className="text-gray-700">
            <div className="font-medium text-lg">
              {new Date(event.date).toLocaleDateString('zh-TW', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long'
              })}
            </div>
            <div className="text-gray-600 mt-1">
              {new Date(event.date).toLocaleTimeString('zh-TW', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        </div>

        {/* 結束時間 (如果有) */}
        {event.endDate && (
          <div className="p-4 bg-white/20 rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">結束時間</h3>
            </div>
            <div className="text-gray-700">
              <div className="font-medium text-lg">
                {new Date(event.endDate).toLocaleDateString('zh-TW', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long'
                })}
              </div>
              <div className="text-gray-600 mt-1">
                {new Date(event.endDate).toLocaleTimeString('zh-TW', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          </div>
        )}

        {/* 活動時長 */}
        <div className="p-4 bg-white/20 rounded-2xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">活動時長</h3>
          </div>
          <div className="text-gray-700">
            <div className="font-medium text-lg">
              {event.endDate 
                ? `${Math.ceil((new Date(event.endDate) - new Date(event.date)) / (1000 * 60 * 60))} 小時`
                : '未指定'
              }
            </div>
            <div className="text-gray-600 mt-1">預估時間</div>
          </div>
        </div>

        {/* 活動狀態 */}
        <div className="p-4 bg-white/20 rounded-2xl">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              new Date(event.endDate || event.date) < new Date() 
                ? 'bg-gray-500' 
                : 'bg-green-500'
            }`}>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">活動狀態</h3>
          </div>
          <div className="text-gray-700">
            <div className="font-medium text-lg">
              {new Date(event.endDate || event.date) < new Date() ? '已結束' : '即將舉行'}
            </div>
            <div className="text-gray-600 mt-1">
              {new Date(event.endDate || event.date) < new Date() 
                ? '感謝您的參與' 
                : '敬請期待'
              }
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// 活動地點信息區塊
export function EventLocationInfo({ event }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 
                      rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">活動地點</h2>
      </div>
      
      <div className="space-y-6">
        {/* 主要地點資訊 */}
        <div className="p-4 bg-white/20 rounded-2xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.location}</h3>
              <p className="text-gray-600 leading-relaxed">
                {event.location.includes('線上') 
                  ? '此活動將透過線上平台進行，報名後您將收到詳細的連線資訊。'
                  : '請準時到達指定地點，建議提前 10-15 分鐘抵達以便完成報到手續。'
                }
              </p>
            </div>
          </div>
        </div>

        {/* 交通資訊 */}
        {!event.location.includes('線上') && (
          <div className="p-4 bg-white/20 rounded-2xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2v0a2 2 0 01-2-2v-5H8z" />
              </svg>
              交通資訊
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h3a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1h3z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-gray-800">大眾運輸</div>
                  <div className="text-sm text-gray-600">高雄捷運轉公車</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-gray-800">停車資訊</div>
                  <div className="text-sm text-gray-600">校內停車場</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 聯絡資訊 */}
        <div className="p-4 bg-white/20 rounded-2xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            聯絡資訊
          </h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-gray-700">gdscnknu@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              <span className="text-gray-700">高雄市燕巢區深中路62號</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// 活動詳情區塊
export function EventDescriptionInfo({ event }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      id="event-details"
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 
                      rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">活動詳情</h2>
      </div>
      <div className="prose prose-lg max-w-none text-gray-700">
        <p className="whitespace-pre-line leading-relaxed text-lg">{event.description}</p>
      </div>
    </motion.div>
  );
}
