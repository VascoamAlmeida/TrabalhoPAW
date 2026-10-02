//controllers\users.js
const User = require("../models/user");
const Doacao = require("../models/doacao");
const bcrypt = require("bcryptjs");

let usersController = {};

usersController.getAll = async (req, res) => {
  //Cria array para pesquisar
  let searchOptions = {};
  //Verifica se name existe
  if (req.query.name != null && req.query.name !== "") {
    //RegExp -> tanto pode ser Maiuscula ou minuscula
    searchOptions.name = new RegExp(req.query.name, "i");
  }

  try {
    const users = await User.find(searchOptions);
    res.render("users/index", { users: users, searchOptions: req.query });
  } catch {
    res.redirect("/home");
  }
};

usersController.new = (req, res) => {
  res.render("users/new", { user: new User() });
};

usersController.create = async (req, res) => {
  const user = new User({
    name: req.body.name || "",
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    role: req.body.role || "Doador",
    points: req.body.points || 0,
  });

  try {
    const existeUser = await User.findOne({ email: user.email });
    if (existeUser) {
      throw new Error("Email ja se encontra registado");
    }
    const newUser = await user.save();
    res.redirect(`/users/${newUser.id}`);
  } catch (err) {
    res.render("users/new", {
      user,
      errorMessage: err.message || "Error creating User",
    });
  }
};

usersController.show = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const doacoes = await Doacao.find({ user: user.id })
      .limit(6)
      .populate("entidade")
      .exec();
    res.render("users/show", {
      user: user,
      doacoesByUser: doacoes,
    });
  } catch (err) {
    console.log(err);
    res.redirect("/home");
  }
};

usersController.edit = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render("users/edit", { user: user });
  } catch {
    res.redirect("/users");
  }
};

usersController.update = async (req, res) => {
  let user;
  try {
    user = await User.findById(req.params.id);
    user.name = req.body.name;
    user.email = req.body.email;
    user.role = req.body.role;
    user.points = req.body.points;
    if (req.body.password && req.body.password.trim() !== "") {
      user.password = bcrypt.hashSync(req.body.password, 8);
    }
    await user.save();
    res.redirect(`/users/${user.id}`);
  } catch {
    //Se o user nao existir
    if (user == null) {
      res.redirect("/home");
    } else {
      res.render("users/edit", {
        user: user,
        errorMessage: "Error updating User",
      });
    }
  }
};

usersController.delete = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || user.role === "Admin") {
      return res.redirect("/home");
    }

    const doacoes = await Doacao.find({ user: user.id });
    if (doacoes.length > 0) {
      return res.redirect(`/users/${user.id}`, errorMessage);
    }

    await User.deleteOne({ _id: req.params.id });
    res.redirect("/users");
  } catch (err) {
    console.error("Error deleting user:", err);
    res.redirect("/home");
  }
};

module.exports = usersController;
