import { createContext, useState, ReactNode } from "react";

// Define types for the user context
interface User {
    name: string;
    email: string;
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    categories:[];
    setCategories: () => void;
}

// Create the context with a default value of null for the user
const userContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null); 
    const [categories,setCategories]=useState([]) // Default to null for no logged-in user

    return (
        <userContext.Provider value={{ user, setUser,categories,setCategories }}>
            {children}
        </userContext.Provider>
    );
};

export default userContext;
