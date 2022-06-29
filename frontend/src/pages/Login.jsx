import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import logo from "../assets/logo/logo-transparent-light.png";
import { instance, notifySuccess, notifyError } from "../services/backendAPI";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Login.scss";

function Login() {
  const ENDPOINT = "/api/auth/login";
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    instance
      .post(ENDPOINT, user)
      .then((res) => {
        notifySuccess(res.data);
      })
      .catch((err) => {
        notifyError(err.response.data);
      });
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container">
      <div className="flex justify-center">
        <img src={logo} alt="" />
      </div>
      <div>
        <h1>Login</h1>
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
          <button type="submit" id="login-button">
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
