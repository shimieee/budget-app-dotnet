import React from "react";
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon, BookOpenIcon } from "@heroicons/react/20/solid";
// Removed: import Header from "../components/Header"; // Header is rendered globally in App.jsx
import { Link } from "react-router-dom";
// import Screenshot from "../assets/screenshot.png"; // Uncomment and use your actual screenshot if available

const LandingPage = () => (
    <div className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0 bg-[#F4EBD0]">
    {/* Content */}
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2 lg:items-start lg:gap-y-10">
      {/* Left Content */}
      <div className="lg:pr-8">
        <div className="max-w-lg">
          
          <h1 className="mt-4 text-5xl font-bold tracking-tight text-[#425951] sm:text-5xl">
            Your Smart Budget Companion!
          </h1>
          <p className="mt-6 text-xl text-[#667538]">
            Take control of your money with Budget Bud — your simple, smart companion for tracking spending, setting goals, and building better financial habits. Whether you're saving for something big or just trying to stay on top of daily expenses, Budget Bud makes budgeting easy, friendly, and stress-free.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center rounded-md bg-[#b88b5a] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#a07a4a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b88b5a]"
            >
              Get Started
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center rounded-md bg-[#b7d3a8] px-4 py-2.5 text-sm font-semibold text-[#425951] shadow-sm hover:bg-[#a7c398] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b7d3a8]"
            >
              Learn More
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="mt-12">
            <h2 className="text-lg font-semibold text-[#425951] mb-6">Why Choose Budget Bud?</h2>
            <ul role="list" className="space-y-6 text-[#667538]">
              <li className="flex gap-x-4 rounded-lg bg-[#e9e5d6] p-4 ring-1 ring-[#b7d3a8]">
                <BookOpenIcon className="mt-1 h-5 w-5 flex-none text-[#b88b5a]" />
                <div>
                  <h3 className="font-semibold text-[#425951]">Organized Budgets</h3>
                  <p className="mt-1">Keep all your financial plans in one place, beautifully organized and easily accessible.</p>
                </div>
              </li>
              <li className="flex gap-x-4 rounded-lg bg-[#e9e5d6] p-4 ring-1 ring-[#b7d3a8]">
                <CloudArrowUpIcon className="mt-1 h-5 w-5 flex-none text-[#b88b5a]" />
                <div>
                  <h3 className="font-semibold text-[#425951]">Access Anywhere</h3>
                  <p className="mt-1">Track your budget on any device, anytime. Your data is always in sync and ready when you are.</p>
                </div>
              </li>
              <li className="flex gap-x-4 rounded-lg bg-[#e9e5d6] p-4 ring-1 ring-[#b7d3a8]">
                <LockClosedIcon className="mt-1 h-5 w-5 flex-none text-[#b88b5a]" />
                <div>
                  <h3 className="font-semibold text-[#425951]">Secure & Private</h3>
                  <p className="mt-1">Your data is protected with enterprise-grade security and privacy controls.</p>
                </div>
              </li>
              <li className="flex gap-x-4 rounded-lg bg-[#e9e5d6] p-4 ring-1 ring-[#b7d3a8]">
                <ServerIcon className="mt-1 h-5 w-5 flex-none text-[#b88b5a]" />
                <div>
                  <h3 className="font-semibold text-[#425951]">Smart Features</h3>
                  <p className="mt-1">Insights, reminders, and collaborative tools to enhance your budgeting experience.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Right Content - Screenshot */}
      <div className="lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-visible lg:-mr-48 flex items-center justify-end">
        <div className="relative rounded-l-lg overflow-hidden bg-[#b7d3a8] border-l border-t border-b border-[#667538] w-[140%] shadow-xl flex items-center justify-center h-[400px]">
          {/* Replace the div below with your actual screenshot if available */}
          <span className="text-2xl text-[#425951] font-bold">Screenshot here</span>
        </div>
      </div>
    </div>
  </div>
);

export default LandingPage;

