import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
    const [method, setMethod] = useState('cod');
    const { cartItems, getCartAmount, delivery_fee, currency } = useContext(ShopContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onPlaceOrder = async () => {
        try {
            console.log("📦 Placing order...");
            console.log("cartItems:", cartItems);
            console.log("Is cartItems an array?", Array.isArray(cartItems));

            // Ensure cartItems is a non-empty array
            if (!Array.isArray(cartItems) || cartItems.length === 0) {
                alert("Cart is empty. Please add items before placing an order.");
                return;
            }

            // Create order data
            const orderData = {
                userId: "user123", // Use actual user ID from context/auth
                items: cartItems.map(item => ({
                    productId: item.id,
                    quantity: item.quantity
                })),
                amount: getCartAmount() + delivery_fee,
                address: `${formData.street}, ${formData.city}, ${formData.state}, ${formData.zipcode}, ${formData.country}`
            };

            console.log("📤 Sending order data:", orderData);

            // Send order data to the server
            const response = await axios.post('http://localhost:5000/api/place/place-order', orderData);

            if (response.status === 201) {
                alert('✅ Order placed successfully!');
                navigate('/orders');
            } else {
                alert('❌ Failed to place the order. Please try again.');
            }
        } catch (error) {
            console.error('🔥 Error placing order:', error);
            alert('⚠️ An error occurred while placing the order.');
        }
    };

    return (
        <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
                <div className='text-xl sm:text-2xl my-3'>
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                </div>
                <div className='flex gap-3'>
                    <input
                        className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                        type="text"
                        placeholder='First name'
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                    />
                    <input
                        className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                        type="text"
                        placeholder='Last name'
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                    />
                </div>
                <input
                    className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                    type="email"
                    placeholder='Email address'
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                <input
                    className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                    type="text"
                    placeholder='Street'
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                />
                <div className='flex gap-3'>
                    <input
                        className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                        type="text"
                        placeholder='City'
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                    />
                    <input
                        className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                        type="text"
                        placeholder='State'
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='flex gap-3'>
                    <input
                        className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                        type="number"
                        placeholder='Zipcode'
                        name="zipcode"
                        value={formData.zipcode}
                        onChange={handleInputChange}
                    />
                    <input
                        className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                        type="text"
                        placeholder='Country'
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                    />
                </div>
                <input
                    className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                    type="text"
                    placeholder='Phone'
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                />
            </div>

            <div className='mt-8'>
                <div className='mt-8 min-w-80'>
                    <CartTotal />
                </div>

                <div className='mt-12'>
                    <Title text1={'PAYMENT'} text2={'METHOD'} />
                    <div className='flex gap-3 flex-col lg:flex-row'>
                        <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                            <p className=' text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
                        </div>
                    </div>

                    <div className='w-full text-end mt-8'>
                        <button onClick={onPlaceOrder} className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrder;
