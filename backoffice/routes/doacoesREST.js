const express = require("express");
const router = express.Router();

const doacoesController = require("../controllers/doacoesREST");
const authController = require("../controllers/authREST");

router.get("/", authController.verifyTokenStaff, doacoesController.getAll);
router.get("/user/:idUser", authController.verifyToken, doacoesController.getByUser);
router.get("/entidade/:idEntidade", authController.verifyToken, doacoesController.getByEntidade);
router.get("/newDonations", authController.verifyTokenEntidade, doacoesController.getNewDonations);

router.post("/", authController.verifyToken, doacoesController.create);

router.put("/:id/aceitar", authController.verifyTokenEntidade, doacoesController.aceitar);
router.put("/:id/cancelar", authController.verifyTokenEntidade, doacoesController.cancelar);
router.put("/:id/concluir", authController.verifyTokenEntidade, doacoesController.concluir);

router.get("/:id", authController.verifyToken, doacoesController.show);
router.put("/:id", authController.verifyTokenStaff, doacoesController.update);
router.delete("/:id", authController.verifyTokenAdmin, doacoesController.delete);

module.exports = router;
