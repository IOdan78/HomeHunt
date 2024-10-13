import React, { useState } from "react";
import footer from "../../../assets/images/Footer.svg";
import logo from "../../../assets/images/Logo.svg";
import "./Footer.scss";

const Footer: React.FC = () => {
  const [loading, setLoading] = useState(true); // Track loading state

  const handleRedirect = () => {
    window.open(
      "https://www.facebook.com/profile.php?id=100083381929647&mibextid=LQQJ4d&rdid=BhXYaU2RqY8oCPny&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2FDB7tKaK47H1zKzxa%2F%3Fmibextid%3DLQQJ4d",
      "_blank"
    );
  };

  return (
    <footer className="footer">
      <div className="footer-background">
        {loading && (
          <div className="loading-icon">
            <span>Loading...</span>
          </div>
        )}
        <img
          src={footer}
          alt="Footer background"
          className="footer-img"
          style={{ display: loading ? "none" : "block" }}
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
        />
        <div className="content-box">
          <div className="container py-2">
            <div className="row">
              <div className="col-md-4">
                <img src={logo} alt="logo" className="footer-logo mb-3" />
                <p className="mb-1">Công Ty TNHH HomeHunt</p>
                <p className="mb-1">Lô E2a-7, Đường D1, Long Thạnh Mỹ,</p>
                <p className="mb-1">Thành Phố Thủ Đức, Thành phố Hồ Chí Minh</p>
                <p>Email: HomeHunt@gmail.com</p>
                <div className="d-flex">
                  <span className="me-3">
                    <i className="bi bi-flag"></i> Việt Nam
                  </span>
                  <span className="me-3">
                    <i className="bi bi-headset"></i> Hỗ trợ
                  </span>
                </div>
                <div className="d-flex">
                  <span className="me-3">
                    <i className="bi bi-envelope"></i> Liên hệ
                  </span>
                  <span>
                    <i className="bi bi-exclamation-circle"></i> Khiếu nại
                  </span>
                </div>
              </div>
              <div className="col-md-4">
                <h6>Công ty</h6>
                <ul className="list-unstyled">
                  <li>Giới thiệu</li>
                  <li>Tuyển dụng</li>
                  <li>Khuyến mãi</li>
                  <li>Điều khoản sử dụng</li>
                  <li>Chính sách bảo mật</li>
                </ul>
              </div>
              <div className="col-md-4">
                <h6>Hợp tác với chúng tôi</h6>
                <ul className="list-unstyled">
                  <li>Quảng cáo trên HomeHunt</li>
                  <li>Chi nhánh</li>
                  <li>Trung tâm đối tác</li>
                </ul>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-4">
              <p className="mb-0">FOLLOW US</p>
              <div className="social-icons">
                <i className="bi bi-facebook me-3" onClick={handleRedirect}></i>
              </div>
            </div>
          </div>
          <div className="footer-bottom text-center py-3">
            <p className="mb-0">Ứng dụng tìm nhà tốt cho sinh viên</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
