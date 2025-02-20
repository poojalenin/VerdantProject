// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';

import Product from './pages/Product';
import Cart from './pages/Cart';
import Footer from './components/Footer';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Profile from './pages/MyProfile'; 
import Logout from './pages/Logout'; 
import SearchBar from './components/SearchBar';
// import AdminLogin from '../../admin/src/components/Login';


const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      {/* Navbar Component */}
      <Navbar />

      {/* SearchBar Component */}
      <SearchBar />

      {/* Routes for different pages */}
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Collection Page */}
        <Route path="/collection" element={<Collection />} />

        {/* About Page */}
        <Route path="/about" element={<About />} />

        {/* Contact Page */}
        <Route path="/contact" element={<Contact />} />

        {/* Product Page with dynamic productId */}
        <Route path="/product/:productId" element={<Product />} />

        {/* Cart Page */}
        <Route path="/cart" element={<Cart />} />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Place Order Page */}
        <Route path="/place-order" element={<PlaceOrder />} />

        {/* Orders Page */}
        <Route path="/orders" element={<Orders />} />

        {/* Profile Page */}
        <Route path="/profile" element={<Profile />} />

        {/* Logout Page */}
        <Route path="/logout" element={<Logout />} />
      </Routes>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default App;