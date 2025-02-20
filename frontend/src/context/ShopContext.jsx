import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Get backend URL from environment variables
const backendUrlFromEnv = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const currency = "$";
    const delivery_fee = 10;
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);

    // Load cart items from localStorage
    const [cartItems, setCartItems] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("cartItems")) || {};
        } catch (error) {
            console.error("Error loading cartItems from localStorage:", error);
            return {};
        }
    });

    // Load user from localStorage (Persistent login)
    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("user")) || null;
        } catch (error) {
            console.error("Error loading user data from localStorage:", error);
            return null;
        }
    });

    // Backend URL from environment variable
    const [backendUrl, setBackendUrl] = useState(backendUrlFromEnv);

    // Update localStorage whenever cartItems change
    useEffect(() => {
        try {
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        } catch (error) {
            console.error("Error saving cartItems to localStorage:", error);
        }
    }, [cartItems]);

    // Update localStorage whenever user logs in/out
    useEffect(() => {
        try {
            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
            } else {
                localStorage.removeItem("user");
            }
        } catch (error) {
            console.error("Error handling user data in localStorage:", error);
        }
    }, [user]);

    // Add item to cart
    const addToCart = (itemId) => {
        if (!user) {
            toast.error("Please log in to add items to your cart.");
            navigate("/login");
            return;
        }

        setCartItems((prevCart) => {
            const updatedCart = { ...prevCart, [itemId]: (prevCart[itemId] || 0) + 1 };
            try {
                localStorage.setItem("cartItems", JSON.stringify(updatedCart));
            } catch (error) {
                console.error("Error updating cart in localStorage:", error);
            }
            toast.success("Product added to cart!");
            return updatedCart;
        });
    };

    // Update item quantity in cart
    const updateQuantity = (itemId, quantity) => {
        setCartItems((prevCart) => {
            const updatedCart = { ...prevCart };
            if (quantity > 0) {
                updatedCart[itemId] = quantity;
            } else {
                delete updatedCart[itemId]; // Remove item if quantity is 0
            }
            try {
                localStorage.setItem("cartItems", JSON.stringify(updatedCart));
            } catch (error) {
                console.error("Error updating cart in localStorage:", error);
            }
            return updatedCart;
        });
    };

    // Get total cart count
    const getCartCount = () => Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);

    // Get total cart amount
    const getCartAmount = () => {
        return Object.entries(cartItems).reduce((totalAmount, [itemId, quantity]) => {
            const itemInfo = products.find((product) => product._id === itemId);
            return totalAmount + (itemInfo?.price || 0) * quantity;
        }, 0);
    };

    // Handle user login
    const handleLogin = (userData) => {
        setUser(userData);
        try {
            localStorage.setItem("user", JSON.stringify(userData));
        } catch (error) {
            console.error("Error saving user data in localStorage:", error);
        }
        navigate("/"); // Redirect to home after login
    };

    // Handle user logout
    const handleLogout = () => {
        setUser(null);
        try {
            localStorage.removeItem("user");
        } catch (error) {
            console.error("Error removing user data from localStorage:", error);
        }
        navigate("/login"); // Redirect to login after logout
    };

    const value = {
        currency,
        delivery_fee,
        products,
        navigate,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        addToCart,
        updateQuantity,
        cartItems,
        getCartCount,
        getCartAmount,
        backendUrl,
        setBackendUrl,
        user,
        handleLogin,
        handleLogout,
    };

    return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
