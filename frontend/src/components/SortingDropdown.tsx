// src/components/SortingDropdown.tsx
import React from 'react';
import { useWineContext } from '../context/WineContext';

export const SortingDropdown: React.FC = () => {
  const { state, dispatch } = useWineContext();

  return (
    <div>
      <label htmlFor="sort-by" className="mr-2">Sort by:</label>
      <select
        id="sort-by"
        value={state.sortBy}
        onChange={(e) => dispatch({ type: 'SET_SORT_BY', payload: e.target.value })}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="revenue">Revenue</option>
        <option value="bottles">Bottles Sold</option>
        <option value="orders">Number of Orders</option>
      </select>
    </div>
  );
};