import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import Banner from "../../assets/business-discussion.svg";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        username,
        password,
      });

      const data = response.data;

      if (data.status === "success") {
        sessionStorage.setItem("accessToken", data.data.accessToken);
        sessionStorage.setItem("userInfo", JSON.stringify(data.data.user));
        const userInfo = sessionStorage.getItem("userInfo");
        const user = userInfo ? JSON.parse(userInfo).role : null;
        console.log(user);
        if (user === "admin") {
          navigate("/admin");
        } else if (user === "user") {
          alert("Login Successful!");
          navigate("/");
        }
      } else {
        setError("Login failed. Please check your credentials.");
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
          <h1 className="text-2xl font-semibold mb-4">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-600">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600">
                Password
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

            {error && <p className="text-red-500">{error}</p>}
            <div>
              <a href="/forgot" className="mb-4">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full mt-5"
            >
              Login
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
