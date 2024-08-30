import React from "react";
import Navbar from "../../components/Navbar";
import Aside from "../../components/Aside";
import { useLoaderData, defer } from "react-router-dom";
import { getReviewByUser } from "../../api";
import QuestionData from "../../components/questionData";
import FormQuestion from "../../components/formQuestion";

export async function loader({ params }) {
  const { id } = params;
  return defer({ AllReview: getReviewByUser(id) });
}

export default function Question() {
  const dataPromise = useLoaderData();

  return (
    <>
      <Navbar />
      <div className="flex px-10 mt-14 justify-between gap-5">
        <Aside />
        <QuestionData allReview={dataPromise.AllReview} />
      </div>
    </>
  );
}
