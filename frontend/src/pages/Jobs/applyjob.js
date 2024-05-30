import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Applyjob() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null,
    // status: "pending",
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState(false);
  const [errormsg, setErrormsg] = useState({ message: "", stack: "" });
  const [successmsg, setSuccessmsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/applyjobs/fillform", formData);

      console.log(res.data);

      if (res.data) {
        setSuccess(true);
        setSuccessmsg(res.data.message);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
      setTimeout(() => {
        setSuccessmsg("");
        setSuccess(false);
      }, 2000);
    } catch (err) {
      setError(true);
      setErrormsg(err.response.data);
      console.error(err.response.data);
      setTimeout(() => {
        setError(false);
        setErrormsg({});
      }, 3000);
    }

    //validation

    const errors = {};

    if (!formData.name) {
      errors.name = "name is required";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.about) {
      errors.about = "about is required";
    }
    if (!formData.resume) {
      errors.resume = "Resume is required";
    }

    if (Object.keys(errors).length === 0) {
    } else {
      setErrors(errors);
    }
  };

  return (
    <>
      <section className="py-10 bg-gradient-to-r from-cyan-500 to-blue-500 h-screen">
        <div className="container mx-auto">
          <h1 className="text-2xl uppercase text-white font-semibold text-center mb-10">
            Apply Job
          </h1>

          <div className="bg-white p-8 rounded shadow-md w-96 mx-auto">
            {error && (
              <div
                className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
                role="alert"
              >
                <p className="font-bold">{errormsg.message}</p>
              </div>
            )}
            {success && (
              <div
                className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4"
                role="alert"
              >
                <p className="font-bold">{successmsg}</p>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } p-2 rounded focus:outline-none focus:border-blue-400`}
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } p-2 rounded focus:outline-none focus:border-blue-400`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="about"
                  className="block text-gray-700 font-bold mb-2"
                >
                  About
                </label>
                <input
                  type="about"
                  id="about"
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  className={`w-full border ${
                    errors.about ? "border-red-500" : "border-gray-300"
                  } p-2 rounded focus:outline-none focus:border-blue-400`}
                  placeholder="Enter your about"
                />
                {errors.about && (
                  <p className="text-red-500 text-sm mt-1">{errors.about}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="resume" className="block font-bold mb-2">
                  Upload CV
                </label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  onChange={handleFileChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.resume ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.resume && (
                  <p className="text-red-500 mt-1">{errors.resume}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
export default Applyjob;
