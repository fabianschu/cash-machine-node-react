const db = require("../db");

const selectStatement = (tableName, indexedAttributes) =>
  `SELECT * FROM "${tableName}" WHERE ${indexedAttributes}`;
const insertStatement = (tableName, attributes, indices) =>
  `INSERT INTO "${tableName}" ${attributes} VALUES ${indices} RETURNING "id"`;
const updateStatement = (tableName, indexedAttributes, conditions) =>
  `UPDATE "${tableName}" SET ${indexedAttributes} WHERE ${conditions} RETURNING *`;
const updateMultipleStatement = (tableName, indexedAttributes, conditions) =>
  `UPDATE "${tableName}" SET ${indexedAttributes} WHERE ${conditions} RETURNING *`;
const deleteStatement = (tableName, conditions) =>
  `DELETE FROM ${tableName} WHERE ${conditions} RETURNING "id"`;

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

// ("height" = $1, "length" = $2, "weight" = $3)
const createIndexedCommaAttributes = (attributeNames, startIdx = 1) => {
  const seperator = ", ";
  return createIndexedAttributes(attributeNames, seperator, startIdx);
};

// ("height" = $1 AND "length" = $2 AND "weight" = $3)
const createIndexedAndAttributes = (attributeNames, startIdx = 1) => {
  const seperator = " AND ";
  return createIndexedAttributes(attributeNames, seperator, startIdx);
};

// "height IN $1"
const createInFragment = (attributeName, length, startIdx = 1) => {
  let string = ` AND ${attributeName} IN (`;
  for (let i = startIdx; i < length + startIdx; i++) {
    string += `$${i}`;
    if (i !== length + startIdx - 1) string += ", ";
  }
  string += ")";
  return string;
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
        createIndexedCommaAttributes(attributeNames),
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

  updateMultiple: (tableName, attributes, ids, conditions) => {
    const attributeNames = Object.keys(attributes);
    const conditionNames = Object.keys(conditions);
    return {
      query: updateMultipleStatement(
        tableName,
        createIndexedCommaAttributes(attributeNames),
        createIndexedAndAttributes(
          conditionNames,
          getNewStartingIdx(attributeNames)
        ) +
          createInFragment(
            "id",
            ids.length,
            getNewStartingIdx([...attributeNames, ...conditionNames])
          )
      ),
      values: [
        ...createValues(attributeNames, attributes),
        ...createValues(conditionNames, conditions),
        ...ids,
      ],
    };
  },

  delete: (tableName, conditions) => {
    const conditionNames = Object.keys(conditions);
    return {
      query: deleteStatement(
        tableName,
        createIndexedAndAttributes(conditionNames)
      ),
      values: [...createValues(conditionNames, conditions)],
    };
  },
};
