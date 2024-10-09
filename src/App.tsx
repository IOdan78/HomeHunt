import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/HomePage/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Post from "./components/HomePage/Post/Post";
import Product from "./components/HomePage/Body/product/Product";
import ProductDetail from "./components/HomePage/Body/productdetail/ProductDetail";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post" element={<Post />} />
        <Route path="/" element={<Product />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  );
}

export default App;
