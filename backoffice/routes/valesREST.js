const express = require("express");
const router = express.Router();

const authController = require("../controllers/authREST");
const valesController = require("../controllers/valesREST");

//Todos VALES
router.get("/", authController.verifyToken, valesController.getAll);

// Get Vale by ID
router.get("/:id", authController.verifyToken, valesController.getById);

// Create Vale Route
router.post("/", authController.verifyTokenAdmin, valesController.create);

module.exports = router;
