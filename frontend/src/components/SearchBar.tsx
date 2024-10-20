import React, { useState } from 'react';
import { useWineContext } from '../context/WineContext';

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const { dispatch } = useWineContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search wines..."
        className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>
    </form>
  );
};