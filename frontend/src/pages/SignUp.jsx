import React, { useState } from "react";
import logo from "../assets/logo.png"; // Update path if needed
import { useNavigate } from "react-router-dom"; // for navigation after sign up
import { registerUser } from "../api/auth";
import Header from "../components/Header";


const SignUp = () => {
  const navigate = useNavigate();
  // State variables for email, password, confirm password, error messages, and success messages
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Function to handle sign up form submission
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await registerUser({ fullName, username, email, password });
      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.response?.data || "Registration failed");
    }
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-[#F4EBD0] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-xl shadow-xl p-8">
          <div className="flex flex-col items-center">
            <img src={logo} alt="Budget Bud" className="h-16 w-auto mb-6" />
            <h1 className="text-2xl font-bold text-[#425951] mb-2">Create Account</h1>
            <p className="text-[#667538] text-sm mb-8">Sign up to start budgeting smarter</p>
          </div>

          <form className="space-y-4" onSubmit={handleSignUp}>
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-[#667538] mb-2">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                className="w-full px-4 py-2 rounded-lg bg-[#F4EBD0] border border-[#b7d3a8] text-[#425951] placeholder-[#b7d3a8] focus:outline-none focus:border-[#b88b5a] focus:ring-1 focus:ring-[#b88b5a]"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-[#667538] mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                className="w-full px-4 py-2 rounded-lg bg-[#F4EBD0] border border-[#b7d3a8] text-[#425951] placeholder-[#b7d3a8] focus:outline-none focus:border-[#b88b5a] focus:ring-1 focus:ring-[#b88b5a]"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#667538] mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-2 rounded-lg bg-[#F4EBD0] border border-[#b7d3a8] text-[#425951] placeholder-[#b7d3a8] focus:outline-none focus:border-[#b88b5a] focus:ring-1 focus:ring-[#b88b5a]"
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
                className="w-full px-4 py-2 rounded-lg bg-[#F4EBD0] border border-[#b7d3a8] text-[#425951] placeholder-[#b7d3a8] focus:outline-none focus:border-[#b88b5a] focus:ring-1 focus:ring-[#b88b5a]"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#667538] mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="w-full px-4 py-2 rounded-lg bg-[#F4EBD0] border border-[#b7d3a8] text-[#425951] placeholder-[#b7d3a8] focus:outline-none focus:border-[#b88b5a] focus:ring-1 focus:ring-[#b88b5a]"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              className="w-full py-3 px-4 bg-[#b88b5a] text-white font-semibold rounded-lg hover:bg-[#a07a4a] focus:outline-none focus:ring-2 focus:ring-[#b7d3a8] focus:ring-offset-2 focus:ring-offset-white transition-colors"
            >
              Sign Up
            </button>

            <div className="text-center text-sm text-[#667538]">
              Already have an account?{" "}
              <a href="/login" className="text-[#b88b5a] hover:text-[#a07a4a]">
                Log in
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>

  );
};

export default SignUp;
