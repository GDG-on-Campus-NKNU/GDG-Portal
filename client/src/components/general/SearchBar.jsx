// client/src/components/SearchBar.jsx
import { useState } from 'react';

export default function SearchBar({ onSearch, placeholder = '搜尋...' }) {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(keyword.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2 mb-4">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        搜尋
      </button>
    </form>
  );
}
