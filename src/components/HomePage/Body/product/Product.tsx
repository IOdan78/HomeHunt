/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./Product.scss";

const Product: React.FC = () => {
  const allProducts = [
   { id: 1, title: "Product 1", image: "your-image-url-1", price: "200,000 VND", description: "This is a description for Product 1." },
    { id: 2, title: "Product 2", image: "your-image-url-2", price: "300,000 VND", description: "This is a description for Product 2." },
    { id: 3, title: "Product 3", image: "your-image-url-3", price: "400,000 VND", description: "This is a description for Product 3." },
    { id: 4, title: "Product 1", image: "your-image-url-1", price: "200,000 VND", description: "This is a description for Product 1." },
    { id: 5, title: "Product 2", image: "your-image-url-2", price: "300,000 VND", description: "This is a description for Product 2." },
    { id: 6, title: "Product 3", image: "your-image-url-3", price: "400,000 VND", description: "This is a description for Product 3." },
    { id: 7, title: "Product 1", image: "your-image-url-1", price: "200,000 VND", description: "This is a description for Product 1." },
    { id: 8, title: "Product 2", image: "your-image-url-2", price: "300,000 VND", description: "This is a description for Product 2." },
    { id: 9, title: "Product 3", image: "your-image-url-3", price: "400,000 VND", description: "This is a description for Product 3." },
    { id: 10, title: "Product 1", image: "your-image-url-1", price: "200,000 VND", description: "This is a description for Product 1." },
    { id: 11, title: "Product 2", image: "your-image-url-2", price: "300,000 VND", description: "This is a description for Product 2." },
    { id: 12, title: "Product 3", image: "your-image-url-3", price: "400,000 VND", description: "This is a description for Product 3." },
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

  return (
    <div className="container product-container">
      <div className="bold-30 text-center mb-2">Đề xuất cho bạn</div>
      <div className="row mb-3">
        {displayProducts.map((product) => (
          <div className="col-md-3 mb-4" key={product.id}>
            <Link to={`/product/${product.id}`} className="card"> {/* Link to product detail */}
              <img
                src={product.image}
                className="card-img-top"
                alt={product.title} // Update alt attribute for better accessibility
              />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </Link>
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
