import React from "react";
import Navbar from "../../components/Navbar";
import Aside from "../../components/Aside";
import { useLoaderData, defer } from "react-router-dom";
import { getAllReview } from "../../api";
import HomeData from "../../components/homeData";

export async function loader() {
  return defer({ AllReview: getAllReview() });
}

export default function Index() {
  const dataPromise = useLoaderData();

  return (
    <>
      <Navbar />
      <div className="flex px-10 mt-14 justify-between gap-5">
        <Aside />
        <HomeData allReview={dataPromise.AllReview} />
      </div>
    </>
  );
}
