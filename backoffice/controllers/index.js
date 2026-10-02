const Entidade = require('../models/entidade');

let indexController = {};

indexController.index = async (req, res)=> {
  res.render('index')
  }

module.exports = indexController;