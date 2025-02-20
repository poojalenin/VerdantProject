import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';

const MyProfile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/user/profile`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    withCredentials: true,
                });

                console.log("✅ User Profile Data:", response.data);
                setUser(response.data.data); // ✅ Fixed: Correct state update
                setLoading(false); // ✅ Loading completed
            } catch (error) {
                console.error("❌ Error Fetching Profile:", error);
                setError(error.response?.data?.message || "Server error.");
                setLoading(false); // ✅ Loading completed even on error
            }
        };

        fetchUserData();
    }, []); // ✅ No need for navigate or API_BASE_URL in dependency array

    const handleLogout = () => {
        console.log("🔒 Logging out...");
        localStorage.removeItem('token');
        navigate('/logout');
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-gray-600">
                <span className="animate-spin border-t-4 border-blue-500 border-solid rounded-full h-12 w-12"></span>
                <p className="ml-3">Loading user data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen text-red-500">
                <p>{error}</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen text-gray-600">
                <p>No user data found.</p>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <div className="flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden mb-6">
                        {user.profilePicture ? (
                            <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex justify-center items-center bg-gray-300">
                                <FaUserAlt className="text-gray-600 text-4xl" />
                            </div>
                        )}
                    </div>

                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Welcome, {user.name}</h1>

                    <div className="space-y-4 w-full">
                        <div className="flex justify-between">
                            <p className="text-gray-600 font-medium">Email:</p>
                            <p className="text-gray-800">{user.email}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-600 font-medium">Joined On:</p>
                            <p className="text-gray-800">{new Date(user.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="flex justify-center gap-4 mt-8">
                        <button 
                            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
