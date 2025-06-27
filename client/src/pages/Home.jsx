import React from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useGetAllProductsQuery } from "@/features/product/productApi";
import {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from "@/features/wishlist/wishlistApi";
import Filter from "./Filter";
import Banner from "./Banner";


const HomePage = () => {
  const { data: products, isLoading: productsLoading, error: productsError } = useGetAllProductsQuery();
  const { data: wishlistData, isLoading: wishlistLoading } = useGetWishlistQuery();
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();
  const navigate = useNavigate();

  const wishlist = wishlistData?.wishlist?.products || [];

  const isInWishlist = (productId) => {
    return Array.isArray(wishlist) && wishlist.some((item) => item._id === productId);
  };

  const toggleWishlist = async (productId) => {
    try {
      if (isInWishlist(productId)) {
        await removeFromWishlist(productId);
      } else {
        await addToWishlist(productId);
      }
    } catch (err) {
      console.error("Error toggling wishlist:", err);
    }
  };

  if (productsLoading || wishlistLoading) return <p>Loading...</p>;
  if (productsError) return <p>Error: {productsError.message}</p>;

  return (
    <div className="overflow-x-hidden">
      <Header />

      <div className="mt-10 bg-gray-300">
        <Filter />
      </div>

      <Banner />

      <div className="p-4 bg-gray-100 min-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products && products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="bg-white border rounded-xl shadow p-3 hover:shadow-lg transition flex flex-col h-[370px] justify-between"
              >
                <div
                  className="cursor-pointer"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  <img
                    src={product.photo}
                    alt={product.name}
                    className="w-full h-56 object-cover rounded"
                  />
                </div>

                <div className="mt-2 flex justify-start">
                  <button
                    onClick={() => toggleWishlist(product._id)}
                    className="p-1 rounded-full hover:scale-110 transition"
                    title="Add to Wishlist"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={isInWishlist(product._id) ? "red" : "none"}
                      viewBox="0 0 24 24"
                      stroke="red"
                      strokeWidth={2}
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                      />
                    </svg>
                  </button>
                </div>

                <div>
                  <h2 className="text-sm font-bold mt-1">{product.name}</h2>
                  <p className="text-xs text-gray-600 line-clamp-2">{product.description}</p>
                  <p className="text-green-600 font-semibold mt-1 text-sm">₹{product.price}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
