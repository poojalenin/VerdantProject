import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [currentState, setCurrentState] = useState("Login"); // 'Login' or 'Sign Up'
    const [formData, setFormData] = useState({ email: "", password: "", name: "" });
    const [message, setMessage] = useState({ text: "", type: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // API Base URL (Fallback to local if ENV variable is missing)
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

    // Check if user is already logged in
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            console.log("🔹 User already logged in. Redirecting to Profile.");
            navigate("/profile");
        }
    }, [navigate]);

    // Handle input changes
    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setMessage({ text: "", type: "" });

        // Basic validation
        if (!formData.email || !formData.password || (currentState === "Sign Up" && !formData.name)) {
            setMessage({ text: "All fields are required", type: "error" });
            return;
        }

        if (formData.password.length < 6) {
            setMessage({ text: "Password must be at least 6 characters", type: "error" });
            return;
        }

        setLoading(true);

        try {
            const endpoint =
                currentState === "Login"
                    ? `${API_BASE_URL}/api/user/login`
                    : `${API_BASE_URL}/api/user/register`;

            console.log("🔗 Sending request to:", endpoint);
            console.log("📤 Request Data:", formData);

            const response = await axios.post(endpoint, formData, {
                withCredentials: true, // ✅ Stores authentication cookies
            });

            console.log("✅ API Response:", response.data);

            if (response.data && response.data.success) {
                setMessage({ text: response.data.message || "Success!", type: "success" });

                if (currentState === "Login") {
                    if (!response.data.user || !response.data.token) {
                        setMessage({ text: "Invalid response from server", type: "error" });
                        return;
                    }

                    localStorage.setItem("user", JSON.stringify(response.data.user)); // ✅ Store user info
                    localStorage.setItem("token", response.data.token); // ✅ Store token securely
                    console.log("🔹 User logged in successfully. Redirecting to Profile.");
                    navigate("/profile"); // ✅ Redirect to Profile Page
                }
            } else {
                setMessage({
                    text: response.data?.message || "Unexpected response from the server",
                    type: "error",
                });
            }
        } catch (error) {
            console.error("❌ API Error:", error.response?.data || error.message);

            if (error.response) {
                const status = error.response.status;
                let errorMsg = error.response.data?.message || "Server error. Try again!";

                if (status === 401) errorMsg = "Invalid credentials. Please try again.";
                if (status === 500) errorMsg = "Internal server error. Try again later.";

                setMessage({ text: errorMsg, type: "error" });
            } else if (error.request) {
                setMessage({ text: "No response from server. Check your connection.", type: "error" });
            } else {
                setMessage({ text: "Something went wrong. Try again!", type: "error" });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
            <form onSubmit={onSubmitHandler} className="w-full flex flex-col items-center gap-4">
                <div className="inline-flex items-center gap-2 mb-2 mt-10">
                    <p className="text-3xl font-bold">{currentState}</p>
                    <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
                </div>

                {/* Name Field (Only for Sign Up) */}
                {currentState === "Sign Up" && (
                    <input
                        className="w-full px-3 py-2 border border-gray-800 rounded"
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={onChangeHandler}
                        required
                    />
                )}

                {/* Email Field */}
                <input
                    className="w-full px-3 py-2 border border-gray-800 rounded"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={onChangeHandler}
                    required
                />

                {/* Password Field */}
                <input
                    className="w-full px-3 py-2 border border-gray-800 rounded"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={onChangeHandler}
                    required
                />

                {/* Toggle between Login/Sign Up */}
                <div className="w-full flex justify-between text-sm mt-[-8px]">
                    <p className="cursor-pointer text-gray-600">Forgot password?</p>
                    <p
                        onClick={() => setCurrentState(currentState === "Login" ? "Sign Up" : "Login")}
                        className="cursor-pointer text-blue-600 font-medium"
                    >
                        {currentState === "Login" ? "Create account" : "Login here"}
                    </p>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-black text-white font-light px-8 py-2 mt-4 rounded"
                    disabled={loading}
                >
                    {loading ? "Processing..." : currentState === "Login" ? "Sign in" : "Sign up"}
                </button>

                {/* Success/Error Message */}
                {message.text && (
                    <p className={`mt-4 ${message.type === "success" ? "text-green-500" : "text-red-500"}`}>
                        {message.text}
                    </p>
                )}
            </form>
        </div>
    );
};

export default Login;
