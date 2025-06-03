import React from 'react';
import { motion } from 'framer-motion';
import LoadingSpinner from '../general/LoadingSpinner';

const UpcomingEvents = ({ events, loading, formatEventTimeRange, getTagLabel }) => {
  return (
    <motion.div 
      className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
        <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mr-3 shadow-lg">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" />
          </svg>
        </div>
        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
          即將到來的活動
        </span>
      </h3>

      {loading ? (
        <div className="flex justify-center p-8">
          <LoadingSpinner size={8} />
        </div>
      ) : (
        <div className="space-y-3">
          {events && events.length > 0 ? (
            events.map((ev, index) => (
              <motion.a
                key={ev.id}
                href={`/events/${ev.id}`}
                className="group block p-4 bg-gradient-to-r from-slate-50/80 to-blue-50/80 backdrop-blur-sm rounded-xl hover:from-blue-50/90 hover:to-purple-50/90 transition-all duration-300 border border-white/30 hover:border-blue-200/50 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -2 }}
              >
                <h4 className="font-semibold text-base text-slate-800 group-hover:text-blue-600 transition-colors duration-300 mb-2">
                  {ev.title}
                </h4>
                <p className="text-sm text-slate-600 mb-2 flex items-center">
                  <svg className="w-3 h-3 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {ev.endDate ? formatEventTimeRange(ev.date, ev.endDate) : new Date(ev.date).toLocaleDateString()}
                </p>
                <div className="flex flex-wrap gap-1">
                  {ev.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="text-xs px-2 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-700 font-medium rounded-full border border-blue-200/50 backdrop-blur-sm"
                    >
                      {getTagLabel(tag)}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))
          ) : (
            <motion.div 
              className="text-center py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-4xl mb-3">📅</div>
              <p className="text-base text-slate-600 font-medium mb-2">
                近兩週內沒有活動
              </p>
              <p className="text-sm text-slate-500">
                請稍後再回來查看
              </p>
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default UpcomingEvents;
