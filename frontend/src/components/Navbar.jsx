import "@styles/Navbar.scss";
import React from "react";

import { NavLink, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/logout");
  };
  return (
    <nav className="navbar">
      <div className="box-circle">
        <div className="circle">{/* <h1>Nav</h1> */}</div>
        <div className="box-out-circle">
          <div className="out-cercle">
            <div className="dots out-dot-1">
              <div className="inner-dot" />
            </div>

            <li className="box-sidenav sidenav-1">
              <NavLink to="/Home" className="nav-link">
                <div className="nav-item item-1" />
              </NavLink>
            </li>
            <div className="dots out-dot-2">
              <div className="inner-dot" />
            </div>
            <li className="box-sidenav sidenav-2">
              <NavLink to="/Home" className="nav-link">
                <div className="nav-item item-2" />
              </NavLink>
            </li>
            <div className="dots out-dot-3">
              <div className="inner-dot" />
            </div>
            <li className="box-sidenav sidenav-3">
              <NavLink to="/Home" className="nav-link">
                <div className="nav-item item-3" />
              </NavLink>
            </li>
            <div className="dots out-dot-4">
              <div className="inner-dot" />
            </div>
            <li className="box-sidenav sidenav-4">
              <NavLink to="/Home" className="nav-link">
                <div className="nav-item item-4" />
              </NavLink>
            </li>
            <div className="dots out-dot-5">
              <div className="inner-dot" />
            </div>
            <li className="box-sidenav sidenav-5">
              <button type="button" onClick={handleLogout} className="nav-link">
                <div className="nav-item item-5" />
              </button>
            </li>
          </div>
        </div>
      </div>
    </nav>
  );
}
