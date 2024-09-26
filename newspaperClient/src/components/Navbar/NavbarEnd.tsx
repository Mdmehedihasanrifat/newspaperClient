import {  useNavigate } from "react-router-dom";
import { User } from "../../utils/interface";

interface NavbarEndProps {
  user: User;
  handleLogout: () => void;
}

const NavbarEnd = ({ user, handleLogout }: NavbarEndProps) => {
  const navigate = useNavigate();

  const handleNews = () => {
    navigate(`/profile`);
  };

  return (
    <div className="navbar-end">
      <div className="dropdown dropdown-end ">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-square mx-2">
          <div className="w-12">{user ? <h2>{user.name}</h2> : <h2>Guest</h2>}</div>
        </div>
        <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          {user && (
            <li>
              <button
                onClick={handleNews}
                className="btn btn-ghost w-full text-left"
              >
                My Created News
              </button>
            </li>
          )}
          <li className="text-red-700">
            {user ? (
              <button
                onClick={handleLogout}
                className=" bg-red-500 text-white btn btn-ghost w-full text-left"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="btn btn-ghost w-full text-left"
              >
                Login
              </button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavbarEnd;
