import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import Banner from "../../assets/business-discussion.svg";

export default function Register() {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, {
        username,
        full_name: fullname,
        email,
        password,
        created_by: fullname,
      });

      const data = response.data;

      if (data.status === "success") {
        sessionStorage.setItem("accessToken", data.data.accessToken);
        sessionStorage.setItem("userInfo", JSON.stringify(data.data.user));
        alert("Login Successful!");
        navigate("/");
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
          <h1 className="text-2xl font-semibold mb-4">Register</h1>
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
              <label htmlFor="fullname" className="block text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>

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

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
            >
              Register
            </button>
          </form>

          <div className="mt-6 text-blue-500 text-center">
            <a href="#" className="hover:underline">
              Sign up Here
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
