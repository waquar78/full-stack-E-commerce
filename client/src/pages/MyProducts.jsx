// src/pages/MyProducts.jsx
import React, { useState } from "react";
import {
  useGetMyProductsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "@/features/product/productApi";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const MyProducts = () => {
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useGetMyProductsQuery();

  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", price: "" });

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      refetch();
    }
  };

  const handleEditClick = (product) => {
    setEditId(product._id);
    setEditForm({ name: product.name, price: product.price });
  };

  const handleUpdate = async () => {
    await updateProduct({ id: editId, body: editForm });
    setEditId(null);
    refetch();
  };

  if (isLoading) return <p className="text-center">Loading your products...</p>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* Back Icon */}
      <div
        className="relative group cursor-pointer text-2xl w-fit mb-4 text-gray-700 hover:text-black transition-all duration-300"
        onClick={() => navigate("/seller")}
      >
        <IoArrowBack className="group-hover:scale-125 transition-transform duration-300" />
        <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Back
        </span>
      </div>

      <h2 className="text-2xl font-bold text-center mb-2">📦 My Uploaded Products</h2>
      <p className="text-center text-gray-600 mb-6">
        Here you can manage all the products you've uploaded — edit details or remove any product anytime.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.products?.map((product) => (
          <div key={product._id} className="border rounded-xl p-4 shadow bg-white space-y-3">
            <img
              src={product.photo}
              alt={product.name}
              className="w-full h-48 object-cover rounded"
            />

            {editId === product._id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  className="w-full border px-3 py-1 rounded"
                />
                <input
                  type="number"
                  value={editForm.price}
                  onChange={(e) =>
                    setEditForm({ ...editForm, price: e.target.value })
                  }
                  className="w-full border px-3 py-1 rounded"
                />
                <div className="flex justify-between">
                  <button
                    onClick={handleUpdate}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">₹{product.price}</p>

                <div className="flex justify-between mt-3">
                  <button
                    onClick={() => handleEditClick(product)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProducts;
