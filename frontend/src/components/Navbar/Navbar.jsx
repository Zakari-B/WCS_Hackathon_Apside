import "./Navbar.scss";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <nav className="navbar">
      <div className="box-circle">
        <div className="circle">
          <h1>
            Aps'<span>Ideas</span>
          </h1>
        </div>
        <div className="box-out-circle">
          <div className="out-cercle">
            <div className="dots out-dot-1">
              <div className="inner-dot" />
            </div>

            <li className="box-sidenav sidenav-1">
              <NavLink to="/Home" className="nav-link">
                <div className="nav-item" />
              </NavLink>
            </li>
            <div className="dots out-dot-2">
              <div className="inner-dot" />
            </div>
            <li className="box-sidenav sidenav-2">
              <NavLink to="/Home" className="nav-link">
                <div className="nav-item" />
              </NavLink>
            </li>
            <div className="dots out-dot-3">
              <div className="inner-dot" />
            </div>
            <li className="box-sidenav sidenav-3">
              <NavLink to="/Home" className="nav-link">
                <div className="nav-item" />
              </NavLink>
            </li>
            <div className="dots out-dot-4">
              <div className="inner-dot" />
            </div>
            <li className="box-sidenav sidenav-4">
              <NavLink to="/Home" className="nav-link">
                <div className="nav-item" />
              </NavLink>
            </li>
            <div className="dots out-dot-5">
              <div className="inner-dot" />
            </div>
            <li className="box-sidenav sidenav-5">
              <NavLink to="/Home" className="nav-link">
                <div className="nav-item" />
              </NavLink>
            </li>
          </div>
        </div>
      </div>
    </nav>
  );
}
