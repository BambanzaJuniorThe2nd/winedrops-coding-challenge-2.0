// src/components/SortingDropdown.tsx

import React from 'react';

interface SortingDropdownProps {
  onSort: (sortBy: string) => void;
  currentSort: string;
}

export const SortingDropdown: React.FC<SortingDropdownProps> = ({ onSort, currentSort }) => {
  return (
    <div>
      <label htmlFor="sort-by" className="mr-2">Sort by:</label>
      <select
        id="sort-by"
        value={currentSort}
        onChange={(e) => onSort(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="revenue">Revenue</option>
        <option value="bottles">Bottles Sold</option>
        <option value="orders">Number of Orders</option>
      </select>
    </div>
  );
};