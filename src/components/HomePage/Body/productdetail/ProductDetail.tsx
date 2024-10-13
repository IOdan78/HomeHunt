import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.scss";
import Anh1 from "../../../../assets/images/anh1.webp";
import Anh2 from "../../../../assets/images/anh2.webp";
import Anh3 from "../../../../assets/images/anh3.webp";
import Anh4 from "../../../../assets/images/anh4.webp";
import Anh5 from "../../../../assets/images/anh5.webp";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const allProducts = [
    {
      id: 1,
      title: "Product 1",
      images: [
        { src: Anh1, alt: "Image 1A" },
        { src: Anh2, alt: "Image 1B" },
        { src: Anh3, alt: "Image 1C" },
        { src: Anh4, alt: "Image 1D" },
        { src: Anh5, alt: "Image 1E" },
      ],
      price: "200,000 VND",
      description: "This is a description for Product 1.",
      phoneNumber: "0987654321",
    },
    {
      id: 2,
      title: "Product 1",
      images: [
        { src: Anh1, alt: "Image 1A" },
        { src: Anh2, alt: "Image 1B" },
        { src: Anh3, alt: "Image 1C" },
        { src: Anh4, alt: "Image 1D" },
        { src: Anh5, alt: "Image 1E" },
      ],
      price: "200,000 VND",
      description: "This is a description for Product 1.",
      phoneNumber: "0987654321",
    },
    {
      id: 3,
      title: "Product 1",
      images: [
        { src: Anh1, alt: "Image 1A" },
        { src: Anh2, alt: "Image 1B" },
        { src: Anh3, alt: "Image 1C" },
        { src: Anh4, alt: "Image 1D" },
        { src: Anh5, alt: "Image 1E" },
      ],
      price: "200,000 VND",
      description: "This is a description for Product 1.",
      phoneNumber: "0987654321",
    },
    {
      id: 4,
      title: "Product 1",
      images: [
        { src: Anh1, alt: "Image 1A" },
        { src: Anh2, alt: "Image 1B" },
        { src: Anh3, alt: "Image 1C" },
        { src: Anh4, alt: "Image 1D" },
        { src: Anh5, alt: "Image 1E" },
      ],
      price: "200,000 VND",
      description: "This is a description for Product 1.",
      phoneNumber: "0987654321",
    },
    {
      id: 5,
      title: "Product 1",
      images: [
        { src: Anh1, alt: "Image 1A" },
        { src: Anh2, alt: "Image 1B" },
        { src: Anh3, alt: "Image 1C" },
        { src: Anh4, alt: "Image 1D" },
        { src: Anh5, alt: "Image 1E" },
      ],
      price: "200,000 VND",
      description: "This is a description for Product 1.",
      phoneNumber: "0987654321",
    },
    {
      id: 6,
      title: "Product 1",
      images: [
        { src: Anh1, alt: "Image 1A" },
        { src: Anh2, alt: "Image 1B" },
        { src: Anh3, alt: "Image 1C" },
        { src: Anh4, alt: "Image 1D" },
        { src: Anh5, alt: "Image 1E" },
      ],
      price: "200,000 VND",
      description: "This is a description for Product 1.",
      phoneNumber: "0987654321",
    },
    {
      id: 7,
      title: "Product 1",
      images: [
        { src: Anh1, alt: "Image 1A" },
        { src: Anh2, alt: "Image 1B" },
        { src: Anh3, alt: "Image 1C" },
        { src: Anh4, alt: "Image 1D" },
        { src: Anh5, alt: "Image 1E" },
      ],
      price: "200,000 VND",
      description: "This is a description for Product 1.",
      phoneNumber: "0987654321",
    },
    {
      id: 8,
      title: "Product 1",
      images: [
        { src: Anh1, alt: "Image 1A" },
        { src: Anh2, alt: "Image 1B" },
        { src: Anh3, alt: "Image 1C" },
        { src: Anh4, alt: "Image 1D" },
        { src: Anh5, alt: "Image 1E" },
      ],
      price: "200,000 VND",
      description: "This is a description for Product 1.",
      phoneNumber: "0987654321",
    },
    {
      id: 9,
      title: "Product 1",
      images: [
        { src: Anh1, alt: "Image 1A" },
        { src: Anh2, alt: "Image 1B" },
        { src: Anh3, alt: "Image 1C" },
        { src: Anh4, alt: "Image 1D" },
        { src: Anh5, alt: "Image 1E" },
      ],
      price: "200,000 VND",
      description: "This is a description for Product 1.",
      phoneNumber: "0987654321",
    },
    {
      id: 10,
      title: "Product 1",
      images: [
        { src: Anh1, alt: "Image 1A" },
        { src: Anh2, alt: "Image 1B" },
        { src: Anh3, alt: "Image 1C" },
        { src: Anh4, alt: "Image 1D" },
        { src: Anh5, alt: "Image 1E" },
      ],
      price: "200,000 VND",
      description: "This is a description for Product 1.",
      phoneNumber: "0987654321",
    },
    {
      id: 11,
      title: "Product 1",
      images: [
        { src: Anh1, alt: "Image 1A" },
        { src: Anh2, alt: "Image 1B" },
        { src: Anh3, alt: "Image 1C" },
        { src: Anh4, alt: "Image 1D" },
        { src: Anh5, alt: "Image 1E" },
      ],
      price: "200,000 VND",
      description: "This is a description for Product 1.",
      phoneNumber: "0987654321",
    },
    {
      id: 12,
      title: "Product 1",
      images: [
        { src: Anh1, alt: "Image 1A" },
        { src: Anh2, alt: "Image 1B" },
        { src: Anh3, alt: "Image 1C" },
        { src: Anh4, alt: "Image 1D" },
        { src: Anh5, alt: "Image 1E" },
      ],
      price: "200,000 VND",
      description: "This is a description for Product 1.",
      phoneNumber: "0987654321",
    },
  ];

  const product = allProducts.find((p) => p.id === Number(id));

  const [mainImage, setMainImage] = useState(product?.images[0].src);
  const [showPhone, setShowPhone] = useState(false);

  if (!product) {
    return <div>Product not found!</div>;
  }

  const phoneNumber = product.phoneNumber;
  const maskedPhone = `${phoneNumber.slice(0, -3)}***`; // Masking the last 3 digits of the phone number

  const handleThumbnailClick = (src: string) => {
    setMainImage(src); // Change the main image source
  };

  const handleShowPhone = () => {
    setShowPhone(true);
  };

  return (
    <div className="product-detail-container container">
      <div className="row">
        {/* Product Image Section */}
        <div className="col-md-8">
          <div className="product-image">
            <div className="main-image">
              <img src={mainImage} alt="Main Product" />
            </div>

            <div className="thumbnails d-flex mt-2">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  className="thumbnail-image img-thumbnail"
                  onClick={() => handleThumbnailClick(image.src)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Product Info Section */}
        <div className="col-md-4">
          <div className="info-box p-3 border">
            <h1 className="product-title">{product.title}</h1>
            <div className="product-price">{product.price}</div>
            <div className="product-description">{product.description}</div>

            {/* Button to Show Phone */}
            <button
              className="btn btn-primary w-100 mb-3"
              onClick={handleShowPhone}
            >
              {showPhone ? phoneNumber : `Bấm vào để hiện SĐT ${maskedPhone}`}
            </button>
            <button className="btn btn-outline-primary w-100">Chat</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
