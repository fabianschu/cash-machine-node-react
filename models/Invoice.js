const BaseModel = require("./baseModel");

class Invoice extends BaseModel {
  constructor() {
    super();
    this.tableName = "invoices";
  }
}

const invoice = new Invoice();

module.exports = invoice;
