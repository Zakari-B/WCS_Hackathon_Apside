const connection = require("../../db-config");

const db = connection.promise();
const table = "bubble_has_keyword";

const findAll = () => {
  return db.query(`select * from  ${table}`);
};

const findByBubbleId = (id) => {
  return db
    .query(
      `select k.keyword from ${table} AS bhk INNER JOIN keyword AS k ON k.id = bhk.keyword_id where bhk.bubble_id = ?`,
      [id]
    )
    .then((res) => res[0]);
};

const addMany = (bubbleId, selectedKeywords) => {
  const keywordsId = selectedKeywords.map((e) => e.id);
  keywordsId.map(async (id) => {
    await db.query(
      `insert into ${table} (bubble_id, keyword_id) values (?, ?)`,
      [bubbleId, id]
    );
  });
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

module.exports = { findAll, addOne, deleteOne, addMany, findByBubbleId };
