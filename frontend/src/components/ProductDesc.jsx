import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";
import { setCart } from "@/Redux/productSlice";
import axios from "axios";

const ProductDesc = ({ product }) => {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");
 const addToCart = async (productId) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/cart/add`,
        { productId },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );
      if (res.data.success) {
        toast.success("Product added to cart succesfully");
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-4xl text-gray-800">
        {product.productName}
      </h1>
      <p className="text-gray-800">
        {product.category} | {product.brand}
      </p>
      <h2 className="text-pink-500 font-bold text-2xl">
        ₹{product.productPrice}
      </h2>
      <p className="line-clamp-12 text-muted-foreground">
        {product.productDesc}
      </p>
      <div className="flex gap-2 items-center w-300px">
        <p className="text-gray-800 font-semibold">Quantity :</p>
        <Input type="number" className="w-14" defaultValue={1} />
      </div>
      <Button
        onClick={() => addToCart(product._id)}
        className="bg-pink-600 w-max"
      >
        <ShoppingCart />
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductDesc;
