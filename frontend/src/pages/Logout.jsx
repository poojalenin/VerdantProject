import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // ✅ Clear local storage (removes user session data)
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // ✅ Clear authentication cookies (forces logout)
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        // ✅ Redirect to login page after cleanup
        setTimeout(() => {
            navigate('/login');
        }, 1000); // Optional delay for better UX
    }, [navigate]);

    return (
        <div className="flex flex-col justify-center items-center h-screen text-xl font-semibold">
            <p>Logging out...</p>
            <button 
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                onClick={() => navigate('/login')}
            >
                Go to Login
            </button>
        </div>
    );
};

export default Logout;
