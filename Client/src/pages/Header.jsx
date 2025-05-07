import React, { useState } from 'react';
import { BsCart2 } from "react-icons/bs";
import { IoIosArrowDropdown } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlinePersonAddAlt, MdOutlineBusinessCenter } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import Search from './search';
import { useLogoutUserMutation } from '@/features/auth/authApi';
import { userLogout } from "@/redux/slices/AuthSlice";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const [open, setOpen] = useState(false);
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
    <div className='w-screen h-16 bg-black text-white text-2xl fixed top-0 left-0 z-50 flex items-center px-4    '>
      <h1>Header</h1>
      < Search />
      <div className='items-center ml-auto gap-20 text-lg flex '>
        {user ? (
          <div className="relative">
            <p className="flex items-center gap-2 cursor-pointer" onClick={() => setOpen(!open)}>
              <IoIosArrowDropdown size={24} /> {user.user.name}
            </p>
            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-md rounded-md ">
                <ul className='py-2 text-gray-800'>
                  <Link to={"/wish"}> <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Wishlist</li></Link>
                  <Link to={"/order"}>  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Order</li></Link>
                  <li className="px-4 py-2 hover:bg-red-500 hover:text-white cursor-pointer" onClick={handleLogout}>Log Out</li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Link to={"/login"}>
            <p className="flex items-center gap-2 cursor-pointer"><MdOutlinePersonAddAlt size={24} /> Login</p>
          </Link>
        )}
        <Link to={"/cart"}>
          <p className='flex items-center gap-2 cursor-pointer'><BsCart2 size={24} /> Cart</p>
        </Link>
        <Link to={"/seller"}>
        <p className='flex items-center gap-2'><MdOutlineBusinessCenter size={24} /> Become Seller</p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
