import React, { useState, useEffect } from "react";
import "./Home.scss";
import Navbar from "./navbar/Navbar";
import Body from "./Body/Body";
import Post from "./Post/Post";
import Footer from "./Footer/Footer";

function Home() {
  const [showPost, setShowPost] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      // Khi mọi thứ (bao gồm cả hình ảnh) đã được tải xong
      setLoading(false);
    };

    const bodyImages = document.querySelectorAll("img");
    let loadedImages = 0;

    if (bodyImages.length === 0) {
      // Nếu không có hình ảnh thì coi như đã tải xong
      handleLoad();
    } else {
      // Nếu có hình ảnh, đợi tất cả hình ảnh tải xong
      bodyImages.forEach((image) => {
        image.addEventListener("load", () => {
          loadedImages++;
          if (loadedImages === bodyImages.length) {
            handleLoad();
          }
        });

        // Kiểm tra nếu ảnh đã được cache (tức là đã load trước đó)
        if (image.complete) {
          loadedImages++;
          if (loadedImages === bodyImages.length) {
            handleLoad();
          }
        }
      });
    }
  }, [showPost]);

  return (
    <div className="homepage">
      <div className="header">
        <Navbar setShowPost={setShowPost} />
      </div>

      <div className="body">
        {loading ? (
          <div className="loading-container">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : showPost ? (
          <Post setShowPost={setShowPost} />
        ) : (
          <Body setShowPost={setShowPost} />
        )}
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default Home;
