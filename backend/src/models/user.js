const jwt = require("../helpers/jwtHelper");
const argon = require("../helpers/argonHelper");
const connection = require("../../db-config");

const db = connection.promise();

const login = async (userData) => {
  const { email, password } = userData;
  const sql = "SELECT * FROM user WHERE email = ?";
  const [user] = await db.query(sql, email); // Verifier le return de la fonction du user
  if (!user) {
    return {
      code: 401,
      message: "Les informations sont incorrectes ou le compte n'existe pas.",
    };
  }
  const checkPassword = await argon.verifyPassword(
    password,
    user[0].hashedpassword
  );
  if (!checkPassword) {
    return {
      code: 401,
      message: "Les informations sont incorrectes ou le compte n'existe pas.",
    };
  }
  delete user.hashedpassword;
  const accessToken = await jwt.signAccessToken(user);
  return { ...user, accessToken };
};

const getAll = () => {
  return db.query("SELECT * FROM user");
};

const getOne = (id) => {
  return db.query(
    "SELECT u.*, p.position, a.city, a.country, a.lat, a.long FROM user AS u JOIN position AS p ON u.position_id = p.id JOIN agency AS a ON u.agency_id = a.id WHERE u.id = ?",
    [id]
  );
};

const createOne = async (
  firstname,
  lastname,
  agencyID,
  positionID,
  email,
  hashedPassword
) => {
  const sql =
    "INSERT INTO user (firstname, lastname, agency_id, position_id, email, hashedPassword) VALUES (?, ?, ?, ?, ?, ?)";

  try {
    const user = await db.query(sql, [
      firstname,
      lastname,
      agencyID,
      positionID,
      email,
      hashedPassword,
    ]);
    return [user];
  } catch (err) {
    console.error(err);
    return e;
  }
};

module.exports = { login, createOne, getAll, getOne };
