const userHasSkill = require("../models/userHasSkill");

const findAll = async (req, res) => {
  try {
    const [result] = await userHasSkill.findAll();
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
    const [result] = await userHasSkill.addOne(req.body);
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
    const [result] = await userHasSkill.deleteOne(
      req.params.uid,
      req.params.sid
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
