import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const NavbarLinks = () => {
  const location = useLocation(); // Get the current location
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('More');
  const [categories, setCategories] = useState([]);
  const [activeLink, setActiveLink] = useState(''); // State for active link

  // Fetch categories from the API
  useEffect(() => {
    fetch("http://localhost:3000/api/categories")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setCategories(data);
      });
  }, [setCategories]);

  // Reset active link when on the homepage
  useEffect(() => {
    if (location.pathname === '/') {
      setActiveLink(''); // Reset active link
      setSelectedCategory('More'); // Reset selected category if desired
    }
  }, [location.pathname]); // Run effect on location change

  const visibleLinks = categories.slice(0, 10);
  const moreLinks = categories.slice(10);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.name); // Set selected category
    setActiveLink(category.name); // Set active link
    setDropdownOpen(false); // Close dropdown after selection
  };

  const handleVisibleLinkClick = (category) => {
    setActiveLink(category.name); // Set active link when clicking visible links
  };

  return (
    <div className="flex justify-center w-full border-b-1 py-4  "> {/* Added border and shadow here */}
      {/* Render the first 10 links */}
      {visibleLinks.map((category) => (
        <Link
          key={category.id}
          to={`news?category=${category.name}`}
          className={`text-md mx-4 hover:text-orange-600 ${activeLink === category.name ? 'text-orange-600' : ''}`}
          onClick={() => handleVisibleLinkClick(category)} // Set active link
        >
          {category.name}
        </Link>
      ))}

      {/* "More" Dropdown for additional categories */}
      {moreLinks.length > 0 && (
        <div className="relative z-20">
          <div className="flex justify-center items-center">
            <button
              onClick={toggleDropdown}
              className="flex items-center text-md mx-4 hover:text-orange-600"
            >
              {selectedCategory}
              {dropdownOpen ? (
                <FaArrowUp className="ml-2" /> // Show up arrow when dropdown is open
              ) : (
                <FaArrowDown className="ml-2" /> // Show down arrow when dropdown is closed
              )}
            </button>
          </div>

          {/* Dropdown for more links */}
          {dropdownOpen && (
            <div className="absolute mt-2 w-48 bg-white border shadow-lg rounded-md z-50">
              {moreLinks.map((category) => (
                <Link
                  key={category.id}
                  to={`news?category=${category.name}`}
                  onClick={() => handleCategoryClick(category)} // Handle click to select category
                  className={`block px-4 py-2 text-sm hover:bg-gray-200 hover:text-orange-600 ${activeLink === category.name ? 'text-orange-600' : ''}`}
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
