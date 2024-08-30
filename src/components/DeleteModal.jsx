import React from "react";

export default function DeleteModal({
  isOpen,
  categoryName,
  onDelete,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Delete Category</h2>
        <p>Are you sure you want to delete the category "{categoryName}"?</p>
        <div className="form-control text-center mt-4">
          <button
            onClick={onDelete}
            className="w-1/2 rounded-md bg-red-400 px-2 py-2 font-bold text-white"
          >
            Delete
          </button>
        </div>
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
