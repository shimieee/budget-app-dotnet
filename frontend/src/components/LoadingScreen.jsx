import React from "react";

const LoadingScreen = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-[#F4EBD0] z-50">
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#b88b5a] border-b-4 border-[#667538] mb-4"></div>
      <span className="text-[#425951] text-xl font-bold">Loading...</span>
    </div>
  </div>
);

export default LoadingScreen; 