import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FilterSidebar from "@/components/FilterSidebar";
import ProductCard from "@/components/ProductCard";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/Redux/productSlice";

const Product = () => {
  const { products } = useSelector((store) => store.product);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [sortOrder, setSortOrder] = useState("");
  const [loading, setloading] = useState(false);
  const [allproducts, setallproducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 99999]);
  const dispatch = useDispatch();

  const getAllProducts = async () => {
     const baseURL = import.meta.env.VITE_API_URL;
    try {
      setloading(true);
      const res = await axios.get(
        // `http://localhost:3000/api/v1/product/getallproducts`,
         `${baseURL}/api/v1/product/getallproducts`,   

      );
      if (res.data.success) {
        setallproducts(res.data.products);
        dispatch(setProducts(res.data.products));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    if (allproducts.length === 0) return;
    let filtered = [...allproducts];

    if (search.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.productName?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category !== "All") {
      filtered = filtered.filter((p) => p.category === category);
    }
    if (brand !== "All") {
      filtered = filtered.filter((p) => p.brand === brand);
    }
    filtered = filtered.filter(
      (p) => p.productPrice >= priceRange[0] && p.productPrice <= priceRange[1],
    );
    if (sortOrder === "lowToHigh") {
      filtered.sort((a, b) => a.productPrice - b.productPrice);
    } else if (sortOrder === "highToLow") {
      filtered.sort((a, b) => b.productPrice - a.productPrice);
    }
    dispatch(setProducts(filtered));
  }, [search, category, brand, sortOrder, priceRange, allproducts, dispatch]);

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="pt-20 pb-10">
      <div className="max-w-7xl mx-auto flex gap-7">
        <FilterSidebar
          search={search}
          setSearch={setSearch}
          brand={brand}
          setBrand={setBrand}
          category={category}
          setCategory={setCategory}
          allproducts={allproducts}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />
        <div className="flex flex-col flex-1">
          <div className="flex justify-end mb-4">
            <Select onValueChange={(value) => setSortOrder(value)}>
              <SelectTrigger className="w-50">
                <SelectValue placeholder="Sort by price" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="lowToHigh">Price: Low to High</SelectItem>

                <SelectItem value="highToLow">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">
            {products.map((product) => {
              return (
                <ProductCard
                  key={product._id}
                  product={product}
                  loading={loading}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
