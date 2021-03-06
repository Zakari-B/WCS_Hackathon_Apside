/* eslint-disable array-callback-return */
import React, { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as d3 from "d3";
import "@styles/Home.scss";
import ClusteredBubbles from "@components/ClusteredBubbles";
import ModalCommon from "@components/ModalCommon";
import InfoModal from "@components/InfoModal";
import NavBar from "@components/Navbar";
import backendAPI from "@services/backendAPI";
import ExportContext from "@contexts/BubbleContext";
import Filter from "@components/Filter";

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
  const {
    modalCommon,
    keywords,
    searchParams,
    isOpenFilter,
    filter,
    setFilterOptions,
  } = useContext(ExportContext.BubbleContext);
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
            id: newData[i].id,
          })),
          (d) => d.group
        ),
        ([, children]) => ({ children })
      ),
    };
  };

  // eslint-disable-next-line consistent-return
  const getDataFromBack = async (doReturn = false) => {
    const bubbles = (await backendAPI.get("/api/bubble")).data;
    const users = (await backendAPI.get("/api/users")).data;
    const userHasBubble = (await backendAPI.get("/api/userHasBubble")).data;
    const agencies = (await backendAPI.get("/api/agency")).data;
    const maxLikes = bubbles.reduce(
      (acc, bubble) => (bubble.likes > acc ? bubble.likes : acc),
      0
    );

    const newData = bubbles.map((bubble) => {
      const agencyId = users.filter((user) => user.id === bubble.creator)[0]
        .agency_id;
      const { lat, long, city, country } = agencies.filter(
        (agency) => agency.id === agencyId
      )[0];

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
        id: bubble.id,
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
      id: "",
    });

    if (doReturn) return newData;
    const d3data = dataToD3Data(newData);

    setData(d3data);
  };

  const filterDatasNewBubble = async (keywordsParam) => {
    let datas = await getDataFromBack(true);
    if (modalCommon)
      datas[datas.length - 1].value = Math.min(height, width) / 15;

    if (keywordsParam.keyword && keywordsParam.keyword.length) {
      const keywordList = keywordsParam.keyword.map((keyword) => keyword.label);

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

    setData(d3data);
  };

  const filterDatas = async (filterParam) => {
    let datas = await getDataFromBack(true);
    const allFilterParam = [
      filterParam.searchInput?.split(" ") || [],
      filterParam.userInput,
      filterParam.bubbleInput,
      filterParam.agenciesInput,
      filterParam.workflowsInput,
      filterParam.keywordsInput,
    ].flat(2);

    // if (filterParam.searchInput && filterParam.searchInput.length) {
    if (allFilterParam.length) {
      const workflows = (await backendAPI.get("/api/workflow")).data;
      // const keywordList = filterParam.searchInput?.split(" ") || [];
      const keywordList = allFilterParam;
      // apres rajouter ici  les trucs des menus d??roulants dans keywordList

      datas = datas.filter((data2, data2index) => {
        const keywordsFound = keywordList.map(() => false);

        if (data2index === datas.length - 1) return true;
        if (keywordList.length) {
          data2.keywords.map((kw) => {
            if (kw !== "") {
              keywordList.map((kww, kwwIndex) => {
                if (kw.toLowerCase().indexOf(kww.toLowerCase()) !== -1)
                  keywordsFound[kwwIndex] = true;
              });
            }
          });

          // meme chose ?? faire pour description
          data2.description.split(" ").map((des) => {
            if (des !== "") {
              keywordList.map((kww, kwwIndex) => {
                if (des.toLowerCase().indexOf(kww.toLowerCase()) !== -1)
                  keywordsFound[kwwIndex] = true;
              });
            }
          });

          // meme chose ?? faire pour skills
          data2.skills.split(" ").map((skill) => {
            if (skill !== "") {
              keywordList.map((kww, kwwIndex) => {
                if (skill.toLowerCase().indexOf(kww.toLowerCase()) !== -1)
                  keywordsFound[kwwIndex] = true;
              });
            }
          });

          // meme chose ?? faire pour name
          data2.name.split(" ").map((nam) => {
            if (nam !== "") {
              keywordList.map((kww, kwwIndex) => {
                if (nam.toLowerCase().indexOf(kww.toLowerCase()) !== -1)
                  keywordsFound[kwwIndex] = true;
              });
            }
          });

          const { workflow } = workflows.filter(
            (wf) => wf.id === data2.workflow
          )[0];

          keywordList.map((kww, kwwIndex) => {
            if (workflow.toLowerCase().indexOf(kww.toLowerCase()) !== -1)
              keywordsFound[kwwIndex] = true;
          });
        }
        return keywordsFound.every((val) => val);
      });
    }

    const d3data = dataToD3Data(datas);

    setData(d3data);

    setForceBigBubble(true); // useless
  };

  const superFilter = async (allFilterParam) => {
    let datas = await getDataFromBack(true);

    const bubbles = (await backendAPI.get("/api/bubble")).data;
    const agencies = (await backendAPI.get("/api/agency")).data;
    const workflows = (await backendAPI.get("/api/workflow")).data;
    // const keywords2 = (await backendAPI.get("/api/keyword")).data;
    const users = (await backendAPI.get("/api/users")).data;

    const userHasBubble = (await backendAPI.get("/api/userHasBubble")).data;

    if (allFilterParam.length) {
      const keywordList = allFilterParam;
      // apres rajouter ici  les trucs des menus d??roulants dans keywordList

      datas = datas.filter((data2, data2index) => {
        if (data2index === datas.length - 1) return true;

        const keywordsFound = keywordList.map(() => false);

        if (keywordList.length) {
          data2.keywords.map((kw) => {
            if (kw !== "") {
              keywordList.map((kww, kwwIndex) => {
                if (kw.toLowerCase().indexOf(kww.toLowerCase()) !== -1)
                  keywordsFound[kwwIndex] = true;
              });
            }
          });

          // meme chose ?? faire pour description
          data2.description
            .split(" ")
            .filter((des) => des.length > 3)
            .map((des) => {
              if (des !== "") {
                keywordList.map((kww, kwwIndex) => {
                  if (des.toLowerCase().indexOf(kww.toLowerCase()) !== -1)
                    keywordsFound[kwwIndex] = true;
                });
              }
            });

          // meme chose ?? faire pour skills
          data2.skills.split(" ").map((skill) => {
            if (skill !== "") {
              keywordList.map((kww, kwwIndex) => {
                if (skill.toLowerCase().indexOf(kww.toLowerCase()) !== -1)
                  keywordsFound[kwwIndex] = true;
              });
            }
          });

          // meme chose ?? faire pour name
          data2.name
            .split(" ")
            .filter((des) => des.length > 3)
            .map((nam) => {
              if (nam !== "") {
                keywordList.map((kww, kwwIndex) => {
                  if (nam.toLowerCase().indexOf(kww.toLowerCase()) !== -1)
                    keywordsFound[kwwIndex] = true;
                });
              }
            });

          // user.firstname, user.lastname, user.email
          userHasBubble
            .filter((uhb) => uhb.bubble_id === data2.id)
            .map((uhb) => uhb.user_id)
            .map((uid) => {
              const user = users.filter((u) => u.id === uid)[0];

              return [user.firstname, user.lastname, user.email];
            })
            .flat(2)
            .map((nam) => {
              if (nam !== "") {
                keywordList.map((kww, kwwIndex) => {
                  if (nam.toLowerCase().indexOf(kww.toLowerCase()) !== -1)
                    keywordsFound[kwwIndex] = true;
                });
              }
            });

          const bubCreatorId = bubbles.filter((bub) => bub.id === data2.id)[0]
            ?.creator;
          const agencyId = users.filter((u) => u.id === bubCreatorId)[0]
            ?.agency_id;

          const { city, country } = agencies.filter(
            (ag) => ag.id === agencyId
          )[0];

          keywordList.map((kww, kwwIndex) => {
            if (city.toLowerCase().indexOf(kww.toLowerCase()) !== -1)
              keywordsFound[kwwIndex] = true;
          });
          keywordList.map((kww, kwwIndex) => {
            if (country.toLowerCase().indexOf(kww.toLowerCase()) !== -1)
              keywordsFound[kwwIndex] = true;
          });

          const { workflow } = workflows.filter(
            (wf) => wf.id === data2.workflow
          )[0];

          keywordList.map((kww, kwwIndex) => {
            if (workflow.toLowerCase().indexOf(kww.toLowerCase()) !== -1)
              keywordsFound[kwwIndex] = true;
          });
        }

        return keywordsFound.every((val) => val);
      });
    }

    const d3data = dataToD3Data(datas);

    setData(d3data);

    // setForceBigBubble(true); // useless
  };

  const populate = async () => {
    const bubbles = (await backendAPI.get("/api/bubble")).data;
    const agencies = (await backendAPI.get("/api/agency")).data;
    const workflows = (await backendAPI.get("/api/workflow")).data;
    const keywords2 = (await backendAPI.get("/api/keyword")).data;
    const users = (await backendAPI.get("/api/users")).data;
    const skills = (await backendAPI.get("/api/skill")).data;

    setFilterOptions(
      [
        ...new Set(
          [
            [
              ...new Set(
                users
                  .map((user) => [user.firstname, user.lastname, user.email])
                  .flat(2)
              ),
            ],
            [...new Set(skills.map((skill) => [skill.label]).flat(2))],
            [
              ...new Set(
                bubbles
                  .map((bubble) => [
                    bubble.description
                      .split(" ")
                      .filter((word) => word.length > 3),
                    bubble.name.split(" ").filter((word) => word.length > 3),
                  ])
                  .flat(3)
              ),
            ],
            [
              ...new Set(
                agencies.map((agency) => [agency.city, agency.country]).flat(3)
              ),
            ],
            workflows.map((workflow) => workflow.workflow),
            keywords2.map((keyword) => keyword.label),
          ].flat(2)
        ),
      ].sort((a, b) => a.localeCompare(b))
    );
  };

  useEffect(() => {
    getDataFromBack();

    populate();

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
    if (!modalCommon) getDataFromBack();
    else filterDatasNewBubble(keywords);
  }, [keywords]);

  useEffect(() => {
    if (!isOpenFilter) getDataFromBack();
    else filterDatas(searchParams);
  }, [searchParams]);

  useEffect(() => {
    superFilter(filter);
  }, [filter]);

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
