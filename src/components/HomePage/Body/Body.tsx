import React, { useState } from "react";
import Background from "../../../assets/images/HomePage.svg";
import "./Body.scss";
import Check from "../../../assets/images/Check.svg";
import Phone from "../../../assets/images/Phone.svg";
import Search from "../../../assets/images/Search.svg";
import Support from "../../../assets/images/Support.svg";
import SeactHome from "../../../assets/images/SearchHome.svg";
import List from "../../../assets/images/List.svg";
import Luggage from "../../../assets/images/Luggage.svg";
import LazyLoad from "react-lazyload";
import Product from "./product/Product";
import { useNavigate } from "react-router-dom";

const Body: React.FC = () => {
  const [loading, setLoading] = useState(true); // Track loading state
  const navigate = useNavigate();

  const handlePost = () => {
    navigate(`/post`);
  };

  return (
    <div className="body">
      <div className="container-fluid p-0 position-relative background">
        <LazyLoad offset={0}>
          {loading && (
            <div className="loading-icon">
              {" "}
              {/* Placeholder for loading icon */}
              <span>Loading...</span>
            </div>
          )}
          <img
            src={Background}
            alt="Background"
            className="position-absolute w-100 img-fluid"
            style={{ display: loading ? "none" : "block" }}
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
          />
        </LazyLoad>
        <div className="content-wrapper d-flex justify-content-center align-items-center">
          <div className="search-box d-flex align-items-center">
            <div className="location d-flex align-items-center justify-content-center">
              <i className="bi bi-geo-alt-fill"></i>
              <span>HCM</span>
            </div>

            <input
              type="text"
              placeholder="Tìm quận, tên đường"
              className="search-input"
            />

            <button className="btn btn-outline-primary filter-button d-flex align-items-center justify-content-center">
              <i className="bi bi-filter"></i>
              <span>Bộ lọc</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="features-section text-center">
          <div className="bold-30">Tìm nhà ở cho sinh viên</div>
          <div className="light-14 mb-5">Hãy để chúng tôi lo việc tìm kiếm</div>
          <div className="row justify-content-center">
            <div className="col-md-3 feature-item">
              <div className="icon-container">
                <img
                  src={Phone}
                  className="icon-img"
                  alt="Sơ đồ và chi tiết phòng"
                />
              </div>
              <div className="bold-25">Sơ đồ và chi tiết phòng</div>
              <div className="light-14">
                Nhận biết số phòng, hướng, sơ đồ tầng và bạn cùng phòng.
              </div>
            </div>
            <div className="col-md-3 feature-item">
              <div className="icon-container">
                <img
                  src={Check}
                  className="icon-img"
                  alt="Được xác minh 100%"
                />
              </div>
              <div className="bold-25">Được xác minh 100%</div>
              <div className="light-14">
                Bạn sẽ nhận được những gì như đã hứa.
              </div>
            </div>
            <div className="col-md-3 feature-item">
              <div className="icon-container">
                <img
                  src={Search}
                  className="icon-img"
                  alt="Giá thành được đảm bảo"
                />
              </div>
              <div className="bold-25">Giá thành được đảm bảo</div>
              <div className="light-14">
                Sẽ tìm được mức giá tốt nhất cho bạn.
              </div>
            </div>
            <div className="col-md-3 feature-item">
              <div className="icon-container">
                <img
                  src={Support}
                  className="icon-img"
                  alt="Chăm sóc khách hàng 1v1"
                />
              </div>
              <div className="bold-25">Chăm sóc khách hàng 1v1</div>
              <div className="light-14">Sẽ hỗ trợ bạn mọi thời điểm.</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-5">
        <Product />
      </div>

      <div className="container">
        <div className="features-section text-center">
          <div className="bold-30">Đặt phòng dễ dàng</div>
          <div className="light-14 mb-5">Hãy để chúng tôi lo việc tìm kiếm</div>
          <div className="row justify-content-center">
            <div className="col-md-4 feature-item">
              <div className="icon-container">
                <img
                  src={SeactHome}
                  className="icon-img"
                  alt="Tìm kiếm và đảm bảo"
                />
              </div>
              <div className="bold-25">Tìm kiếm và đảm bảo</div>
              <div className="light-14">Xác minh nơi ở bạn chọn.</div>
            </div>
            <div className="col-md-4 feature-item">
              <div className="icon-container">
                <img
                  src={List}
                  className="icon-img"
                  alt="Hoàn thành đơn đăng ký"
                />
              </div>
              <div className="bold-25">Hoàn thành đơn đăng ký</div>
              <div className="light-14">
                Hãy để chúng tôi lo vấn đề giấy tờ.
              </div>
            </div>
            <div className="col-md-4 feature-item">
              <div className="icon-container">
                <img
                  src={Luggage}
                  className="icon-img"
                  alt="Tìm nhà hoàn tất"
                />
              </div>
              <div className="bold-25">Tìm nhà hoàn tất</div>
              <div className="light-14">
                Giờ thì đến điểm hẹn nhận nhà mới thôi.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="text-center">
          <div className="bold-30">Chủ nhà hoặc Nhà quản lý bất động sản</div>
          <div className="light-14 mb-3">
            Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi
          </div>
          <button
            type="button"
            className="btn btn-primary px-5 py-3 mb-5"
            onClick={handlePost}
          >
            Cho thuê
          </button>
        </div>
      </div>
    </div>
  );
};

export default Body;
