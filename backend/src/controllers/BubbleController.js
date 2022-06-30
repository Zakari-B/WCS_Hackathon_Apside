const bubble = require("../models/bubble");
const bubbleKeywords = require("../models/bubbleHasKeyword");

const findAll = async (req, res) => {
  try {
    const [result] = await bubble.findAll();
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
    const [result] = await bubble.find(req.params.id);
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
    const [result] = await bubble.addOne(req.body, req.userId);
    if (!result) {
      res.sendStatus(404);
    } else {
      const [keywordResult] = await bubbleKeywords.addOne(
        result.insertId,
        req.body.selected
      );
      res.status(200).json(result.insertId);
    }
  } catch (error) {
    console.warn(error);
  }
};

const modify = async (req, res) => {
  const newData = req.body;
  try {
    const [result] = await bubble.modify(newData, req.params.id);
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
    const [result] = await bubble.deleteOne(req.params.id);
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
