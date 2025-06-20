import React, { useState } from "react";
import logo from "../assets/logo.png"; 
import { Link } from "react-router-dom";
import { loginUser } from "../api/auth"; // API call to login user
import { useNavigate } from "react-router-dom"; // for navigation after login
import Header from "../components/Header";

const Login = () => {
  const navigate = useNavigate();

  // State variables for email, password, error messages, and success messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Function to handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
  
    try {
      const data = await loginUser({ email, password });
      localStorage.setItem("token", data.token);  // save token
      setMessage("Login successful! Redirecting...");
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate("/dashboard"); // navigate to dashboard
      }, 1000);

    } catch (error) {
      setError(error.response?.data || "Login failed");
    }
  };
  // Function to handle forgot password action
  // will do later 
  const handleForgotPassword = () => {
    setMessage("Password reset link sent! (check console for dummy email)");
    setError("");
    console.log(`Sending password reset to: ${email}`);
  };

  return (
    <>
    <Header />
    <div className="min-h-screen bg-[#F4EBD0] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="flex flex-col items-center">
            <img src={logo} alt="Budget Bud" className="h-16 w-auto mb-6" />
            <h1 className="text-2xl font-bold text-[#425951] mb-2">Welcome Back</h1>
            <p className="text-[#667538] text-sm mb-8">Sign in to your account to continue</p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#667538] mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-3 rounded-lg bg-[#f9f5ed] border border-[#d9cbb2] text-[#425951] placeholder-[#b7d3a8] focus:outline-none focus:border-[#b88b5a] focus:ring-1 focus:ring-[#b88b5a]"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#667538] mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-3 rounded-lg bg-[#f9f5ed] border border-[#d9cbb2] text-[#425951] placeholder-[#b7d3a8] focus:outline-none focus:border-[#b88b5a] focus:ring-1 focus:ring-[#b88b5a]"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm bg-red-500/10 p-3 rounded-lg">
                {error}
              </div>
            )}
            {message && (
              <div className="text-green-700 text-sm bg-green-200/60 p-3 rounded-lg">
                {message}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#667538] text-white font-semibold rounded-lg hover:bg-[#425951] focus:outline-none focus:ring-2 focus:ring-[#b7d3a8] focus:ring-offset-2 focus:ring-offset-white transition-colors"
            >
              Sign In
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-[#b88b5a] hover:text-[#a07a4a] focus:outline-none"
              >
                Forgot Password?
              </button>
            </div>

            <div className="text-center text-sm text-[#667538]">
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#b88b5a] hover:text-[#a07a4a]">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
