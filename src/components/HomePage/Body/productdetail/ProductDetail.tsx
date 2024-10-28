import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.scss";
import { Button } from "react-bootstrap";

interface Product {
  id: number;
  postTitle: string;
  images: string[];
  description: string;
  rentPrice: string;
  deposit: string;
  area: string;
  address: string;
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
  phoneNumber: string;
  [key: string]: any;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string>(""); // Default to empty string

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://671ee00e1dfc429919834fc5.mockapi.io/products/${id}`
        );
        const data = await response.json();
        setProduct(data);
        setMainImage(data.images[0] || ""); // Set first image as main image or empty string if none
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const handleThumbnailClick = (src: string) => {
    setMainImage(src);
  };

  return (
    <div className="product-detail-container container">
      <div className="row">
        {/* Product Image Section */}
        <div className="col-md-8">
          <div className="product-image">
            <div className="main-image">
              <img src={mainImage || ""} alt="Main Product" />
            </div>
            <div className="thumbnails d-flex mt-2">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="thumbnail-image img-thumbnail"
                  onClick={() => handleThumbnailClick(image)}
                />
              ))}
            </div>
          </div>

          {/* New Box with Additional Information */}
          <div className="additional-info card p-3 mt-3">
            <p><strong>Price:</strong> {product.rentPrice}</p>
            <p><strong>Deposit:</strong> {product.deposit}</p>
            <p><strong>Area:</strong> {product.area}</p>
            <p><strong>Address:</strong> {product.address}</p>
            <p><strong>Property Type:</strong> {product.propertyType}</p>
            <p><strong>Bedrooms:</strong> {product.bedrooms}</p>
            <p><strong>Bathrooms:</strong> {product.bathrooms}</p>
          </div>
        </div>

        {/* Product Info Section */}
        <div className="col-md-4">
          <div className="info-box p-3 border">
            <h1 className="product-title">{product.postTitle}</h1>
            <div className="product-description">{product.description}</div>

            <Button variant="success" className="w-100 my-2">
              <i className="bi bi-phone"></i> {product.phoneNumber}
            </Button>
            <Button variant="primary" className="w-100">Chat</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
