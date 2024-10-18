// src/App.tsx
import React, { useState, useEffect } from 'react';
import { WineList } from './components/WineList';
import { SearchBar } from './components/SearchBar';
import { SortingDropdown } from './components/SortingDropdown';
import { api, Wine, WineResponse } from './services/api';

const App: React.FC = () => {
  const [wines, setWines] = useState<Wine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('revenue');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchWines = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let response: WineResponse;
      if (searchQuery) {
        response = await api.searchWines(searchQuery, sortBy, page);
      } else {
        response = await api.getBestSellingWines(sortBy, page);
      }
      setWines(response.wines);
      setTotalCount(response.totalCount);
    } catch (err: unknown) {
      console.log('Failed to fetch wines. Please try again.')
      setError(err as string);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, sortBy, page]);

  useEffect(() => {
    fetchWines();
  }, [sortBy, searchQuery, page, fetchWines]);

  const handleSort = (newSortBy: string) => {
    setSortBy(newSortBy);
    setPage(1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Best Selling Wines</h1>
      <div className="mb-6 flex justify-between items-center">
        <SearchBar onSearch={handleSearch} />
        <SortingDropdown onSort={handleSort} currentSort={sortBy} />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <WineList wines={wines} totalCount={totalCount} page={page} onPageChange={handlePageChange} />
      )}
    </div>
  );
};

export default App;
