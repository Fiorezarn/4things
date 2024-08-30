import React from "react";
import Navbar from "../../components/Navbar";
import Aside from "../../components/Aside";
import { useLoaderData, defer } from "react-router-dom";
import { getTrendingReview } from "../../api";
import TrendingData from "../../components/trendingData";

export async function loader() {
  return defer({ AllReview: getTrendingReview() });
}

export default function Trending() {
  const dataPromise = useLoaderData();

  return (
    <>
      <Navbar />
      <div className="flex px-10 mt-14 justify-between gap-5">
        <Aside />
        <TrendingData allReview={dataPromise.AllReview} />
      </div>
    </>
  );
}
