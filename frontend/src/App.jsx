import React from "react";
import { Routes, Route } from "react-router-dom";
// import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
// import Profil from "./pages/Profil/Profil";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/Home" element={<Home />} />
        {/* <Route path="/Profil" element={<Profil />} /> */}
      </Routes>
    </div>
  );
}

export default App;
