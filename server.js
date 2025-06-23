const express = require('express');

const app = express();
const port = 8080;

const limitadorDeRequisicoes = require('./token_bucket');
const contadorDeJanelaFixa = require('./limitador_fixo');
const logJanelaDeslizante = require('./limitador_log');
const contadorJanelaDeslizante = require('./limitador_deslizante');

// Rotas HTTP
app.get('/unlimited', (req, res) => {
    res.send("Sem limite! Pode usar tranquilo!");
});

app.get('/limited', limitadorDeRequisicoes, (req, res) => {
    res.send("Limitado, não abuse!");
});

app.get('/fixed', contadorDeJanelaFixa, (req, res) => {
    res.send("Endpoint com janela fixa!");
});

app.get('/log', logJanelaDeslizante, (req, res) => {
    res.send("Endpoint com janela deslizante (log)!");
});

app.get('/sliding', contadorJanelaDeslizante, (req, res) => {
    res.send("Endpoint com contador de janela deslizante!");
});

app.get('/', (req, res) => {
    res.send('Servidor rodando!');
});

app.listen(port, () => {
    console.log(`Servidor HTTP rodando em http://localhost:${port}`);
});
