interface NavbarCenterProps {
    logo: string;
  }
  
  const NavbarCenter = ({ logo }: NavbarCenterProps) => {
    return (
      <div className="navbar-center">
        <img src={logo} className="h-24 w-24" alt="Logo" />
      </div>
    );
  };
  
  export default NavbarCenter;
  