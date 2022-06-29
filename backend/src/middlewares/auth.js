const { verifyAccessToken } = require("../helpers/jwtHelper");

const authorization = async (req, res, next) => {
  const token = req.cookies.userToken;
  if (!token) {
    return res.sendStatus(401);
  }
  try {
    // const data = await verifyAccessToken(token);
    return next();
  } catch (e) {
    console.error(e);
    return res.sendStatus(401);
  }
};

const sessionControl = async (req, res) => {
  const token = req.cookies.userToken;
  if (!token) {
    res.status(401).json({
      sessionExpired: true,
    });
  }
  try {
    const data = await verifyAccessToken(token);
    if (!data) {
      res.status(401).json({
        sessionExpired: true,
      });
    }
    res.status(200).json({ sessionExpired: false });
  } catch (e) {
    console.warn(e);
  }
};

module.exports = { authorization, sessionControl };
