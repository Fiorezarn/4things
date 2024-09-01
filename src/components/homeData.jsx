import React, { Suspense, useState, useEffect } from "react";
import { Await, useNavigate } from "react-router-dom";
import axios, { all } from "axios";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLike } from "react-icons/ai";
import { Accordion } from "flowbite-react";
import { formatDistanceToNow } from "date-fns";
import CommentSection from "./CommentSection";

export default function HomeData(props) {
  function cardElement(allReview) {
    const navigate = useNavigate();
    const reviews = allReview.data;

    if (reviews.length === 0) {
      return (
        <div className="border-2 rounded-lg">
          <p className="text-center align-middle font-bold text-2xl">
            No reviews yet.
          </p>
        </div>
      );
    }

    const reviewElements = reviews.map((review) => {
      const [likes, setLikes] = useState(0);
      const [isLiked, setIsLiked] = useState(false);
      const BASE_URL = import.meta.env.VITE_BASE_URL;

      useEffect(() => {
        async function fetchLikes() {
          try {
            const res = await fetch(
              `${BASE_URL}/likes/count/${review.product_id}`
            );
            const data = await res.json();
            setLikes(data.data);
          } catch (error) {
            console.error("Error fetching likes:", error);
          }
        }

        async function checkIfLiked() {
          const user_id = JSON.parse(
            sessionStorage.getItem("userInfo")
          )?.user_id;
          if (!user_id) return;

          try {
            const res = await fetch(
              `${BASE_URL}/likes/${review.product_id}/${user_id}`
            );
            const data = await res.json();
            setIsLiked(data.data);
          } catch (error) {
            console.error("Error checking if liked:", error);
          }
        }

        fetchLikes();
        checkIfLiked();
      }, [review.product_id]);

      function customFormatDistance(date) {
        const distance = formatDistanceToNow(new Date(date), {
          addSuffix: true,
        });
        return distance.replace("about ", "");
      }

      const formattedDate = customFormatDistance(review.createdAt);

      const handleLikeToggle = async (e) => {
        e.preventDefault();
        const isLoggedIn = sessionStorage.getItem("accessToken");
        const user_id = JSON.parse(sessionStorage.getItem("userInfo"))?.user_id;

        if (!isLoggedIn) {
          navigate("/login");
          return;
        }

        try {
          if (isLiked) {
            await axios.delete(
              `${BASE_URL}/likes/${review.product_id}/${user_id}`
            );
            setLikes(likes - 1);
          } else {
            await axios.post(`${BASE_URL}/likes`, {
              product_id: review.product_id,
              user_id,
            });
            setLikes(likes + 1);
          }
          setIsLiked(!isLiked);
          console.log("Updated isLiked: ", !isLiked);
        } catch (error) {
          console.error("Error toggling like:", error);
        }
      };

      return (
        <div
          className="flex flex-col gap-10 border-b-2 pb-14 mb-5 border-2 rounded-2xl p-6"
          key={review.product_id}
        >
          <h2 className="title font-bold text-3xl">{review.product_name}</h2>
          <div className="box-profile flex reviews-center">
            <CgProfile className="text-5xl mr-4" />
            <div className="profile-information">
              <p className="full-name font-bold">{review.username}</p>
              <p className="date font-normal text-slate-400">
                {formattedDate} | Category : {review.category_name}
              </p>
            </div>
          </div>
          <img
            className="w-1/2  text-center justify-center mx-auto rounded-3xl"
            src={review.product_image}
            alt={review.product_name}
          />
          <p className="question">{review.product_desc}</p>
          <div className="flex items-center gap-3 ">
            <AiOutlineLike
              className={`text-4xl border-solid border-2 rounded-full p-1 cursor-pointer ${
                isLiked ? "bg-red-400" : "hover:bg-red-400"
              }`}
              onClick={handleLikeToggle}
              style={{ transition: "background-color 0.3s" }}
            />
            <p>{likes} Likes</p>
          </div>
          <Accordion collapseAll>
            <Accordion.Panel>
              <Accordion.Title>Comments</Accordion.Title>
              <Accordion.Content>
                <CommentSection review={review} BASE_URL={BASE_URL} />
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
        </div>
      );
    });

    return reviewElements;
  }

  return (
    <main className="w-full">
      <Suspense>
        <Await resolve={props.allReview}>{cardElement}</Await>
      </Suspense>
    </main>
  );
}
