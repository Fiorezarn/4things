import React, { useState } from "react";
import axios from "axios";

export default function FormCategory({ addCategory }) {
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/category`, {
        category_name: category,
      });

      const newCategory = response.data;
      console.log(newCategory.data.category_name);

      addCategory(newCategory.data.category_name); // Panggil fungsi untuk menambahkan kategori baru
      setCategory(""); // Reset input field setelah submit
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md border mb-10">
      <form onSubmit={handleSubmit}>
        <div className="form-control mb-4">
          <label className="label font-semibold text-gray-700">
            <span className="label-text">Category</span>
          </label>
          <input
            type="text"
            placeholder="Enter the title of your category"
            className="input input-bordered w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

        <div className="form-control text-center">
          <button
            type="submit"
            className="w-1/2 rounded-md bg-red-400 px-2 py-2 font-bold"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
