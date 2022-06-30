import "@styles/Navbar.scss";
import React, { useState } from "react";

import { NavLink } from "react-router-dom";

export default function Home() {
  const [fadeAnimated, setFadeAnimated] = useState(false);

  const handleClick = () => {
    setFadeAnimated(!fadeAnimated);
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
                  fadeAnimated ? "out-dot-1-animated" : "out-dot-1-animated-out"
                }`}
              >
                <div className="inner-dot" />
              </div>

              <li
                className={`box-sidenav sidenav-1 ${
                  fadeAnimated ? "sidenav-1-animated" : "sidenav-1-animated-out"
                }`}
              >
                <NavLink to="/" className="nav-link link-1">
                  <div className="nav-item item-1" />
                </NavLink>
              </li>
              <div
                className={`dots out-dot-2 ${
                  fadeAnimated ? "out-dot-2-animated" : "out-dot-2-animated-out"
                }`}
              >
                <div className="inner-dot" />
              </div>
              <li
                className={`box-sidenav sidenav-2 ${
                  fadeAnimated ? "sidenav-2-animated" : "sidenav-2-animated-out"
                }`}
              >
                <NavLink to="/Home" className="nav-link link-2">
                  <div className="nav-item item-2" />
                </NavLink>
              </li>
              <div
                className={`dots out-dot-3 ${
                  fadeAnimated ? "out-dot-3-animated" : "out-dot-3-animated-out"
                }`}
              >
                <div className="inner-dot" />
              </div>
              <li
                className={`box-sidenav sidenav-3 ${
                  fadeAnimated ? "sidenav-3-animated" : "sidenav-3-animated-out"
                }`}
              >
                <NavLink to="/Home" className="nav-link link-3">
                  <div className="nav-item item-3" />
                </NavLink>
              </li>
              <div
                className={`dots out-dot-4 ${
                  fadeAnimated ? "out-dot-4-animated" : "out-dot-4-animated-out"
                }`}
              >
                <div className="inner-dot" />
              </div>
              <li
                className={`box-sidenav sidenav-4 ${
                  fadeAnimated ? "sidenav-4-animated" : "sidenav-4-animated-out"
                }`}
              >
                <NavLink to="/Home" className="nav-link link-4">
                  <div className="nav-item item-4" />
                </NavLink>
              </li>
              <div
                className={`dots out-dot-5 ${
                  fadeAnimated ? "out-dot-5-animated" : "out-dot-5-animated-out"
                }`}
              >
                <div className="inner-dot" />
              </div>
              <li
                className={`box-sidenav sidenav-5 ${
                  fadeAnimated ? "sidenav-5-animated" : "sidenav-5-animated-out"
                }`}
              >
                <NavLink to="/Home" className="nav-link link-5">
                  <div className="nav-item item-5" />
                </NavLink>
              </li>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
