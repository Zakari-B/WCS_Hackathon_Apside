const connection = require("../../db-config");

const db = connection.promise();
const table = "bubble_needs_skills";

const findAll = () => {
  return db.query(`select * from  ${table}`);
};

const addOne = (newData) => {
  return db.query(`insert into ${table} (bubble_id, skill_id) values (?, ?)`, [
    newData.bubble_id,
    newData.skill_id,
  ]);
};

const deleteOne = (bid, sid) => {
  return db.query(`delete from ${table} where bubble_id = ? and skill_id = ?`, [
    bid,
    sid,
  ]);
};

module.exports = { findAll, addOne, deleteOne };
