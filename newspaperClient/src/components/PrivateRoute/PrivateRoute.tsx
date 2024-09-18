
// PrivateRoute.tsx
import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import userContext from "../../context/UserContext";
interface User {
    name: string;
    email: string;
}
interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const context = useContext(userContext);
  const { user, setUser } = context as UserContextType;
  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setUser(JSON.parse(localUser));
    } else {
      setUser(null); // Or handle the case where no user is found
    }
  }, [setUser]);

  
  // If user doesn't exist, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user is authenticated, render the requested component
  return children;
};

export default PrivateRoute;
