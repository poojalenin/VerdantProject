import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token: propToken }) => {
  const [token, setToken] = useState(() => propToken || localStorage.getItem("token"));

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && storedToken !== token) {
      setToken(storedToken);
    }
  }, [token]);

  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Kitchen & Dining");
  const [subCategory, setSubCategory] = useState("Kitchen");
  const [bestseller, setBestseller] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedImages = [...images];
      updatedImages[index] = file;
      setImages(updatedImages);
    }
  };

  useEffect(() => {
    return () => images.forEach((img) => img && URL.revokeObjectURL(img));
  }, [images]);

  const refreshToken = async () => {
    try {
      const response = await axios.post(`${backendUrl}/refresh`, {}, { withCredentials: true });
      if (response.data.success) {
        const newToken = response.data.newAccessToken;
        localStorage.setItem("token", newToken);
        setToken(newToken);
        return newToken;
      } else {
        console.error("Token refresh failed:", response.data.message);
        return null;
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      return null;
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    let freshToken = localStorage.getItem("token");

    if (!freshToken) {
      toast.error("❌ Authentication token is missing. Please log in.");
      setLoading(false);
      return;
    }

    try {
      // Convert price to a number if necessary
      const parsedPrice = parseFloat(price);
      if (isNaN(parsedPrice)) {
        toast.error("❌ Please enter a valid price.");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", parsedPrice);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);

      images.forEach((image, index) => {
        if (image) formData.append(`image${index + 1}`, image);
      });

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: {
          "Authorization": `Bearer ${freshToken}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setPrice("");
        setCategory("Kitchen & Dining");
        setSubCategory("Kitchen");
        setBestseller(false);
        setImages([null, null, null, null]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("❌ Error response:", error.response);

      if (error.response?.status === 401) {
        const newToken = await refreshToken();
        if (newToken) {
          localStorage.setItem("token", newToken);
          setToken(newToken);
          return onSubmitHandler(e); // Retry after refreshing token
        } else {
          toast.error("🚫 Unauthorized: Please log in again.");
          localStorage.removeItem("token");
          setToken(null);
        }
      } else if (error.response?.status === 403) {
        toast.error("⛔ Access Denied: You do not have admin privileges.");
      } else if (error.response?.status === 400) {
        toast.error("⚠️ Bad request: Please check the form and try again.");
      } else {
        toast.error(error.response?.data?.message || "⚠️ An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          {images.map((image, index) => (
            <label key={index} htmlFor={`image${index + 1}`}>
              <img
                className="w-20"
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt={`Preview ${index + 1}`}
              />
              <input
                onChange={(e) => handleImageChange(e, index)}
                type="file"
                id={`image${index + 1}`}
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Write content here"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product price</p>
        <input
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          className="w-full max-w-[500px] px-3 py-2"
          type="number"
          placeholder="Enter price"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full px-3 py-2"
          >
            <option value="Kitchen & Dining">Kitchen & Dining</option>
            <option value="Personal Care">Personal Care</option>
            <option value="Home Supplies">Home Supplies</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className="w-full px-3 py-2"
          >
            <option value="Kitchen">Kitchen</option>
            <option value="Dining">Dining</option>
            <option value="Hydration & Wellness">Hydration & Wellness</option>
            <option value="Cleaning">Cleaning</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          onChange={(e) => setBestseller(e.target.checked)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>

      <button
        type="submit"
        className={`w-28 py-3 mt-4 text-white ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-black hover:bg-gray-800"}`}
        disabled={loading}
      >
        {loading ? "Adding..." : "ADD"}
      </button>
    </form>
  );
};

export default Add;
