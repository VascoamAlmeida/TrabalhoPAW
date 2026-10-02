//routes\entidade.js
const multer = require("multer");
const path = require("path");
const fs = require("fs"); //File system permite apagar logos desnecessarios


const express = require("express");
const router = express.Router();

const Entidade = require("../models/entidade");

const uploadPath = path.join("public", Entidade.companyLogoBasePath);
//tipos de imagens que vai aceitar
const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"];


const entidadesController = require("../controllers/entidades");
const authController = require("../controllers/auth");


const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
      callback(null, imageMimeTypes.includes(file.mimetype));
    },
  });
  
//Todas entidades
router.get("/",authController.verifyTokenStaff, entidadesController.getAll);

//New Entidade Route
router.get("/new",authController.verifyTokenAdmin, entidadesController.new);

//Show entidade
router.get("/:id",authController.verifyTokenStaff, entidadesController.show );

//Editar entidade
router.get("/:id/edit",authController.verifyTokenAdmin, entidadesController.edit);

//Updating entidade
router.put("/:id",authController.verifyTokenAdmin, upload.single("logo"),  entidadesController.update);

// Create Entidade Route
router.post("/",authController.verifyTokenAdmin, upload.single("logo"), entidadesController.create);

router.delete("/:id",authController.verifyTokenAdmin, entidadesController.delete);

// router.put("/:id/approve", authController.verifyTokenAdmin, entidadesController.approve); -> aprovar entidade


module.exports = router;
