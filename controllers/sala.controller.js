const db = require('../database/connect');

const consultar = (req, res) => {
    const id = req.query.id;
    let sql = 'SELECT * FROM sala';
    const params = [];

    if (id) {
        sql += ' WHERE id = ?';
        params.push(id);
    }

    db.query(sql, params, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ message: 'Erro ao consultar sala', error_code: erro.code });
        }
        if (id && resultado.length === 0) {
            return res.status(404).json({ message: 'Sala não encontrada' });
        }
        res.json(resultado);
    });
};

const inserir = (req, res) => {
    const { bloco, andar, numero } = req.body;
    const sql = 'INSERT INTO sala (bloco, andar, numero) VALUES (?, ?, ?)';

    db.query(sql, [bloco, andar, numero], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ message: 'Erro ao inserir sala', error_code: erro.code });
        }
        res.status(201).json({ message: 'Sala inserida', id: resultado.insertId });
    });
};

const alterar = (req, res) => {
    const { bloco, andar, numero } = req.body;
    const id = req.query.id;
    const sql = 'UPDATE sala SET bloco = ?, andar = ?, numero = ? WHERE id = ?';

    db.query(sql, [bloco, andar, numero, id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ message: 'Erro ao alterar sala', error_code: erro.code });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ message: 'Sala não encontrada' });
        }
        res.json({ message: 'Sala alterada' });
    });
};

const excluir = (req, res) => {
    const id = req.query.id;
    const sql = 'DELETE FROM sala WHERE id = ?';

    db.query(sql, [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ message: 'Erro ao excluir sala', error_code: erro.code });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ message: 'Sala não encontrada' });
        }
        res.json({ message: 'Sala excluída' });
    });
};

module.exports = { consultar, inserir, alterar, excluir };