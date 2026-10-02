const express = require("express");
const router = express.Router();

const usersController = require("../controllers/usersREST");
const authController = require("../controllers/authREST");

//Todos utilizadores
router.get("/", authController.verifyTokenStaff, usersController.getAll);

// Create User Route
router.post("/", authController.verifyTokenAdmin, usersController.create);

//Show user
router.get("/:id", authController.verifyToken, usersController.show);

//Updating user
router.put("/:id", authController.verifyToken, usersController.update);

//nunca se deve usar GET para apagar dados
router.delete("/:id", authController.verifyTokenAdmin, usersController.delete);

router.post("/buy-vale", authController.verifyToken, usersController.buyVale);

module.exports = router;
