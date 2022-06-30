/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "@pages/Home";
import Admin from "@pages/Admin";
import Login from "@pages/Login";
import Logout from "@pages/Logout";
import Error404 from "@pages/Error404";
import "@styles/App.scss";
import Navbar from "@components/Navbar";
import NewProject from "./components/NewProject";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Hello</p>
        <NewProject />
        {/* <Navbar /> */}
      </header>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/Profil" element={<Profil />} /> */}
        <Route path="/Logout" element={<Logout />} />
        <Route path="/AdminPanel" element={<Admin />} />
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
