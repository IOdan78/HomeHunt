import React, { useState, useEffect } from "react";
import "./Home.scss";
import Body from "./Body/Body";

function Home() {
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
  }, []);

  return (
    <div className="homepage">
      <div className="body">
        {loading ? (
          <div className="loading-container">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <Body />
        )}
      </div>

      {/* Đảm bảo footer không bị đẩy lên trên navbar */}
      {loading && (
        <div className="footer-placeholder" style={{ height: "60px" }} />
      )}
    </div>
  );
}

export default Home;
