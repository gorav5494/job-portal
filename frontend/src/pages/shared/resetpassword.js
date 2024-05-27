import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(`/api/users/reset-password/${token}`, {
        password,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <section className="py-10 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% h-screen">
      <div>
        <h2 className="text-2xl uppercase text-white font-semibold text-center mb-10">
          Reset Password
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded shadow-md w-96 mx-auto"
        >
          <div className="mb-6">
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="mb-6">
            <input
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-400"
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Reset Password
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </section>
  );
};

export default ResetPassword;
