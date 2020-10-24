const db = require("../db");
const { tableName } = require("../models/Invoice");

const selectStatement = (tableName, indexedAttributes) =>
  `SELECT * FROM "${tableName}" WHERE ${indexedAttributes}`;
const insertStatement = (tableName, attributes, indices) =>
  `INSERT INTO "${tableName}" ${attributes} VALUES ${indices} RETURNING "id"`;
const updateStatement = (tableName, indexedAttributes, conditions) =>
  `UPDATE "${tableName}" SET ${indexedAttributes} WHERE ${conditions} RETURNING *`;

// ($1, $2, $3)
const createIndices = (attributeNames) => {
  const max = attributeNames.length;
  let indicesListString = "(";
  for (let i = 1; i <= max; i++) {
    indicesListString += `$${i}`;
    if (i !== max) indicesListString += ", ";
  }
  indicesListString += ")";
  return indicesListString;
};

// ("height", "length", "weight")
const createAttributes = (attributeNames) => {
  let attributesListString = "(";
  for (let i = 0; i < attributeNames.length; i++) {
    attributesListString += `"${attributeNames[i]}"`;
    if (i === attributeNames.length - 1) break;
    attributesListString += ", ";
  }
  attributesListString += ")";
  return attributesListString;
};

// [13, "blue", true]
const createValues = (attributeNames, attributeObj) => {
  let values = [];
  for (let i = 0; i < attributeNames.length; i++) {
    values.push(attributeObj[attributeNames[i]]);
  }
  return values;
};

// ("height" = $1<seperator>"length" = $2<seperator>"weight" = $3)
const createIndexedAttributes = (attributeNames, seperator, startIdx) => {
  let indexedAttributesString = "";
  for (let i = startIdx; i < attributeNames.length + startIdx; i++) {
    if (i !== startIdx) indexedAttributesString += seperator;
    indexedAttributesString += `"${attributeNames[i - startIdx]}" = ($${i})`;
  }
  indexedAttributesString += "";
  return indexedAttributesString;
};

const createIndexedSetAttributes = (attributeNames, startIdx = 1) => {
  const seperator = ", ";
  return createIndexedAttributes(attributeNames, seperator, startIdx);
};

const createIndexedAndAttributes = (attributeNames, startIdx = 1) => {
  const seperator = " AND ";
  return createIndexedAttributes(attributeNames, seperator, startIdx);
};

const getNewStartingIdx = (oldArray) => oldArray.length + 1;

module.exports = {
  where: (tableName, attributes) => {
    const attributeNames = Object.keys(attributes);
    return {
      query: selectStatement(
        tableName,
        createIndexedAndAttributes(attributeNames)
      ),
      values: createValues(attributeNames, attributes),
    };
  },

  create: (tableName, attributes) => {
    const attributeNames = Object.keys(attributes);
    return {
      query: insertStatement(
        tableName,
        createAttributes(attributeNames),
        createIndices(attributeNames)
      ),
      values: createValues(attributeNames, attributes),
    };
  },

  update: (tableName, attributes, conditions) => {
    const attributeNames = Object.keys(attributes);
    const conditionNames = Object.keys(conditions);
    return {
      query: updateStatement(
        tableName,
        createIndexedSetAttributes(attributeNames),
        createIndexedAndAttributes(
          conditionNames,
          getNewStartingIdx(attributeNames)
        )
      ),
      values: [
        ...createValues(attributeNames, attributes),
        ...createValues(conditionNames, conditions),
      ],
    };
  },
};
