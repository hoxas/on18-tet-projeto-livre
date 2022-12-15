const mongoose = require("mongoose");
require("dotenv").config();
const Worker = require("../models/workerModel");

const uri = process.env["URI"];

const get = async (req, res) => {
  mongoose.connect(uri);
  const result = await Worker.find(req.query);
  if (!result) {
    return res.status(404).send("Trabalhador não encontrado");
  }
  res.status(200).send(result);
};

const getById = async (req, res) => {
  mongoose.connect(uri);
  const result = await Worker.findById(req.params.id);
  if (!result) {
    return res.status(404).send("Trabalhador não encontrado");
  }
  res.status(200).send(result);
};

const post = async (req, res) => {
  mongoose.connect(uri);
  const newWorker = new Worker({
    _id: new mongoose.Types.ObjectId(),
    ...req.body,
  });

  newWorker.save((err) => {
    if (err) {
      res.status(400).send({ message: err.message });
    } else {
      res.status(201).send(newWorker);
    }
  });
};

const deleteById = async (req, res) => {
  mongoose.connect(uri);
  const result = await Worker.findByIdAndDelete(req.params.id);
  if (!result) {
    return res.status(404).send("Trabalhador não encontrado");
  }
  res.status(200).send({
    message: `Worker ID: ${req.params.id} - Removido com Sucesso`,
    deleted: result,
  });
};

const patchById = async (req, res) => {
  mongoose.connect(uri);
  const result = await Worker.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
  });
  if (!result) {
    return res.status(404).send("Trabalhador não encontrado");
  }
  const updatedResult = await Worker.findById(req.params.id);
  res.status(200).send({
    message: `Worker ID: ${req.params.id} - Atualizado com Sucesso`,
    before: result,
    after: updatedResult,
  });
};

module.exports = { get, post, getById, deleteById, patchById };
