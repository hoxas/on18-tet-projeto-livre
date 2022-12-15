const mongoose = require("mongoose");
require("dotenv").config();
const Company = require("../models/companyModel");

const uri = process.env["URI"];

const get = async (req, res) => {
  mongoose.connect(uri);
  const result = await Company.find(req.query);
  if (!result) {
    return res.status(404).send("Empresa não encontrada");
  }
  res.status(200).send(result);
};

const getById = async (req, res) => {
  mongoose.connect(uri);
  const result = await Company.findById(req.params.id);
  if (!result) {
    return res.status(404).send("Empresa não encontrada");
  }
  res.status(200).send(result);
};

const post = async (req, res) => {
  mongoose.connect(uri);
  const newEmpresa = new Company({
    _id: new mongoose.Types.ObjectId(),
    ...req.body,
  });

  newEmpresa.save((err) => {
    if (err) {
      res.status(400).send({ message: err.message });
    } else {
      res.status(201).send(newEmpresa);
    }
  });
};

const deleteById = async (req, res) => {
  mongoose.connect(uri);
  const result = await Company.findByIdAndDelete(req.params.id);
  if (!result) {
    return res.status(404).send("Empresa não encontrada");
  }
  res.status(200).send({
    message: `Empresa ID: ${req.params.id} - Removida com Sucesso`,
    deleted: result,
  });
};

const patchById = async (req, res) => {
  mongoose.connect(uri);
  const result = await Company.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
  });
  if (!result) {
    return res.status(404).send("Empresa não encontrada");
  }
  const updatedResult = await Company.findById(req.params.id);
  res.status(200).send({
    message: `Worker ID: ${req.params.id} - Atualizado com Sucesso`,
    before: result,
    after: updatedResult,
  });
};

module.exports = { get, post, getById, deleteById, patchById };
