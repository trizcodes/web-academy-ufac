const express = require('express');
const router = express.Router();
const controller = require('../controllers/disciplina.controller');
const validarId = require('../middlewares/validarId.middleware'); // Se houver middleware

router.get('/consultar', controller.consultar);
router.post('/inserir', controller.inserir);
router.put('/alterar', validarId, controller.alterar);
router.delete('/excluir', validarId, controller.excluir);

module.exports = router;