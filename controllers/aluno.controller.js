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

const inserir = (req, res) => {
    const {nome, data_nascimento, email, endereco} = req.body;
    const sql = 'INSERT INTO aluno (nome, data_nascimento, email, endereco) VALUES (?, ?, ?, ?)'
    db.query(sql, [nome, data_nascimento, email, endereco], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ message: 'Erro ao inserir aluno', erro_code: erro.code});
        }
        res.status(201).json({message: 'Aluno Inserido', id:resultado.insertId });
    })
}

const alterar = (req, res) => {
    const {nome, data_nascimento, email, endereco} = req.body;
    const id = req.query.id;
    const sql = 'UPDATE aluno SET nome = ?, data_nascimento = ?, email = ?, endereco = ? WHERE id = ?'
    db.query(sql, [nome, data_nascimento, email, endereco, id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ message: 'Erro ao alterar aluno', erro_code: erro.code});
        }
        if (resultado.affectedRows == 0) {
            return res.status(404). json ({message: 'Aluno não encontrado' })
        }
        res.json({message: 'Aluno alterado'});
    })
}

const excluir = (req, res) => {
    const id = req.query.id;
    const sql = 'DELETE FORM aluno WHERE id = ?'
    db.query(sql, [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ message: 'Erro ao excluir aluno', erro_code: erro.code});
        }
        if (resultado.affectedRows == 0) {
            return res.status(404). json ({message: 'Aluno não encontrado' })
        }
        res.json({message: 'Aluno excluido'});
    })

}

module.exports = {
    consultar,
    inserir,
    alterar,
    excluir
};