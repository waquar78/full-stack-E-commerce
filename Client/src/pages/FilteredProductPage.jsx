import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // ✅ Import useNavigate
import { useGetFilteredProductsQuery } from '@/features/product/productApi'

const FilteredProductsPage = () => {
  const { category } = useParams();
  const navigate = useNavigate(); // ✅ Initialize navigate

  const { data, isLoading, error } = useGetFilteredProductsQuery({ category });

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Something went wrong</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Category: {category}</h2>
      {data?.products?.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {data?.products?.map((product) => (
            <div
              key={product._id}
              className="border p-4 rounded shadow cursor-pointer hover:shadow-lg transition"
              onClick={() => navigate(`/product/${product._id}`)} // ✅ Navigate on click
            >
              <img
                src={product.photo}
                alt={product.name}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-gray-600 line-clamp-2">{product.description}</p>
              <p className="text-green-600 font-semibold">₹{product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilteredProductsPage;
