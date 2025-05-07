import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetSingleProductQuery } from '@/features/product/productApi';
import { useAddToCartMutation } from '@/features/cart/cartApi';
import { IoArrowBack } from "react-icons/io5";
import Header from './Header';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetSingleProductQuery(id);
  const [addToCart] = useAddToCartMutation();

  const handleAddToCart = async () => {
    if (!data?.product?._id) return alert("Product not available!");
    try {
      await addToCart({ productId: data.product._id, quantity: 1 }).unwrap();
      alert("Added to cart!");
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading...
      </div>
    );
  }

  if (error || !data?.product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error loading product.
      </div>
    );
  }

  const product = data.product;

  return (
    <div className="h-screen w-screen mt-6 overflow-x-hidden bg-gradient-to-r from-gray-100 to-blue-100 flex flex-col overflow-hidden">
      <Header />

      {/* Back Button */}
      <div className="px-6 pt-4">
        <button
          className="text-2xl text-gray-600 hover:text-gray-800 transition flex items-center gap-1"
          onClick={() => navigate("/")}
        >
          <IoArrowBack />
          <span className="text-sm">Back</span>
        </button>
      </div>

      {/* Product Section */}
      <div className="flex-grow flex items-center justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center gap-10">
          {/* Image Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full md:w-[40%] flex justify-center items-center">
            <img
              src={product.photo}
              alt={product.name}
              className="w-full h-[300px] object-contain rounded-xl"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 space-y-4 text-gray-800">
            <h1 className="text-4xl font-bold">{product.name}</h1>
            <p className="text-base text-gray-600">{product.description}</p>
            <div className="text-3xl font-extrabold text-green-600">₹{product.price}</div>

            <div className="space-y-1 text-sm text-gray-700 pt-4">
              <p><span className="font-semibold">Stock:</span> {product.stock > 0 ? product.stock : 'Out of Stock'}</p>
              <p><span className="font-semibold">Category:</span> {product.category}</p>
              <p><span className="font-semibold">Seller ID:</span> {product.sellerId}</p>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                onClick={handleAddToCart}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition items-center ml-60"
              >
                Add to Cart
              </button>
              <button className="bg-white border border-gray-400 text-gray-800 px-6 py-2 rounded-lg shadow-sm hover:bg-gray-100 transition"
                onClick={()=>{
                  navigate("/payment")
                }}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;