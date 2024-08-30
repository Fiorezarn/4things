import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import Banner from "../../assets/business-discussion.svg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${BASE_URL}/auth/${email}`, {
        password,
      });

      const data = response.data;

      if (data.status === "success") {
        alert("Password reset successful!");
        navigate("/login");
      } else {
        setError("Password reset failed. Please check your details.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 flex justify-center items-center h-screen">
        <div className="w-1/2 h-screen hidden lg:block">
          <img src={Banner} alt="Placeholder Image" className="mt-10" />
        </div>

        <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
          <h1 className="text-2xl font-semibold mb-4">Forgot Password</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600">
                New Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}{" "}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
            >
              Reset Password
            </button>
          </form>

          <div className="mt-6 text-blue-500 text-center">
            <a href="/register" className="hover:underline">
              Sign up Here
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
