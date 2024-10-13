import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./Product.scss";
import Anh1 from "../../../../assets/images/anh1.webp";

const Product: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const allProducts = [
    { id: 1, title: "Product 1", image: Anh1, price: "200,000 VND", description: "This is a description for Product 1." },
    { id: 2, title: "Product 2", image: Anh1, price: "300,000 VND", description: "This is a description for Product 2." },
    { id: 3, title: "Product 3", image: Anh1, price: "400,000 VND", description: "This is a description for Product 3." },
    { id: 4, title: "Product 4", image: Anh1, price: "200,000 VND", description: "This is a description for Product 4." },
    { id: 5, title: "Product 5", image: Anh1, price: "300,000 VND", description: "This is a description for Product 5." },
    { id: 6, title: "Product 6", image: Anh1, price: "400,000 VND", description: "This is a description for Product 6." },
    { id: 7, title: "Product 7", image: Anh1, price: "200,000 VND", description: "This is a description for Product 7." },
    { id: 8, title: "Product 8", image: Anh1, price: "300,000 VND", description: "This is a description for Product 8." },
    { id: 9, title: "Product 9", image: Anh1, price: "400,000 VND", description: "This is a description for Product 9." },
    { id: 10, title: "Product 10", image: Anh1, price: "200,000 VND", description: "This is a description for Product 10." },
    { id: 11, title: "Product 11", image: Anh1, price: "300,000 VND", description: "This is a description for Product 11." },
    { id: 12, title: "Product 12", image: Anh1, price: "400,000 VND", description: "This is a description for Product 12." },
  ];

  const [visibleProducts, setVisibleProducts] = useState(8);
  const [expanded, setExpanded] = useState(false); // Track expanded state

  const handleSeeMore = () => {
    setVisibleProducts(allProducts.length); // Show all products
    setExpanded(true); // Set expanded to true
  };

  const handleHide = () => {
    setVisibleProducts(8); // Limit to first 8 products
    setExpanded(false); // Set expanded to false
  };

  const displayProducts = allProducts.slice(0, visibleProducts);

  const handleProductClick = (id: number) => {
    navigate(`/product/${id}`); // Navigate to product detail page
  };

  return (
    <div className="container product-container">
      <div className="bold-30 text-center mb-2">Đề xuất cho bạn</div>
      <div className="row mb-3">
        {displayProducts.map((product) => (
          <div className="col-md-3 mb-4" key={product.id}>
            <div 
              className="card" 
              onClick={() => handleProductClick(product.id)} // Handle click event
              style={{ cursor: 'pointer' }} // Change cursor to pointer
            >
              <img
                src={product.image} // Now `product.image` is a string (the image path)
                className="card-img-top"
                alt={product.title} // Update alt attribute for better accessibility
              />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">
                  {product.description} {/* Update description content */}
                </p>
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
              Xem Thêm
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
