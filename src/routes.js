const express = require('express');
const connection = require('./database/connection');
const EntradaController = require('./controllers/EntradaController');
const RelatorioDiario = require('./controllers/RelatorioDiario');
const RelatorioMensal = require('./controllers/RelatorioMensal');
const RelatorioAnual = require('./controllers/RelatorioAnual');
const SaidaController = require('./controllers/SaidaController');
const Anos = require('./controllers/AnoController');
const EditarEntradas = require('./controllers/EditarEntrada');



const routes = express.Router();
//listar anos
routes.get('/relatorio-mensal', Anos.listar);
routes.get('/relatorio-anual', Anos.listar);

//rotas relatorios
routes.get('/relatorio-diario-result', RelatorioDiario.listar);
routes.get('/relatorio-mensal-result', RelatorioMensal.listar);
routes.get('/relatorio-anual-result', RelatorioAnual.listar);

//rotas entrada
routes.post('/adicionar-entradas', EntradaController.criar);
routes.get('/adicionar-entradas', EntradaController.listarDescricao);
routes.get('/editar-entradas', EditarEntradas.listar);
routes.delete('/editar-entradas/:id', EditarEntradas.deletar);
routes.put('/editar-entradas/:id', EditarEntradas.update);

//rotas saida
routes.post('/adicionar-saidas', SaidaController.criar);
routes.get('/adicionar-saidas', SaidaController.listarDescricao);

module.exports = routes;