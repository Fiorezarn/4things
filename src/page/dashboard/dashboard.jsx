import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarAdmin from "../../components/SidebarAdmin";
import { ToastContainer, toast } from "react-toastify";
import EditModal from "../../components/EditModalCategory";
import DeleteModal from "../../components/DeleteModal";
import { Await, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("accessToken");
    const userInfo = sessionStorage.getItem("userInfo");
    const user = userInfo ? JSON.parse(userInfo).role : null;

    if (user !== "admin") {
      return navigate("/");
    }

    if (!isLoggedIn) {
      return navigate("/login");
    }
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

  const addCategory = (newCategory) => {
    setCategoryList([...categoryList, newCategory]);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/category/${editingCategory.category_id}`);
      setCategoryList(
        categoryList.filter(
          (category) => category.category_id !== editingCategory.category_id
        )
      );
      setIsDeleteModalOpen(false);
      toast.success("Category Deleted", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      console.error("Error deleting category:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/category`, {
        category_name: category,
      });

      toast.success("Category Created", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      const newCategory = response.data.data;
      addCategory(newCategory);
      setCategory("");
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BASE_URL}/category/${editingCategory.category_id}`, {
        category_name: category,
      });

      setCategoryList((prevList) =>
        prevList.map((cat) =>
          cat.category_id === editingCategory.category_id
            ? { ...cat, category_name: category }
            : cat
        )
      );

      setIsEditModalOpen(false);
      setEditingCategory(null);
      setCategory("");
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  const openEditModal = (category) => {
    setEditingCategory(category);
    setCategory(category.category_name);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (category) => {
    setEditingCategory(category);
    setIsDeleteModalOpen(true);
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <SidebarAdmin />
      <div className="flex-1 ml-[300px] p-10 bg-slate-200 lg:h-full xl:h-[100vh]">
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md border mb-10">
          <form onSubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label className="label font-semibold text-gray-700">
                <span className="label-text">Category</span>
              </label>
              <input
                type="text"
                placeholder="Enter Category"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            {error && (
              <div className="text-red-500 mb-4 text-center">{error}</div>
            )}

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
        <div className="p-10 border-2 bg-white rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Categories</h2>
          <ul className="space-y-4">
            {categoryList.map((category, index) => (
              <li
                key={category.category_id || index}
                className="flex justify-between items-center p-4 border-b border-gray-300 rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition duration-200"
              >
                <span className="text-lg font-medium">
                  {category.category_name}
                </span>
                <div>
                  <button
                    onClick={() => openEditModal(category)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-200 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(category)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                  >
                    Hapus
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <EditModal
        title="Category"
        label="Edit Category"
        isOpen={isEditModalOpen}
        category={category}
        error={error}
        onSubmit={handleEditSubmit}
        onCancel={() => setIsEditModalOpen(false)}
        onCategoryChange={(e) => setCategory(e.target.value)}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        categoryName={editingCategory?.category_name}
        onDelete={handleDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
}
