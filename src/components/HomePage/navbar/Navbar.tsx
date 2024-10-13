import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Thêm useLocation để theo dõi đường dẫn hiện tại
import { useLogin } from "../../Global/LoginContext";
import "./Navbar.scss";
import Logo from "../../../assets/images/Logo.svg";
import PostIcon from "../../../assets/images/Post.svg";

function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useLogin();
  const navigate = useNavigate();
  const location = useLocation(); // Lấy thông tin về đường dẫn hiện tại
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleLogoClick = () => {
    navigate("/"); // Điều hướng về trang chủ
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handlePostClick = () => {
    navigate(`/post`);
  };

  const handleRedirect = () => {
    window.location.href =
      "https://www.facebook.com/profile.php?id=100083381929647&mibextid=LQQJ4d&rdid=BhXYaU2RqY8oCPny&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2FDB7tKaK47H1zKzxa%2F%3Fmibextid%3DLQQJ4d";
  };

  const handleChat = () => {
    window.location.href =
      "https://www.facebook.com/messages/t/100343929395378";
  };

  const isPostPage = location.pathname === "/post";

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="navbar-brand d-flex align-items-center">
          <img
            src={Logo}
            alt="Logo HomeHunt"
            className="navbar-logo me-2"
            onClick={handleLogoClick}
          />
          <span className="fs-4 fw-bold" onClick={handleLogoClick}>
            HomeHunt
          </span>
        </div>

        <button className="navbar-toggler" type="button" onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`navbar-collapse ${isMenuOpen ? "show" : ""}`}>
          <div className="navbar-icons d-flex align-items-center">
            <div className="social-icons">
              <i className="bi bi-people-fill navbar-icon"></i>

              <i className="bi bi-send-fill navbar-icon"></i>

              <i
                className="bi bi-chat-dots-fill navbar-icon"
                onClick={handleChat}
              ></i>

              <i className="bi bi-person-circle navbar-icon"></i>

              <i
                className="bi bi-globe2 navbar-icon"
                onClick={handleRedirect}
              ></i>
            </div>
          </div>

          <div className="navbar-icons d-flex align-items-center">
            {isLoggedIn ? (
              <div className="auth-buttons">
                {!isPostPage && ( // Ẩn nút đăng tin khi ở trang /post
                  <button
                    className="btn btn-orange btn-outline-primary me-5"
                    onClick={handlePostClick} // Khi nhấn nút, hiển thị Post
                  >
                    <img
                      src={PostIcon}
                      alt="Biểu tượng đăng tin"
                      className="navbar-icon-post"
                    />
                    Đăng tin
                  </button>
                )}
                <button
                  className="btn btn-outline-danger"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <button
                  className="btn btn-outline-primary me-2"
                  onClick={handleLogin}
                >
                  Đăng nhập
                </button>
                <button
                  className="btn btn-outline-primary"
                  onClick={handleRegister}
                >
                  Đăng ký
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
