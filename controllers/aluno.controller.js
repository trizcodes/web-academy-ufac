const db = require('../database/connect');

const consultar = (req, res) => {
    const id = req.query.id;
    let sql = 'SELECT * FROM aluno';
    if (id) {
        sql += 'WHERE id = ?'
    }
    db.query(sql, [id], (erro, resultado) => {
        if(erro) {
            return res.status(500).json({message: 'Erro ao consultar aluno', error_code: erro.code});
        }
        if (id && resultado.length == 0) {
            return res.status(404).json({message: 'Aluno não encontrado'});
        }
        res.json(resultado);
    });
}

module.exports = {
    consultar
};