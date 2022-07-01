import React, { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as d3 from "d3";
import "@styles/Home.scss";
import ClusteredBubbles from "@components/ClusteredBubbles";
import ModalCommon from "@components/ModalCommon";
import InfoModal from "@components/InfoModal";
import NavBar from "@components/Navbar";
import backendAPI from "../services/backendAPI";
import ExportContext from "../contexts/BubbleContext";
import Filter from "../components/Filter";

const { innerWidth: width, innerHeight: height } = window;

const dimensions = {
  width,
  height,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
};

export default function Home() {
  const [data, setData] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [forceBigBubble, setForceBigBubble] = useState(false);
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const { modalCommon, setModalCommon, keywords } = useContext(
    ExportContext.BubbleContext
  );
  // eslint-disable-next-line no-unused-vars
  const reloadBigBubble = useRef(false);

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
            skills: newData[i].skills,
            keywords: newData[i].keywords,
          })),
          (d) => d.group
        ),
        ([, children]) => ({ children })
      ),
    };
  };

  // eslint-disable-next-line consistent-return
  const getDataFromBack = async (doReturn = false) => {
    console.warn("getDataFromBack");

    const bubbles = (await backendAPI.get("/api/bubble")).data;
    const users = (await backendAPI.get("/api/users")).data;
    const userHasBubble = (await backendAPI.get("/api/userHasBubble")).data;
    const agencies = (await backendAPI.get("/api/agency")).data;

    console.warn("bubbles", bubbles);

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
        value: 1 + uniqueAgencies.length + (bubble.likes / maxLikes) * 10,
        city,
        country,
        name: bubble.name,
        description: bubble.description,
        create_time: bubble.create_time,
        keywords: bubble.keywords.split(" "),
        likes: bubble.likes,
        nb_participants: filteredUsers.length,
        nb_agences: uniqueAgencies.length,
        participantsIds: [bubble.creator, ...filteredUsers],
        skills: bubble.skills,
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
      keywords: [],
      likes: "",
      nb_participants: "",
      nb_agences: "",
      participantsIds: [],
      skills: "",
    });

    // console.warn("newData", newData);
    if (doReturn) return newData;
    const d3data = dataToD3Data(newData);

    console.warn("d3data", d3data);
    // console.warn("data2", data2);

    setData(d3data);
  };

  const filterDatas = async (keywordsParam) => {
    console.warn("filterDatas", keywordsParam);

    let datas = await getDataFromBack(true);
    if (modalCommon)
      // if (keywordsParam.keyword.length)
      datas[datas.length - 1].value = Math.min(height, width) / 15;
    // else reloadBigBubble.current = !reloadBigBubble.current;

    if (keywordsParam.keyword && keywordsParam.keyword.length) {
      const keywordList = keywordsParam.keyword.map((keyword) => keyword.label);

      // filter data by keywords
      // datas[datas.length - 1].r = Math.min(height, width) / 10;

      datas = datas.filter((data2, data2index) => {
        let keywordFound = false;
        data2.keywords.map((kw) => {
          if (kw !== "" && keywordList.includes(kw)) keywordFound = true;
          return false;
        });

        if (data2index === datas.length - 1) return true;

        return keywordFound;
      });
    }

    const d3data = dataToD3Data(datas);

    console.warn("d3data", d3data);

    setData(d3data);

    // setForceBigBubble(true); // useless
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

  useEffect(() => {
    console.warn("useEffect keywords", keywords);

    if (!modalCommon) getDataFromBack();
    else filterDatas(keywords);
  }, [keywords]);

  return (
    <>
      <NavBar />
      <Filter />
      <InfoModal />
      {data && <ClusteredBubbles data={data} dimensions={dimensions} />}
      {modalCommon && (
        <ModalCommon type={modalCommon} dimensions={dimensions} />
      )}
    </>
  );
}
