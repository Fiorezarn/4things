import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FormQuestion() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(`${BASE_URL}/category`);
        setCategoryList(response.data.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    }
    fetchCategories();
  }, [BASE_URL]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userInfo = sessionStorage.getItem("userInfo");
      const user = JSON.parse(userInfo);

      const formData = new FormData();
      formData.append("product_name", title);
      formData.append("product_desc", description);
      formData.append("category_id", selectedCategory);
      formData.append("user_id", user.user_id);
      formData.append("file", image);

      const response = await axios.post(`${BASE_URL}/product`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      window.location.reload();

      const data = response.data;
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md border mb-10">
      <form onSubmit={handleSubmit}>
        <div className="form-control mb-4">
          <label className="label font-semibold text-gray-700">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            placeholder="Enter the title of your question"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-control mb-4">
          <label className="label font-semibold text-gray-700">
            <span className="label-text">Description</span>
          </label>
          <textarea
            className="textarea textarea-bordered w-full h-28"
            placeholder="Describe your question in detail"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="form-control mb-4">
          <label className="label font-semibold text-gray-700">
            <span className="label-text">Category</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option disabled value="">
              Select a category
            </option>
            {categoryList.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control mb-4">
          <label className="label font-semibold text-gray-700">
            <span className="label-text">Image</span>
          </label>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            onChange={handleImageChange}
          />
        </div>

        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

        <div className="form-control text-center">
          <button
            type="submit"
            className="w-1/2 rounded-md bg-red-400 px-2 py-2 font-bold"
          >
            Submit Question
          </button>
        </div>
      </form>
    </div>
  );
}
