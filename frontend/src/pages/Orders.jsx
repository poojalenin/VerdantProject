import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';

const Orders = () => {

    const { products, currency } = useContext(ShopContext);

    return (
        <div className='border-t pt-16'>
            <div className='text-2xl'>
                <Title text1={'MY'} text2={'ORDERS'} />
            </div>

            <div>
                {products && products.length > 1 ? (
                    products.slice(1, 4).map((item, index) => (
                        <div key={item.id || index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                            <div className='flex items-start gap-6 text-sm'>
                                {item.image && item.image.length > 0 ? (
                                    <img className='w-16 sm:w-20' src={item.image[0]} alt={item.name || "Product"} />
                                ) : (
                                    <div className='w-16 sm:w-20 h-16 sm:h-20 bg-gray-200 flex items-center justify-center'>
                                        <span className='text-gray-500'>No Image</span>
                                    </div>
                                )}
                                <div>
                                    <p className='sm:text-base font-medium'>{item.name}</p>
                                    <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                                        <p className='text-lg'>{currency}{item.price}</p>
                                        <p>Quantity: 1</p>
                                    </div>
                                    <p className='mt-2'>Date: <span className='text-gray-400'>25, May, 2024</span></p>
                                </div>
                            </div>
                            <div className='md:w-1/2 flex justify-between'>
                                <div className='flex items-center gap-2'>
                                    <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                                    <p className='text-sm md:text-base'>Ready to ship</p>
                                </div>
                                <button className='border px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-100 transition'>Track Order</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 mt-4">No orders found.</p>
                )}
            </div>
        </div>
    );
}

export default Orders;
