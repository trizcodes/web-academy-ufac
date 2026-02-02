const db = require('../database/connect');

const consultar = (req, res) => {
    const id = req.query.id;
    let sql = 'SELECT * FROM professor';
    const params = [];

    if (id) {
        sql += ' WHERE id = ?';
        params.push(id);
    }

    db.query(sql, params, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ message: 'Erro ao consultar professor', error_code: erro.code });
        }
        if (id && resultado.length === 0) {
            return res.status(404).json({ message: 'Professor não encontrado' });
        }
        res.json(resultado);
    });
};

const inserir = (req, res) => {
    const { nome, email, endereco, data_nascimento } = req.body;
    const sql = 'INSERT INTO professor (nome, email, endereco, data_nascimento) VALUES (?, ?, ?, ?)';

    db.query(sql, [nome, email, endereco, data_nascimento], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ message: 'Erro ao inserir professor', error_code: erro.code });
        }
        res.status(201).json({ message: 'Professor inserido', id: resultado.insertId });
    });
};

const alterar = (req, res) => {
    const { nome, email, endereco, data_nascimento } = req.body;
    const id = req.query.id;
    const sql = 'UPDATE professor SET nome = ?, email = ?, endereco = ?, data_nascimento = ? WHERE id = ?';

    db.query(sql, [nome, email, endereco, data_nascimento, id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ message: 'Erro ao alterar professor', error_code: erro.code });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ message: 'Professor não encontrado' });
        }
        res.json({ message: 'Professor alterado' });
    });
};

const excluir = (req, res) => {
    const id = req.query.id;
    const sql = 'DELETE FROM professor WHERE id = ?';

    db.query(sql, [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ message: 'Erro ao excluir professor', error_code: erro.code });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ message: 'Professor não encontrado' });
        }
        res.json({ message: 'Professor excluído' });
    });
};

module.exports = { consultar, inserir, alterar, excluir };