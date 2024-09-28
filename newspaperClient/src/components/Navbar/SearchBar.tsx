import { ChangeEvent, useEffect, useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import userContext from "../../context/UserContext";
import { getImageUrl } from "../../utils/helper";

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

  const {Query,setQuery}=useContext(userContext)
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setQuery(event.target.value)
  };

  const performSearch = useCallback(async () => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/news?search=${searchQuery}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }

      const data = await response.json();
      console.log("Response data:", data);

      setSearchResults(Array.isArray(data.news) ? data.news : []);
    } catch (error) {
      console.error("Error searching news:", error);
      setSearchResults([]);
    }
  }, [searchQuery, setSearchResults]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      performSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, performSearch]);

  // Determine if results should be displayed
  const showResults = searchResults.length > 0;



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
        {/* Display search results only if there are results */}
        {searchQuery.length > 0 && showResults && (
          <div className="w-full max-w-lg mt-4 relative">
            <ul className="absolute z-10 w-full bg-white shadow-lg rounded-md p-2 max-h-48 overflow-y-auto">
          {/* Display only the first 6 results */}
          {searchResults.slice(0, 6).map((result) => (
            <li key={result.id} className="flex items-center mb-2">
              <img
                src={getImageUrl(result.image)} 
                alt={result.headline}
                className="w-16 h-16 object-cover rounded-md mr-2"
              />
              <Link
                to={`/news/${result.id}`}
                className="text-blue-500 hover:underline flex-1"
              >
                {result.headline}
              </Link>
            </li>
          ))}
        </ul>
            {/* Show scrollable results for additional items */}
            {searchResults.length > 6 && (
              <ul className="absolute z-10 w-full bg-white shadow-lg rounded-md p-2 max-h-48 overflow-y-auto mt-2">
                {searchResults.slice(6).map((result) => (
                  <li key={result.id} className="flex items-center mb-2">
                    <img
                      src={result.image}
                    
                      className="w-16 h-16 object-cover rounded-md mr-2"
                    />
                    <Link
                      to={`/news/${result.id}`}
                      className="text-blue-500 hover:underline flex-1"
                    >
                      {result.headline}
                      
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        {/* Show no results message only if there are no results found */}
        {searchQuery.length > 2 && !showResults && (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
