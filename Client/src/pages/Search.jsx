import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { useGetFilteredProductsQuery } from '@/features/product/productApi';

const Search = () => {
  const [searchItem, setSearchItem] = useState('');
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();  // Initialize navigate function

  const {
    data,
    isLoading,
    error,
  } = useGetFilteredProductsQuery(
    { keyword: searchItem, limit: 10 },
    { skip: !searchItem.trim() }
  );

  const filteredProducts = data?.products || [];

  const handleSearchClick = () => {
    if (!searchItem.trim()) return;

    // If there are results, navigate to the first product's detail page
    if (filteredProducts.length > 0) {
      navigate(`/product/${filteredProducts[0]._id}`);  // Navigate to the first product detail
    } else {
      setShowResults(true);  // Otherwise, show the results dropdown
    }
  };

  const handleSuggestionClick = (productId) => {
    // Navigate to the product detail page
    navigate(`/product/${productId}`); // Redirect to the product detail page
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-4 relative"> {/* Added relative positioning for container */}
      {/* 🔍 Search bar */}
      <div className="flex items-center bg-white border border-gray-400 rounded-md overflow-hidden shadow-sm">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchItem}
          onChange={(e) => {
            setSearchItem(e.target.value);
            setShowResults(false);
          }}
          className="w-full px-4 py-2 text-gray-800 placeholder-gray-500 outline-none text-sm" // Reduced padding & font size
        />
        <button
          onClick={handleSearchClick}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm" // Adjusted button size
        >
          <FaSearch />
        </button>
      </div>

      {/* 🔽 Suggestions Dropdown */}
      {!showResults && filteredProducts.length > 0 && (
        <div className="bg-black border border-gray-700 rounded mt-1 shadow-md max-h-60 overflow-y-auto z-10 absolute w-full text-left"> {/* Align text to left */}
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-800 text-white text-sm" // Less bold text with subtle style
              onClick={() => handleSuggestionClick(product._id)} // Use product ID
            >
              {product.name}
            </div>
          ))}
        </div>
      )}

      {/* 📋 Final Search Results */}
      {showResults && (
        <div className="mt-4 bg-white p-4 rounded-md shadow-sm border">
          {filteredProducts.length === 0 ? (
            <p className="text-gray-600">No products found.</p>
          ) : (
            filteredProducts.map((product) => (
              <div key={product._id} className="mb-3 border-b pb-2">
                <h3 className="font-normal text-lg text-gray-800">{product.name}</h3> {/* Less bold for search results */}
                <p className="text-gray-600">{product.description}</p>
                <span className="text-sm text-green-700 font-medium">₹{product.price}</span>
                <button
                  onClick={() => handleSuggestionClick(product._id)} // Navigate to product detail
                  className="mt-2 text-blue-500 hover:text-blue-600"
                >
                  View Details
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* 🔄 Loading / Error */}
      {isLoading && <p className="text-blue-500 mt-2">Loading...</p>}
      {error && <p className="text-red-500 mt-2">Error fetching data.</p>}
    </div>
  );
};

export default Search;
