import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backendAPI from "../services/backendAPI";

const Admin = function Admin() {
  const navigate = useNavigate();
  const [createEmail, setCreateEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
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
      });
    } else {
      navigate("/Error404");
    }
  }, []);
  return (
    <>
      <div>Admin</div>
      <div>User creation</div>
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
    </>
  );
};

export default Admin;
