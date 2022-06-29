/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "@pages/Home/Home";
import Admin from "@pages/Admin/Admin";

import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Hello</p>
      </header>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/" element={<Home />} />
        {/* <Route path="/Profil" element={<Profil />} /> */}
        <Route path="/AdminPanel" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
