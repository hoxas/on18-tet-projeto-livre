const mongoose = require("mongoose");
require("dotenv").config();
const Company = require("../models/companyModel");

const uri = process.env["URI"];

const get = async (req, res) => {
  mongoose.connect(uri);
  let result = await Company.find(req.query);
  if (!result) {
    return res.status(404).send("Vaga não encontrada");
  }
  result.forEach((company) => {
    if ("opportunities" in company) {
      return company.opportunities;
    }
  });
  res.status(200).send(result);
};

const getById = async (req, res) => {
  mongoose.connect(uri);
  let result = await Company.findById(req.params.companyId);
  if (!result) {
    return res.status(404).send("Empresa não encontrada");
  }
  if ("opportunities" in result) {
    result = result.opportunities.filter(
      (opportunity) => opportunity._id == req.params.id
    );
    if (!result) {
      return res.status(404).send("Vaga não encontrada");
    }
    res.status(200).send(result);
  }
  res.status(404).send("A empresa não possui nenhuma vaga");
};

const deleteById = async (req, res) => {
  mongoose.connect(uri);
  const result = await Opportunity.findByIdAndDelete(req.params.id);
  if (!result) {
    return res.status(404).send("Vaga não encontrada");
  }
  res.status(200).send({
    message: `Vaga ID: ${req.params.id} - Removida com Sucesso`,
    deleted: result,
  });
};

const patchById = async (req, res) => {
  mongoose.connect(uri);
  const result = await Opportunity.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
  });
  if (!result) {
    return res.status(404).send("Vaga não encontrada");
  }
  const updatedResult = await Opportunity.findById(req.params.id);
  res.status(200).send({
    message: `Vaga ID: ${req.params.id} - Atualizada com Sucesso`,
    before: result,
    after: updatedResult,
  });
};

const getByCompanyId = async (req, res) => {
  mongoose.connect(uri);
  const result = await Company.findById(req.params.id);
  if (!result) {
    return res.status(404).send("Empresa não encontrada");
  }
  res.status(200).send(result.opportunities);
};

const postByCompanyId = async (req, res) => {
  mongoose.connect(uri);
  const result = await Company.findById(req.params.id);
  if (!result) {
    return res.status(404).send("Empresa não encontrada");
  }

  const newOpportunity = new Opportunity({
    _id: new mongoose.Types.ObjectId(),
    ...req.body,
  });

  newOpportunity.save((err) => {
    if (err) {
      res.status(400).send({ message: err.message });
    } else {
      res.status(201).send(newEmpresa);
    }
  });
};

module.exports = {
  get,
  getById,
  deleteById,
  patchById,
  getByCompanyId,
  postByCompanyId,
};
