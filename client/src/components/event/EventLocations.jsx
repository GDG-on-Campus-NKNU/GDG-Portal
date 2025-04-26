import React from 'react';
import CampusMap from './CampusMap';

const EventLocations = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
        活動地點
      </h3>
      <div className="bg-gray-50 rounded-lg mb-2">
        <CampusMap />
      </div>
      <ul className="space-y-2 text-sm">
        <li className="flex items-start">
          <span className="text-blue-600 mr-2">•</span>
          <span><strong>LI104 教室:</strong> 圖書館一樓電腦教室</span>
        </li>
        <li className="flex items-start">
          <span className="text-blue-600 mr-2">•</span>
          <span><strong>LI106 教室:</strong> 圖書館一樓電腦教室</span>
        </li>
        <li className="flex items-start">
          <span className="text-blue-600 mr-2">•</span>
          <span><strong>LI102 演講廳:</strong> 圖書館一樓演講廳</span>
        </li>
      </ul>
    </div>
  );
};

export default EventLocations;
