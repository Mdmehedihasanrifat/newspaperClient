import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
    setLoading(false); // Set loading to false after checking localStorage
  }, []); 

  if (loading) {
    // Return null or a loading spinner while checking user status
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;

