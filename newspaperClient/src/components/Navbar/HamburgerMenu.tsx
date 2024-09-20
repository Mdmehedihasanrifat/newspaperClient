
import { Link } from "react-router-dom";

const HamburgerMenu = () => {
  return (
    <div className="dropdown">
      {/* Hamburger Icon */}
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
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

      {/* Dropdown Menu */}
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
      >
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/newscreate">News Create</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </div>
  );
};

export default HamburgerMenu;
