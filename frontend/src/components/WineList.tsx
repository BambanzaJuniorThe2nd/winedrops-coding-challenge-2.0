import React from 'react';
import { Wine } from '../services/api';

interface WineListProps {
  wines: Wine[];
  totalCount: number;
  page: number;
  onPageChange: (page: number) => void;
}

export const WineList: React.FC<WineListProps> = ({ wines, totalCount, page, onPageChange }) => {
  const getRowClassName = (wine: Wine) => {
    if (wine.isTopTen) return 'bg-green-100';
    if (wine.isBottomTen) return 'bg-red-100';
    return '';
  };

  return (
    <div>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Rank
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Vintage
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Revenue
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Bottles Sold
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Orders
            </th>
          </tr>
        </thead>
        <tbody>
          {wines.map((wine) => (
            <tr key={wine.id} className={getRowClassName(wine)}>
              <td className="px-6 py-4 whitespace-nowrap">{wine.ranking}</td>
              <td className="px-6 py-4 whitespace-nowrap">{wine.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{wine.vintage}</td>
              <td className="px-6 py-4 whitespace-nowrap">${wine.total_revenue.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap">{wine.total_bottles}</td>
              <td className="px-6 py-4 whitespace-nowrap">{wine.total_orders}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {page} of {Math.ceil(totalCount / 20)}</span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= Math.ceil(totalCount / 20)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};