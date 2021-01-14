const db = require("../db");
const queryBuilder = require("../db/queryBuilder");

module.exports = BaseModel = (tableName) => {
  return {
    create: async (attributes) => {
      const updatedAt = new Date();
      const createdAt = new Date();
      const { query, values } = queryBuilder.create(tableName, {
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
    },

    where: async (attributes) => {
      const { query, values } = queryBuilder.where(tableName, attributes);
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
    },

    update: async (attributes, conditions) => {
      if (attributes.id) delete attributes.id;
      const updatedAt = new Date();
      const { query, values } = queryBuilder.update(
        tableName,
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
    },

    updateMultiple: async (ids, payload, conditions) => {
      const updatedAt = new Date();
      const { query, values } = queryBuilder.updateMultiple(
        tableName,
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
    },

    delete: async (conditions) => {
      const { query, values } = queryBuilder.delete(tableName, {
        ...conditions,
      });
      try {
        const { rows } = await db.query(query, values);
        if (rows.length === 0) throw Error("Project doesn't exist");
        return rows[0].id;
      } catch (e) {
        if (process.ENV === "development") {
          console.log(e);
          console.log(query);
          console.log(values);
        }
        return e;
      }
    },
  };
};
