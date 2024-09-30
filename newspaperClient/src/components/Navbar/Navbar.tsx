
import { useContext, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import userContext from "../../context/UserContext";
import logo from "../../assets/download (1).png";
import NavbarStart from "./NavbarStart";
import NavbarCenter from "./NavbarCenter";
import NavbarEnd from "./NavbarEnd";
import NavbarLinks from "./NavbarLinks";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const context = useContext(userContext);
  const { user, setUser } = context;
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setUser(JSON.parse(localUser));
    } else {
      setUser(null);
    }
  }, [setUser]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="navbar-container py-3 shadow-lg">
    {/* First Section: Date, Logo, and User */}
    <div className="navbar bg-base-100 shadow-md">
      <NavbarStart />
      <NavbarCenter logo={logo} />
      <NavbarEnd user={user} handleLogout={handleLogout} />
    </div>
  
    {/* Second Section: Links and Search Icon */}
    <div className="navbar bg-base-100 w-full font-extrabold -mt-8 flex justify-between items-center shadow-sm">
      <NavbarLinks />
      <button
        className="btn btn-ghost btn-circle w-8 h-8 mx-2 text-2xl"
        onClick={() => setShowSearch(!showSearch)}
      >
        <FaSearch />
      </button>
    </div>
  
    {/* Third Section: Search Bar and Results */}
    {showSearch && (
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchResults={searchResults}
        setSearchResults={setSearchResults}
      />
    )}
  </div>
  );
};

export default Navbar;
