const bubble = require("../models/bubble");
const bubbleKeywords = require("../models/bubbleHasKeyword");
const bubbleSkills = require("../models/bubbleNeedSkills");

const findAll = async (req, res) => {
  try {
    const [result] = await bubble.findAll();
    if (!result) {
      res.sendStatus(404);
    } else {
      const newElements = await Promise.all(
        result.map((e) =>
          Promise.all([
            bubbleKeywords.findByBubbleId(e.id),
            bubbleSkills.findByBubbleId(e.id),
          ])
        )
      );
      newElements.forEach((e, i) => {
        result[i].keywords = e[0].map((k) => k.keyword).join(" ");
        result[i].skills = e[1].map((s) => s.skill).join(" ");
      });
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
      const keywordTemp = await bubbleKeywords.findByBubbleId(req.params.id);
      result[0].keywords = keywordTemp.map((k) => k.keyword).join(" ");
      const skillTemp = await bubbleSkills.findByBubbleId(req.params.id);
      result[0].skills = skillTemp.map((s) => s.skill).join(" ");
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
      await bubbleKeywords.addMany(result.insertId, req.body.selected);
      res.status(200).json(result.insertId);
      console.warn(result.insertId);
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
