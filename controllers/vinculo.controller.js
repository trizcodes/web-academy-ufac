const db = require('../database/connect');

const consultarPorDisciplina = (req, res) => {
    const id = req.params.id;
    let sql = 'SELECT tdp.*, p.nome as professor_nome, t.codigo as turma_codigo, t.ano_letivo as turma_ano_letivo';
    sql += 'FROM turma_disciplina_professor tdp';
    sql += 'LEFT JOIN professor p ON tdp.professor_id = p.id';
    sql += ' LEFT JOIN turma t ON tdp.turma_id = t.id';
    sql += ' WHERE disciplina_id = ?';
    db.query(sql, [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({message: 'Erro ao consultar vinculos', error_code:erro.code});
        }
        res.json(resultado);
    });
}

const consultarPorProfessor = (req, res) => {
    const id = req.params.id;
    let sql = 'SELECT tdp.*, d.nome as disciplina, t.codigo as turma_codigo, t.ano_letivo as turma_ano_letivo';
    sql += 'FROM turma_disciplina_professor tdp';
    sql += 'LEFT JOIN disciplina d ON tdp.disciplina_id = p.id';
    sql += ' LEFT JOIN turma t ON tdp.turma_id = t.id';
    sql += ' WHERE disciplina_id = ?';
    db.query(sql, [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({message: 'Erro ao consultar vinculos', error_code:erro.code});
        }
        res.json(resultado);
    });
}

const consultarPorTurma = (req, res) => {
    const id = req.params.id;
    let sql = 'SELECT tdp.*, d.nome as disciplina_nome, p.nome as professor_nome';
    sql += 'FROM turma_disciplina_professor tdp';
    sql += 'LEFT JOIN professor p ON tdp.professor_id = p.id';
    sql += ' LEFT JOIN disciplina d ON tdp.disciplina = d.id';
    sql += ' WHERE disciplina_id = ?';
    db.query(sql, [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({message: 'Erro ao consultar vinculos', error_code:erro.code});
        }
        res.json(resultado);
    });
}

const inserir = (req, res) => {
    const { disciplina_id, professor_id, turma_id } = req.body;
    const sql = 'INSERT INTO turma_disciplina_professor (disciplina_id, professor_id, turma_id) VALUES (?,?,?)'
    db.query(sql, [disciplina_id, professor_id, turma_id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({message: 'Erro ao inserir vinculo', error_code: erro.code});
        }
        res.status(201).json({message: 'vinculo inserido'});
    })
}

const encerrar = (req, res) => {
    const { disciplina_id, professor_id, turma_id} = req.query;
    if (!disciplina_id && !professor_id && !turma_id) {
        return res.status(400).json({message: 'Parâmetros inválidos'});
    }
    const sql = 'DELETE FORM turma_disciplina_professor';
    sql += 'WHERE disciplina_id = ? AND professor_id = ? AND turma_id = ?';
    db.query(sql, disciplina_id, professor_id, turma_id, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({message: 'Erro ao excluir vinculos', error_code:erro.code});
        }
        res.json({message: 'vinculo encerrado'});
    })
}

module.exports = {
    consultarPorDisciplina,
    consultarPorProfessor,
    consultarPorTurma,
    inserir,
    encerrar
}