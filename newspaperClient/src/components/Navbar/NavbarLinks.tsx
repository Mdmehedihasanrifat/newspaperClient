import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import userContext from "../../context/UserContext";

const NavbarLinks = () => {
  const { categories } = useContext(userContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Show the first 10 links directly
  const visibleLinks = categories.slice(0, 10);
  // Remaining links go under "More"
  const moreLinks = categories.slice(10);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className="flex justify-center w-full">
      {visibleLinks.map((category) => (
        <Link
          key={category.id}
          to={`news?category=${category.name}`}
          className="text-md mx-4 hover:text-orange-600"
        >
          {category.name}
        </Link>
      ))}
      {moreLinks.length > 0 && (
        <div className="relative z-20">
          <button
            onClick={toggleDropdown}
            className="text-md mx-4 hover:text-orange-600"
          >
            More
          </button>
          {dropdownOpen && (
            <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-md z-50">
              {moreLinks.map((category) => (
                <Link
                  key={category.id}
                  to={`news?category=${category.name}`}
                  className="block px-4 py-2 text-sm hover:bg-gray-200 hover:text-orange-600"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavbarLinks;

