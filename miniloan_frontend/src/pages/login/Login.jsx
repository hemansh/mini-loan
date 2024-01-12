import React, { useState } from 'react';
import { axiosInstance } from '../../config.js';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const handleLogin = async()=>{
        const data = {
            username: email,
            password: password
        };

        const conf = {
            Headers: {
                'Content-Type':'application/json'
            }
        };
        console.log(data);
        try{
            const res = await axiosInstance.post('/auth/login',data,conf);
            if(res.status === 200){
                navigate("/home");
                // alert("Login success");
            }
        } catch(err){
            alert("login unsuccessful")
        }
    }

    return (
        <div className="container mx-auto px-4">
            {<div className="flex items-center justify-center h-screen">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back!</h2>
                    <form>
                        <div className="mb-4 space-y-4">
                            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                                Email
                            </label>

                            <input type="email" id="email" value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                                Password
                            </label>
                            <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                            <div className="items-center  flex flex-col">
                                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=>{handleLogin();}}>Sign In</button>
                            </div>
                        </div>


                    </form>
                </div>
            </div>}
        </div>
    );
}

export default Login;