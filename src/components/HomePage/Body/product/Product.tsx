import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Product.scss";

const Product: React.FC = () => {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [expanded, setExpanded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const status = true;
// https://671ee00e1dfc429919834fc5.mockapi.io/products
// http://homehunt.somee.com/api/post?status=
// https://localhost:7293/api/post?status=

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://homehunt.somee.com/api/post?status=${status}`);
        const data = await response.json();
        setAllProducts(data); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [status]);

  const handleSeeMore = () => {
    setVisibleProducts(allProducts.length);
    setExpanded(true);
  };

  const handleHide = () => {
    setVisibleProducts(8);
    setExpanded(false);
  };

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const displayProducts = allProducts.slice(0, visibleProducts);

  const handleProductClick = (id: number) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="container product-container">
      <div className="row mb-3">
        {displayProducts.map((product) => (
          <div className="col-md-3 mb-4" key={product.id}>
            <div
              className="card"
              onClick={() => handleProductClick(product.id)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={product.images[0] || 'defaultImage.jpg'} 
                className="card-img-top"
                alt={product.postTitle}
              />
              <div className="card-body">
                <div className="card-title bold-22 text-truncate">{product.postTitle}</div>
                <p className="card-text">Giá thuê: {product.rentPrice}</p>
                <p className="card-text">
                  Mô tả: {isExpanded ? product.description : `${product.description.slice(0, 50)}...`}
                </p>
                <button className="btn btn-outline-primary p-2" onClick={toggleDescription}>
                  {'Xem thêm'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
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
