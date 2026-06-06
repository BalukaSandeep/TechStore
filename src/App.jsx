import "./App.css";
import ProductCard from "./ProductCard";
import data from "./data";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {

  const [cartCount, setCartCount] =
    useState(0);

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [showCart, setShowCart] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("isLoggedIn") === "true"
  );

  const [category, setCategory] =
    useState("All");

  const [email, setEmail] =
    useState("");

  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  useEffect(() => {
    setCartCount(cartItems.length);
  }, [cartItems]);

  const addToCart = (product) => {
    const existingItem = cartItems.find(
      (item) => item.id === product.id
    );

    if (existingItem) {
      const updatedCart = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      setCartItems(updatedCart);
    } else {
      setCartItems([
        ...cartItems,
        { ...product, quantity: 1 },
      ]);
    }

    setCartCount(cartCount + 1);
  };

  const removeFromCart = (indexToRemove) => {
    const updatedCart = cartItems.filter(
      (_, index) => index !== indexToRemove
    );

    setCartItems(updatedCart);
    setCartCount(updatedCart.length);
  };
  const increaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCartItems(updatedCart);
    setCartCount(cartCount + 1);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === id
          ? {
            ...item,
            quantity: item.quantity - 1,
          }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCartItems(updatedCart);

    const totalItems = updatedCart.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    setCartCount(totalItems);
  };
  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
  };
  const [search, setSearch] = useState("");

  const filteredProducts = data.filter(
    (product) =>
      (category === "All" ||
        product.category === category) &&
      product.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return isLoggedIn ? (
    <Home />
  ) : (
    <Login setIsLoggedIn={setIsLoggedIn} />
  );
}

export default App;