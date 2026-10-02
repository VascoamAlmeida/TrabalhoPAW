const User = require("../models/user");
const Doacao = require("../models/doacao");
const bcrypt = require("bcryptjs");
const Vale = require("../models/vale");

let usersController = {};
usersController.getAll = async function (req, res, next) {
  try {
    let dbusers = await User.find({}).select("-password");
    console.log(dbusers);
    res.json(dbusers);
  } catch (err) {
    console.log("Erro a ler");
    next(err);
  }
};

usersController.create = async function (req, res, next) {
  try {
    const existeUser = await User.findOne({ email: req.body.email });
    if (existeUser) {
      return res.status(409).json({ message: "Email ja se encontra registado" });
    }

    const user = await User.create({
      name: req.body.name || "",
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      role: req.body.role || "Doador",
      points: req.body.points || 0,
    });

    const safeUser = user.toObject();
    delete safeUser.password;
    res.status(201).json(safeUser);
  } catch (err) {
    next(err);
  }
};

usersController.show = async function (req, res, next) {
  try {
    if (req.role === "Entidade") {
      const publicUser = await User.findById(req.params.id).select("name");
      return res.json(publicUser);
    }

    const isStaff = ["Admin", "Funcionario"].includes(req.role);
    if (!isStaff && req.userId !== req.params.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const dbuser = await User.findById(req.params.id).select("-password");
    res.json(dbuser);
  } catch (err) {
    next(err);
  }
};

usersController.update = async function (req, res, next) {
  try {
    const isAdmin = req.role === "Admin";
    if (!isAdmin && req.userId !== req.params.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const update = {
      name: req.body.name,
      email: req.body.email,
    };

    if (req.body.password) {
      update.password = bcrypt.hashSync(req.body.password, 8);
    }

    if (isAdmin) {
      if (req.body.role !== undefined) update.role = req.body.role;
      if (req.body.points !== undefined) update.points = req.body.points;
    }

    const editedUser = await User.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    }).select("-password");
    res.json(editedUser);
  } catch (err) {
    next(err);
  }
};

usersController.delete = async function (req, res, next) {
  try {
    let deletedUser = await User.findByIdAndDelete(req.params.id);
    res.json(deletedUser);
  } catch (err) {
    console.log("Erro a apagar");
    next(err);
  }
};

usersController.buyVale = async (req, res, next) => {
  try {
    console.log(req.body);
    const { valeId } = req.body;
    const userId = req.userId;

    const vale = await Vale.findById(valeId);
    if (!vale) {
      return res.status(404).json({ message: "Vale not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.points < vale.price) {
      return res.status(400).json({ message: "Not enough points" });
    }

    user.points -= vale.price;
    user.vales.push(vale._id);

    await user.save();

    res.json({ message: "Vale bought successfully" });
  } catch (err) {
    console.log("Error buying vale");
    next(err);
  }
};

module.exports = usersController;
