const BaseModel = require("./baseModel");

class Customer extends BaseModel {
  constructor() {
    super();
    this.tableName = "customers";
  }
}

const customer = new Customer();
module.exports = customer;
