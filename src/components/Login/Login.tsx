import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../Global/LoginContext";
import "./Login.scss";
import IMG from "../../assets/images/Login.svg";
import Logo from "../../assets/images/Logo.svg";
import Google from "../../assets/images/Google.svg";
import LazyLoad from "react-lazyload";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn, setUserRole } = useLogin();
  const { isLoggedIn } = useLogin();
  const navigate = useNavigate();

    useEffect(() => {
    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);

    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.status === 200) {
      setIsLoggedIn(true);
      setUserRole(data.user.role);
      localStorage.setItem("userRole", data.user.role);
      navigate("/", { replace: true });
    } else {
      alert(data.message);
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
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
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
              <img src={IMG} alt="Building" className="img-fluid" />
            </LazyLoad>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
