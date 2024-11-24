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
  phoneseller: string;
  [key: string]: any;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [showPhone, setShowPhone] = useState(false);

// https://localhost:7293/api/post/${id}
// https://671ee00e1dfc429919834fc5.mockapi.io/products/${id}`
// http://homehunt.somee.com/api/post/${id}

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://homehunt.somee.com/api/post/${id}`
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

  const handlePhoneClick = () => {
    setShowPhone(true);
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
            <p>
              <strong>Mô tả:</strong> {product.description}
            </p>

            <div className="d-flex justify-content-between">
              <div className="flex-grow-1 me-3">
                <p>
                  <strong>Area:</strong> {product.area}
                </p>
                <p>
                  <strong>Property Type:</strong> {product.propertyType}
                </p>
              </div>
              <div className="flex-grow-1">
                <p>
                  <strong>Bedrooms:</strong> {product.bedrooms}
                </p>
                <p>
                  <strong>Bathrooms:</strong> {product.bathrooms}
                </p>
              </div>
            </div>

            <p>
              <strong>Address:</strong> {product.address}
            </p>
          </div>
        </div>

        {/* Product Info Section */}
        <div className="col-md-4">
          <div className="info-box p-3 border">
            <h1 className="product-title">{product.postTitle}</h1>
            <div className="d-flex">
              <div className="product-description">
                <strong className="me-1">Price:</strong>
                {product.rentPrice}
              </div>
              <div className="product-description ms-5">
                <strong className="me-1">Deposit:</strong>
                {product.deposit}
              </div>
            </div>

            <Button
              variant="success"
              className="w-100 my-2"
              onClick={handlePhoneClick}
            >
              {showPhone ? product.phoneseller : "Bấm vào để xem sđt"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
