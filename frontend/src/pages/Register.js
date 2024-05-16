import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";


function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState(false);
  const [errormsg, setErrormsg] = useState({message:"",stack:""});
  const [successmsg, setSuccessmsg] = useState("");
  const [success, setSuccess] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users', formData);
      console.log(res.data); 
      if(res.data){
        setSuccess(true);
        setSuccessmsg(res.data.message);
        setTimeout(()=>{
          navigate('/login')                      
        },2000)
      }
      setTimeout(()=>{
        setSuccessmsg(""); 
        setSuccess(false);            
      },2000)
      
    } catch (err) {

      setError(true);
      setErrormsg(err.response.data);
      console.error(err.response.data); 
      setTimeout(()=>{
        setError(false); 
        setErrormsg({})    
      },3000) // Handle registration error
    }

    //
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }
    if (formData.password !== formData.passwordConfirmation) {
      errors.passwordConfirmation = "Passwords do not match";
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
            User Register
          </h1>
          <div className="bg-white p-8 rounded shadow-md w-96 mx-auto">
          {error && <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert"><p className="font-bold">
            {errormsg.message}</p></div>}
          {success && <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
            <p className="font-bold">{successmsg}</p></div>}
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
              {/* <div className="mb-6">
                <label
                  htmlFor="passwordConfirmation"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  value={formData.passwordConfirmation}
                  onChange={handleChange}
                  className={`w-full border ${
                    errors.passwordConfirmation
                      ? "border-red-500"
                      : "border-gray-300"
                  } p-2 rounded focus:outline-none focus:border-blue-400`}
                  placeholder="Confirm your password"
                />
                {errors.passwordConfirmation && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.passwordConfirmation}
                  </p>
                )}
              </div> */}
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

export default Register;
