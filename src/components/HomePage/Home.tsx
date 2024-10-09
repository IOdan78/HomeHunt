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
    // Cuộn lên đầu trang khi component được render
    window.scrollTo(0, 0);
    
    const handleLoad = () => {
      setLoading(false);
    };

    const bodyImages = document.querySelectorAll("img");
    let loadedImages = 0;

    if (bodyImages.length === 0) {
      handleLoad();
    } else {
      bodyImages.forEach((image) => {
        image.addEventListener("load", () => {
          loadedImages++;
          if (loadedImages === bodyImages.length) {
            handleLoad();
          }
        });

        // Kiểm tra nếu ảnh đã được cache
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

      {/* Đảm bảo footer không bị đẩy lên trên navbar */}
      {loading && <div className="footer-placeholder" style={{ height: '60px' }} />}
      
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default Home;
