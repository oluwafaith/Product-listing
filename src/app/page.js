"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const STORAGE_KEY = "cartItems";

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
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

  useEffect(() => {
    const storedCartItems = localStorage.getItem(STORAGE_KEY);
    if (storedCartItems) {
      try {
        const parsedItems = JSON.parse(storedCartItems);
        if (Array.isArray(parsedItems)) {
          setCartItems(parsedItems);
        } else {
          console.warn(
            "Invalid cart items found in local storage, clearing..."
          );
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch (error) {
        console.error("Error parsing cart items:", error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCartItems));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
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
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
