const express = require('express');
const router = express.Router();
const controller = require('../controllers/vinculo.controller');

router.get('/consultar-por-disciplina/:id', controller.consultarPorDisciplina);
router.get('/consultar-por-professor/:id', controller.consultarPorProfessor);
router.get('/consultar-por-turma/:id', controller.consultarPorTurma);
router.get('/inserir', controller.inserir);
router.get('/encerrar', controller.encerrar);

module.exports = router;