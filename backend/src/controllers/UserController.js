// const { hashPassword, verifyPassword } = require("../helpers/argonHelper");
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
    console.warn(error);
  }
};

const logout = (req, res) => {
  res.clearCookie("userToken").sendStatus(200);
};

module.exports = { login, logout };
