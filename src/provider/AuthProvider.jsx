import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const check = localStorage.getItem('currentUser');
        if (check) {
            setCurrentUser(check);
        }
    }, [currentUser]);
    console.log(currentUser);

    // login 
    const login = (user) => {
        setCurrentUser(user);
    }

    // register
    const register = (user) => {
        setCurrentUser(user);
    }

    // remove user
    const removeUser = () => {
        if (localStorage.getItem('currentUser')) {
            localStorage.removeItem('currentUser');
            setCurrentUser('');
        }
    }


    const data = {
        currentUser,
        setCurrentUser,
        login,
        register,
        removeUser
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;