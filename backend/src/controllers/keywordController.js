const keyword = require("../models/keyword");

const findAll = async (req, res) => {
  try {
    const [result] = await keyword.findAll();
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
    const [result] = await keyword.find(req.params.id);
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
    const [result] = await keyword.addOne(req.body);
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
    const [result] = await keyword.modify(newData, req.params.id);
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
    const [result] = await keyword.deleteOne(req.params.id);
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
