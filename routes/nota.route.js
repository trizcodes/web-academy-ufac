const express = require (`express`);
const router = express.Router();
const controller = require('../controllers/nota.controller');
const validadId = require ('../middlewares/validarId.middleware')

router.get('/consultar', controller.consultar);
router.post('/inserir', controller.inserir);
router.put('/alterar', controller.alterar);
router.delete('/excluir', controller.excluir);

module.exports = router;