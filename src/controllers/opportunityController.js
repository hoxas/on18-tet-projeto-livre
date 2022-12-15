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
  result = result.filter((company) => "opportunities" in company);
  result.forEach((company, index) => (result[index] = company.opportunities));
  console.log(result.flat());
  opportunities = result.flat();
  res.status(200).send(opportunities);
};

const getByCompanyId = async (req, res) => {
  mongoose.connect(uri);
  const result = await Company.findById(req.params.companyId);
  if (!result) {
    return res.status(404).send("Empresa não encontrada");
  }
  res.status(200).send(result.opportunities);
};

const postByCompanyId = async (req, res) => {
  mongoose.connect(uri);
  const result = await Company.findById(req.params.companyId);
  if (!result) {
    return res.status(404).send("Empresa não encontrada");
  }
  const opportunityLength = result.opportunities.push(req.body);
  result.save((err) => {
    if (err) {
      res.status(400).send({ message: err.message });
    } else {
      res.status(201).send(result.opportunities[opportunityLength - 1]);
    }
  });
};

const getByJobId = async (req, res) => {
  mongoose.connect(uri);
  const result = await Company.findById(req.params.companyId);
  if (!result) {
    return res.status(404).send("Empresa não encontrada");
  }
  const job = result.opportunities.find(
    (opportunity) => opportunity._id == req.params.id
  );
  if (!job) {
    return res.status(404).send("Vaga não encontrada");
  }
  res.status(200).send(job);
};

const deleteById = async (req, res) => {
  mongoose.connect(uri);
  const result = await Company.findById(req.params.companyId);
  if (!result) {
    return res.status(404).send("Empresa não encontrada");
  }
  const job = result.opportunities.find(
    (opportunity) => opportunity._id == req.params.id
  );
  if (!job) {
    return res.status(404).send("Vaga não encontrada");
  }
  result.opportunities.pull({ _id: req.params.id });
  result.save((err) => {
    if (err) {
      res.status(400).send({ message: err.message });
    } else {
      res.status(200).send({
        message: `Vaga ID: ${req.params.id} - Removida com Sucesso`,
        deleted: job,
      });
    }
  });
};

const patchById = async (req, res) => {
  mongoose.connect(uri);
  const result = await Company.findById(req.params.companyId);
  if (!result) {
    return res.status(404).send("Empresa não encontrada");
  }
  const jobIndex = result.opportunities.findIndex(
    (opportunity) => opportunity._id == req.params.id
  );
  if (!jobIndex) {
    return res.status(404).send("Vaga não encontrada");
  }
  const job = JSON.parse(JSON.stringify(result.opportunities[jobIndex]));
  result.opportunities[jobIndex].set(req.body);
  const updatedResult = result.opportunities[jobIndex];
  result.save((err) => {
    if (err) {
      res.status(400).send({ message: err.message });
    } else {
      res.status(200).send({
        message: `Vaga ID: ${req.params.id} - Atualizada com Sucesso`,
        before: job,
        after: updatedResult,
      });
    }
  });
};

module.exports = {
  get,
  getByJobId,
  deleteById,
  patchById,
  getByCompanyId,
  postByCompanyId,
};
