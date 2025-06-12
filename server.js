// Criando endpoints:
//  - /unlimited -> sem limitação de requisições
//  - /limited   -> que será limitado

const express = require('express');
const limitadorDeRequisicoes = require('./limitador');

const app = express();
const port = 8080;

// Rota sem limite
// Para testar: http://localhost:8080/unlimited
app.get('/unlimited', (req, res) => {
    res.send("Sem limite! Pode usar tranquilo!");
});

// Rota com limite de requisições
// Para testar: http://localhost:8080/limited
app.get('/limited', limitadorDeRequisicoes, (req, res) => {
    res.send("Limitado, não abuse!");
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.send('Servidor rodando!');
});