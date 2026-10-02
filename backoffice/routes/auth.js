//routes\auth.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// Pagina de Login
router.get('/login', authController.getLogin);

// Processar o Login
router.post('/login', authController.login);

// Pagina de Registro
router.get('/register', authController.verifyTokenAdmin, authController.getRegister);

// Processar o Registro
router.post('/register',authController.verifyTokenAdmin, authController.register);

router.get('/logout', authController.logout);

module.exports = router;


