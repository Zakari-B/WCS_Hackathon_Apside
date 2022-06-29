/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "@pages/Home/Home";
import Admin from "@pages/Admin/Admin";
import Login from "@pages/Login";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/Profil" element={<Profil />} /> */}
        <Route path="/AdminPanel" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
