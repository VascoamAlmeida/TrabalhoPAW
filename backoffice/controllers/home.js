const Doacao = require("../models/doacao");
const Entidade = require("../models/entidade");

let adminController = {};

adminController.index = async (req, res) => {
  try {
    let doacoes = await Doacao.find({ estado: "Inicio" });
    let entidades = await Entidade.find({ aprovada: false });
    let message = "";
    let messageEnt = "";
    if (doacoes.length > 0) {
      message = "Existem pedidos de doacao pendentes(Com estado Inicio)";
    }
    if (entidades.length > 0) {
      messageEnt = "Existem entidades não aprovadas.";
    }
    res.render("auth/home", { message: message, messageEnt: messageEnt }); // Renderiza a pagina home
  } catch (error) {
    console.error("Error checking for doacoes:", error);
    res.render("auth/home");
  }
};

module.exports = adminController;
