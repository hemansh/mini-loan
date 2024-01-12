import React, { useState } from 'react';
import { axiosInstance } from '../../config';
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const sendData = async () => {
        const data = {
            "username":email,
            "password":password
        }
        const conf = {
            Headers: {
                'Content-Type': 'application/json'
            }
        };
        // console.log(data);
        try {
            const res = await axiosInstance.post('/auth/signup', data, conf);
            if (res.status === 200) {
                navigate("/home");
                // alert("Login success");
            }
        } catch (err) {
            alert("unsuccessful")
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted');
        sendData();
        setEmail('')
        setPassword('')
    };

    return (
        <div className="container mx-auto mt-8">
            <div className="max-w-md mx-auto bg-white p-8 border shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
                <form onSubmit={handleSubmit}>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="border rounded w-full py-2 px-3"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="border rounded w-full py-2 px-3"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
