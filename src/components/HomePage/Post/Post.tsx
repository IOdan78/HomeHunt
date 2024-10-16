import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Post.scss";


const Post: React.FC = () => {
  const [phoneseller, setPhoneseller] = useState("");
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
  const [selectedImages, setSelectedImages] = useState<
    { url: string; file: File }[]
  >([]);
  const navigate = useNavigate();

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    // Append all the text fields
    formData.append("phoneseller", phoneseller);
    formData.append("buildingName", buildingName);
    formData.append("address", address);
    formData.append("propertyType", propertyType);
    formData.append("apartmentNumber", apartmentNumber);
    formData.append("block", block);
    formData.append("floor", floor);
    formData.append("apartmentType", apartmentType);
    formData.append("bedrooms", bedrooms);
    formData.append("bathrooms", bathrooms);
    formData.append("legalDocument", legalDocument);
    formData.append("furnitureCondition", furnitureCondition);
    formData.append("area", area);
    formData.append("rentPrice", rentPrice);
    formData.append("deposit", deposit);
    formData.append("postTitle", postTitle);
    formData.append("description", description);

    // Append images
    selectedImages.forEach((image, index) => {
      formData.append(`image_${index}`, image.file);
    });

    try {
      const response = await fetch("http://localhost:5000/post", {
        method: "POST",
        body: formData, // Send as multipart/form-data
      });

      const data = await response.json();
      if (response.status === 201) {
        alert("Đăng tin thành công!");
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Đã xảy ra lỗi khi đăng tin.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) => ({
        url: URL.createObjectURL(file),
        file,
      }));
      setSelectedImages((prevImages) => [...prevImages, ...filesArray]);
    }
  };

  const handleRemoveImage = (index: number) => {
    URL.revokeObjectURL(selectedImages[index].url);
    setSelectedImages((prevImages) =>
      prevImages.filter((_, imgIndex) => imgIndex !== index)
    );
  };

  const handleCancel = () => {
      navigate("/");
  };

  return (
    <form className="real-estate-form" onSubmit={handlePost}>
      <div className="bold-30 text-center mb-3">Thêm bất động sản</div>
      <div className="section d-flex flex-column gap-2">
        <input
          type="tel"
          name="phoneseller"
          placeholder="Số điện thoại"
          className="form-control"
          value={phoneseller}
          onChange={(e) => setPhoneseller(e.target.value)}
        />
      </div>

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
                src={image.url}
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
        <div>Vị trí Bất Động Sản</div>
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
        <div>Diện tích và giá</div>
        <input
          type="text"
          name="area"
          placeholder="Diện tích"
          className="form-control"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
        <input
          type="text"
          name="rentPrice"
          placeholder="Giá thuê"
          className="form-control"
          value={rentPrice}
          onChange={(e) => setRentPrice(e.target.value)}
        />
        <input
          type="text"
          name="deposit"
          placeholder="Số tiền cọc"
          className="form-control"
          value={deposit}
          onChange={(e) => setDeposit(e.target.value)}
        />
      </div>

      <div className="section d-flex flex-column gap-2">
        <div>Tiêu đề tin đăng và Mô tả chi tiết</div>
        <input
          type="text"
          name="postTitle"
          placeholder="Tiêu đề tin đăng"
          className="form-control"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <textarea
          name="description"
          placeholder="Mô tả chi tiết"
          className="form-control"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-actions d-flex gap-3">
        <button type="submit" className="btn btn btn-outline-primary">
          Đăng tin
        </button>
        {(
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleCancel}
          >
            Quay lại trang chủ
          </button>
        )}
      </div>
    </form>
  );
};

export default Post;
