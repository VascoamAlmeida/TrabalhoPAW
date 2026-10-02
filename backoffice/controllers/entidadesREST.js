const multer = require("multer");
const path = require("path");
const fs = require("fs"); //File system permite apagar logos desnecessarios

const Entidade = require("../models/entidade");
const bcrypt = require("bcryptjs");

let entidadesController = {};

entidadesController.getAll = async function (req, res, next) {
  try {
    let dbentidades = await Entidade.find({ aprovada: true }).select("-password");
    console.log(dbentidades);
    res.json(dbentidades);
  } catch (err) {
    console.log("Erro a ler");
    next(err);
  }
};

entidadesController.create = async function (req, res, next) {
  try {
    const existeEntidade = await Entidade.findOne({ email: req.body.email });
    if (existeEntidade) {
      return res.status(409).json({ message: "Email ja se encontra registado" });
    }

    const entidade = await Entidade.create({
      ...req.body,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const safeEntidade = entidade.toObject();
    delete safeEntidade.password;
    res.status(201).json(safeEntidade);
  } catch (err) {
    next(err);
  }
};

entidadesController.show = async function (req, res, next) {
  try {
    let dbentidade = await Entidade.findOne({ _id: req.params.id, aprovada: true }).select("-password");
    res.json(dbentidade);
  } catch (err) {
    console.log("Erro a ler");
    next(err);
  }
};

entidadesController.update = async function (req, res, next) {
  try {
    let editedEntity = await Entidade.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true }
    );
    res.json(editedEntity);
  } catch (err) {
    console.log("Erro a gravar");
    next(err);
  }
};

entidadesController.delete = async function (req, res, next) {
  try {
    let deletedEntity = await Entidade.findByIdAndDelete(req.params.id);
    res.json(deletedEntity);
  } catch (err) {
    console.log("Erro a apagar");
    next(err);
  }
};

entidadesController.search = async function (req, res) {
  const searchOptions = req.body || {};

  try {
    const results = await Entidade.find({
      aprovada: true,
      name: new RegExp(searchOptions.name || "", "i"),
      localizacao: new RegExp(searchOptions.localizacao || "", "i"),
    }).select("-password");

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = entidadesController;
