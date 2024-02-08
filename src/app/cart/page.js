"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const CartPage = () => {
  const STORAGE_KEY = "cartItems";
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem(STORAGE_KEY);
    if (storedCartItems) {
      try {
        setCartItems(JSON.parse(storedCartItems));
      } catch (error) {
        console.error("Error parsing cart items:", error);
      }
    }
  }, []);

  const handleRemoveItem = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <div className="flex items-center mb-4">
        <Link href="/">
          <button className="bg-gray-800 hover:bg-gray-300 text-white px-4 py-2 rounded-md mr-4">
            Back to Home
          </button>
        </Link>
      </div>
      {cartItems && cartItems.length > 0 ? (
        <table className="table w-full mt-4">
          <thead>
            <tr className="bg-blue-800 text-white">
              <th className="px-4 py-2 font-medium">Product</th>
              <th className="text-center px-4 py-2 font-medium">Quantity</th>
              <th className="text-right px-4 py-2 font-medium">Price</th>
              <th className="text-right px-4 py-2 font-medium">Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-2">{item.title}</td>
                <td className="text-center px-4 py-2">{item.quantity}</td>
                <td className="text-right px-4 py-2">{item.price}</td>
                <td className="text-right px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <p className="text-lg font-medium mb-4">Your cart is empty.</p>
          <Link href="/">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md font-medium w-full mt-6 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300">
              Start Shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
