import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";

const Home = () => {
    const { currentUser, login, removeUser } = useContext(AuthContext);
    const [userData, setUserData] = useState([]);
    console.log(currentUser);

    useEffect(() => {
        if (currentUser) {
            fetch(`http://localhost:5000/register_data/${currentUser}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setUserData(data);
                })
        }
    }, [currentUser, login])

    const logout = () => {
        removeUser();
        setUserData('');
    }


    return (
        <div className="bg-[#001427] min-h-screen flex flex-col">
            {/* Flex container */}
            <div className="flex flex-col flex-grow justify-between">
                <div className="p-4">
                    <h1 className="text-white text-4xl font-bold text-center">{userData && userData.role}</h1>
                </div>
                <div className="p-4">
                    <ul>
                        {
                            currentUser ? (
                                <Link to='/'>
                                    <li onClick={logout} className="bg-[#fdf0d5] hover:bg-white text-black font-bold text-base cursor-pointer py-2 pl-4 rounded-sm">Logout</li>
                                </Link>
                            ) : (
                                <>
                                    <Link to='/login'>
                                        <li className="bg-[#fdf0d5] hover:bg-white text-black font-bold text-base cursor-pointer py-2 pl-4 rounded-sm mb-2">Login</li>
                                    </Link>
                                    <Link to='/register'>
                                        <li className="bg-[#fdf0d5] hover:bg-white text-black font-bold text-base cursor-pointer py-2 pl-4 rounded-sm mb-2">Register</li>
                                    </Link>
                                </>
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Home;