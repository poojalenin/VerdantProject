import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

// import AdminLogin from '../components/Login';

const Navbar = () => {
    const { setShowSearch, getCartCount } = useContext(ShopContext);
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);

    return (
        <div className='flex flex-col'>
            <div className='flex items-center justify-between py-5 font-medium'>
                <Link to='/'>
                    <div className='w-36 text-2xl font-bold text-black-600'>VerdantVault</div>
                </Link>

                <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                    {['/', '/collection', '/about', '/contact'].map((path, index) => (
                        <NavLink key={index} to={path} className='flex flex-col items-center gap-1'>
                            <p>{path.replace('/', '').toUpperCase() || 'HOME'}</p>
                            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                        </NavLink>
                    ))}
                </ul>

                <div className='flex items-center gap-6'>
                    <img onClick={() => { setShowSearch(true); navigate('/collection'); }} className='w-5 cursor-pointer' src={assets.search_icon} alt="Search" />
                    
                    <div className='group relative'>
                        <img onClick={() => navigate('/login')} className='w-5 cursor-pointer' src={assets.profile_icon} alt="Profile" />
                        
                        <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                                <p onClick={() => navigate('/login')} className='cursor-pointer hover:text-black'>Login</p>
                                <p onClick={() => navigate('/admin-login')} className='cursor-pointer hover:text-black'>Admin Login</p>
                                <p onClick={() => navigate('/profile')} className='cursor-pointer hover:text-black'>My Profile</p>
                                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                                <p onClick={() => navigate('/login')} className='cursor-pointer hover:text-black'>Logout</p>
                            </div>
                        </div>
                    </div>
                    
                    <Link to='/cart' className='relative'>
                        <img className='w-5 min-w-5' src={assets.cart_icon} alt="Cart" />
                        <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
                    </Link>
                    
                    <img onClick={() => setVisible(true)} className='w-5 cursor-pointer sm:hidden' src={assets.menu_icon} alt="Menu" />
                </div>

                {/* Sidebar Menu For Small Screens */}
                <div className={`absolute top-0 right-0 bottom-0 bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                    <div className='flex flex-col text-gray-600'>
                        <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="Back" />
                            <p>Back</p>
                        </div>
                        {['/', '/collection', '/about', '/contact'].map((path, index) => (
                            <NavLink key={index} onClick={() => setVisible(false)} to={path} className='py-2 pl-6 border'>
                                {path.replace('/', '').toUpperCase() || 'HOME'}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
