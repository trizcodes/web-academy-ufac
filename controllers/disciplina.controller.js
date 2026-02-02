const db = require('../database/connect');

const consultar = (req, res) => {
    const id = req.query.id;
    let sql = 'SELECT * FROM disciplina';
    const params = [];

    if (id) {
        sql += ' WHERE id = ?';
        params.push(id);
    }

    db.query(sql, params, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ message: 'Erro ao consultar disciplina', error_code: erro.code });
        }
        if (id && resultado.length === 0) {
            return res.status(404).json({ message: 'Disciplina não encontrada' });
        }
        res.json(resultado);
    });
};

const inserir = (req, res) => {
    const { nome } = req.body;
    const sql = 'INSERT INTO disciplina (nome) VALUES (?)';
    
    db.query(sql, [nome], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ message: 'Erro ao inserir disciplina', error_code: erro.code });
        }
        res.status(201).json({ message: 'Disciplina inserida', id: resultado.insertId });
    });
};

const alterar = (req, res) => {
    const { nome } = req.body;
    const id = req.query.id;
    const sql = 'UPDATE disciplina SET nome = ? WHERE id = ?';

    db.query(sql, [nome, id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ message: 'Erro ao alterar disciplina', error_code: erro.code });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ message: 'Disciplina não encontrada' });
        }
        res.json({ message: 'Disciplina alterada' });
    });
};

const excluir = (req, res) => {
    const id = req.query.id;
    const sql = 'DELETE FROM disciplina WHERE id = ?';

    db.query(sql, [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ message: 'Erro ao excluir disciplina', error_code: erro.code });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ message: 'Disciplina não encontrada' });
        }
        res.json({ message: 'Disciplina excluída' });
    });
};

module.exports = { consultar, inserir, alterar, excluir };