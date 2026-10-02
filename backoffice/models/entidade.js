//models\entidade.js
const mongoose = require("mongoose");
const path = require("path");

//Define caminho onde sao armazenados os logotipos
const companyLogoBasePath = "uploads/companyLogos";

const entidadeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  companyLogo: {
    type: String,
    //required: true,
  },
  localizacao: {
    type: String,
    //required: true,
  },
  password: {
    type: String,
    required: true,
  },
  aprovada: {
    type: Boolean,
    default: false,
  },
});
//Retorna caminho para logo empresa da doacao
entidadeSchema.virtual("logoImagePath").get(function () {
  if (this.companyLogo != null) {
    return path.join("/", companyLogoBasePath, this.companyLogo);
  }
});

module.exports = mongoose.model("Entidade", entidadeSchema);
module.exports.companyLogoBasePath = companyLogoBasePath;
