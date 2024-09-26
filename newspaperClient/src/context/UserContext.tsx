import { createContext, useState, ReactNode } from "react";

// Define types for the user context
interface User {
    name: string;
    email: string;
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    categories: [];
    setCategories: () => void;
    searchnews: [];
    setSearchNews: () => void;
    isDeleted: boolean;
    setIsDeleted: (deleted: boolean) => void; // Updated to include a parameter
    deletedId: number | null; // New state for deleted news ID
    setDeletedId: (id: number | null) => void; // Function to set deleted ID
}


// Create the context with a default value of null for the user
const userContext = createContext<UserContextType | undefined>(undefined);
export const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [categories, setCategories] = useState([]);
    const [Query, setQuery] = useState([]);
    const [isDeleted, setIsDeleted] = useState(false);
    const [deletedId, setDeletedId] = useState<number | null>(null);

    return (
        <userContext.Provider value={{
            user,
            setUser,
            categories,
            setCategories,
            Query,
            setQuery,
            isDeleted,
            setIsDeleted,
            deletedId,
            setDeletedId
        }}>
            {children}
        </userContext.Provider>
    );
};

export default userContext;









// export const UserContextProvider = ({ children }: { children: ReactNode }) => {

//     return (
//         <userContext.Provider value={{
//             user,
//             setUser,
//             categories,
//             setCategories,
//             Query,
//             setQuery,
//             isDeleted,
//             setIsDeleted: (deleted: boolean) => {
//                 setIsDeleted(deleted);
//                 if (deleted) setDeletedId(null); // Reset deleted ID when state is reset
//             },
//             deletedId,
//             setDeletedId
//         }}>
//             {children}
//         </userContext.Provider>
//     );
// };

