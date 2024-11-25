import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Pay from "../../../assets/images/Pay.jpg";
import "./Post.scss";
import { usePolling } from "../PollingContext";

const Post: React.FC = () => {
  const [buildingName, setBuildingName] = useState("");
  const [address, setAddress] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");
  const [block, setBlock] = useState("");
  const [floor, setFloor] = useState("");
  const [apartmentType, setApartmentType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [legalDocument, setLegalDocument] = useState("");
  const [furnitureCondition, setFurnitureCondition] = useState("");
  const [area, setArea] = useState("");
  const [rentPrice, setRentPrice] = useState("");
  const [deposit, setDeposit] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const { startPolling } = usePolling();
  const navigate = useNavigate();

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (
      !buildingName ||
      !address ||
      !propertyType ||
      !selectedImages.length ||
      !apartmentNumber ||
      !block ||
      !floor ||
      !apartmentType ||
      !bedrooms ||
      !bathrooms ||
      !legalDocument ||
      !furnitureCondition ||
      !area ||
      !rentPrice ||
      !deposit ||
      !postTitle ||
      !description
    ) {
      alert("Vui lòng điền đầy đủ tất cả các thông tin trước khi đăng bài!");
      setIsLoading(false);
      return;
    }

    try {
      const userId = localStorage.getItem("userId");
      const phone = localStorage.getItem("phone") || "";

      const imageUrls: string[] = await Promise.all(
        selectedImages.map(async (file) => {
          const storageRef = ref(storage, `images/${file.name}`);
          await uploadBytes(storageRef, file);
          return await getDownloadURL(storageRef);
        })
      );

      const formData = new FormData();

      formData.append("BuildingName", buildingName);
      formData.append("Address", address);
      formData.append("PropertyType", propertyType);
      formData.append("ApartmentNumber", apartmentNumber);
      formData.append("Block", block);
      formData.append("Floor", floor);
      formData.append("ApartmentType", apartmentType);
      formData.append("Bedrooms", bedrooms);
      formData.append("Bathrooms", bathrooms);
      formData.append("LegalDocument", legalDocument);
      formData.append("FurnitureCondition", furnitureCondition);
      formData.append("Area", area);
      formData.append("Price", rentPrice);
      formData.append("Deposit", deposit);
      formData.append("PostTitle", postTitle);
      formData.append("Description", description);
      formData.append("UserId", userId || "");

      imageUrls.forEach((url) => {
        formData.append("Images", url);
      });

      const response = await fetch("https://homehunt.somee.com/api/post", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (response.status !== 201) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const { transactionId, id: postId } = await response.json();

      // Make the second API call

      const transactionResponse = await fetch(
        `https://homehunt.somee.com/api/transaction/create-payment-link?phone=${phone}&postId=${postId}&transactionId=${transactionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            productName: postTitle,
            description: "Payment For Post",
            price: 100000,
            returnUrl: window.location.origin,
            cancelUrl: window.location.origin,
          }),
        }
      );

      if (transactionResponse.status !== 200) {
        const transactionError = await transactionResponse.json();
        throw new Error(transactionError.message);
      }

      const transactionData = await transactionResponse.json();
      console.log("QR link", transactionData.data.paymentInfo.checkoutUrl);
      const checkoutUrl = transactionData.data.paymentInfo.checkoutUrl;
      const orderCode = transactionData.data.paymentInfo.orderCode;

      window.location.href = checkoutUrl;

      startPolling(phone, orderCode);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Lỗi:", error);
        alert("Đã xảy ra lỗi khi đăng tin: " + error.message);
      } else {
        console.error("Lỗi không xác định:", error);
      }
    } finally {
      setIsLoading(false);
      setIsPopupVisible(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedImages((prevImages) => [...prevImages, ...filesArray]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((_, imgIndex) => imgIndex !== index)
    );
  };

  const handleCancel = () => {
    setIsPopupVisible(false);
  };

  const handleGetout = () => {
    navigate("/");
  };

  return (
    <form className="real-estate-form" onSubmit={handlePost}>
      <div className="bold-30 text-center mb-3">Thêm bất động sản</div>

      <div className="section d-flex flex-column gap-2">
        <div className="bold-20">Địa chỉ Bất Động Sản và Hình ảnh</div>
        <input
          type="text"
          name="buildingName"
          placeholder="Tên tòa nhà / khu dân cư / dự án"
          className="form-control"
          value={buildingName}
          onChange={(e) => setBuildingName(e.target.value)}
        />
        <input
          type="text"
          name="address"
          placeholder="Địa chỉ"
          className="form-control"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          name="propertyType"
          placeholder="Loại bất động sản"
          className="form-control"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          required
        />

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => document.getElementById("imageUpload")?.click()}
        >
          Thêm ảnh
        </button>
        <input
          type="file"
          id="imageUpload"
          style={{ display: "none" }}
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />

        <div className="image-preview d-flex flex-wrap gap-2 mt-3">
          {selectedImages.map((image, index) => (
            <div key={index} className="image-item position-relative">
              <img
                src={URL.createObjectURL(image)}
                alt={`preview-${index}`}
                className="selected-image"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <button
                type="button"
                className="btn-close position-absolute top-0 end-0"
                onClick={() => handleRemoveImage(index)}
              ></button>
            </div>
          ))}
        </div>
      </div>

      {/* Vị trí Bất Động Sản */}
      <div className="section d-flex flex-column gap-2">
        <div>Vị trí chung cư (bỏ trống nếu là trọ)</div>
        <div className="row">
          <div className="col-md-4">
            <input
              type="text"
              name="apartmentNumber"
              placeholder="Mã căn"
              className="form-control"
              value={apartmentNumber}
              onChange={(e) => setApartmentNumber(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="block"
              placeholder="Block / Tháp"
              className="form-control"
              value={block}
              onChange={(e) => setBlock(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="floor"
              placeholder="Tầng số"
              className="form-control"
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Thông tin chi tiết */}
      <div className="section d-flex flex-column gap-2">
        <div>Thông tin chi tiết</div>
        <div className="row">
          <div className="col-md-5">
            <input
              type="text"
              name="apartmentType"
              placeholder="Loại hình căn hộ"
              className="form-control"
              value={apartmentType}
              onChange={(e) => setApartmentType(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              name="bedrooms"
              placeholder="Số phòng ngủ"
              className="form-control"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              min={0}
            />
          </div>
          <div className="col-md-4">
            <input
              type="number"
              name="bathrooms"
              placeholder="Số phòng vệ sinh"
              className="form-control"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              min={0}
            />
          </div>
        </div>
      </div>

      <div className="section d-flex flex-column gap-2">
        <div>Thông tin khác</div>
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              name="legalDocument"
              placeholder="Giấy tờ pháp lý"
              className="form-control"
              value={legalDocument}
              onChange={(e) => setLegalDocument(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name="furnitureCondition"
              placeholder="Tình trạng nội thất"
              className="form-control"
              value={furnitureCondition}
              onChange={(e) => setFurnitureCondition(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="section d-flex flex-column gap-2">
        <div>Thông tin tài chính</div>
        <input
          type="number"
          name="area"
          placeholder="Diện tích (m²)"
          className="form-control"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          min={0}
        />
        <input
          type="number"
          name="rentPrice"
          placeholder="Giá thuê"
          className="form-control"
          value={rentPrice}
          onChange={(e) => setRentPrice(e.target.value)}
          min={0}
        />
        <input
          type="number"
          name="deposit"
          placeholder="Tiền cọc"
          className="form-control"
          value={deposit}
          onChange={(e) => setDeposit(e.target.value)}
          min={0}
        />
      </div>

      {/* Tiêu đề và mô tả */}
      <div className="section d-flex flex-column gap-2">
        <div>Mô tả:</div>
        <input
          type="text"
          name="postTitle"
          placeholder="Tiêu đề bài viết"
          className="form-control"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <textarea
          name="description"
          placeholder="Mô tả"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="form-actions d-flex gap-3 mt-3">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading} // Disable the button when loading
        >
          {isLoading && <div className="spinner"></div>
            ? "Đang đăng tin..."
            : "Đăng tin"}{" "}
          {/* Show loading text */}
        </button>
        {isLoading && (
          <div className="loading-overlay">
            <div className="spinner-container">
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
              <span className="loading-text">Loading...</span>
            </div>
          </div>
        )}
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleGetout}
        >
          Hủy
        </button>
      </div>
      {/* Nút Thanh toán */}
      {/* <div className="form-actions d-flex gap-3">
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => setIsPopupVisible(true)}
        >
          Thanh toán
        </button>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={handleGetout}
        >
          Quay lại trang chủ
        </button>
      </div> */}

      {/* Popup */}
      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            {/* Thêm ảnh Pay */}
            <img
              src={Pay}
              alt="Pay"
              className="pay-image"
              style={{
                display: "block",
                margin: "0 auto",
                maxWidth: "100%",
                height: "auto",
              }}
            />

            <div className="confirmation-section mt-3">
              <input
                type="checkbox"
                id="confirmationCheckbox"
                checked={isCheckboxChecked}
                onChange={(e) => setIsCheckboxChecked(e.target.checked)}
              />
              <label htmlFor="confirmationCheckbox">
                Đảm bảo là bạn đã điền đúng toàn bộ thông tin và đã thanh toán
                để đăng tin.
              </label>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default Post;
