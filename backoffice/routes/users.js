//routes\users.js
const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");
const authController = require("../controllers/auth");

//Todos utilizadores
router.get("/", authController.verifyTokenStaff, usersController.getAll );

//New User Route
router.get("/new",authController.verifyTokenAdmin, usersController.new);

// Create User Route
router.post("/",authController.verifyTokenAdmin, usersController.create);

//Show user
router.get("/:id",authController.verifyTokenStaff, usersController.show);

//Editar user
router.get("/:id/edit",authController.verifyTokenAdmin, usersController.edit);

//Updating user
router.put("/:id",authController.verifyTokenAdmin, usersController.update );

//nunca se deve usar GET para apagar dados
router.delete("/:id",authController.verifyTokenAdmin, usersController.delete);


module.exports = router;

