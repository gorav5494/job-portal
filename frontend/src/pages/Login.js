import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(false);
  const [errormsg, setErrormsg] = useState({ message: "", stack: "" });
  const [successmsg, setSuccessmsg] = useState("");
  const [success, setSuccess] = useState(false);
  // const [usertype, setUsertype] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/users/login", formData);
      // setIsLoggedIn(true);
      localStorage.setItem("userdata", JSON.stringify(res.data.data));

      console.log(res.data);

      if (res.data) {
        setSuccess(true);
        setSuccessmsg(res.data.message);
        setTimeout(() => {
          setSuccessmsg("");
          setSuccess(false);
          const usertype = localStorage.getItem("usertype");
          if (usertype === "recruitment") {
            navigate("/addjob");
          } else if (usertype === "applyJob") {
            navigate("/");
          } else {
            navigate("/");
          }
        }, 2000);
      }
    } catch (err) {
      console.log(err);
      setError(true);

      setErrormsg(err.response.data);

      console.error(err.response.data);
      setTimeout(() => {
        setError(false);
        setErrormsg({});

        if (err.response.status === 400) {
          navigate("/register");
        }
      }, 3000);
    }

    const errors = {};
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }

    if (Object.keys(errors).length === 0) {
    } else {
      setErrors(errors);
    }
  };

  return (
    <div>
      <section className="py-10 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% h-screen">
        <div className="container mx-auto">
          <h1 className="text-2xl uppercase text-white font-semibold text-center mb-10">
            User Login
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

            {/* {loading && <Loading />} */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="E  mail"
                  className="block text-gray-700 font-bold mb-2"
                >
                  User Email
                </label>
                <input
                  type="text"
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
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } p-2 rounded focus:outline-none focus:border-blue-400`}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Login
              </button>
              {/* { isLoggedIn && (<button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Login
                </button>
                )
              } */}
            </form>
          </div>
          <div className="flex pt-10  justify-center">
            <div className="px-5 text-center text-lg text-white ">
              New User ?{" "}
              <Link to="/register" className="hover:text-black ">
                Register User
              </Link>
            </div>
            <div className="px-2 border-l text-center text-white ">
              <Link to="/forgotpassword" className="hover:text-black text-lg">
                Forget Passoword
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
