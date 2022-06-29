const bubbleHasKeyword = require("../models/bubbleHasKeyword");

const findAll = async (req, res) => {
  try {
    const [result] = await bubbleHasKeyword.findAll();
    if (!result) {
      res.sendStatus(404);
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    console.warn(error);
  }
};

const find = async (req, res) => {
  try {
    const [result] = await bubbleHasKeyword.find(req.params.id);
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
    const [result] = await bubbleHasKeyword.addOne(req.body);
    if (!result) {
      res.sendStatus(404);
    } else {
      res.status(200).json(result.insertId);
    }
  } catch (error) {
    console.warn(error);
  }
};

const modify = async (req, res) => {
  const newData = req.body;
  try {
    const [result] = await bubbleHasKeyword.modify(newData, req.params.id);
    if (!result) {
      res.sendStatus(404);
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    console.warn(error);
  }
};

const deleteOne = async (req, res) => {
  try {
    const [result] = await bubbleHasKeyword.deleteOne(req.params.id);
    if (!result) {
      res.sendStatus(404);
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    console.warn(error);
  }
};

module.exports = { findAll, find, addOne, modify, deleteOne };
