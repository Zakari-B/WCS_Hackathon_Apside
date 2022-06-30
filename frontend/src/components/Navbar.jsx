import "@styles/Navbar.scss";
import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ExportContext from "../contexts/BubbleContext";

export default function NavBar() {
  const [fadeAnimated, setFadeAnimated] = useState(false);
  const { setModalCommon } = useContext(ExportContext.BubbleContext);

  const handleClick = () => {
    setFadeAnimated(!fadeAnimated);
  };

  const displayModal = (type) => {
    setModalCommon(type);
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/logout");
  };
  return (
    <nav className="navbar">
      <div className="box-circle">
        <div
          className="circle"
          onClick={handleClick}
          onKeyPress={handleClick}
          role="button"
          tabIndex="0"
        >
          <div className="burger">
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="box-out-circle">
          <div className="out-circle">
            <div
              className={`hidden-circle ${
                fadeAnimated ? "hidden-circle-animated" : null
              }`}
            >
              <div
                className={`dots out-dot-1 ${
                  fadeAnimated ? "out-dot-1-animated" : "animated-out"
                }`}
              >
                <div className="inner-dot" />
              </div>

              <li
                className={`box-sidenav sidenav-1 ${
                  fadeAnimated ? "sidenav-1-animated" : "animated-out"
                }`}
              >
                <NavLink to="/" className="nav-link link-1">
                  <div className="nav-item item-1" />
                </NavLink>
              </li>
              <div
                className={`dots out-dot-2 ${
                  fadeAnimated ? "out-dot-2-animated" : "animated-out"
                }`}
              >
                <div className="inner-dot" />
              </div>
              <li
                className={`box-sidenav sidenav-2 ${
                  fadeAnimated ? "sidenav-2-animated" : "animated-out"
                }`}
              >
                <button
                  type="button"
                  className="nav-link link-2"
                  onClick={() => {
                    displayModal("filter");
                  }}
                >
                  <div className="nav-item item-2" />
                </button>
              </li>
              <div
                className={`dots out-dot-3 ${
                  fadeAnimated ? "out-dot-3-animated" : "animated-out"
                }`}
              >
                <div className="inner-dot" />
              </div>
              <li
                className={`box-sidenav sidenav-3 ${
                  fadeAnimated ? "sidenav-3-animated" : "animated-out"
                }`}
              >
                <button
                  type="button"
                  className="nav-link link-3"
                  onClick={() => {
                    displayModal("profil");
                  }}
                >
                  <div className="nav-item item-3" />
                </button>
              </li>
              <div
                className={`dots out-dot-4 ${
                  fadeAnimated ? "out-dot-4-animated" : "animated-out"
                }`}
              >
                <div className="inner-dot" />
              </div>
              <li
                className={`box-sidenav sidenav-4 ${
                  fadeAnimated ? "sidenav-4-animated" : "animated-out"
                }`}
              >
                <button
                  type="button"
                  className={`nav-link link-4 ${
                    fadeAnimated ? "flex" : "hidden"
                  }`}
                  onClick={() => {
                    displayModal("new");
                  }}
                >
                  <div className="nav-item item-4" />
                </button>
              </li>
              <div
                className={`dots out-dot-5 ${
                  fadeAnimated ? "out-dot-5-animated" : "animated-out"
                }`}
              >
                <div className="inner-dot" />
              </div>
              <li
                className={`box-sidenav sidenav-5 ${
                  fadeAnimated ? "sidenav-5-animated" : "animated-out"
                }`}
              >
                <button
                  type="button"
                  onClick={handleLogout}
                  className="nav-link link-5"
                >
                  <div className="nav-item item-5" />
                </button>
              </li>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
