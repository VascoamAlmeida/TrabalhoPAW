//controllers\doacoes.js
const Doacao = require("../models/doacao");
const User = require("../models/user");
const Entidade = require("../models/entidade");

let doacoesController = {};

doacoesController.getAll = async (req, res) => {
  try {
    let searchOptions = {};
    let query = Doacao.find({}).populate("user").populate("entidade"); //consegue ir buscar dados a outro modelo(vai ao user)

    // if (req.query.user != null && req.query.user != "") {
    //   query = query.where("user").regex(new RegExp(req.query.user, "i"));
    // }

    if (req.query.user != null && req.query.user != "") {
      const users = await User.find({
        name: new RegExp(req.query.user, "i"),
      }).select("_id");
      const userIds = users.map((user) => user._id);
      query = query.where("user").in(userIds);
    }

    // if (req.query.entidade != null && req.query.entidade != "") {
    //   query = query.where("entidade").regex(new RegExp(req.query.entidade, "i"));
    // }

    if (req.query.entidade != null && req.query.entidade != "") {
      const entidades = await Entidade.find({
        name: new RegExp(req.query.entidade, "i"),
      }).select("_id");
      const entidadesIds = entidades.map((entidade) => entidade._id);
      query = query.where("entidade").in(entidadesIds);
    }

    if (req.query.dataBefore != null && req.query.dataBefore != "") {
      query = query.lte("data", req.query.dataBefore);
    }

    if (req.query.dataAfter != null && req.query.dataAfter != "") {
      query = query.gte("data", req.query.dataAfter);
    }

    if (req.query.estado != null && req.query.estado != "") {
      query = query.where("estado", req.query.estado);
    }

    const doacoes = await query.exec();
    res.render("doacoes/index", {
      doacoes: doacoes,
      searchOptions: req.query,
    });
  } catch (err) {
    console.log(err);
    res.redirect("/home");
  }
};

doacoesController.new = async (req, res) => {
  renderNewPage(res, new Doacao());
};

doacoesController.create = async (req, res) => {
  // Remova espacos em branco
  const userId = req.body.user.trim();
  const entidadeId = req.body.entidade.trim(); //ACRESCENTEI

  const doacao = new Doacao({
    user: userId,
    entidade: entidadeId, //ACRESCENTEI
    //entidade: req.body.entidade,
    quantidade: req.body.quantidade,
    estado: req.body.estado,
    data: new Date(req.body.data),
    observacoes: req.body.observacoes,
  });

  try {
    const newDoacao = await doacao.save();
    res.redirect(`doacoes/${newDoacao.id}`);
  } catch {
    renderNewPage(res, doacao, true);
  }
};

doacoesController.show = async (req, res) => {
  try {
    const doacao = await Doacao.findById(req.params.id)
      .populate("user")
      .populate("entidade")
      .exec();
    //await Doacao.findById(req.params.id).populate("entidade").exec();
    res.render("doacoes/show", { doacao: doacao });
  } catch (err) {
    console.error("Error updating doacao:", err);
    res.redirect("/home");
  }
};

doacoesController.edit = async (req, res) => {
  try {
    const doacao = await Doacao.findById(req.params.id);
    console.log(doacao);
    renderEditPage(res, doacao);
  } catch {
    res.redirect("/home");
  }
};

doacoesController.update = async (req, res) => {
  console.log("Update Doacao Route triggered");
  console.log("reqbody", req.body);
  let doacao;

  try {
    console.log("Updating doacao:", req.params.id); // Log para verificar o ID da doacao sendo atualizada

    //Procura a doacao a ser update
    doacao = await Doacao.findById(req.params.id);
    // Guarda estado antigo para ser comparada
    const oldEstado = doacao.estado;

    //Verificacao se esta em Fim nao pode ser alterado
    if (oldEstado === "Fim") {
      return renderEditPage(res, doacao, true);
    }
    //Verificacao se esta em Curso nao pode ser cancelada
    if (
      oldEstado === "Curso" &&
      (req.body.estado === "Cancelado" || req.body.estado === "Inicio")
    ) {
      return renderEditPage(res, doacao, true);
    }

    console.log("antes", doacao);
    doacao = await Doacao.findByIdAndUpdate(
      req.params.id,
      {
        user: req.body.user.trim(),
        entidade: req.body.entidade.trim(), //ACRESCENTEI
        quantidade: req.body.quantidade,
        estado: req.body.estado,
        data: new Date(req.body.data),
        observacoes: req.body.observacoes,
      },
      { new: true }
    ); // O parametro { new: true } retorna o documento atualizado
    console.log("depois", doacao);
    console.log("Updated doacao:", doacao); // Log para verificar a doacao apos a atualização

    if (oldEstado != "Fim" && doacao.estado === "Fim") {
      const user = await User.findById(doacao.user);
      user.points += doacao.quantidade;
      await user.save();
      console.log("User points updated successfully");
    }

    console.log("Doacao updated successfully"); // Log para verificar se a atualização foi bem-sucedida
    res.redirect(`/doacoes/${doacao.id}`);
  } catch (error) {
    console.error("Error updating doacao:", error); // Log se houver um erro durante a atualização
    if (doacao != null) {
      renderEditPage(res, doacao, true);
    } else {
      console.log;
      res.redirect("/home");
    }
  }
};

doacoesController.delete = async (req, res) => {
  let doacao;
  try {
    doacao = await Doacao.findById(req.params.id);
    if (!doacao || doacao.estado == "Curso") {
      return res.redirect("/home");
    }
    /*
      PROVALMENTE VAI TER QUE HAVE AQUI VERIFICACOES TIPO:
      SE O PROCESSO DE DOACAO O DINHEIRO JA TIVER SAIDO DO BANCO
      OU JA TER PASSADO 3 OU 4 DIAS
      */
    await Doacao.deleteOne({ _id: req.params.id });
    res.redirect("/doacoes");
  } catch (err) {
    console.error("Error deleting user:", err);
    res.redirect("/home");
  }
};

async function renderNewPage(res, doacao, hasError = false) {
  renderFormPage(res, doacao, "new", hasError);
}

async function renderEditPage(res, doacao, hasError = false) {
  renderFormPage(res, doacao, "edit", hasError);
}
async function renderFormPage(res, doacao, form, hasError = false) {
  try {
    const users = await User.find({});
    const entidades = await Entidade.find({});
    const params = {
      users: users,
      entidades: entidades,
      doacao: doacao,
    };
    if (hasError) {
      if (form === "edit") {
        params.errorMessage = "Error Updating doacao";
      } else {
        params.errorMessage = "Error Creating doacao";
      }
    }
    res.render(`doacoes/${form}`, params);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message || "Internal Server Error");
    //res.redirect("/doacoes");
  }
}
// Funcao para renderizar a pagina de nova doacao
/*async function renderNewPage(res, doacao, hasError = false) {
          try {
              const users = await User.find({});
              const params = {
                  users: users,
                  doacao: doacao
              };
              if (hasError) params.errorMessage = 'Error Creating Doacao';
              res.render('doacoes/new', params);
          } catch (err) {
              console.error(err);
              res.redirect('/doacoes');
          }
      }*/

module.exports = doacoesController;
