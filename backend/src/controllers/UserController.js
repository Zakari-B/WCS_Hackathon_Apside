const { hashPassword } = require("../helpers/argonHelper");
const user = require("../models/user");

const login = async (req, res) => {
  const rememberTime = () => {
    if (req.body.remember) {
      return 604800000;
    }
    return 86400000;
  };
  try {
    const userData = await user.login(req.body);
    if (!userData.code) {
      res
        .status(200)
        .cookie("userToken", userData.accessToken, {
          httpOnly: false,
          expires: new Date(Date.now() + rememberTime()),
        })
        .json({
          message: "Connexion réussie",
        });
    } else {
      res.status(userData.code).json({ message: userData.message });
    }
  } catch (error) {
    console.warn("test");
  }
};

const logout = (req, res) => {
  res.clearCookie("userToken").sendStatus(200);
};

const createOne = async (req, res) => {
  const { firstname, lastname, agency, position, email, password } = req.body;
  const hashedPassword = await hashPassword(password);
  const agencyID = parseInt(agency, 10);
  const positionID = parseInt(position, 10);
  try {
    const userData = await user.createOne(
      firstname,
      lastname,
      agencyID,
      positionID,
      email,
      hashedPassword
    );
    res
      .status(201)
      .send({ message: "User created", id: userData[0][0].insertId });
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
};

module.exports = { login, logout, createOne };
