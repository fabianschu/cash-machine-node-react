const db = require("../db");
const queryBuilder = require("../db/queryBuilder");

class BaseModel {
  create = async (attributes) => {
    const updatedAt = new Date();
    const createdAt = new Date();
    const { query, values } = queryBuilder.create(this.tableName, {
      ...attributes,
      updatedAt,
      createdAt,
    });
    try {
      const { rows } = await db.query(query, values);
      return rows;
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  where = async (attributes) => {
    const { query, values } = queryBuilder.where(this.tableName, attributes);
    try {
      const { rows } = await db.query(query, values);
      return rows;
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  update = async (attributes, conditions) => {
    if (attributes.id) delete attributes.id;
    const updatedAt = new Date();
    const { query, values } = queryBuilder.update(
      this.tableName,
      { ...attributes, updatedAt },
      conditions
    );
    try {
      const { rows } = await db.query(query, values);
      return rows[0];
    } catch (e) {
      console.log(e);
      return e;
    }
  };
}

module.exports = BaseModel;
