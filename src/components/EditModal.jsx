import React from "react";

export default function EditModal({
  isOpen,
  category,
  error,
  onSubmit,
  onCancel,
  onCategoryChange,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Edit Category</h2>
        <form onSubmit={onSubmit}>
          <div className="form-control mb-4">
            <label className="label font-semibold text-gray-700">
              <span className="label-text">Category</span>
            </label>
            <input
              type="text"
              placeholder="Enter Category"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={category}
              onChange={onCategoryChange}
            />
          </div>

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
