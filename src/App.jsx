import { useState } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Index, { loader as indexLoader } from "./page/home/home";
import Login from "./page/login/login";
import Register from "./page/register/register";
import Forgot from "./page/forgotpassword/forgot";
import Trending, { loader as trendingLoader } from "./page/trending/trending";
import Question, { loader as questionLoader } from "./page/question/question";
import Admin from "./page/dashboard/dashboard";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Index />} loader={indexLoader} />
      <Route path="/trending" element={<Trending />} loader={trendingLoader} />
      <Route
        path="/question/:id"
        element={<Question />}
        loader={questionLoader}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/admin" element={<Admin />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
