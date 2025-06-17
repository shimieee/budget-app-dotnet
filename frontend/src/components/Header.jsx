import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Header = () => (
  <header className="flex items-center justify-between px-3 py-2 bg-[#F4EBD0] ">
    <div className="flex items-center gap-2">
        <img src={logo} alt="logo" className="w-50 h-20" />
    </div>
    <nav className="flex-1 flex justify-center gap-6 text-xl">
      <a href="#doc" className="text-[#667538] hover:text-green-700 transition">doc.</a>
      <a href="#contact" className="text-[#667538] hover:text-green-700 transition">contact.</a>
      <a href="#about" className="text-[#667538] hover:text-green-700 transition">about.</a>
    </nav>
    {/* Buttons */}
    <div className="flex items-center gap-2 pr-6">
    <Link to="/login" className="px-2 py-1 rounded-md bg-[#667538] text-white text-xl font-semibold hover:bg-green-800 transition">Log in</Link>
    <Link to="/signup" className="px-2 py-1 rounded-md bg-[#b88b5a] text-white text-xl font-semibold hover:bg-[#a07a4a] transition">Sign up</Link>
    </div>
  </header>
);

export default Header;
