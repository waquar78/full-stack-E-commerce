import React, { useState } from "react";
import { useUploadImageMutation } from "@/features/upload/uploadApi";
import { useCreateProductMutation } from "@/features/product/productApi";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const UploadForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    stock: "",
    category: "",
    price: "",
    description: "",
    photo: null,
  });

  const navigate = useNavigate();
  const [uploadImage] = useUploadImageMutation();
  const [createProduct] = useCreateProductMutation();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "photo") {
      setFormData({ ...formData, photo: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const imageForm = new FormData();
      imageForm.append("image", formData.photo);
      const imageRes = await uploadImage(imageForm).unwrap();

      const productData = {
        name: formData.name,
        stock: formData.stock,
        category: formData.category,
        price: formData.price,
        description: formData.description,
        photo: imageRes.imageUrl,
      };

      const response = await createProduct(productData).unwrap();
      console.log("Product created:", response);
      alert("Product created successfully!");
      

      //  Reset form fields after success
      setFormData({
        name: "",
        stock: "",
        category: "",
        price: "",
        description: "",
        photo: null,
      });
    
          navigate("/");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Only seller can upload their product!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-8 bg-white shadow-lg rounded-2xl h-[80vh] overflow-y-auto ">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Add New Product
      </h2>
      <h1
        className="text-2xl text-gray-500 cursor-pointer"
        onClick={() => navigate("/seller")}
      >
        <IoArrowBack />
      </h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter product name"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter stock quantity"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Price (₹)
            </label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter price"
              required
            />
          </div>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g., Electronics, Fashion"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
            placeholder="Write product description..."
            required
          ></textarea>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Product Image
          </label>
          <input
            type="file"
            id="photoInput"
            name="photo"
            accept="image/*"
            onChange={handleChange}
            className="w-full border p-2 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-6 rounded-lg transition duration-200 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {loading ? "Uploading..." : "Upload Product"}
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
