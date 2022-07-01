const { hashPassword } = require("../helpers/argonHelper");
const user = require("../models/user");
const userSkills = require("../models/userHasSkill");

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
          id: userData["0"].id,
          agency_id: userData["0"].agency_id,
        });
    } else {
      res.status(userData.code).json({ message: userData.message });
    }
  } catch (error) {
    console.warn(error);
  }
};

const logout = (req, res) => {
  res.clearCookie("userToken").sendStatus(200);
};

const getAll = async (req, res) => {
  const result = await user.getAll();
  if (result[1]) {
    res.status(200).json(result[0]);
  }
};

const getOne = async (req, res) => {
  const result = await user.getOne(req.params.id);
  if (result[0][0]) {
    res.status(200).json(result[0]);
  } else {
    console.warn("Couldn't get a user");
  }
};

const getSelf = async (req, res) => {
  const result = await user.getOne(req.userId);
  if (result[0][0]) {
    const skillsTemp = await userSkills.findByUserId(req.userId);
    result[0][0].skills = skillsTemp.map((k) => k.skill);
    res.status(200).json(result[0][0]);
  } else {
    console.warn("Couldn't get a user");
  }
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
    console.error(err);
    res.status(500).json(err);
  }
};

module.exports = { login, logout, getAll, getOne, createOne, getSelf };
