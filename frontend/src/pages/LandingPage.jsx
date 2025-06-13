import React from "react";

const LandingPage = () => (
  <main className="flex flex-col items-center justify-center min-h-[80vh] bg-[#f6f1e7] p-8">
    <h1 className="text-4xl font-serif text-green-800 mb-4">Need help with your finances?</h1>
    <p className="max-w-xl text-lg text-gray-700 mb-8 text-center">
      Take control of your money with Budget Bud — your simple, smart companion for tracking spending, setting goals, and building better financial habits. Whether you're saving for something big or just trying to stay on top of daily expenses, Budget Bud makes budgeting easy, friendly, and stress-free.
    </p>
    {/* Placeholder for future content or screenshot */}
    <div className="w-full max-w-md h-64 bg-green-200 rounded-xl flex items-center justify-center text-2xl text-green-900 font-bold shadow-inner">
      Insert screenshot or feature highlight here
    </div>
  </main>
);

export default LandingPage;
