import React from "react";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div>
      <footer className="bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <h3 className="text-lg font-semibold text-white mb-2">About</h3>
              <p className="text-gray-400">
                Our job portal connects talented individuals with top employers.
              </p>
            </div>
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <h3 className="text-lg font-semibold text-white mb-2">
                Quick Links
              </h3>
              <ul className="text-gray-400">
                <li>
                  <Link to={"/"} className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to={"/"} className="hover:text-white">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to={"/"} className="hover:text-white">
                    Companies
                  </Link>
                </li>
                <li>
                  <Link to={"/"} className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h3 className="text-lg font-semibold text-white mb-2">
                Subscribe
              </h3>
              <p className="text-gray-400 mb-4">
                Stay updated with our latest job postings.
              </p>
              <form>
                <div className="flex flex-wrap">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="bg-gray-700 text-white px-4 py-2 rounded-l focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400">
            <p>&copy; 2024 Job Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
