const mongoose = require("mongoose");
const { Schema } = mongoose;

const opportunitySchema = new Schema({
  role: { type: String, required: true },
  description: { type: String, required: true },
  salary: { type: String },
});

const companySchema = new Schema({
  name: { type: String, required: true },
  cnpj: {
    type: String,
    required: true,
    validate: {
      validator: async function (cnpj) {
        const company = await Company.findOne({ cnpj });
        if (company) {
          if (this.id === company.id) {
            return true;
          }
          return false;
        }
        return true;
      },
      message: (props) => "O CNPJ já esta cadastrado em nosso sistema",
    },
  },
  location: { type: String, required: true },
  opportunities: { type: [opportunitySchema] },
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
