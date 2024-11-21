import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Admin from "./components/AdminPage/AdminPage";
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

  // Giả sử vai trò người dùng được lưu trong localStorage hoặc bạn có thể lấy từ API
  const userRole = localStorage.getItem("userRole"); // "admin" hoặc "customer" hoặc null nếu chưa đăng nhập

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div>
      {!isAuthPage && <Navbar />}
      <Routes>
        {/* Chỉ hiển thị AdminPage nếu role là admin */}
        <Route
          path="/admin"
          element={
            userRole === "Admin" ? (
              <Admin />
            ) : (
              <Navigate to="/" replace /> // Chuyển hướng về trang chủ
            )
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post" element={<Post />} />
        <Route path="/products" element={<Product />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;
