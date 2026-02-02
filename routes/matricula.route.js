const require = require('express');
const router = express.Router();
const controller = require('../controller.consultar');

router.get('/consultar', controller.consultar);
router.post('/consultar', controller.inserir);
router.delete('/cancelar', controller.cancelar);

module.exports = router;