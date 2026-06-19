import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { setUser } from "@/Redux/userSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.user);
  const { cart } = useSelector((store) => store.product);
  const admin = user?.role === "admin" ? true : false;
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();


  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const totalQuantity =
    cart?.items?.reduce((total, item) => total + (item.quantity || 0), 0) || 0;

  return (
    <header className="bg-pink-50 fixed w-full z-20 border-b border-pink-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3">
        <div>
          <img src="/Ekart.png" alt="" className="w-25" />
          {/* <h1 className='font-bold text-2xl'>Ekart</h1> */}
        </div>
        {/* nav section */}
        <nav className="flex gap-10 justify-between items-center">
          <ul className="flex gap-7 items-center text-xl font-semibold">
            <Link to={"/"}>
              <li>Home</li>
            </Link>
            <Link to={"/products"}>
              <li>Products</li>
            </Link>

            {user && (
              <Link to={`/profile/${user._id}`}>
                <li>Hello, {user?.firstName}</li>
              </Link>
            )}
            {admin && (
              <Link to={`/dashboard/sales`}>
                <li>Dashboard</li>
              </Link>
            )}
          </ul>
          <Link to={"/cart"} className="relative">
            <ShoppingCart />
            <span className="bg-pink-500 rounded-full absolute text-white -top-3 -right-5 px-2">
              {/* {cart?.items?.length || 0} */}
              {totalQuantity}
            </span>
          </Link>
          {user ? (
            <Button
              onClick={logoutHandler}
              className="bg-pink-600 text-white cursor-pointer p-5"
            >
              Logout
            </Button>
          ) : (
            <Link to={"/login"}>
              <Button className="bg-linear-to-tl from-blue-600 to-purple-600 text-white cursor-pointer p-5">
                Login
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
