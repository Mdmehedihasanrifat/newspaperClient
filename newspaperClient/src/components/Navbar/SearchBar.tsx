/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: any[];
  setSearchResults: (results: any[]) => void;
}

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  searchResults,
  setSearchResults,
}: SearchBarProps) => {
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const performSearch = useCallback(async () => {
    if (searchQuery.trim() === "") {
      setSearchResults([]); // Clear results if the query is empty
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/news/news/search?query=${searchQuery}`
      );
      const data = await response.json();
      setSearchResults(data.news.slice(0,10) || []);
    } catch (error) {
      console.error("Error searching news:", error);
    }
  }, [searchQuery, setSearchResults]);


  useEffect(() => {
    if (searchQuery.length > 2) {
      // Perform search after user types at least 3 characters
      performSearch();
    } else {
      setSearchResults([]); // Clear results if search query is too short
    }
  }, [searchQuery, performSearch]);

  return (
    <div className="navbar bg-base-100 p-4 border-t border-gray-200">
      <div className="w-full flex flex-col items-center">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-full max-w-lg mb-4"
          autoFocus
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {/* Display search results */}
        {searchResults?.length > 0 && (
          <div className="w-full max-w-lg mt-4">
            <ul>
              {searchResults.map((result) => (
                <li key={result.id} className="mb-2">
                  <Link
                    to={`/news/${result.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {result.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {searchQuery?.length > 2 && searchResults.length === 0 && (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;

