// import { useContext, useEffect, useState, ChangeEvent } from "react";
// import { FaSearch } from "react-icons/fa";
// import userContext from "../../context/UserContext";
// import { Link, useNavigate } from "react-router-dom";
// import logo from "../../assets/download (1).png";
// import { TiWeatherPartlySunny } from "react-icons/ti";

// interface User {
//   id: number;
//   name: string;
//   email: string;
// }

// interface UserContextType {
//   user: User | null;
//   setUser: (user: User | null) => void;
// }

// interface SearchResult {
//   id: number;
//   title: string;
// }

// const Navbar = () => {
//   const context = useContext(userContext);
//   const { user, setUser } = context as UserContextType;
//   const [showSearch, setShowSearch] = useState(false); // State to toggle the search bar
//   const [searchQuery, setSearchQuery] = useState(""); // State to manage search input
//   const [searchResults, setSearchResults] = useState<SearchResult[]>([]); // State to store search results

//   useEffect(() => {
//     const localUser = localStorage.getItem("user");
//     if (localUser) {
//       setUser(JSON.parse(localUser));
//     } else {
//       setUser(null);
//     }
//   }, [setUser]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   const navigate = useNavigate();

//   const getCurrentDate = () => {
//     const date = new Date();
//     return date.toDateString(); // Returns a formatted string like 'Mon Sep 18 2024'
//   };

//   const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//   };

//   const performSearch = async () => {
//     if (searchQuery.trim() === "") return;

//     try {
//       const response = await fetch(
//         `http://localhost:3000/api/news/news/search?query=${searchQuery}`
//       );
//       const data = await response.json();
//       setSearchResults(data.news || []);
//     } catch (error) {
//       console.error("Error searching news:", error);
//     }
//   };

//   const handleNews = () => {
//     console.log(user?.id);
//     navigate(`news/${user?.id}/profile`);
//   };

//   useEffect(() => {
//     if (searchQuery.length > 2) {
//       // Perform search after user types at least 3 characters
//       performSearch();
//     } else {
//       setSearchResults([]); // Clear results if search query is too short
//     }
//   }, [searchQuery]);

//   return (
//     <div className="navbar-container">
//       {/* First Section: Date, Logo, Hamburger, and User */}
//       <div className="navbar bg-base-100">
//         <div className="navbar-start">
//           {/* Hamburger Menu */}
//           <div className="dropdown">
//             <div
//               tabIndex={0}
//               role="button"
//               className="btn btn-ghost btn-circle"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h16M4 18h7"
//                 />
//               </svg>
//             </div>
//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
//             >
//               <li>
//                 <Link to="/">Home</Link>
//               </li>
//               <li>
//                 <Link to="/newscreate">News Create</Link>
//               </li>
//               <li>
//                 <Link to="/login">Login</Link>
//               </li>
//             </ul>
//           </div>
//           {/* Current Date */}
//           <div className="ml-4 flex items-center space-x-2">
//             <TiWeatherPartlySunny />
//             <p>{getCurrentDate()}</p>
//           </div>
//         </div>
//         <div className="navbar-center">
//           {/* Logo */}
//           <img src={logo} className="h-24 w-24" alt="Logo" />
//         </div>
//         <div className="navbar-end">
//           <div className="dropdown dropdown-end">
//             <div
//               tabIndex={0}
//               role="button"
//               className="btn btn-ghost btn-square mx-2"
//             >
//               <div className="w-12">
//                 {user ? <h2>{user.name}</h2> : <h2>Guest</h2>}
//               </div>
//             </div>
//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
//             >
//               <li>
//                 {user ? (
//                   <button
//                     onClick={handleNews}
//                     className="btn btn-ghost w-full text-left"
//                   >
//                     CreatedNews
//                   </button>
//                 ) : (
//                   <></>
//                 )}
//               </li>

//               <li className="text-red-700">
//                 {user ? (
//                   <button
//                     onClick={handleLogout}
//                     className=" bg-red-500 text-white btn btn-ghost w-full text-left"
//                   >
//                     Logout
//                   </button>
//                 ) : (
//                   <button
//                     onClick={() => navigate("/login")}
//                     className="btn btn-ghost w-full text-left"
//                   >
//                     Login
//                   </button>
//                 )}
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Second Section: Links and Search Icon */}
//       <div className="navbar bg-base-100 w-full font-extrabold -mt-8">
//         <div className="flex justify-between items-center w-full">
//           {/* Center Links */}
//           <div className="flex-grow text-center ">
//             <Link to="/" className="text-md mx-4 hover:text-orange-600">
//               Home
//             </Link>
//             <Link to="/sports" className="text-md mx-4 hover:text-orange-600">
//               Sports
//             </Link>
//             <Link to="/politics" className="text-md mx-4 hover:text-orange-600">
//               Politics
//             </Link>
//           </div>

//           {/* Extreme Right-Aligned Search Icon */}
//           <div className="flex-shrink-0">
//             <button
//               className="btn btn-ghost btn-circle"
//               onClick={() => setShowSearch(!showSearch)}
//             >
//               <FaSearch />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Third Section: Search Bar and Results */}
//       {showSearch && (
//         <div className="navbar bg-base-100 p-4 border-t border-gray-200">
//           <div className="w-full flex flex-col items-center">
//             <input
//               type="text"
//               placeholder="Search"
//               className="input input-bordered w-full max-w-lg mb-4"
//               autoFocus
//               value={searchQuery}
//               onChange={handleSearchChange}
//             />
//             {/* Display search results */}
//             {searchResults?.length > 0 && (
//               <div className="w-full max-w-lg mt-4">
//                 <ul>
//                   {searchResults.map((result) => (
//                     <li key={result.id} className="mb-2">
//                       <Link
//                         to={`/news/${result.id}`}
//                         className="text-blue-500 hover:underline"
//                       >
//                         {result.title}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//             {searchQuery?.length > 2 && searchResults.length === 0 && (
//               <p>No results found</p>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;



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
    <div className="navbar-container">
      {/* First Section: Date, Logo, and User */}
      <div className="navbar bg-base-100">
        <NavbarStart />
        <NavbarCenter logo={logo} />
        <NavbarEnd user={user} handleLogout={handleLogout} />
      </div>

      {/* Second Section: Links and Search Icon */}
      <div className="navbar bg-base-100 w-full font-extrabold -mt-8 flex justify-between items-center">
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
