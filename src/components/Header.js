import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";

const Header = ({
  handleSearch,
  handleSort,
  handleCartClick,
  cartItemCount,
}) => {
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">Product Catalog</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            onChange={handleSearch}
            className="px-4 py-2 rounded-md bg-gray-700 text-gray-100 focus:outline-none"
          />
          <select
            onChange={handleSort}
            className="px-4 py-2 rounded-md bg-gray-700 text-gray-100 focus:outline-none"
          >
            <option value="">Sort by</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
          {/* <Link href="/cart"> */}
          <div className="relative">
            <FaShoppingCart
              onClick={handleCartClick}
              className="text-white cursor-pointer w-6 h-6"
            />

            {cartItemCount > 0 && (
              <div className="absolute top-0 right-0 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-xs">
                {cartItemCount}
              </div>
            )}
          </div>
          cart
          {/* </Link> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
