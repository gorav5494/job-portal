import React from "react";

import { Link } from "react-router-dom";

function Banner() {
  return (
    <>
      <section
        className="min-h-screen bg-cover bg-center relative 
      before:content-[''] before:top-0 before:left-0 before:w-full before:h-full before:bg-cover before:bg-center before:bg-no-repeat before:absolute before:bg-[url('../public/bg-cover.jpg')] "
      >
        <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="container">
            <div className="flex gap-10 justify-center lg:justify-between flex-wrap items-center">
              <div className="lg:w-1/2 w-full xl:text-left text-center ">
                <p className="text-white mb-4 text-2xl">
                  Find Jobs, Employment & Career Opportunities
                </p>
                <h1 className="text-white text-5xl xl:text-6xl font-bold">
                  Get a Job That’s Perfect for You
                </h1>
                <p className="text-white mt-5">
                  Explore top job openings tailored to your skills and
                  ambitions. Start your journey toward a rewarding career today.
                </p>

                <div className="flex justify-center lg:justify-start mt-10">
                  <div className="relative"></div>
                  <Link
                    to={"/search"}
                    className="flex items-center justify-center text-white  relative h-12 w-40 overflow-hidden border border-white  shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-indigo-600 before:duration-300 before:ease-out hover:text-white hover:shadow-indigo-600 hover:before:h-40 hover:before:w-40 hover:before:opacity-80"
                  >
                    <span className="relative z-10">More Search</span>
                  </Link>
                </div>
              </div>
              <div className="w-full lg:w-1/2 lg:absolute right-10 xl:right-[15%] top-[15%] max-w-sm xl:max-w-lg">
                <img className="rounded-full  " src="/girl-img.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Banner;
