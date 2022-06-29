const connection = require("../../db-config");

const db = connection.promise();
const table = "user_has_skill";

const findAll = () => {
  return db.query(`select * from  ${table}`);
};

const addOne = (newData) => {
  return db.query(`insert into ${table} (user_id, skill_id) values (?, ?)`, [
    newData.user_id,
    newData.skill_id,
  ]);
};

const deleteOne = (uid, sid) => {
  return db.query(`delete from ${table} where user_id = ? and skill_id = ?`, [
    uid,
    sid,
  ]);
};

module.exports = { findAll, addOne, deleteOne };
