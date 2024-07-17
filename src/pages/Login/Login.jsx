import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const Login = () => {
    const {setCurrentUser} = useContext(AuthContext);
    const [userAdd, setUserAdd] = useState(false);


    useEffect(() => {
        const check = localStorage.getItem('currentUser');
        if (check) {
            setCurrentUser(check);
        }
    }, [setCurrentUser, userAdd]);

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const pin = form.pin.value;

        axios.post(`http://localhost:5000/register_data/${email}`, { pin: pin })
            .then(response => {
                console.log(response);
                // set the email to ls 
                localStorage.setItem('currentUser', response.data.email);
            })
        
        setUserAdd(true);
    }

    return (
        <div className="w-[580px] mx-auto bg-[#0d1b2a] text-white rounded-lg px-12 py-16">
            <h1 className="text-center font-semibold text-5xl mb-12">Please Login</h1>
            <form onSubmit={handleLogin}>
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <span className="text-base font-semibold">Email</span>
                        <input type="email" name="email" className="text-base text-black font-semibold p-2 rounded-md w-full" placeholder="Your Name" />
                    </div>
                    <div className="space-y-2">
                        <span className="text-base font-semibold">PIN</span>
                        <input type="password" name="pin" className="text-base text-black font-semibold p-2 rounded-md w-full" placeholder="Your Name" />
                    </div>
                </div>
                <button className="w-full py-2 bg-white text-black mt-8 rounded-lg font-semibold">Login</button>
            </form>
        </div>
    );
};

export default Login;