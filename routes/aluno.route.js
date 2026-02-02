const express = require('express');
const router = express.Router();
const controller = require('../controllers/aluno.controller');
const validadId = require('../middlewares/validarId.middleware')

router.get('/consultar', controller.consultar);
router.post('/inserir', controller.inserir);
router.put('/alterar', validadId, controller.alterar);
router.excluir('/excluir', validadId, controller.excluir);

module.exports = router;