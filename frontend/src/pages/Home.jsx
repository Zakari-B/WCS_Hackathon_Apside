import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as d3 from "d3";
import "@styles/Home.scss";
import ClusteredBubbles from "@components/ClusteredBubbles";
import ModalCommon from "@components/ModalCommon";
import InfoModal from "@components/InfoModal";
import backendAPI from "../services/backendAPI";
import ExportContext from "../contexts/BubbleContext";

const { innerWidth: width, innerHeight: height } = window;

const dimensions = {
  width,
  height,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
};

// const n = 75; // number of nodes
// const m = 8; // number of groups
// const data2 = {
//   children: Array.from(
//     d3.group(
//       // eslint-disable-next-line no-unused-vars
//       Array.from({ length: n }, (_, i) => ({
//         // eslint-disable-next-line no-bitwise
//         group: (Math.random() * m) | 0,
//         value: -Math.log(Math.random()),
//       })),
//       (d) => d.group
//     ),
//     ([, children]) => ({ children })
//   ),
// };
// console.warn("******************* data2", data2);

export default function Home() {
  const [data, setData] = useState(false);
  const navigate = useNavigate();
  const { modalCommon } = useContext(ExportContext.BubbleContext);

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
            name: newData[i].name,
            description: newData[i].description,
            create_time: newData[i].create_time,
            likes: newData[i].likes,
            nb_participants: newData[i].nb_participants,
            nb_agences: newData[i].nb_agences,
            participantsIds: newData[i].participantsIds,
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

    console.log("bubbles", bubbles);

    const maxLikes = bubbles.reduce(
      (acc, bubble) => (bubble.likes > acc ? bubble.likes : acc),
      0
    );
    // console.warn("maxLikes ", maxLikes);

    const newData = bubbles.map((bubble) => {
      // console.warn("bubble id ", bubble.id);

      const agencyId = users.filter((user) => user.id === bubble.creator)[0]
        .agency_id;
      const { lat, long, city, country } = agencies.filter(
        (agency) => agency.id === agencyId
      )[0];

      // console.warn("lat, long", lat, long);

      const filteredUsers = userHasBubble
        .filter((uhb) => uhb.bubble_id === bubble.id)
        .map((uhb) => uhb.user_id);

      const uniqueAgencies = [
        ...new Set(
          filteredUsers.map((userId) => {
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
        name: bubble.name,
        description: bubble.description,
        create_time: bubble.create_time,
        likes: bubble.likes,
        nb_participants: filteredUsers.length,
        nb_agences: uniqueAgencies.length,
        participantsIds: filteredUsers,
      };
    });

    newData.push({
      x: width / 2,
      y: height / 2,
      group: -1,
      workflow: 0,
      value: 0.1,
      city: "",
      country: "",
      name: "",
      description: "",
      create_time: "",
      likes: "",
      nb_participants: "",
      nb_agences: "",
      participantsIds: [],
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
      {data && <ClusteredBubbles data={data} dimensions={dimensions} />}
      {modalCommon && (
        <ModalCommon type={modalCommon} dimensions={dimensions} />
      )}
    </>
  );
}
