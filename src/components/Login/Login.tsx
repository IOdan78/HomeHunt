import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../Global/LoginContext";
import "./Login.scss";
import IMG from "../../assets/images/Login.svg";
import Logo from "../../assets/images/Logo.svg";
import Google from "../../assets/images/Google.svg";
import LazyLoad from "react-lazyload";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setIsLoggedIn, setUserRole } = useLogin();
  const { isLoggedIn } = useLogin();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // https://671ee00e1dfc429919834fc5.mockapi.io/users
    // https://localhost:7293/api/auth/login
    // http://homehunt.somee.com/api/auth/login
    try {
      const response = await fetch("http://homehunt.somee.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Đăng nhập không thành công.");
      }

      const result = await response.json();

      // Check if the login was successful
      if (result.code === 200 && result.data) {
        const { token, user } = result.data;

        // Save login data
        localStorage.setItem("token", token);
        localStorage.setItem("userId", user.id);
        localStorage.setItem("userRole", user.roleName || "Customer");
        localStorage.setItem("phone", user.phone);

        setIsLoggedIn(true);
        setUserRole(user.roleName || "Customer");

        // Navigate based on the role
        if (user.roleName === "Admin") {
          navigate("/admin", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      } else {
        throw new Error(result.message || "Đăng nhập không thành công.");
      }
    } catch (error: any) {
      console.error("Lỗi:", error.message);
      alert(error.message || "Đã xảy ra lỗi khi đăng nhập.");
    }
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="Login">
      <div className="container-fluid login-container">
        <div className="row h-100">
          <div className="col-md-6 d-grid justify-content-center">
            <div className="position-absolute top-0 start-0 mt-3 ms-3 d-flex align-items-center">
              <img
                src={Logo}
                alt="HomeHunt Logo"
                className="login-logo me-2"
                onClick={handleLogoClick}
              />
              <div className="fs-2 fw-bold pe-auto" onClick={handleLogoClick}>
                HomeHunt
              </div>
            </div>

            <div className="login-form">
              <div className="text-left mb-4">
                <div className="fs-6 fw-semibold">Mừng trở lại!</div>
                <div className="fw-bold fs-2 mb-5">Đăng nhập vào HomeHunt</div>
              </div>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tên đăng nhập"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                <button
                  type="submit"
                  className="btn btn-custom text-light w-100 p-3"
                >
                  Đăng nhập
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
                  Đăng nhập bằng Google
                </button>
              </div>
              <div className="text-center mt-3">
                <p>
                  Bạn chưa có tài khoản?
                  <a href="/register" className="text-custom ms-2">
                    Đăng ký
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6 login-image d-none d-md-block g-0">
            <LazyLoad offset={0}>
              {loading && (
                <div className="loading-icon">
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
        </div>
      </div>
    </div>
  );
};

export default Login;
