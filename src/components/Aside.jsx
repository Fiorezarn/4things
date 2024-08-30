import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BsQuestionDiamond } from "react-icons/bs";
import { FaFireFlameCurved } from "react-icons/fa6";
import { IoIosHome } from "react-icons/io";

export default function Aside() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const token = sessionStorage.getItem("accessToken");
  const userInfo = sessionStorage.getItem("userInfo");
  const user = userInfo ? JSON.parse(userInfo).user_id : null;

  const routes = {
    home: "/",
    trending: "/trending",
    questions: user ? `/question/${user}` : "/login",
  };

  return (
    <aside className="w-96 p-4 h-1/2 border-2 rounded-2xl">
      <div className="grid gap-4 justify-items-center">
        <a
          href={routes.home}
          className={`flex items-center gap-2 rounded-xl py-2 px-4 font-bold text-md text-center ${
            currentPath === routes.home
              ? "bg-red-400 text-white"
              : "hover:bg-red-400 hover:text-white"
          }`}
        >
          <IoIosHome />
          Home
        </a>
        <a
          href={routes.trending}
          className={`flex items-center gap-2 rounded-xl py-2 px-4 font-bold text-md text-center ${
            currentPath === routes.trending
              ? "bg-red-400 text-white"
              : "hover:bg-red-400 hover:text-white"
          }`}
        >
          <FaFireFlameCurved />
          Trending
        </a>
        <a
          href={routes.questions}
          onClick={(e) => {
            if (!token) {
              e.preventDefault(); // Mencegah pengguna yang tidak login mengklik
              navigate("/login"); // Arahkan ke halaman login
            }
          }}
          className={`flex items-center gap-2 rounded-xl py-2 px-4 font-bold text-md text-center ${
            currentPath === routes.questions
              ? "bg-red-400 text-white"
              : "hover:bg-red-400 hover:text-white"
          }`}
        >
          <BsQuestionDiamond size={20} />
          My Questions
        </a>
      </div>
    </aside>
  );
}
