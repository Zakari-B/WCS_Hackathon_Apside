/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "@pages/Home";
import Admin from "@pages/Admin";
import Login from "@pages/Login";
import ClusteredBubbles from "./components/ClusteredBubbles";
import "@styles/App.scss";
import NewProject from "./components/NewProject";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Hello</p>
        <NewProject />
      </header>
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
