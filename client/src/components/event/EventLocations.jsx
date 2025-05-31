import React from 'react';
import { motion } from 'framer-motion';
import CampusMap from './CampusMap';

const EventLocations = () => {
  const locations = [
    { name: 'LI104 教室', description: '圖書館一樓電腦教室', icon: '💻' },
    { name: 'LI106 教室', description: '圖書館一樓電腦教室', icon: '💻' },
    { name: 'LI102 演講廳', description: '圖書館一樓演講廳', icon: '🎤' }
  ];

  return (
    <motion.div 
      className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
        <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg mr-3 shadow-lg">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
        </div>
        <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent">
          活動地點
        </span>
      </h3>
      
      <div className="bg-gradient-to-br from-slate-50/80 to-blue-50/80 rounded-xl mb-4 p-3 border border-white/30 shadow-inner">
        <CampusMap />
      </div>
      
      <div className="space-y-3">
        {locations.map((location, index) => (
          <motion.div
            key={location.name}
            className="group flex items-start p-3 bg-gradient-to-r from-slate-50/60 to-emerald-50/60 rounded-xl hover:from-emerald-50/80 hover:to-teal-50/80 transition-all duration-300 border border-white/30 hover:border-emerald-200/50 shadow-lg hover:shadow-xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
            whileHover={{ x: 4 }}
          >
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg mr-3 shadow-lg text-sm">
              {location.icon}
            </div>
            <div>
              <h4 className="font-semibold text-sm text-slate-800 group-hover:text-emerald-600 transition-colors duration-300">
                {location.name}
              </h4>
              <p className="text-slate-600 text-xs mt-1">
                {location.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default EventLocations;
