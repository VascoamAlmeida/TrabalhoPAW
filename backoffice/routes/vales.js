const express = require("express");
const router = express.Router();
const valesController = require("../controllers/vales");
const authController = require("../controllers/auth");

// Rota para exibir o formulário de criação
router.get(
  "/new",
  authController.verifyTokenAdmin,
  valesController.renderCreateForm
);

// Rota para processar o formulário de criação
router.post("/", authController.verifyTokenAdmin, valesController.create);

// Rota para exibir todos os vales
router.get("/", authController.verifyTokenAdmin, valesController.getAll);

// Rota para exibir o formulário de edição
router.get(
  "/:id/edit",
  authController.verifyTokenAdmin,
  valesController.renderEditForm
);

// Rota para processar a edição
router.put("/:id", authController.verifyTokenAdmin, valesController.update);

// Rota para exibir um vale específico
router.get("/:id", authController.verifyTokenAdmin, valesController.show);

// Rota para deletar um vale
router.delete("/:id", authController.verifyTokenAdmin, valesController.delete);

module.exports = router;
