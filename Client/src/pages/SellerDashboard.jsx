import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SellerDashboard = () => {
  const navigate = useNavigate();

  return (
    
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-md rounded-2xl">
      <div className="relative group cursor-pointer text-2xl text-gray-700 hover:text-black transition-all duration-300"
        onClick={() => {
          navigate("/")
        }}> <IoArrowBack className="group-hover:scale-125 transition-transform duration-300" />
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Back
        </span>
      </div>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
        👨‍💻 Seller Dashboard
      </h2>

      <p className="text-sm text-center text-red-600 mb-6">
        ⚠️ Please ensure that all product details are accurate. Misleading information may result in account suspension.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center">
        <div className="bg-blue-100 p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
          <h3 className="text-xl font-semibold mb-2 text-blue-800">📤 Upload Product</h3>
          <p className="text-sm text-gray-700 mb-4">
            Add a new product with complete details and images.
          </p>
          <button
            onClick={() => navigate("/seller/upload")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            Go to Upload
          </button>
        </div>

        <div className="bg-green-100 p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
          <h3 className="text-xl font-semibold mb-2 text-green-800">📦 My Products</h3>
          <p className="text-sm text-gray-700 mb-4">
            View, update, or delete your listed products.
          </p>
          <button
            onClick={() => navigate("/seller/my-products")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
          >
            View Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
