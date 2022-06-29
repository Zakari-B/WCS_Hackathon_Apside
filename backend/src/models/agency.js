const connection = require("../../db-config");

const db = connection.promise();
const table = "agency";

const findAll = () => {
  return db.query(`select * from  ${table}`);
};

const find = (id) => {
  return db.query(`select * from  ${table} where id = ?`, [id]);
};

const addOne = (newData) => {
  return db.query(
    `insert into ${table} (city, country, lat, \`long\`) values (?, ?, ?, ?)`,
    [newData.city, newData.country, newData.lat, newData.long]
  );
};

const modify = (newData, id) => {
  return db.query(`update ${table} set ? where id = ?`, [newData, id]);
};

const deleteOne = (id) => {
  return db.query(`delete from ${table} where id = ?`, [id]);
};

module.exports = { find, findAll, addOne, modify, deleteOne };
