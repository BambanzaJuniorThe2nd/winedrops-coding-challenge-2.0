import React from 'react';
import { WineList } from './components/WineList';
import { SearchBar } from './components/SearchBar';
import { SortingDropdown } from './components/SortingDropdown';
import { WineProvider } from './context/WineContext';
import { useWineContext } from './context/WineContext';
import { useWineFetch } from './hooks/useWineFetch';

const WineApp: React.FC = () => {
  const { state } = useWineContext();
  useWineFetch();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Best Selling Wines</h1>
      <div className="mb-6 flex justify-between items-center">
        <SearchBar />
        <SortingDropdown />
      </div>
      {state.loading ? (
        <p>Loading...</p>
      ) : state.error ? (
        <p className="text-red-500">{state.error}</p>
      ) : (
        <WineList />
      )}
    </div>
  );
};

const App: React.FC = () => (
  <WineProvider>
    <WineApp />
  </WineProvider>
);

export default App;
