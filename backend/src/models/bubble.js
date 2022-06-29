const connection = require("../../db-config");

const db = connection.promise();
const table = "bubble";

const findAll = () => {
  return db.query(`select * from  ${table}`);
};

const find = (id) => {
  return db.query(`select * from  ${table} where id = ?`, [id]);
};

const addOne = (newData) => {
  return db.query(
    `insert into ${table} (creator, name, description, create_time, deadline, gitlab_link, trello_link, workforce, likes,workflow_id ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      newData.creator,
      newData.name,
      newData.description,
      newData.create_time,
      newData.deadline,
      newData.gitlab_link,
      newData.trello_link,
      newData.workforce,
      newData.likes,
      newData.workflow_id,
    ]
  );
};

const modify = (newData, id) => {
  return db.query(`update ${table} set ? where id = ?`, [newData, id]);
};

const deleteOne = (id) => {
  return db.query(`delete from ${table} where id = ?`, [id]);
};

module.exports = { find, findAll, addOne, modify, deleteOne };
