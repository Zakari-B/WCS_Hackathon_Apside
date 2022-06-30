import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo/logo-transparent-light.png";
import { notifySuccess, notifyError } from "../services/toastify";
import backendAPI from "../services/backendAPI";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Login.scss";

function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
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
      <div className="container">
        <div className={`login-first-part ${up ? "up" : null}`}>
          <div className="flex justify-center">
            <img src={logo} alt="" />
          </div>
          <div>
            <h1>Login</h1>
          </div>
        </div>
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
            <button type="submit" id="login-button" onClick={animate}>
              Submit
            </button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </section>
  );
}

export default Login;
