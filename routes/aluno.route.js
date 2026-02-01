const express = require('express');
const router = express.Router();
const controller = require('../controllers/aluno.controller');

router.get('/consultar', controller.consultar);

module.exports = router;