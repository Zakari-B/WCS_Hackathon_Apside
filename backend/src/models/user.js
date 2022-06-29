const jwt = require("../helpers/jwtHelper");
const argon = require("../helpers/argonHelper");
const connection = require("../../db-config");

const db = connection.promise();

const login = async (userData) => {
  const { email, password } = userData;
  const sql = "SELECT * FROM user WHERE email = ?";
  const user = await db.query(sql, email); // Verifier le return de la fonction du user
  console.warn(user);
  if (!user) {
    return {
      code: 401,
      message: "Les informations sont incorrectes ou le compte n'existe pas.",
    };
  }
  const checkPassword = await argon.verifyPassword(
    password,
    user.hashedPassword
  );
  if (!checkPassword) {
    return {
      code: 401,
      message: "Les informations sont incorrectes ou le compte n'existe pas.",
    };
  }
  delete user.hashedPassword;

  const accessToken = await jwt.signAccessToken(user);
  return { ...user, accessToken };
};

module.exports = { login };
