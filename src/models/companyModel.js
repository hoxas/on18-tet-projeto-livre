const mongoose = require("mongoose");
const { Schema } = mongoose;

const opportunitySchema = new Schema({
  role: { type: String, required: true },
  description: { type: String, required: true },
  salary: { type: String },
});

const companySchema = new Schema({
  name: { type: String, required: true },
  cnpj: { type: String, required: true },
  based_in: { type: String, required: true },
  opportunities: { type: [opportunitySchema] },
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
