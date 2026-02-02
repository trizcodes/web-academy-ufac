const db = require('../database/connect');

const consultar = (req, res) => {
    const { aluno_id, turma_id } = req.query;

    if (!aluno_id && !turma_id) {
        return res.status(400).json({ message: 'É obrigatório informar o aluno ou turma' })
    }

    const filtros = [];
    const parametros = []; 
    
    let sql = 'SELECT at.*, a.nome, t.codigo, t.ano_letivo FROM aluno_turma at';
    sql += ' LEFT JOIN aluno a ON at.aluno_id = a.id';
    sql += ' LEFT JOIN turma t ON at.turma_id = t.id';

    if (aluno_id) {
        filtros.push('aluno_id = ?');
        parametros.push(aluno_id);
    }

    if (turma_id) {
        filtros.push('turma_id = ?')
        parametros.push(turma_id)
    }

    sql += ` WHERE ${filtros.join(' AND ')}`

    db.query(sql, parametros, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ message: 'Erro ao consultar matricula', error_code: erro.code });
        }
        if (aluno_id && turma_id && resultado.length == 0) {
            return res.status(404).json({ message: 'Matricula não encontrada' });
        }
        res.json(resultado)
    })
}

const inserir = (req, res) => {
    const { aluno_id, turma_id } = req.body;
    const sql = 'INSERT INTO aluno_turma (aluno_id, turma_id) VALUES (?, ?)';
    db.query(sql, [aluno_id, turma_id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ message: 'Erro ao inserir matricula', error_code: erro.code });
        }
        res.status(201).json({ message: 'Matricula realizada' });
    })
}

const cancelar = (req, res) => {
    const { aluno_id, turma_id } = req.query;
    const sql = 'DELETE FROM aluno_turma WHERE aluno_id = ? AND turma_id = ?';
    
    db.query(sql, [aluno_id, turma_id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ message: 'Erro ao cancelar matricula', error_code: erro.code });
        }
        if (resultado.affectedRows == 0) {
            return res.status(404).json({ message: 'Matricula não encontrada' });
        }
        res.json({ message: 'Matricula cancelada' });
    })
}

module.exports = {
    consultar,
    inserir,
    cancelar
}