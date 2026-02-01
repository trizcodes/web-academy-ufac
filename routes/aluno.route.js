const express = require('express');
const router = express.Router();

router.get('/consultar', (req, res) => {
    res.send('Rota de consulta de alunos');
});

module.exports = router;