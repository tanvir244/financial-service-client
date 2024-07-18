import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const Register = () => {
    const { register } = useContext(AuthContext);
    const [registerErr, setRegisterErr] = useState([]);
    

    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const mobile = form.number.value;
        const email = form.email.value;
        const pin = form.pin.value;

        if (name === '' || mobile === '' || email === '' || pin === '') {
            setRegisterErr('Please, fill up the form');
            return;
        }

        if (!/^[0-9]+$/.test(pin)) {
            setRegisterErr('Use numbers from 0 to 9 only');
            return;
        }
        else if (pin.length != 5) {
            setRegisterErr('Pin should be 5 digit');
            return;
        }

        // reset error 
        setRegisterErr('');

        const formData = { name, mobile, email, pin, status: 'Pending', role: 'User' };
        axios.post('http://localhost:5000/register_data', formData)
            .then(response => {
                console.log(response);
                // set the email to ls 
                localStorage.setItem('currentUser', response.data.email);
                userRegister(response.data.email);
            })
        
        // reset the form fields 
        form.reset();
    }

    const userRegister = (user) => {
        register(user)
    }

    return (
        <div className="w-[620px] mx-auto bg-[#0d1b2a] text-white rounded-lg px-12 py-16">
            <h1 className="text-center font-semibold text-5xl mb-12">Register Now</h1>
            <form onSubmit={handleRegister}>
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <span className="text-base font-semibold">Name</span>
                        <input type="text" name="name" className="text-base text-black font-semibold p-2 rounded-md w-full" placeholder="Your Name" />
                    </div>
                    <div className="space-y-2">
                        <span className="text-base font-semibold">Mobile</span>
                        <input type="number" name="number" className="text-base text-black font-semibold p-2 rounded-md w-full" placeholder="Mobile Number" />
                    </div>
                    <div className="space-y-2">
                        <span className="text-base font-semibold">Email</span>
                        <input type="email" name="email" className="text-base text-black font-semibold p-2 rounded-md w-full" placeholder="Enter email" />
                    </div>
                    <div className="space-y-2">
                        <span className="text-base font-semibold">PIN</span>
                        <input type="password" name="pin" className="text-base text-black font-semibold p-2 rounded-md w-full" placeholder="Enter secret PIN" />
                    </div>
                </div>
                <button className="w-full py-2 bg-white text-black mt-8 rounded-lg font-semibold">Register</button>
                {
                    registerErr && <p className="text-red-600 font-semibold mt-4 text-center">{registerErr}</p>
                }
            </form>
        </div>
    );
};

export default Register;