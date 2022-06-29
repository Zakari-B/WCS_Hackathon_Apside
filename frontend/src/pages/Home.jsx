import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as d3 from "d3";
import "@styles/Home.scss";
import ClusteredBubbles from "@components/ClusteredBubbles";
import backendAPI from "../services/backendAPI";

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
      // eslint-disable-next-line no-unused-vars
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

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("isUserLoggedIn"))) {
      backendAPI.get("/api/auth/sessionControl").then((res) => {
        if (res.code === "401") {
          window.localStorage.removeItem("isUserLoggedIn");
          navigate("/login");
        }
      });
    } else {
      window.localStorage.removeItem("isUserLoggedIn");
      navigate("/login");
    }
  }, []);

  return <ClusteredBubbles data={data} dimensions={dimensions} />;
}
