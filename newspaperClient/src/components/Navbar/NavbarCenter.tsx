import { formattedDate } from "../../utils/helper";

interface NavbarCenterProps {
    logo: string;
  }
  
  const NavbarCenter = ({ logo }: NavbarCenterProps) => {
    return (
      <div className="navbar-center">
         <header>
        <h1 className="text-5xl py-2 font-bold text-center font-serif">The Daily News</h1>
      </header>

      </div>
    );
  };
  
  export default NavbarCenter;
  