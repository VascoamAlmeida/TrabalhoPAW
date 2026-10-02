const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth')
const homeController = require('../controllers/home');


//Atencao apenas verifica se o token é valido e nao se é admin
//Assim quem não é admin pode aceder à home do admin mas apenas consegue ver
//as coisas. Nao consegue editar, criar, nem apagar 
router.get('/', auth.verifyTokenStaff, homeController.index);

module.exports = router;
