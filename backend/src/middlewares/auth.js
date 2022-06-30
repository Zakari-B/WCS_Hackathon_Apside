const { verifyAccessToken } = require("../helpers/jwtHelper");

const authorization = async (req, res, next) => {
  const token = req.cookies.userToken;
  if (!token) {
    return res.sendStatus(401);
  }
  try {
    const data = await verifyAccessToken(token);
    if (data.payload[0].is_admin) {
      req.isAdmin = 1;
    }
    req.userId = data.payload[0].id;
    console.log(userId);
    return next();
  } catch (e) {
    console.error(e);
    return res.sendStatus(401);
  }
};

const authorizeAdmin = async (req, res, next) => {
  if (req.isAdmin) {
    next();
  } else {
    res.sendStatus(401);
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

module.exports = { authorization, authorizeAdmin, sessionControl };
