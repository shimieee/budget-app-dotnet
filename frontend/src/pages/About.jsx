import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowRightCircleIcon } from '@heroicons/react/20/solid';

const About = () => {
  return (
    <>
      <Header />
      {/* Section 1: Mission/Intro */}
      <section className="py-24 relative bg-[#F4EBD0]">
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
          <div className="w-full justify-start items-center gap-12 grid lg:grid-cols-2 grid-cols-1">
            {/* Images */}
            <div className="w-full justify-center items-start gap-6 grid sm:grid-cols-2 grid-cols-1 lg:order-first order-last">
              <div className="pt-24 flex justify-center items-start gap-2.5">
                <div className="rounded-xl object-cover shadow-lg border border-[#b7d3a8] bg-[#e9e5d6] flex items-center justify-center w-full h-48">
                  <span className="text-[#b88b5a] font-semibold">Image Placeholder</span>
                </div>
              </div>
              <div className="sm:ml-0 ml-auto rounded-xl object-cover shadow-lg border border-[#b7d3a8] bg-[#e9e5d6] flex items-center justify-center w-full h-48">
                <span className="text-[#b88b5a] font-semibold">Image Placeholder</span>
              </div>
            </div>
            {/* Text */}
            <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
              <div className="w-full flex-col justify-center items-start gap-8 flex">
                <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                  <h2 className="text-[#425951] text-4xl font-bold leading-normal lg:text-start text-center">
                    Empowering You to Master Your Money!
                  </h2>
                  <p className="text-[#667538] text-base leading-relaxed lg:text-start text-center">
                    BudgetWise is dedicated to helping individuals and families take control of their finances. Our mission is to make budgeting simple, insightful, and stress-free—so you can focus on what matters most.
                  </p>
                </div>
                <div className="w-full lg:justify-start justify-center items-center sm:gap-10 gap-5 inline-flex">
                  <div className="flex-col justify-start items-start inline-flex">
                    <h3 className="text-[#b88b5a] text-4xl font-bold leading-normal">5+</h3>
                    <h6 className="text-[#425951] text-base leading-relaxed">Years of Service</h6>
                  </div>
                  <div className="flex-col justify-start items-start inline-flex">
                    <h4 className="text-[#b7d3a8] text-4xl font-bold leading-normal">10K+</h4>
                    <h6 className="text-[#425951] text-base leading-relaxed">Happy Users</h6>
                  </div>
                  <div className="flex-col justify-start items-start inline-flex">
                    <h4 className="text-[#b88b5a] text-4xl font-bold leading-normal">100K+</h4>
                    <h6 className="text-[#425951] text-base leading-relaxed">Budgets Created</h6>
                  </div>
                </div>
              </div>
              <button
                className="sm:w-fit w-full px-3.5 py-2 bg-[#b88b5a] hover:bg-[#a07a4a] transition-all duration-300 rounded-lg shadow justify-center items-center flex"
              >
                <span className="px-2 py-1 text-white text-xl font-medium leading-6">Read More</span>
                <ArrowRightCircleIcon className="h-7 w-7 text-white ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Achievements/Story */}
      <section className="py-24 relative xl:mr-0 lg:mr-5 mr-0">
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
          <div className="w-full justify-start items-center xl:gap-12 gap-10 grid lg:grid-cols-2 grid-cols-1">
            {/* Text */}
            <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
              <div className="w-full flex-col justify-center items-start gap-8 flex">
                <div className="flex-col justify-start lg:items-start items-center gap-4 flex">
                  <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                    <h2 className="text-[#425951] text-4xl font-bold leading-normal lg:text-start text-center">
                      Our Journey to Financial Empowerment
                    </h2>
                    <p className="text-[#667538] text-base leading-relaxed lg:text-start text-center">
                      Since our founding, BudgetWise has helped thousands of users build better financial habits, save more, and achieve their goals. Our platform is built on trust, simplicity, and a passion for making personal finance accessible to everyone.
                    </p>
                  </div>
                </div>
                <div className="w-full flex-col justify-center items-start gap-6 flex">
                  <div className="w-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                    <div className="w-full h-full p-3.5 bg-[#b7d3a8] rounded-xl border border-[#b88b5a] hover:border-[#425951] transition-all duration-300 flex-col justify-start items-start gap-2.5 inline-flex">
                      <h4 className="text-[#425951] text-2xl font-bold leading-9">5+ Years</h4>
                      <p className="text-[#425951] text-base leading-relaxed">Empowering Financial Wellness</p>
                    </div>
                    <div className="w-full h-full p-3.5 rounded-xl border border-[#b88b5a] hover:border-[#425951] transition-all duration-300 flex-col justify-start items-start gap-2.5 inline-flex">
                      <h4 className="text-[#b88b5a] text-2xl font-bold leading-9">10K+ Users</h4>
                      <p className="text-[#425951] text-base leading-relaxed">Growing Community</p>
                    </div>
                  </div>
                  <div className="w-full h-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                    <div className="w-full p-3.5 rounded-xl border border-[#b88b5a] hover:border-[#425951] transition-all duration-300 flex-col justify-start items-start gap-2.5 inline-flex">
                      <h4 className="text-[#b88b5a] text-2xl font-bold leading-9">50+ Awards</h4>
                      <p className="text-[#425951] text-base leading-relaxed">Recognized for Innovation</p>
                    </div>
                    <div className="w-full h-full p-3.5 bg-[#b7d3a8] rounded-xl border border-[#b88b5a] hover:border-[#425951] transition-all duration-300 flex-col justify-start items-start gap-2.5 inline-flex">
                      <h4 className="text-[#425951] text-2xl font-bold leading-9">99% Satisfaction</h4>
                      <p className="text-[#425951] text-base leading-relaxed">Our Users Love Us</p>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="sm:w-fit w-full group px-3.5 py-2 bg-[#b7d3a8] hover:bg-[#b88b5a] rounded-lg shadow transition-all duration-300 justify-center items-center flex"
              >
                <span className="px-1.5 text-[#425951] text-m font-medium leading-6 group-hover:-translate-x-0.5 transition-all duration-300">
                  Read More
                </span>
                <ArrowRightCircleIcon className="h-7 w-7 text-[#425951] ml-2 group-hover:translate-x-0.5 transition-all duration-300" />
              </button>
            </div>
            {/* Image */}
            <div className="w-full lg:justify-start justify-center items-start flex">
              <div className="sm:w-[564px] w-full sm:h-[646px] h-full bg-[#F4EBD0] rounded-3xl sm:border border-[#b88b5a] relative flex items-center justify-center">
                <span className="text-[#b88b5a] font-semibold">Image Placeholder</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;
