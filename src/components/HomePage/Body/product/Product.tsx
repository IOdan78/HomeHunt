/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "./Product.scss";

const Product: React.FC = () => {
  const allProducts = [
    { id: 1, title: "Product 1", image: "your-image-url" },
    { id: 2, title: "Product 2", image: "your-image-url" },
    { id: 3, title: "Product 3", image: "your-image-url" },
    { id: 4, title: "Product 4", image: "your-image-url" },
    { id: 5, title: "Product 5", image: "your-image-url" },
    { id: 6, title: "Product 6", image: "your-image-url" },
    { id: 7, title: "Product 7", image: "your-image-url" },
    { id: 8, title: "Product 8", image: "your-image-url" },
    { id: 9, title: "Product 9", image: "your-image-url" },
    { id: 10, title: "Product 10", image: "your-image-url" },
    { id: 11, title: "Product 11", image: "your-image-url" },
    { id: 12, title: "Product 12", image: "your-image-url" },
    { id: 13, title: "Product 13", image: "your-image-url" },
  ];

  const [visibleProducts, setVisibleProducts] = useState(8);
  const [expanded, setExpanded] = useState(false); // Track expanded state
  const [activeCity, setActiveCity] = useState<string | null>(null);

  const cities = ["Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Cần Thơ", "Nha Trang"];

  const handleCityClick = (city: string) => {
    setActiveCity(city);
  };

  const handleSeeMore = () => {
    setVisibleProducts(allProducts.length); // Show all products
    setExpanded(true); // Set expanded to true
  };

  const handleHide = () => {
    setVisibleProducts(8); // Limit to first 8 products
    setExpanded(false); // Set expanded to false
  };

  const displayProducts = allProducts.slice(0, visibleProducts);

  return (
    <div className="container product-container">
      <div className="bold-30 text-center mb-2">Đề xuất cho bạn</div>
      <div className="button-container mb-5">
        {cities.map((city) => (
          <button
            key={city}
            type="button"
            className={`button-demo ${activeCity === city ? "active" : ""}`}
            onClick={() => handleCityClick(city)}
          >
            {city}
          </button>
        ))}
      </div>
      <div className="row mb-3">
        {displayProducts.map((product) => (
          <div className="col-md-3 mb-4" key={product.id}>
            <div className="card">
              <img
                src={product.image}
                className="card-img-top"
                alt="Product image"
              />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">An item</li>
                <li className="list-group-item">A second item</li>
                <li className="list-group-item">A third item</li>
              </ul>
              <div className="card-body">
                <a href="#" className="card-link">
                  Card link
                </a>
                <a href="#" className="card-link">
                  Another link
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Conditionally render "See More" or "Hide" button */}
      {allProducts.length > 8 && (
        <div className="button-more">
          {!expanded ? (
            <button
              type="button"
              className="btn btn-primary see-more"
              onClick={handleSeeMore}
            >
              Xem Thêm nhà
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary see-more"
              onClick={handleHide}
            >
              Ẩn bớt
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Product;
