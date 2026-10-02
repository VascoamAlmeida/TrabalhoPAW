const Vale = require("../models/vale");

let valesController = {};

valesController.getAll = async function (req, res, next) {
  try {
    let dbvales = await Vale.find({});
    res.json(dbvales);
  } catch (err) {
    console.log("Erro a ler");
    next(err);
  }
};

valesController.getById = async function (req, res, next) {
  try {
    let vale = await Vale.findById(req.params.id);
    if (!vale) {
      res.status(404).json({ message: "Vale não encontrado" });
    } else {
      res.json(vale);
      console.log(vale);
    }
  } catch (err) {
    console.log("Erro a ler");
    next(err);
  }
};

valesController.create = async function (req, res, next) {
  try {
    const vale = await Vale.create({
      price: req.body.price,
      name: req.body.name,
    });

    const newVale = await vale.save();
    res.json(newVale);
  } catch (err) {
    console.log("Erro ao gravar");
    next(err);
  }
};

module.exports = valesController;
