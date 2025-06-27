import React from "react";
import { IoArrowBack } from "react-icons/io5";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import {
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} from "@/features/wishlist/wishlistApi";

const WishlistPage = () => {
  const { data, isLoading, error } = useGetWishlistQuery();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();
  const navigate = useNavigate();

  // Access products array from the wishlist document
  const wishlist = data?.wishlist?.products || [];

  // Handler for removing an item from the wishlist
  const handleRemove = async (productId) => {
    try {
      await removeFromWishlist(productId);
    } catch (err) {
      console.error("Error removing from wishlist:", err);
    }
  };

  if (isLoading) return <p>Loading your wishlist...</p>;
  if (error) return <p>Error loading wishlist: {error.message}</p>;

  return (
    <div>
      <Header />
      
      <div className="ml-4 mt-16">
        <div
          className="relative group text-2xl text-gray-700 hover:text-black transition-all duration-300"
          onClick={() => navigate("/")}
        >
          <IoArrowBack className="group-hover:scale-125 transition-transform duration-300" />
          <span className="absolute -top-8 left-0 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Back
          </span>
        </div>
      </div>


      <h1 className="text-2xl font-bold p-4">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="p-4">No products in wishlist.</p>
      ) : (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div
              key={product._id}
              className="border rounded-xl shadow p-4 hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <img
                src={product.photo}
                alt={product.name}
                className="w-full h-40 object-cover rounded"
              />

              <div className="mt-2">
                <button
                  onClick={(e) => {
                    // Prevent click from triggering parent onClick (navigation)
                    e.stopPropagation();
                    handleRemove(product._id);
                  }}
                  className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600 w-full"
                >
                  Remove
                </button>
              </div>

              <h2 className="text-lg font-bold mt-2">{product.name}</h2>
              <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
              <p className="text-green-600 font-semibold mt-1">₹{product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
