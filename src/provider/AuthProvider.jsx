import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const check = localStorage.getItem('currentUser');
        if (check) {
            setCurrentUser(check);
        }
    }, []);
    console.log(currentUser);


    const data = {
        currentUser,
        setCurrentUser
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;