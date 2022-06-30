const userHasBubble = require("../models/userHasBubble");

const findAll = async (req, res) => {
  try {
    const [result] = await userHasBubble.findAll();
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
    const [result] = await userHasBubble.addOne(req.body);
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
    const [result] = await userHasBubble.deleteOne(
      req.params.uid,
      req.params.bid
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
