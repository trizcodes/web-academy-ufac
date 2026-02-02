var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var alunosRouter = require('./routes/aluno.route');
var matriculaRouter = require('./routes/matricula.route');
var notaRouter = require('./routes/nota.route');
var vinculoRouter = require('./routes/vinculo.route');
var alunoRoute = require('./routes/aluno.route');
var disciplinaRoute = require('./routes/disciplina.route');
var professorRoute = require('./routes/professor.route');
var salaRoute = require('./routes/sala.route');
var turmaRoute = require('./routes/turma.route');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/aluno', alunosRouter);
app.use('/api/matricula', matriculaRouter);
app.use('/api/nota', notaRouter);
app.use('/api/vinculo', vinculoRouter);
app.use('/aluno', alunoRoute);
app.use('/disciplina', disciplinaRoute);
app.use('/professor', professorRoute);
app.use('/sala', salaRoute);
app.use('/turma', turmaRoute);
module.exports = app;
