const express = require('express');
const router = express.Router();
const controller = require('../controllers/matricula.controller');

router.get('/consultar', controller.consultar);
router.post('/inserir', controller.inserir);
router.delete('/cancelar', controller.cancelar);

module.exports = router;