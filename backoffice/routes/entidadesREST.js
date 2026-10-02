const multer = require("multer");
const path = require("path");
const fs = require("fs"); //File system permite apagar logos desnecessarios

const express = require("express");
const router = express.Router();

const Entidade = require("../models/entidade");

const uploadPath = path.join("public", Entidade.companyLogoBasePath);
//tipos de imagens que vai aceitar
const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"];

const entidadesController = require("../controllers/entidadesREST");
const authController = require("../controllers/authREST");

const upload = multer({
  dest: uploadPath,
  fileFilter: (req, file, callback) => {
    callback(null, imageMimeTypes.includes(file.mimetype));
  },
});

//Todas entidades
router.get("/", entidadesController.getAll);

//Show entidade
router.get("/:id", entidadesController.show);

//Updating entidade
router.put("/:id", authController.verifyTokenAdmin, entidadesController.update);

// Create Entidade Route
router.post(
  "/",
  authController.verifyTokenAdmin,
  upload.single("logo"),
  entidadesController.create
);

router.delete(
  "/:id",
  authController.verifyTokenAdmin,
  entidadesController.delete
);

router.post("/search", entidadesController.search);

module.exports = router;
