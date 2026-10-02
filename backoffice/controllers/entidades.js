//controllers\entidades.js
const multer = require("multer");
const path = require("path");
const fs = require("fs"); //File system permite apagar logos desnecessarios

const Entidade = require("../models/entidade");
const Doacao = require("../models/doacao");
const bcrypt = require("bcryptjs");

const uploadPath = path.join("public", Entidade.companyLogoBasePath);
const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"];

const upload = multer({
  dest: uploadPath,
  fileFilter: (req, file, callback) => {
    callback(null, imageMimeTypes.includes(file.mimetype));
  },
});

let entidadesController = {};

entidadesController.getAll = async (req, res) => {
  //Cria array para pesquisar
  let searchOptions = {};
  //Verifica se name existe
  if (req.query.name != null && req.query.name !== "") {
    //RegExp -> tanto pode ser Maiuscula ou minuscula
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  if (req.query.localizacao != null && req.query.localizacao !== "") {
    //RegExp -> tanto pode ser Maiuscula ou minuscula
    searchOptions.localizacao = new RegExp(req.query.localizacao, "i");
  }
  if (req.query.aprovada != null && req.query.aprovada !== "") {
    searchOptions.aprovada = req.query.aprovada === "true";
  }
  console.log(searchOptions);
  try {
    const entidades = await Entidade.find(searchOptions);
    res.render("entidades/index", {
      entidades: entidades,
      searchOptions: req.query,
    });
  } catch {
    res.redirect("/home");
  }
};

entidadesController.new = (req, res) => {
  res.render("entidades/new", { entidade: new Entidade() });
};

entidadesController.show = async (req, res) => {
  try {
    const entidade = await Entidade.findById(req.params.id);
    const doacoes = await Doacao.find({ entidade: entidade.id })
      .limit(6)
      .exec();
    res.render("entidades/show", {
      entidade: entidade,
      doacoesByEntidade: doacoes,
    });
  } catch (err) {
    console.log(err);
    res.redirect("/home");
  }
};

entidadesController.edit = async (req, res) => {
  try {
    const entidade = await Entidade.findById(req.params.id);
    res.render("entidades/edit", { entidade: entidade });
  } catch {
    res.redirect("/entidades");
  }
};

entidadesController.update = async (req, res) => {
  let entidade;
  try {
    entidade = await Entidade.findById(req.params.id);
    entidade.name = req.body.name;
    entidade.email = req.body.email;
    entidade.localizacao = req.body.localizacao;
    entidade.aprovada = req.body.aprovada === "true";
    if (req.body.password && req.body.password.trim() !== "") {
      entidade.password = bcrypt.hashSync(req.body.password, 8);
    }
    const fileName = req.file != null ? req.file.filename : null;
    if (fileName != null) {
      if (entidade.companyLogo) {
        removeLogo(entidade.companyLogo);
      }
      entidade.companyLogo = fileName;
    }

    await entidade.save();
    res.redirect(`/entidades/${entidade.id}`);
  } catch {
    //Se a entidade nao existir
    if (entidade == null) {
      res.redirect("/home");
    } else {
      res.render("entidades/edit", {
        entidade: entidade,
        errorMessage: "Error updating Entidade",
      });
    }
  }
};

entidadesController.create = async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  const fileName = req.file != null ? req.file.filename : null;

  const entidade = new Entidade({
    name: req.body.name,
    email: req.body.email,
    localizacao: req.body.localizacao,
    password: bcrypt.hashSync(req.body.password, 8),
    aprovada: req.body.aprovada,
    companyLogo: fileName,
    //Aprovar: false,
  });

  try {
    console.log(entidade);
    const existeEntidade = await Entidade.findOne({ email: entidade.email });
    if (existeEntidade) {
      throw new Error("Email ja se encontra registado");
    }
    const newEntidade = await entidade.save();
    res.redirect(`entidades/${newEntidade.id}`);
    //res.redirect("entidades");
  } catch (error) {
    console.error(error);
    if (entidade.fileName != null) {
      removeLogo(entidade.fileName);
    }
    res.render("entidades/new", {
      entidade: entidade,
      errorMessage: "Error creating Entidade",
    });
  }
};

// Delete Entidade Page
entidadesController.delete = async (req, res) => {
  try {
    const entidade = await Entidade.findById(req.params.id);
    await Entidade.deleteOne({ _id: req.params.id });
    res.redirect("/entidades");
  } catch {
    if (entidade != null) {
      res.render("entidades/show", {
        entidade: entidade,
        errorMessage: "Could not remove entidade",
      });
    } else {
      res.redirect("/home");
    }
  }
};

function removeLogo(fileName) {
  fs.unlink(path.join(uploadPath, fileName), (err) => {
    if (err) console.error(err);
  });
}
/*     aprovar entidade
entidadesController.approve = async (req, res) =>{
  try {
    const entidade = await Entidade.findById(req.params.id)
    if (entidade) {
      entidade.Aprovar = true;
      await entidade.save();
      res.redirect('/entidade')
    }else {
      res.status(404).send("entidade not found");
    }
  }catch (err) {
    console.error(err)
    res.status(500).send('Error approving Entidade');
  }
}*/
module.exports = entidadesController;
