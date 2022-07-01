import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "@components/Navbar";
import backendAPI from "@services/backendAPI";
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
    <>
      <NavBar />
      <section id="admin-panel">
        <div className="adminFlexContainer">
          <h1 id="adminMenuTitle">Administrator Panel</h1>
          <div className="adminSubContainer">
            <div className="adminLeft">
              <h1 id="userCreationTitle">User creation utility</h1>
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
              <div id="adminMessages">
                <ol>
                  <li>
                    <p>
                      <b>New message</b> (30/06/2022)
                    </p>
                    <details>
                      <summary>Show: </summary>A new collaborator joined the
                      company today. Please create a new account for Mr.Smith,
                      collaborator information can be found in the admin mailbox
                    </details>
                  </li>
                  <li>
                    <p>
                      <b>New message</b> (29/06/2022)
                    </p>
                    <details>
                      <summary>Show: </summary>The database has been updated
                      overnight, please report any strange behavior from the
                      system to the backend team at
                      backend@apside-internal045.com
                    </details>
                  </li>
                  <li>
                    <p>Message (27/06/2022)</p>
                    <details>
                      <summary>Show: </summary>This is an old message you have
                      already read.
                    </details>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Admin;
