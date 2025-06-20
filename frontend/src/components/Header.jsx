import React from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { UserCircleIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { jwtDecode } from "jwt-decode";


const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  // Decode user info from JWT
  let user = null;
  if (token) {
    try {
      user = jwtDecode(token);
    } catch (e) {
      user = null;
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between px-3 py-2 bg-[#F4EBD0]">
      <div className="flex items-center gap-2">
        <img src={logo} alt="logo" className="w-50 h-20" />
      </div>

      <nav className="flex-1 flex justify-center gap-6 text-xl">
        <a href="#doc" className="text-[#667538] hover:text-green-700 transition">doc.</a>
        <a href="#contact" className="text-[#667538] hover:text-green-700 transition">contact.</a>
        <Link to="/about" className="text-[#667538] hover:text-green-700 transition">about.</Link>
      </nav>

      <div className="flex items-center gap-4 pr-6">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="px-2 py-1 rounded-md bg-[#667538] text-white text-xl font-semibold hover:bg-green-800 transition">Log in</Link>
            <Link to="/signup" className="px-2 py-1 rounded-md bg-[#b88b5a] text-white text-xl font-semibold hover:bg-[#a07a4a] transition">Sign up</Link>
          </>
        ) : (
          <>
            <UserCircleIcon className="h-10 w-10 text-[#667538]]" />
            <button onClick={handleLogout} className="p-1 rounded-full hover:bg-red-100 transition">
              <ArrowRightOnRectangleIcon className="h-8 w-8 text-[#667538]"/>
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;