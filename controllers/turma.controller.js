const db = require('../database/connect');

const consultar = (req, res) => {
    const id = req.query.id;
    // JOIN para trazer os dados da Sala vinculada
    let sql = `
        SELECT t.*, s.bloco, s.andar, s.numero 
        FROM turma t 
        LEFT JOIN sala s ON t.sala_id = s.id
    `;
    const params = [];

    if (id) {
        sql += ' WHERE t.id = ?';
        params.push(id);
    }

    db.query(sql, params, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ message: 'Erro ao consultar turma', error_code: erro.code });
        }
        if (id && resultado.length === 0) {
            return res.status(404).json({ message: 'Turma não encontrada' });
        }
        res.json(resultado);
    });
};

const inserir = (req, res) => {
    const { codigo, ano_letivo, sala_id } = req.body;
    const sql = 'INSERT INTO turma (codigo, ano_letivo, sala_id) VALUES (?, ?, ?)';

    db.query(sql, [codigo, ano_letivo, sala_id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ message: 'Erro ao inserir turma', error_code: erro.code });
        }
        res.status(201).json({ message: 'Turma inserida', id: resultado.insertId });
    });
};

const alterar = (req, res) => {
    const { codigo, ano_letivo, sala_id } = req.body;
    const id = req.query.id;
    const sql = 'UPDATE turma SET codigo = ?, ano_letivo = ?, sala_id = ? WHERE id = ?';

    db.query(sql, [codigo, ano_letivo, sala_id, id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ message: 'Erro ao alterar turma', error_code: erro.code });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ message: 'Turma não encontrada' });
        }
        res.json({ message: 'Turma alterada' });
    });
};

const excluir = (req, res) => {
    const id = req.query.id;
    const sql = 'DELETE FROM turma WHERE id = ?';

    db.query(sql, [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ message: 'Erro ao excluir turma', error_code: erro.code });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ message: 'Turma não encontrada' });
        }
        res.json({ message: 'Turma excluída' });
    });
};

module.exports = { consultar, inserir, alterar, excluir };