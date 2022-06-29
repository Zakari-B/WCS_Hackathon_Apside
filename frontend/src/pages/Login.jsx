import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo/logo-transparent-light.png";
import { notifySuccess, notifyError } from "../services/toastify";
import backendAPI from "../services/backendAPI";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Login.scss";

function Login() {
  // Move parts apart
  const [up, setUp] = useState(false);
  const [down, setDown] = useState(false);
  const [isLog, setIsLog] = useState(false);
  const animate = () => {
    setUp(true);
    setDown(true);
    setIsLog(true);
  };

  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isLog) {
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  }, [isLog]);

  const handleSubmit = (e) => {
    e.preventDefault();
    backendAPI
      .post("/api/auth/login", user)
      .then(() => {
        notifySuccess("You are logged in.");
      })
      .catch(() => {
        notifyError("Something went bad.");
      });
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
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
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              onChange={handleChange}
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
