import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Typeahead } from "react-bootstrap-typeahead";
import { ToastContainer } from "react-toastify";
import { notifySuccess, notifyError } from "../services/toastify";
import backendAPI from "../services/backendAPI";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/NewProject.scss";

import ExportContextKeyword from "../contexts/KeywordContext";

function NewProject() {
  const navigate = useNavigate();
  const [idea, setIdea] = useState();
  const { keywords, setKeywords } = useContext(
    ExportContextKeyword.KeywordContext
  );

  const [keywordsOptions, setKeywordsOptions] = useState([
    { id: 1, label: "John" },
    { id: 2, label: "Miles" },
    { id: 3, label: "Charles" },
    { id: 4, label: "Herbie" },
  ]);

  useEffect(() => {
    backendAPI.get("/api/keyword").then((result) => {
      setKeywordsOptions(result.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    backendAPI
      .post("/api/bubble", { ...idea, ...keywords })
      .then(() => {
        notifySuccess("Bubble blown !");
      })
      .catch(() => {
        notifyError("The bubble popped :(");
      });
  };
  const handleKeywords = (selected) => {
    setKeywords({ selected });
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
          <form className="form" onSubmit={handleSubmit}>
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <input
                  type="text"
                  placeholder="Name your idea *"
                  onChange={handleChange}
                  autoComplete="off"
                  name="name"
                  required
                />
                <textarea
                  type="text"
                  placeholder="Describe it *"
                  onChange={handleChange}
                  autoComplete="off"
                  name="description"
                  required
                />
                {Typeahead && (
                  <Typeahead
                    id="selectKeywords"
                    multiple
                    placeholder="Select 1 to 3 Keywords"
                    onChange={handleKeywords}
                    options={keywordsOptions}
                    selected={keywords?.selected}
                    className="typeahead-input"
                  />
                )}
              </div>
              <div className="flex flex-col items-center">
                <input
                  type="date"
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
                  placeholder="Apsidien.nes needed"
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
              onClick={() => navigate("/")}
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
