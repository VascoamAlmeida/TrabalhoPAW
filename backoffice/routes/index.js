//routes\index.js
const express = require('express');
const router = express.Router();

const indexController = require('../controllers');

/* GET home page. */
router.get('/', indexController.index);

module.exports = router;
