import { createContext, useContext, useState, useCallback } from "react";

const SearchContext = createContext();

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within SearchProvider");
  }
  return context;
}

export function SearchProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const updateSearchQuery = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const updateSearchResults = useCallback((results) => {
    setSearchResults(results);
  }, []);

  const setSearchingStatus = useCallback((status) => {
    setIsSearching(status);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setSearchResults([]);
    setIsSearching(false);
  }, []);

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        searchResults,
        isSearching,
        updateSearchQuery,
        updateSearchResults,
        setSearchingStatus,
        clearSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
