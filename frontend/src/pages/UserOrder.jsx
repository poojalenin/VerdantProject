import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/order/user-orders', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,  // Assuming you store the token in localStorage
          }
        });
        setOrders(response.data.orders);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <h3>Order ID: {order._id}</h3>
              <p>Status: {order.status}</p>
              <p>Amount: ${order.amount}</p>
              <p>Payment Method: {order.paymentMethod}</p>
              <div>
                <h4>Items:</h4>
                <ul>
                  {order.items.map((item) => (
                    <li key={item.productId}>
                      {item.name} - Quantity: {item.quantity} - Price: ${item.price}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>Shipping Address:</h4>
                <p>{order.address.street}, {order.address.city}, {order.address.state} - {order.address.postalCode}, {order.address.country}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserOrdersPage;
