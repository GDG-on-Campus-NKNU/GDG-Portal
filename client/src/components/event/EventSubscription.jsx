import React from 'react';

const EventSubscription = () => {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
      <h3 className="text-lg font-bold mb-4">訂閱活動通知</h3>
      <p className="text-blue-100 text-sm mb-4">第一時間收到最新活動資訊，不錯過任何一場精彩活動！</p>
      <div className="flex">
        <input
          type="email"
          placeholder="你的電子信箱"
          className="flex-1 rounded-l-lg px-4 py-2 text-gray-800 text-sm focus:outline-none"
        />
        <button className="bg-white text-blue-600 rounded-r-lg px-4 py-2 text-sm font-medium hover:bg-gray-100 transition">
          訂閱
        </button>
      </div>
    </div>
  );
};

export default EventSubscription;
