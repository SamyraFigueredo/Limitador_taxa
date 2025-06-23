const path = require('path');

const limite = 5;
const janela = 10;

const contadores = {};

const contadorJanelaDeslizante = (req, res, next) => {
    const ip = req.ip;
    const tempo_atual = Date.now() / 1000;

    // Calcula o número da janela atual
    const janelaAtual = Math.floor(tempo_atual / janela);

    if (!contadores[ip]) {
        contadores[ip] = {
            janelaAnterior: janelaAtual,
            contadorJanelaAnterior: 0,
            contadorJanelaAtual: 0
        };
    }

    const dados = contadores[ip];

    // Se passou para uma nova janela, atualiza os contadores
    if (dados.janelaAnterior !== janelaAtual) {
        dados.contadorJanelaAnterior = dados.contadorJanelaAtual;
        dados.contadorJanelaAtual = 0;
        dados.janelaAnterior = janelaAtual;
    }

    // Calcula o peso da janela anterior com base no tempo decorrido
    const tempoJanelaAtual = (tempo_atual % janela);
    const pesoJanelaAnterior = (janela - tempoJanelaAtual) / janela;

    // Contagem ponderada das requisições
    const total = dados.contadorJanelaAtual + pesoJanelaAnterior * dados.contadorJanelaAnterior;

    if (total >= limite) {
        return res.status(429).sendFile(path.join(__dirname, 'views', 'erro429.html'));
    }

    // Incrementa o contador da janela atual
    dados.contadorJanelaAtual += 1;

    next();
};

module.exports = contadorJanelaDeslizante;
