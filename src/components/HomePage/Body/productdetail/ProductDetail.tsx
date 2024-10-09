import React from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.scss"; // Add your styles here

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

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

  const product = allProducts.find((p) => p.id === Number(id));

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-wrapper">
        <div className="product-image">
          <img src={product.image} alt={product.title} className="img-fluid" />
        </div>
        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>
          <div className="product-price">{product.price}</div>
          <div className="product-description">{product.description}</div>
          <button className="btn btn-danger add-to-cart">Add to Cart</button>
          <button className="btn btn-primary buy-now">Buy Now</button>
        </div>
      </div>
      <div className="additional-info">
        <h3>Additional Information</h3>
        {/* Add more sections as needed */}
      </div>
    </div>
  );
};

export default ProductDetail;
