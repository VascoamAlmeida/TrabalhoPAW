//routes\dashboard.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard');
const authController = require('../controllers/auth');

// Rota para exibir o dashboard
router.get('/',authController.verifyTokenStaff, dashboardController.showDashboard);

router.get('/chartDoador', authController.verifyTokenStaff, dashboardController.chartDoadores);

router.get('/chartEntidade', authController.verifyTokenStaff, dashboardController.chartEntidades);

router.get('/chartEstado', authController.verifyTokenStaff, dashboardController.chartEstado);
module.exports = router;

