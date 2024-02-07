"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Header from "@/components/Header";
import Link from "next/link";
import Cart from "@/components/Cart";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const sortProducts = () => {
      const sorted = [...products].sort((a, b) => {
        if (sortOrder === "asc") {
          return a.price - b.price;
        } else if (sortOrder === "desc") {
          return b.price - a.price;
        }
        return 0;
      });
      setSortedProducts(sorted);
    };
    sortProducts();
  }, [products, sortOrder]);

  useEffect(() => {
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartItemCount(count);
  }, [cartItems]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (e) => {
    setSortOrder(e.target.value);
  };

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleAddToCart = (product) => {
    const existingCartItem = cartItems.find((item) => item.id === product.id);

    if (existingCartItem) {
      const updatedCartItems = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const filteredProducts = searchQuery
    ? sortedProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : sortedProducts;

  return (
    <>
      <Header
        handleSearch={handleSearch}
        handleSort={handleSort}
        handleCartClick={handleCartClick}
        cartItemCount={cartItemCount}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <div
            className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            key={product.id}
          >
            <a href="#">
              <Image
                className="p-8 rounded-t-lg"
                src={product.image}
                alt={product.title}
                width={180}
                height={37}
              />
            </a>
            <div className="px-5 pb-5">
              <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {product.title}
                </h5>
              </a>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${product.price}
                </span>

                <a
                  href="#"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => {
                    handleAddToCart(product);
                  }}
                >
                  Add to cart
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isCartOpen && <Cart cartItems={cartItems} />}
    </>
  );
};

export default Home;
