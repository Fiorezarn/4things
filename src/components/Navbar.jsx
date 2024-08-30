import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Dropdown } from "flowbite-react";

export default function Navbar() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    const storedUserInfo = sessionStorage.getItem("userInfo");

    if (token) {
      if (storedUserInfo) {
        try {
          setUserInfo(JSON.parse(storedUserInfo));
        } catch (error) {
          console.error(
            "Failed to parse user info from sessionStorage:",
            error
          );
        }
      } else {
        axios
          .get("http://localhost:3000/auth/users", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            const user = response.data;
            setUserInfo(user);
            sessionStorage.setItem("userInfo", JSON.stringify(user));
          })
          .catch((error) => {
            console.error("Error fetching user info:", error);
          });
      }
    }
  }, []);

  const userId = userInfo ? userInfo.user_id : null;
  const questionsLink = userId ? `/question/${userId}` : "/login";

  return (
    <nav className="w-full h-14 border-b-2 flex justify-between items-center px-10">
      <a href="/" className="w-36 py-1 font-bold text-2xl">
        4Things
      </a>
      <div className="flex gap-2">
        <a href="/" className="w-36 py-1 font-bold text-xl">
          Home
        </a>
        <a href="/trending" className="w-36 py-1 font-bold text-xl">
          Trending
        </a>
        <a href={questionsLink} className="w-36 py-1 font-bold text-xl">
          My Questions
        </a>
      </div>
      {userInfo ? (
        <div className="flex items-center">
          <Dropdown label={userInfo.username} inline>
            <Dropdown.Item
              onClick={() => {
                sessionStorage.removeItem("accessToken");
                sessionStorage.removeItem("userInfo");
                navigate("/login");
              }}
            >
              Sign out
            </Dropdown.Item>
          </Dropdown>
        </div>
      ) : (
        <a href="/login" className="w-36 text-right py-1">
          Sign In
        </a>
      )}
    </nav>
  );
}
