const express = require("express");
const router = express.Router();

const doacoesController = require("../controllers/doacoes");
const authController = require("../controllers/auth");

// Rota para listar todas as doacoes
router.get("/", authController.verifyTokenStaff, doacoesController.getAll);

// New Doacao Route
router.get("/new", authController.verifyTokenStaff, doacoesController.new);

// Create Doacao Route
router.post("/", authController.verifyTokenStaff, doacoesController.create);

//Show Doacao Route
router.get("/:id", authController.verifyTokenStaff, doacoesController.show);

// Edit Doacao Route
router.get(
  "/:id/edit",
  authController.verifyTokenStaff,
  doacoesController.edit
);

// Update Doacao Route
router.put("/:id", authController.verifyTokenStaff, doacoesController.update);

// Delete Doacao Page
router.delete(
  "/:id",
  authController.verifyTokenAdmin,
  doacoesController.delete
);

module.exports = router;
