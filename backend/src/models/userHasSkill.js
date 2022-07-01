const connection = require("../../db-config");

const db = connection.promise();
const table = "user_has_skill";

const findAll = () => {
  return db.query(`select * from  ${table}`);
};

const findByUserId = (id) => {
  return db
    .query(
      `select s.skill from ${table} AS u INNER JOIN skill AS s ON s.id = u.skill_id where u.user_id = ?`,
      [id]
    )
    .then((res) => res[0]);
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

module.exports = { findAll, addOne, deleteOne, findByUserId };
