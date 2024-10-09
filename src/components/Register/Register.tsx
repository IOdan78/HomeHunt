import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../Global/LoginContext";
import "./Register.scss";
import IMG from "../../assets/images/Register.svg";
import Logo from "../../assets/images/Logo.svg";
import Google from "../../assets/images/Google.svg";
import LazyLoad from "react-lazyload";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState<number | undefined>(undefined);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { isLoggedIn } = useLogin();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value ? Number(value) : undefined);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, phone, password }),
      });

      const data = await response.json();
      if (response.status === 201) {
        alert("Đăng ký thành công!");
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Đã xảy ra lỗi khi đăng ký.");
    }
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="Register">
      <div className="container-fluid Register-container">
        <div className="row h-100">
          <div className="col-md-6 Register-image d-none d-md-block g-0">
            <LazyLoad offset={0}>
              {loading && (
                <div className="loading-icon">
                  {" "}
                  {/* Placeholder for loading icon */}
                  <span>Loading...</span>
                </div>
              )}
              <img
                src={IMG}
                alt="Building"
                className="img-fluid"
                style={{ display: loading ? "none" : "block" }}
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)}
              />
            </LazyLoad>
          </div>
          <div className="col-md-6 d-grid justify-content-center">
            <div className="position-absolute top-0 mt-3 ms-3 d-flex align-items-center">
              <img
                src={Logo}
                alt="HomeHunt Logo"
                className="Register-logo me-2"
                onClick={handleLogoClick}
              />
              <div className="fs-2 fw-bold" onClick={handleLogoClick}>
                HomeHunt
              </div>
            </div>

            <div className="Register-form">
              <div className="text-center mb-4">
                <div className="fs-6 fw-semibold">
                  Chào mừng bạn đến với HomeHunt!
                </div>
                <div className="fw-bold fs-2 mb-5">Đăng ký tài khoản mới</div>
              </div>
              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tên người dùng"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Số điện thoại"
                    value={phone}
                    onChange={handlePhoneChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Xác nhận mật khẩu"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-custom text-light w-100 p-3"
                >
                  Đăng ký
                </button>
              </form>
              <div className="text-left mt-3">
                <hr />
                <button className="btn btn-outline-secondary w-100 p-2">
                  <img
                    src={Google}
                    alt="Google Logo"
                    className="google-logo me-2"
                  />
                  Đăng ký bằng Google
                </button>
              </div>
              <div className="text-center mt-3">
                <p>
                  Bạn đã có tài khoản?
                  <a href="/login" className="text-custom ms-2">
                    Đăng nhập
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
