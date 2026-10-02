const Doacao = require("../models/doacao");
const User = require("../models/user");
const Entidade = require("../models/entidade");

let doacoesController = {};

doacoesController.getAll = async function (req, res, next) {
  try {
    let dbdoacoes = await Doacao.find({});
    console.log(dbdoacoes);
    res.json(dbdoacoes);
  } catch (err) {
    console.log("Erro a ler");
    next(err);
  }
};

doacoesController.getByUser = async function (req, res, next) {
  try {
    const isStaff = ["Admin", "Funcionario"].includes(req.role);
    if (!isStaff && !(req.role === "Doador" && req.userId === req.params.idUser)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    let dbdoacoes = await Doacao.find({ user: req.params.idUser });
    console.log(dbdoacoes);
    res.json(dbdoacoes);
  } catch (err) {
    console.log("Erro a ler");
    next(err);
  }
};

doacoesController.getByEntidade = async function (req, res, next) {
  try {
    const isStaff = ["Admin", "Funcionario"].includes(req.role);
    if (!isStaff && !(req.role === "Entidade" && req.userId === req.params.idEntidade)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    let dbdoacoes = await Doacao.find({ entidade: req.params.idEntidade });
    console.log(dbdoacoes);
    res.json(dbdoacoes);
  } catch (err) {
    console.log("Erro a ler");
    next(err);
  }
};

doacoesController.create = async function (req, res, next) {
  try {
    if (req.role !== "Doador") {
      return res.status(403).json({ message: "Only donors can create donation requests." });
    }

    const doacao = new Doacao({
      user: req.userId,
      entidade: req.body.entidade,
      quantidade: req.body.quantidade,
      data: new Date(),
      observacoes: req.body.observacoes,
      estado: "Inicio",
    });
    await doacao.save();
    res.status(201).json(doacao);
  } catch (err) {
    next(err);
  }
};

doacoesController.show = async function (req, res, next) {
  try {
    let dbdoacao = await Doacao.findById(req.params.id);
    res.json(dbdoacao);
  } catch (err) {
    console.log("Erro a ler");
    next(err);
  }
};

doacoesController.update = async function (req, res, next) {
  try {
    let editedDonation = await Doacao.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true }
    );
    res.json(editedDonation);
  } catch (err) {
    console.log("Erro a gravar");
    next(err);
  }
};

doacoesController.delete = async function (req, res, next) {
  try {
    let deletedDonation = await Doacao.findByIdAndDelete(req.params.id);
    res.json(deletedDonation);
  } catch (err) {
    console.log("Erro a apagar");
    next(err);
  }
};

doacoesController.aceitar = async function (req, res, next) {
  try {
    const doacao = await Doacao.findOne({
      _id: req.params.id,
      entidade: req.userId,
      estado: "Inicio",
    });
    if (!doacao) {
      return res.status(404).json({ message: "Doacao pendente nao encontrada." });
    }
    doacao.estado = "Curso";
    await doacao.save();
    res.json(doacao);
  } catch (err) {
    next(err);
  }
};

doacoesController.cancelar = async function (req, res, next) {
  try {
    const doacao = await Doacao.findOne({
      _id: req.params.id,
      entidade: req.userId,
      estado: "Inicio",
    });
    if (!doacao) {
      return res.status(404).json({ message: "Doacao pendente nao encontrada." });
    }
    doacao.estado = "Cancelado";
    await doacao.save();
    res.json(doacao);
  } catch (err) {
    next(err);
  }
};

doacoesController.concluir = async function (req, res, next) {
  try {
    const doacao = await Doacao.findOne({
      _id: req.params.id,
      entidade: req.userId,
      estado: "Curso",
    });
    if (!doacao) {
      return res.status(404).json({ message: "Doacao em curso nao encontrada." });
    }

    doacao.estado = "Fim";
    await doacao.save();

    const user = await User.findById(doacao.user);
    if (user) {
      user.points += doacao.quantidade;
      await user.save();
    }

    res.json(doacao);
  } catch (err) {
    next(err);
  }
};

doacoesController.getNewDonations = async function (req, res, next) {
  try {
    // Verifique se há novos pedidos de doação em estado de "início"
    const newDonations = await Doacao.find({ estado: "Inicio", entidade: req.userId });
    console.log(newDonations);
    res.json(newDonations);
  } catch (err) {
    console.log("Erro ao buscar novas doações: ", err);
    res.status(500).send(err);
  }
};

module.exports = doacoesController;
