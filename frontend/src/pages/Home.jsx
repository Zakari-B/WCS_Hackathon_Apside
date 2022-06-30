import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as d3 from "d3";
import "@styles/Home.scss";
import ClusteredBubbles from "@components/ClusteredBubbles";
import InfoModal from "@components/InfoModal";
import backendAPI from "../services/backendAPI";

const { innerWidth: width, innerHeight: height } = window;

const dimensions = {
  width,
  height,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
};

const n = 75; // number of nodes
const m = 8; // number of groups
const data2 = {
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
console.warn("******************* data2", data2);

export default function Home() {
  const [data, setData] = useState(false);
  const navigate = useNavigate();

  const dataToD3Data = (newData) => {
    return {
      children: Array.from(
        d3.group(
          // eslint-disable-next-line no-unused-vars
          Array.from({ length: newData.length }, (_, i) => ({
            // eslint-disable-next-line no-bitwise
            x: newData[i].x,
            y: newData[i].y,
            group: newData[i].group,
            value: newData[i].value,
            workflow: newData[i].workflow,
            city: newData[i].city,
            country: newData[i].country,
          })),
          (d) => d.group
        ),
        ([, children]) => ({ children })
      ),
    };
  };

  const getDataFromBack = async () => {
    const bubbles = (await backendAPI.get("/api/bubble")).data;
    const users = (await backendAPI.get("/api/users")).data;
    const userHasBubble = (await backendAPI.get("/api/userHasBubble")).data;
    const agencies = (await backendAPI.get("/api/agency")).data;

    const maxLikes = bubbles.reduce(
      (acc, bubble) => (bubble.likes > acc ? bubble.likes : acc),
      0
    );
    console.warn("maxLikes ", maxLikes);

    const newData = bubbles.map((bubble) => {
      // console.warn("bubble id ", bubble.id);

      const agencyId = users.filter((user) => user.id === bubble.creator)[0]
        .agency_id;
      const { lat, long, city, country } = agencies.filter(
        (agency) => agency.id === agencyId
      )[0];

      console.warn("lat, long", lat, long);

      const uniqueAgencies = [
        ...new Set(
          userHasBubble
            .filter((uhb) => uhb.bubble_id === bubble.id)
            .map((uhb) => uhb.user_id)
            .map((userId) => {
              return users.filter((user) => user.id === userId)[0].agency_id;
            })
        ),
      ];

      return {
        x: long,
        y: lat,
        group: agencyId,
        workflow: bubble.workflow_id,
        value: 1 + uniqueAgencies.length + (1 + bubble.likes / maxLikes),
        city,
        country,
      };
    });

    // console.warn("newData", newData);

    const d3data = dataToD3Data(newData);

    // console.warn("d3data", d3data);
    // console.warn("data2", data2);

    setData(d3data);
  };

  useEffect(() => {
    getDataFromBack();

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

  return (
    <>
      <InfoModal />
      <ClusteredBubbles data={data} dimensions={dimensions} />
    </>
  );
}
