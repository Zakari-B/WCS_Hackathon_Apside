import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backendAPI from "../services/backendAPI";
import "@styles/Logout.scss";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    window.localStorage.removeItem("isUserLoggedIn");
    window.localStorage.removeItem("userId");
    backendAPI
      .get("/api/auth/logout")
      .then(() => {
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((err) => {
        console.error(err);
        navigate("/");
      });
  }, []);

  return (
    <div className="seeyou-soon">
      <h1>You are going to be logged out. See you soon !</h1>
    </div>
  );
}

export default Logout;
