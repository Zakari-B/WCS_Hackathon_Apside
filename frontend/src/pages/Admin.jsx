import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backendAPI from "../services/backendAPI";
import "@styles/Admin.scss";

const Admin = function Admin() {
  const navigate = useNavigate();
  const [createFirstname, setCreateFirstname] = useState("");
  const [createLastname, setCreateLastname] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [createAgency, setCreateAgency] = useState(1);
  const [createPosition, setCreatePosition] = useState(1);
  const [agencyList, setAgencyList] = useState([]);
  const [positionList, setPositionList] = useState([]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("isUserLoggedIn"))) {
      backendAPI.get("/api/auth/sessionControl").then((res) => {
        if (res.status === 401) {
          navigate("/Error404");
        } else if (
          res.status === 200 &&
          res.data.administratorAccount === false
        ) {
          navigate("/Error404");
        }
        backendAPI.get("/api/agency").then((resagency) => {
          setAgencyList(resagency.data);
        });
        backendAPI.get("/api/position").then((resposition) => {
          setPositionList(resposition.data);
        });
      });
    } else {
      navigate("/Error404");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    backendAPI
      .post("api/admin/create", {
        firstname: createFirstname,
        lastname: createLastname,
        agency: createAgency,
        position: createPosition,
        email: createEmail,
        password: createPassword,
      })
      .then((res) => console.warn(res));
  };

  return (
    <div className="adminFlexContainer">
      <h1 id="adminMenuTitle">Menu administrateur</h1>
      <div className="adminSubContainer">
        <div className="adminLeft">
          <h1 id="userCreationTitle">User creation</h1>
          <form>
            <input
              type="text"
              placeholder="Prénom de l'utilisateur"
              value={createFirstname}
              onChange={(e) => setCreateFirstname(e.target.value)}
            />
            <input
              type="text"
              placeholder="Nom de l'utilisateur"
              value={createLastname}
              onChange={(e) => setCreateLastname(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email utilisateur"
              value={createEmail}
              onChange={(e) => setCreateEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Mot de passe utilisateur"
              value={createPassword}
              onChange={(e) => setCreatePassword(e.target.value)}
            />
            <select
              name="agency"
              id="agency"
              onChange={(e) => setCreateAgency(e.target.value)}
            >
              {agencyList &&
                agencyList.map((elem) => (
                  <option value={elem.id}>{elem.city}</option>
                ))}
            </select>
            <br />
            <select
              name="position"
              id="position"
              onChange={(e) => setCreatePosition(e.target.value)}
            >
              {positionList &&
                positionList.map((elem) => (
                  <option value={elem.id}>{elem.position}</option>
                ))}
            </select>
            <br />
            <div id="createUserButton">
              <button type="submit" onClick={(e) => handleSubmit(e)}>
                Create user account
              </button>
            </div>
          </form>
        </div>
        <div className="adminRight">
          <h1 id="adminBoardTitle">Board</h1>
        </div>
      </div>
    </div>
  );
};

export default Admin;
