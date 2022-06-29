const bubbleNeedSkills = require("../models/bubbleNeedSkills");

const findAll = async (req, res) => {
  try {
    const [result] = await bubbleNeedSkills.findAll();
    if (!result) {
      res.sendStatus(404);
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    console.warn(error);
  }
};

const addOne = async (req, res) => {
  try {
    const [result] = await bubbleNeedSkills.addOne(req.body);
    if (!result) {
      res.sendStatus(404);
    } else {
      res.status(200).json(result.insertId);
    }
  } catch (error) {
    console.warn(error);
  }
};

const deleteOne = async (req, res) => {
  try {
    const [result] = await bubbleNeedSkills.deleteOne(
      req.params.bid,
      req.params.kid
    );
    if (!result) {
      res.sendStatus(404);
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    console.warn(error);
  }
};

module.exports = { findAll, addOne, deleteOne };
