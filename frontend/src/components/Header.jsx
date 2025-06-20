import React from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserCircleIcon, ArrowRightOnRectangleIcon, InformationCircleIcon, DocumentTextIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { jwtDecode } from "jwt-decode";

const navLinks = [
  { to: "/about", label: "About", icon: InformationCircleIcon },
  { to: "#doc", label: "Docs", icon: DocumentTextIcon },
  { to: "#contact", label: "Contact", icon: ChatBubbleLeftRightIcon },
];

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
    <header className="flex items-center justify-between px-8 pt-4 pb-2 bg-[#F4EBD0] shadow-sm font-['Roboto_Condensed',sans-serif] font-bold">
      {/* Logo */}
      <Link to={isLoggedIn ? "/dashboard" : "/"} className="flex items-center gap-2">
        <img src={logo} alt="logo" className="h-16 w-auto" />
      </Link>

      {/* Navigation */}
      <nav className="flex-1 flex justify-center gap-10 text-lg font-bold font-['Roboto_Condensed',sans-serif]">
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`relative flex items-center gap-2 text-[#667538] hover:text-[#b88b5a] transition-colors duration-200 px-2 py-1
                ${location.pathname === link.to ? "font-bold underline underline-offset-4" : ""}`}
            >
              <Icon className="h-6 w-6" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* User Actions */}
      <div className="flex items-center gap-5 text-lg font-bold font-['Roboto_Condensed',sans-serif]">
        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="px-4 py-2 rounded-md bg-[#667538] text-white font-semibold hover:bg-green-800 transition"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-md bg-[#b88b5a] text-white font-semibold hover:bg-[#a07a4a] transition"
            >
              Sign up
            </Link>
          </>
        ) : (
          <>
            <div className="relative group">
              <UserCircleIcon className="h-8 w-8 text-[#425951] group-hover:text-[#b88b5a] transition" />
              <span className="absolute left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-xs bg-[#425951] text-white rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                Account
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-full hover:bg-[#e9e5d6] transition relative group"
              title="Sign Out"
            >
              <ArrowRightOnRectangleIcon className="h-7 w-7 text-[#425951] group-hover:text-[#b88b5a] transition" />
              <span className="absolute left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-xs bg-[#425951] text-white rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                Sign Out
              </span>
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;