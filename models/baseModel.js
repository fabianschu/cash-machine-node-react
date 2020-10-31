const db = require("../db");
const queryBuilder = require("../db/queryBuilder");

class BaseModel {
  constructor(tablename) {
    this.tableName = tablename;
  }

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
      return rows[0];
    } catch (e) {
      if (process.ENV === "development") {
        console.log(e);
        console.log(query);
        console.log(values);
      }
      return e;
    }
  };

  where = async (attributes) => {
    const { query, values } = queryBuilder.where(this.tableName, attributes);
    try {
      const { rows } = await db.query(query, values);
      return rows;
    } catch (e) {
      if (process.ENV === "development") {
        console.log(e);
        console.log(query);
        console.log(values);
      }
      return e;
    }
  };

  update = async (attributes, conditions) => {
    if (attributes.id) delete attributes.id;
    console.log("attributes");
    console.log(attributes);
    console.log("conditions");
    console.log(conditions);
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
      if (process.ENV === "development") {
        console.log(e);
        console.log(query);
        console.log(values);
      }
      return e;
    }
  };

  updateMultiple = async (ids, payload, conditions) => {
    const updatedAt = new Date();
    const { query, values } = queryBuilder.updateMultiple(
      this.tableName,
      {
        ...payload,
        updatedAt,
      },
      ids,
      conditions
    );
    try {
      const { rows } = await db.query(query, values);
      return rows;
    } catch (e) {
      if (process.ENV === "development") {
        console.log(e);
        console.log(query);
        console.log(values);
      }
      return e;
    }
  };
}

module.exports = {
  Invoice: new BaseModel("invoices"),
  Customer: new BaseModel("customers"),
  Project: new BaseModel("projects"),
  UserProfile: new BaseModel("userProfiles"),
};
