import axios from 'axios';
import React, { useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => { 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const backendUrlEnv = import.meta.env.VITE_BACKEND_URL || backendUrl;
    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!backendUrlEnv) {
            console.error("Error: backendUrl is not defined.");
            toast.error("Server URL is missing. Check your environment configuration.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                `${backendUrlEnv}/api/user/admin`,
                { email, password },
                { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
            );
            console.log(response.data);

            if (response.data.success) {
                const token = response.data.token;
                sessionStorage.setItem('token', token);
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

                console.log("Token stored successfully.");
                toast.success("Login Successful");
                navigate('/list'); // Redirect user after login
            } else {
                toast.error(response.data.message || "Invalid credentials");
            }
        } catch (error) {
            console.error(error);
            if (error.response) {
                console.error(error.response.data);
                toast.error(error.response.data?.message || "Invalid email or password");
            } else if (error.request) {
                console.error(error.request);
                toast.error("Network error. Please try again.");
            } else {
                console.error('Error', error.message);
                toast.error("An error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className='min-h-screen flex items-center justify-center w-full bg-gray-100'>
            <div className='bg-white shadow-lg rounded-lg px-8 py-6 max-w-md w-full'>
                <h1 className='text-2xl font-bold text-center mb-4'>Admin Panel</h1>
                <form onSubmit={onSubmitHandler}>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Email Address</label>
                        <input 
                            onChange={(e) => setEmail(e.target.value)} 
                            value={email} 
                            className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none focus:ring-2 focus:ring-black' 
                            type="email" 
                            placeholder='your@email.com' 
                            required 
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
                        <input 
                            onChange={(e) => setPassword(e.target.value)} 
                            value={password} 
                            className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none focus:ring-2 focus:ring-black' 
                            type="password" 
                            placeholder='Enter your password' 
                            required 
                        />
                    </div>
                    <button 
                        className={`mt-2 w-full py-2 px-4 rounded-md text-white font-semibold transition duration-300 ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-black hover:bg-gray-800'}`} 
                        type="submit" 
                        disabled={loading}
                    > 
                        {loading ? <span className="animate-spin">🔄</span> : "Login"} 
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
