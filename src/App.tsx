import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/HomePage/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Post from "./components/HomePage/Post/Post";
import Product from "./components/HomePage/Body/product/Product";
import ProductDetail from "./components/HomePage/Body/productdetail/ProductDetail";
import Navbar from "./components/HomePage/navbar/Navbar";
import Footer from "./components/HomePage/Footer/Footer";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post" element={<Post />} />
        <Route path="/products" element={<Product />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
