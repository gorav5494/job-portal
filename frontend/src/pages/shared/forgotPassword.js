import React from "react";
import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

const ForgetPassoword = () => {
  // const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/users/forgetPassword", email);
      console.log("fdfd", res.data);
      // setIsLoggedIn(true);

      localStorage.setItem("userdata", JSON.stringify(res.data.data));

      console.log(res.data);
      setSuccess(true);
      // if (res.data) {
      //   setSuccess(true);
      //   // setSuccessmsg(res.data.message);
      //   setTimeout(() => {
      //     // setSuccessmsg("");
      //     setSuccess(false);
      //     // const userType = localStorage.getItem("usertype");

      //     navigate("/login");
      //   }, 2000);
      // }
    } catch (err) {
      console.log(err);
      setError(true);

      console.error(err.response.data);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  return (
    <>
      <section className="py-10 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% h-screen">
        <div>
          <h2 className="text-2xl uppercase text-white font-semibold text-center mb-10">
            Forgot Password
          </h2>
          {error && <p>{error}</p>}
          {success && <p>{success}</p>}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded shadow-md w-96 mx-auto"
          >
            <div className="mb-6">
              <input
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-400"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Request Reset
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default ForgetPassoword;
