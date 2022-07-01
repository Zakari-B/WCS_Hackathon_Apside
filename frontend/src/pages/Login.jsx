import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import logo from "@assets/logo/logo-transparent-light.png";
import { notifySuccess, notifyError } from "@services/toastify";
import backendAPI from "@services/backendAPI";
import "react-toastify/dist/ReactToastify.css";
import "@styles/Login.scss";

function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // Move parts apart
  const [up, setUp] = useState(false);
  const [down, setDown] = useState(false);
  const animate = () => {
    setUp(true);
    setDown(true);
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("isUserLoggedIn"))) {
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    backendAPI
      .post("/api/auth/login", {
        email: userEmail,
        password: userPassword,
        remember: rememberMe,
      })
      .then((answer) => {
        window.localStorage.setItem("isUserLoggedIn", true);
        window.localStorage.setItem("userId", answer.data.id);
        notifySuccess("You are logged in.");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch(() => {
        notifyError("Something went wrong.");
      });
  };

  return (
    <section id="login">
      <div className="second-part-login h-full">
        <div className={`login-first-part ${up ? "up" : null}`}>
          <div className="flex flex-col items-center justify-center mb-4">
            <img src={logo} alt="" />
            <h1>Login</h1>
          </div>
        </div>
        <ToastContainer />

        <div className={`login-second-part ${down ? "down" : null}`}>
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setUserPassword(e.target.value)}
              autoComplete="off"
              required
            />
            <div id="rememberCheckbox">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => {
                  setRememberMe(!rememberMe);
                }}
              />
              <p>Se souvenir de moi </p>
            </div>
            <button type="submit" id="login-button" onClick={animate}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
