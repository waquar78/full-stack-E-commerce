import React from 'react';
import { useNavigate } from 'react-router-dom';

const categories = ['toy', 'fashion', 'makeup', 'electronics', 'furniture', 'footwear'];

const categoryImages = {
  toy: 'https://st2.depositphotos.com/4431055/11861/i/950/depositphotos_118615338-stock-photo-toys-collection-isolated.jpg',
  fashion: 'https://tse4.mm.bing.net/th?id=OIP.6R-HZwe2q4JvBWcRpvyq7AHaE5&pid=Api&P=0&h=220',
  makeup: 'https://tse1.mm.bing.net/th?id=OIP.6oO8rYd4Wb4UrDjGugqpmwHaEK&pid=Api&P=0&h=220',
  electronics: 'https://cdn1.smartprix.com/rx-ibsJ2hNrF-w1200-h1200/bsJ2hNrF.jpg',
  furniture: 'https://d9dvmj2a7k2dc.cloudfront.net/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/d/5/d530-25-01_6__1.jpg',
  footwear: 'https://www.shutterstock.com/image-illustration/mens-fashion-shoes-black-classic-260nw-1080406805.jpg',
};

const Filter = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/products/${category}`);
  };

  return (
    <div className='w-full py-3 text-black bg-gray-200'>
      {/* Mobile Scrollable */}
      <div className="flex md:hidden items-center gap-5 px-3 overflow-x-auto scrollbar-hide">
        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(cat)}
            className="flex flex-col items-center cursor-pointer hover:text-blue-600 min-w-[60px]"
          >
            <img
              src={categoryImages[cat]}
              alt={cat}
              className="w-14 h-14 rounded-full object-cover mb-1"
            />
            <h1 className="text-[10px] font-bold capitalize text-center">{cat}</h1>
          </div>
        ))}
      </div>

      {/* Large screen evenly spaced */}
      <div className="hidden md:flex items-center justify-evenly gap-5 px-3">
        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(cat)}
            className="flex flex-col items-center cursor-pointer hover:text-blue-600"
          >
            <img
              src={categoryImages[cat]}
              alt={cat}
              className="w-16 h-16 rounded-full object-cover mb-1"
            />
            <h1 className="text-xs font-bold capitalize text-center">{cat}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
