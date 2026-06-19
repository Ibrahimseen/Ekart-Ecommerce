import React, { useEffect } from "react";
import { Input } from "./ui/input";

const FilterSidebar = ({
  search,
  setSearch,
  category,
  setCategory,
  brand,
  setBrand,
  priceRange,
  setPriceRange,
  allproducts,
}) => {
  const categories = allproducts.map((p) => p.category);
  const UniqueCategory = ["All", ...new Set(categories)];

  const Brand = allproducts.map((p) => p.brand);
  const UniqueBrand = ["All", ...new Set(Brand)];

  const handleCategoryClick = (val) => {
    setCategory(val);
  };
  const handleBrandClick = (e) => {
    setBrand(e.target.value);
  };
  const hadnleMinChange = (e) => {
    const value = Number(e.target.value);
    if (value <= priceRange[1]) setPriceRange([value, priceRange[1]]);
  };
  const hadnleMaxChange = (e) => {
    const value = Number(e.target.value);
    if (value >= priceRange[0]) setPriceRange([priceRange[0], value]);
  };

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setBrand("All");
    setPriceRange([0, 999999]);
  };

  return (
    <div className="bg-gray-100 mt-10 p-4 rounded-md h-max md:block w-64 ">
      {/* search */}
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search..."
        className="bg-white p-2 rounded-md border-gray-400 border-2 w-full"
      />

      {/* category */}
      <h1 className="mt-5 font-semibold text-xl">Category</h1>
      <div className="flex flex-col gap-2 mt-3">
        {UniqueCategory.map((item, index) => (
          <div key={index} className=" flex items-center gap-2">
            <input
              type="radio"
              checked={category === item}
              onChange={() => handleCategoryClick(item)}
            />
            <label htmlFor="">{item}</label>
          </div>
        ))}
      </div>

      {/* brand */}

      <h1 className="mt-5 font-semibold text-xl">Brands</h1>
      <select
        value={brand}
        onChange={handleBrandClick}
        className="bg-white w-full p-2 border-gray-200 border-2 rounded-md"
      >
        {UniqueBrand.map((item, index) => (
          <option key={index} value={item}>
            {item.toUpperCase()}
          </option>
        ))}
      </select>

      {/* price Range */}
      <h1 className="mt-5 font-semibold text-xl mb-3">Price Range</h1>
      <div className="flex flex-col gap-2">
        <label htmlFor="">
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </label>
        <div className="flex gap-2 items-center">
          <input
            value={priceRange[0]}
            onChange={hadnleMinChange}
            type="number"
            min="0"
            max="99999"
            className="w-20 p-1 border border-gray-300 rounded"
          />
          <span>-</span>
          <input
            value={priceRange[1]}
            onChange={hadnleMaxChange}
            type="number"
            min="0"
            max="99999"
            className="w-20 p-1 border border-gray-300 rounded"
          />
        </div>
        <input
          value={priceRange[0]}
          onChange={hadnleMinChange}
          type="range"
          min="0"
          max="99999"
          step="100"
          className="w-full"
        />
        <input
          value={priceRange[1]}
          onChange={hadnleMaxChange}
          type="range"
          min="0"
          max="99999"
          step="100"
          className="w-full"
        />
      </div>
      {/* Reset Button */}
      <button
        onClick={resetFilters}
        className="bg-pink-600 text-white rounded-md px-3 py-1 mt-5 cursor-pointer w-full"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
