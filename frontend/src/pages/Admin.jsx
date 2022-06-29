import { React, useState, useEffect } from "react";

const Admin = function Admin() {
  const [createEmail, setCreateEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  useEffect(() => {
    console.warn(
      "Ajouter une vérif backend si l'utilisateur est admin pour accéder à la page"
    );
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
