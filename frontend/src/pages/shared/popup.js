import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios"

const JobPortalPopup = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [option, setOption] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userdata");
    if (token) {
      setIsLoggedIn(true);
      setShowPopup(false);
    } else {
      setShowPopup(true);
    }
    // console.log(token);
  }, []);

  const handleOptionChange = (e) => {
    setOption(e.target.value);
    setError("");
  };

  const closepopup = () => {
    setShowPopup(false);
  };

  const handleSubmit = () => {
    if (!option) {
      setError("Please select an option");
      return;
    }
    navigate("/login");
    console.log(`Selected option: ${option}`);
    setShowPopup(false);
    // const selectedOption = option;
    localStorage.setItem("usertype", JSON.stringify(option));
    // localStorage.setItem("isLoggedIn", "true");
    // console.log("Selected option:", selectedOption);
  };

  if (!showPopup || isLoggedIn) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
      <div className="bg-white rounded-lg p-8 max-w-md relative">
        <div
          className="h-[20px] w-[20px] absolute top-3 right-3 cursor-pointer"
          onClick={closepopup}
        >
          <svg
            viewPort="0 0 12 12"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="1"
              y1="11"
              x2="11"
              y2="1"
              stroke="black"
              stroke-width="2"
            />
            <line
              x1="1"
              y1="1"
              x2="11"
              y2="11"
              stroke="black"
              stroke-width="2"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4">Welcome to the Job Portal</h2>
        <p className="mb-4">Please select an option:</p>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="recruitment"
              checked={option === "recruitment"}
              onChange={handleOptionChange}
              className="form-radio text-blue-500"
            />
            <span className="ml-2">Recruitment</span>
          </label>
        </div>
        <div className="mb-6">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="applyJob"
              checked={option === "applyJob"}
              onChange={handleOptionChange}
              className="form-radio text-blue-500"
            />
            <span className="ml-2">Apply for a Job</span>
          </label>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default JobPortalPopup;
