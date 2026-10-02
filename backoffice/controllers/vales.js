const Vale = require("../models/vale");

let valesBackofficeController = {};

// Renderizar o formulário para criar um novo vale
valesBackofficeController.renderCreateForm = function (req, res, next) {
  try {
    res.render("vales/new", { vale: {} });
  } catch (err) {
    console.log("Erro ao renderizar o formulário");
    next(err);
  }
};

// Processar a criação do novo vale
valesBackofficeController.create = async function (req, res, next) {
  try {
    const { name, price } = req.body;
    const vale = new Vale({ name, price });
    await vale.save();
    res.redirect("/vales");
  } catch (err) {
    console.log("Erro ao gravar");
    next(err);
  }
};

// Renderizar o formulário para editar um vale
valesBackofficeController.renderEditForm = async function (req, res, next) {
  try {
    const vale = await Vale.findById(req.params.id);
    res.render("vales/edit", { vale });
  } catch (err) {
    console.log("Erro ao renderizar o formulário");
    next(err);
  }
};

// Processar a edição de um vale
valesBackofficeController.update = async function (req, res, next) {
  try {
    const { name, price } = req.body;
    await Vale.findByIdAndUpdate(req.params.id, { name, price });
    res.redirect("/vales");
  } catch (err) {
    console.log("Erro ao gravar");
    next(err);
  }
};

// Exibir um vale específico
valesBackofficeController.show = async function (req, res, next) {
  try {
    const vale = await Vale.findById(req.params.id);
    res.render("vales/show", { vale });
  } catch (err) {
    console.log("Erro ao exibir o vale");
    next(err);
  }
};

// Listar todos os vales
valesBackofficeController.getAll = async function (req, res, next) {
  let searchOptions = {};
  //Verifica se name existe
  if (req.query.name != null && req.query.name !== "") {
    //RegExp -> tanto pode ser Maiuscula ou minuscula
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  if (req.query.price != null && req.query.price !== "") {
    let price = Number(req.query.price);
    if (!isNaN(price)) {
      // Verifica se a conversão foi bem-sucedida
      searchOptions.price = price;
    }
  }
  try {
    const vales = await Vale.find(searchOptions);
    res.render("vales/index", { vales: vales, searchOptions: req.query });
  } catch (err) {
    console.log("Erro ao listar vales");
    next(err);
  }
};

// Apagar um vale
valesBackofficeController.delete = async function (req, res, next) {
  try {
    const vale = await Vale.findById(req.params.id);
    await Vale.deleteOne({ _id: req.params.id });
    res.redirect("/vales");
  } catch (err) {
    console.log("Erro ao apagar o vale");
    next(err);
  }
};

module.exports = valesBackofficeController;
