import React, { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import userContext from "../../context/UserContext";
const Navbar = () => {

  const {user,setUser}=useContext(userContext);

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>News</a>
              </li>
              <li>
                <a>Opinion</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl">The Truth Seeker</a>
        </div>
        <div className="navbar-end">
          <div className="form-control flex justify-center items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-24 md:w-auto pr-10"
              />
              <FaSearch className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-square mx-2"
            >
              <div className="w-12 ">
                {user?<h2>{user.name}</h2>:<h2>Guest</h2>}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
