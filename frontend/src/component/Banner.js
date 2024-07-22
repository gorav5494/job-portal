import React from "react";

function Banner() {
  return (
    <div>
      <div
        className="relative min-h-screen bg-cover bg-center bg-[url('../public/image/banner.jpg')]"
        // style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white p-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Find Your Dream Job
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Search for job opportunities and apply with ease
            </p>

            {/* Search Input */}
            <div className="flex justify-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search job title or keyword"
                  className="text-black font-medium py-2 px-4 w-full md:w-96 rounded-l-md focus:outline-none"
                />
                <button className="uppercase bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-r-md">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
