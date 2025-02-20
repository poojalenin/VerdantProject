import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);  // Loading state
  const [deleting, setDeleting] = useState(null);  // Track which product is being deleted

  // Fetch products list
  const fetchList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Remove product
  const removeProduct = async (id) => {
    if (!token) {
      toast.error("❌ Authentication token is missing. Please log in.");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    setDeleting(id);
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();  // Refresh the list after deletion
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setDeleting(null);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">

        {/* ------- List Table Title ---------- */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* ------ Product List ------ */}
        {loading ? (
          <div className="text-center py-4">Loading products...</div>
        ) : (
          list.map((item, index) => (
            <div
              className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
              key={index}
            >
              {/* Display product images */}
              <img 
                className="w-12" 
                src={item.image && item.image.length > 0 ? item.image[0] : '/default-image.jpg'} 
                alt={`Product image of ${item.name}`} 
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p
                onClick={() => removeProduct(item._id)}
                className="text-right md:text-center cursor-pointer text-lg text-red-600"
              >
                {deleting === item._id ? "Deleting..." : "X"}
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default List;
