const User = require("../models/user");
const Entidade = require("../models/entidade");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../jwt_secret/config");

const authController = {};

function createUserToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, config.secret, {
    expiresIn: 86400,
  });
}

function createEntidadeToken(entidade) {
  return jwt.sign({ id: entidade._id, role: "Entidade" }, config.secret, {
    expiresIn: 86400,
  });
}

authController.login = async function (req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send({ message: "User not found." });

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ auth: false, token: null });
    }

    const token = createUserToken(user);
    if (["Admin", "Funcionario"].includes(user.role)) {
      res.cookie("auth-token", token, {
        maxAge: 86400000,
        httpOnly: true,
        sameSite: "lax",
      });
    }
    return res.status(200).send({
      auth: true,
      token,
      role: user.role,
      _id: user._id,
    });
  } catch (err) {
    return res.status(500).send({ message: "Error on the server." });
  }
};

authController.loginEntidade = async function (req, res) {
  try {
    const entidade = await Entidade.findOne({ email: req.body.email });
    if (!entidade) return res.status(404).send({ message: "Entidade not found." });

    const passwordIsValid = bcrypt.compareSync(req.body.password, entidade.password);
    if (!passwordIsValid) {
      return res.status(401).send({ auth: false, token: null });
    }

    if (!entidade.aprovada) {
      return res.status(403).send({
        auth: false,
        token: null,
        message: "Entidade pendente de aprovacao pelo backoffice.",
      });
    }

    const token = createEntidadeToken(entidade);
    return res.status(200).send({ auth: true, token, _id: entidade._id });
  } catch (err) {
    return res.status(500).send({ message: "Error on the server." });
  }
};

authController.register = async function (req, res) {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).send({ message: "Email ja se encontra registado." });
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const user = await User.create({
      name: req.body.name || "",
      email: req.body.email,
      password: hashedPassword,
      role: "Doador",
      points: 0,
    });

    const token = createUserToken(user);
    return res.status(201).send({
      auth: true,
      token,
      role: user.role,
      _id: user._id,
    });
  } catch (err) {
    return res.status(500).send({ message: "Error on the server." });
  }
};

authController.registerEntidade = async function (req, res) {
  try {
    const existingEntidade = await Entidade.findOne({ email: req.body.email });
    if (existingEntidade) {
      return res.status(409).send({ message: "Email ja se encontra registado." });
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const entidade = await Entidade.create({
      name: req.body.name || "",
      email: req.body.email,
      password: hashedPassword,
      localizacao: req.body.localizacao || "",
      aprovada: false,
    });

    return res.status(201).send({
      registered: true,
      pendingApproval: true,
      _id: entidade._id,
    });
  } catch (err) {
    return res.status(500).send({ message: "Error on the server." });
  }
};

authController.verifyToken = function (req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ auth: false, message: "No token provided." });
  }

  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) {
      return res.status(401).send({ auth: false, message: "Failed to authenticate token." });
    }
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  });
};

authController.verifyTokenAdmin = function (req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ auth: false, message: "No token provided." });
  }

  jwt.verify(token, config.secret, function (err, decoded) {
    if (err || decoded.role !== "Admin") {
      return res.status(403).send({
        auth: false,
        message: "Failed to authenticate token or not Admin",
      });
    }
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  });
};

authController.verifyTokenStaff = function (req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ auth: false, message: "No token provided." });
  }

  jwt.verify(token, config.secret, function (err, decoded) {
    if (err || !["Admin", "Funcionario"].includes(decoded.role)) {
      return res.status(403).send({ auth: false, message: "Backoffice access required." });
    }
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  });
};

authController.verifyTokenEntidade = function (req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ auth: false, message: "No token provided." });
  }

  jwt.verify(token, config.secret, function (err, decoded) {
    if (err || decoded.role !== "Entidade") {
      return res.status(403).send({ auth: false, message: "Entidade access required." });
    }
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  });
};

module.exports = authController;
