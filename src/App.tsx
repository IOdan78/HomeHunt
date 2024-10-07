import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/HomePage/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Post from "./components/HomePage/Post/Post";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post" element={<Post />} />
      </Routes>
    </div>
  );
}

export default App;
