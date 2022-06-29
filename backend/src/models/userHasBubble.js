const connection = require("../../db-config");

const db = connection.promise();
const table = "user_has_bubble";

const findAll = () => {
  return db.query(`select * from  ${table}`);
};

const addOne = (newData) => {
  return db.query(`insert into ${table} (user_id, bubble_id) values (?, ?)`, [
    newData.user_id,
    newData.bubble_id,
  ]);
};

const deleteOne = (uid, bid) => {
  return db.query(`delete from ${table} where user_id = ? and bubble_id = ?`, [
    uid,
    bid,
  ]);
};

module.exports = { findAll, addOne, deleteOne };
