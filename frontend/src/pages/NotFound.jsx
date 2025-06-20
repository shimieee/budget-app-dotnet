import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const NotFound = () => {
  return (
    <>
    <Header/>
    <div className="min-h-screen bg-[#F4EBD0] flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-6xl font-bold text-[#425951] mb-4">404</h1>
      <p className="text-2xl text-[#667538] mb-8">Page Not Found</p>
      <p className="text-lg text-[#b88b5a] mb-8">The page you're looking for doesn't exist or has been moved.</p>
      <Link 
        to="/"
        className="inline-flex items-center justify-center rounded-md bg-[#667538] px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-[#425951] transition"
      >
        Go to Homepage
      </Link>
    </div>
    </>
  );
};

export default NotFound; 