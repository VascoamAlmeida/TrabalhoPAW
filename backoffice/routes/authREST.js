var express = require("express");
var router = express.Router();
var authController = require("../controllers/authREST");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/login-entidade", authController.loginEntidade);
router.post("/register-entidade", authController.registerEntidade);

module.exports = router;
