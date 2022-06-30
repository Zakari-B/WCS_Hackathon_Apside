/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useContext } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { ToastContainer } from "react-toastify";
import { notifySuccess, notifyError } from "../services/toastify";
import backendAPI from "../services/backendAPI";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/NewProject.scss";

import ExportContext from "../contexts/BubbleContext";

function NewProject() {
  const [idea, setIdea] = useState();
  const { keywords, setKeywords, setModalCommon, skills, setSkills } =
    useContext(ExportContext.BubbleContext);

  const [keywordsOptions, setKeywordsOptions] = useState([
    { id: 1, label: "Init" },
  ]);

  const [skillsOptions, setSkillsOptions] = useState([
    { id: 1, label: "John" },
  ]);

  useEffect(() => {
    backendAPI.get("/api/keyword").then((result) => {
      setKeywordsOptions(result.data);
    });
    backendAPI.get("/api/skill").then((result) => {
      setSkillsOptions(result.data);
    });
  }, []);

  const handleClose = (e) => {
    e.preventDefault();
    console.log("closing modal newProject");
    setKeywords({});
    setModalCommon("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    backendAPI
      .post("/api/bubble", { ...idea, ...keywords, ...skills })
      .then(() => {
        notifySuccess("Bubble blown !");
      })
      .catch(() => {
        notifyError("The bubble popped :(");
      });
  };
  const handleKeywords = (keyword) => {
    setKeywords({ keyword });
  };
  const handleSkills = (skill) => {
    setSkills({ skill });
  };

  const handleChange = (e) => {
    setIdea({
      ...idea,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="newproject">
      <div className="flex flex-col items-center">
        <h1>New Bubble ?</h1>

        <div>
          <form
            className="form flex flex-col items-center"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Name your idea *"
              onChange={handleChange}
              autoComplete="off"
              name="name"
              required
            />
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <Typeahead
                  id="selectKeywords"
                  multiple
                  placeholder="Keywords"
                  onChange={handleKeywords}
                  options={keywordsOptions}
                  selected={keywords?.keywords}
                  className="typeahead-input"
                />
                <textarea
                  type="text"
                  placeholder="Describe it *"
                  onChange={handleChange}
                  autoComplete="off"
                  name="description"
                  required
                />
              </div>
              <div className="flex flex-col items-center">
                <Typeahead
                  id="selectSkills"
                  multiple
                  placeholder="Skills needed"
                  onChange={handleSkills}
                  options={skillsOptions}
                  selected={skills?.skills}
                  className="typeahead-input"
                />
                <input
                  type="text"
                  // eslint-disable-next-line no-return-assign
                  onFocus={(e) => (e.target.type = "date")}
                  // eslint-disable-next-line no-return-assign
                  onBlur={(e) => (e.target.type = "text")}
                  placeholder="Deadline"
                  onChange={handleChange}
                  autoComplete="off"
                  name="deadline"
                />
                <input
                  type="url"
                  placeholder="Gitlab link"
                  onChange={handleChange}
                  autoComplete="off"
                  name="gitlab_link"
                />
                <input
                  type="url"
                  placeholder="Trello link"
                  onChange={handleChange}
                  autoComplete="off"
                  name="trello_link"
                />
                <input
                  type="number"
                  placeholder="People needed (num)"
                  onChange={handleChange}
                  autoComplete="off"
                  name="workforce"
                />
              </div>
            </div>
            <button type="submit" className="submit-button">
              Submit
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={handleClose}
            >
              Cancel
            </button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </section>
  );
}

export default NewProject;
