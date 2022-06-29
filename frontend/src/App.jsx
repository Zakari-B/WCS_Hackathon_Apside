/* eslint-disable no-unused-vars */
import React from "react";
import * as d3 from "d3";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

import Home from "./pages/Home/Home";
import ClusteredBubbles from "./components/ClusteredBubbles";
import "./App.css";

const dimensions = {
  width: 600,
  height: 600,
  margin: { top: 30, right: 30, bottom: 30, left: 60 },
};
const n = 75; // number of nodes
const m = 8; // number of groups
const data = {
  children: Array.from(
    d3.group(
      Array.from({ length: n }, (_, i) => ({
        // eslint-disable-next-line no-bitwise
        group: (Math.random() * m) | 0,
        value: -Math.log(Math.random()),
      })),
      (d) => d.group
    ),
    ([, children]) => ({ children })
  ),
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ClusteredBubbles data={data} dimensions={dimensions} />
      </header>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/Profil" element={<Profil />} /> */}
      </Routes>
    </div>
  );
}

export default App;
