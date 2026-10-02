//models\doacao.js
const mongoose = require("mongoose");

const doacaoSchema = new mongoose.Schema({
  //Nome Doador
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  //Futura Entidade
  entidade: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Entidade",
  },
  //Quanto vai doar
  quantidade: {
    //<-Tenho de mudar para quantidade peças
    type: Number,
    required: true,
    min: 1,
  },
  //Dia da doacao
  data: {
    type: Date,
    required: true,
  },
  //Dia Criacao
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  //Observacoes
  observacoes: {
    type: String,
  },
  estado: {
    type: String,
    enum: ["Inicio", "Curso", "Cancelado", "Fim"],
    default: "Inicio",
  },
});

module.exports = mongoose.model("Doacao", doacaoSchema);
