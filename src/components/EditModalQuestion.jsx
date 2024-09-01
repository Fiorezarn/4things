import React, { useEffect, useState } from "react";
import axios from "axios";

export default function EditModalProduct({
  isOpen,
  product,
  error,
  onSubmit,
  onCancel,
  onInputChange,
  onFileChange,
}) {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      try {
        const BASE_URL = import.meta.env.VITE_BASE_URL;
        const response = await axios.get(`${BASE_URL}/category`);
        setCategoryList(response.data.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    }
    fetchCategories();
  }, []);
  useEffect(() => {
    if (product) {
      setSelectedCategory(product.category_id || "");
    }
  }, [product]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
        <form onSubmit={onSubmit}>
          <div className="form-control mb-4">
            <label className="label font-semibold text-gray-700">
              <span className="label-text">Product Name</span>
            </label>
            <input
              type="text"
              name="product_name"
              placeholder="Enter Product Name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={product.product_name}
              onChange={onInputChange}
            />
          </div>

          <div className="form-control mb-4">
            <label className="label font-semibold text-gray-700">
              <span className="label-text">Product Description</span>
            </label>
            <textarea
              name="product_desc"
              placeholder="Enter Product Description"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={product.product_desc}
              onChange={onInputChange}
            />
          </div>

          <div className="form-control mb-4">
            <label className="label font-semibold text-gray-700">
              <span className="label-text">Product Image</span>
            </label>
            <input
              type="file"
              name="file"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={onFileChange}
            />
          </div>

          <select
            className="select select-bordered w-full mb-4"
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

          {error && (
            <div className="text-red-500 mb-4 text-center">{error}</div>
          )}

          <div className="form-control text-center">
            <button
              type="submit"
              className="w-1/2 rounded-md bg-blue-400 px-2 py-2 font-bold"
            >
              Update
            </button>
          </div>
        </form>
        <button
          onClick={onCancel}
          className="mt-4 w-full text-center text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
