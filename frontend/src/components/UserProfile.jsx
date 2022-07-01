/* eslint-disable prefer-template */
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Typeahead } from "react-bootstrap-typeahead";
import { ToastContainer } from "react-toastify";
import { notifySuccess, notifyError } from "@services/toastify";
import backendAPI from "@services/backendAPI";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import "@styles/UserProfile.scss";

import ExportContext from "@contexts/BubbleContext";

function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [currentSkills, setCurrentSkills] = useState();
  const { skills, setSkills, setModalCommon } = useContext(
    ExportContext.BubbleContext
  );

  const [skillsOptions, setSkillsOptions] = useState([
    { id: 1, label: "John" },
  ]);

  useEffect(() => {
    backendAPI.get("/api/self").then((result) => {
      setUser(result.data);
      setCurrentSkills(result.data.skills);
    });
    backendAPI.get("/api/skill").then((result) => {
      setSkillsOptions(result.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    backendAPI
      .post("/api/user", { ...user, ...skills })
      .then(() => {
        notifySuccess("A whole new you !");
      })
      .catch(() => {
        notifyError("People never change !");
      });
  };

  const handleQuit = () => {
    setModalCommon("");
    navigate("/adminpanel");
  };

  const handleSkills = (skill) => {
    setSkills({ skill });
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="userprofile">
      {user && (
        <div className="flex flex-col items-center">
          <img
            src={user.photo}
            alt="profilePic"
            className="rounded-full h-28 mb-2"
          />
          <h1>Hi {user.firstname} !</h1>
          <h2>Any new skills to add ?</h2>

          <div>
            <form
              className="form flex flex-col items-center"
              onSubmit={handleSubmit}
            >
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <input
                    type="text"
                    placeholder={user.firstname}
                    onChange={handleChange}
                    autoComplete="off"
                    name="firstname"
                  />
                  <input
                    type="text"
                    placeholder={user.city}
                    onChange={handleChange}
                    autoComplete="off"
                    name="city"
                  />
                  <p>
                    Skills :{" "}
                    {currentSkills && currentSkills.map((e) => e + " ")}
                  </p>
                  <Typeahead
                    id="selectSkills"
                    multiple
                    placeholder="Add new skills"
                    onChange={handleSkills}
                    options={skillsOptions}
                    selected={skills?.skills}
                    className="typeahead-input"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <input
                    type="text"
                    placeholder={user.lastname}
                    onChange={handleChange}
                    autoComplete="off"
                    name="lastname"
                  />
                  <input
                    type="text"
                    placeholder={user.position}
                    onChange={handleChange}
                    autoComplete="off"
                    name="position"
                  />
                  {user.is_admin && (
                    <button
                      type="button"
                      className="admin-button mb-4"
                      onClick={() => handleQuit()}
                    >
                      Admin panel
                    </button>
                  )}
                </div>
              </div>
              <button type="submit" className="submit-button mt-2">
                Modify
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={() => setModalCommon("")}
              >
                Cancel
              </button>
            </form>
            <ToastContainer />
          </div>
        </div>
      )}
    </section>
  );
}

export default UserProfile;
