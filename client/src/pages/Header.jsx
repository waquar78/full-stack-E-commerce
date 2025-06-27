import React, { useState } from 'react';
import { BsCart2 } from "react-icons/bs";
import { IoIosArrowDropdown } from "react-icons/io";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlinePersonAddAlt, MdOutlineBusinessCenter } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import Search from './Search';
import { useLogoutUserMutation } from '@/features/auth/authApi';
import { userLogout } from "@/redux/slices/AuthSlice";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(userLogout());
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.log("Logout Error:", error);
    }
  };

  return (
    <div className='w-full h-16 bg-black text-white text-2xl fixed top-0 left-0 z-50 flex items-center px-4 gap-2'>

      <h1 className="font-bold text-lg">E-commerce</h1>

      <div className="ml-4 flex-1">
        <Search />
      </div>

      {/* Large Screen Menu */}
      <div className='hidden md:flex items-center gap-8 text-lg ml-auto'>

        {user ? (
          <div className="relative">
            <p className="flex items-center gap-1 cursor-pointer" onClick={() => setOpen(!open)}>
              <IoIosArrowDropdown size={24} /> {user.user.name}
            </p>
            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-md rounded-md z-50">
                <ul className='py-2 text-gray-800'>
                  <Link to={"/wish"}> <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Wishlist</li></Link>
                  {/* <Link to={"/order"}>  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Order</li></Link> */}
                  <li className="px-4 py-2 hover:bg-red-500 hover:text-white cursor-pointer" onClick={handleLogout}>Log Out</li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Link to={"/login"}>
            <p className="flex items-center gap-1 cursor-pointer"><MdOutlinePersonAddAlt size={22} /> Login</p>
          </Link>
        )}

        <Link to={"/cart"}>
          <p className='flex items-center gap-1 cursor-pointer'><BsCart2 size={22} /> Cart</p>
        </Link>

        <Link to={"/seller"}>
          <p className='flex items-center gap-1 cursor-pointer'><MdOutlineBusinessCenter size={22} /> Seller</p>
        </Link>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden ml-auto">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <HiMenuAlt3 size={26} />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-black text-white flex flex-col items-start gap-4 px-4 py-4 z-40 text-base">

          {user ? (
            <div className="w-full">
              <p className="flex items-center gap-1 cursor-pointer mb-2" onClick={() => setOpen(!open)}>
                <IoIosArrowDropdown size={22} /> {user.user.name}
              </p>
              {open && (
                <div className="bg-white text-black rounded-md shadow-md w-full mt-2">
                  <ul className='py-2 text-gray-800'>
                    <Link to={"/wish"}><li className="px-4 py-2 hover:bg-gray-200">Wishlist</li></Link>
                    {/* <Link to={"/order"}><li className="px-4 py-2 hover:bg-gray-200">Order</li></Link> */}
                    <li className="px-4 py-2 hover:bg-red-500 hover:text-white cursor-pointer" onClick={handleLogout}>Log Out</li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link to={"/login"}>
              <p className="flex items-center gap-1 cursor-pointer"><MdOutlinePersonAddAlt size={22} /> Login</p>
            </Link>
          )}

          <Link to={"/cart"}>
            <p className='flex items-center gap-1 cursor-pointer'><BsCart2 size={22} /> Cart</p>
          </Link>

          <Link to={"/seller"}>
            <p className='flex items-center gap-1 cursor-pointer'><MdOutlineBusinessCenter size={22} /> Seller</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
