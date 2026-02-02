const db = require('../database/connect');

const consultar = (req, res) => {
    const aluno_id = req.query.aluno_id;
    const turma_id = req.query.turma_id;

    if (!aluno_id) {
        return res.status(400).json({ message: 'Aluno não informado' });
    }

    const params = [aluno_id];


    let sql = 'SELECT n.*, t.codigo, t.ano_letivo, d.nome';
    sql += ' FROM nota n';
    sql += ' LEFT JOIN disciplina d ON n.disciplina_id = d.id';
    sql += ' LEFT JOIN turma t ON n.turma_id = t.id';
    sql += ' WHERE n.aluno_id = ?';

    if (turma_id) {
        sql += ' AND turma_id = ?';
        params.push(turma_id);
    }

    db.query(sql, params, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ message: 'Erro ao consultar nota', error_code: erro.code });
        }
        res.json(resultado);
    });
};

const inserir = (req, res) => {
    const { nota, aluno_id, disciplina_id, turma_id } = req.body;
    const sql = 'INSERT INTO nota (nota, aluno_id, disciplina_id, turma_id) VALUES (?, ?, ?, ?)';
    
    db.query(sql, [nota, aluno_id, disciplina_id, turma_id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ message: 'Erro ao inserir nota', error_code: erro.code });
        }
        res.status(201).json({ message: 'Nota inserida', id: resultado.insertId });
    });
};

const alterar = (req, res) => {
    const { nota, aluno_id, disciplina_id, turma_id } = req.body;
    const id = req.query.id;
    const sql = 'UPDATE nota SET nota = ?, aluno_id = ?, disciplina_id = ?, turma_id = ? WHERE id = ?';

    db.query(sql, [nota, aluno_id, disciplina_id, turma_id, id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ message: 'Erro ao alterar nota', error_code: erro.code });
        }
        if (resultado.affectedRows == 0) {
            return res.status(404).json({ message: 'Nota não encontrada' });
        }
        res.json({ message: 'Nota alterada' });
    });
};

const excluir = (req, res) => {
    const id = req.query.id;
    const sql = 'DELETE FROM nota WHERE id = ?';
    
    db.query(sql, [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ message: 'Erro ao excluir nota', error_code: erro.code });
        }
        if (resultado.affectedRows == 0) {
            return res.status(404).json({ message: 'Nota não encontrada' });
        }
        res.json({ message: 'Nota excluída' });
    });
};

module.exports = {
    consultar,
    inserir,
    alterar,
    excluir
};