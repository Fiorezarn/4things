import React from "react";
import { useNavigate } from "react-router-dom";

export default function SidebarAdmin() {
  const navigate = useNavigate();
  return (
    <div className="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900">
      <div className="text-gray-100 text-xl">
        <div className="p-2.5 mt-1 flex items-center">
          <h1 className="font-bold text-gray-200 text-2xl ml-3">
            4Things<span className="text-blue-600"> Dashboard</span>
          </h1>
        </div>
        <div className="my-2 bg-gray-600 h-[1px]"></div>
      </div>
      <a
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-blue-600 text-white"
        href="/"
      >
        <i className="bi bi-house-door-fill"></i>
        <span className="text-xl ml-4 flex items-center text-gray-200 font-bold">
          <box-icon name="dashboard" type="solid" color="#ffffff"></box-icon>
          Dashboard
        </span>
      </a>
      <a
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
        href="/"
      >
        <i className="bi bi-house-door-fill"></i>
        <span className="text-xl ml-4 flex items-center text-gray-200 font-bold">
          <box-icon name="analyse" color="#ffffff" type="solid"></box-icon>
          Home
        </span>
      </a>
      <a
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
        onClick={() => {
          sessionStorage.removeItem("accessToken");
          sessionStorage.removeItem("userInfo");
          navigate("/login");
        }}
      >
        <i className="bi bi-house-door-fill"></i>
        <span className="text-xl ml-4 flex items-center text-gray-200 font-bold">
          <box-icon name="analyse" color="#ffffff" type="solid"></box-icon>
          Logout
        </span>
      </a>
    </div>
  );
}
