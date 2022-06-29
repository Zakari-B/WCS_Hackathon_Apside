const connection = require("../../db-config");

const db = connection.promise();
const table = "bubble_has_keyword";

const findAll = () => {
  return db.query(`select * from  ${table}`);
};

const addOne = (newData) => {
  return db.query(
    `insert into ${table} (bubble_id, keyword_id) values (?, ?)`,
    [newData.bubble_id, newData.keyword_id]
  );
};

const deleteOne = (bid, kid) => {
  return db.query(
    `delete from ${table} where bubble_id = ? and keyword_id = ?`,
    [bid, kid]
  );
};

module.exports = { findAll, addOne, deleteOne };
