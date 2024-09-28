import { TiWeatherPartlySunny } from "react-icons/ti";
import HamburgerMenu from "./HamburgerMenu";

const NavbarStart = () => {
  const getCurrentDate = () => {
    const date = new Date();
    return date.toDateString();
  };

  return (
    <div className="navbar-start">
      <HamburgerMenu />
      {/* Current Date */}
      <div className="ml-4 flex items-center space-x-2">
        <TiWeatherPartlySunny />
        <p>{getCurrentDate()}</p>
      </div>
    </div>
  );
};

export default NavbarStart;
