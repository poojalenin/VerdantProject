import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
export const currency = '$';

const App = () => {
  const [token, setLocalToken] = useState(sessionStorage.getItem('token') || localStorage.getItem('token') || '');

  // Function to refresh token
  const refreshToken = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const data = await response.json();
        setLocalToken(data.newAccessToken);
        localStorage.setItem('token', data.newAccessToken);
        sessionStorage.setItem('token', data.newAccessToken);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.newAccessToken}`;
      } else {
        console.error('Failed to refresh token');
        logout();
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      logout();
    }
  };

  // Logout function
  const logout = () => {
    setLocalToken('');
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    delete axios.defaults.headers.common["Authorization"];
  };

  // Effect to refresh token periodically (every 10 minutes)
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      sessionStorage.setItem('token', token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      delete axios.defaults.headers.common["Authorization"];
    }

    const interval = token ? setInterval(refreshToken, 10 * 60 * 1000) : null;

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [token]);

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />
      {token === ''
        ? <Login setToken={setLocalToken} />
        : <>
          <Navbar setToken={setLocalToken} logout={logout} />
          <hr />
          <div className='flex w-full'>
            <Sidebar />
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
              <Routes>
                <Route path='/add' element={<Add token={token} />} />
                <Route path='/list' element={<List token={token} />} />
                <Route path='/orders' element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      }
    </div>
  );
};

export default App;
