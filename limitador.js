const janelaTempoMS = 60 * 1000; // 1 minuto em milissegundos
const maximoRequisicoes = 5; // máximo de 5 requisições por janela

const armazenamento_IP_requisicoes = {}; // armazena os IPs e seus timestamps

const limitadorDeRequisicoes = (req, res, next) => {
    const ip = req.ip;

    if (!armazenamento_IP_requisicoes[ip]) {
        armazenamento_IP_requisicoes[ip] = [];
    }

    const tempoAtual = Date.now();
    armazenamento_IP_requisicoes[ip] = armazenamento_IP_requisicoes[ip].filter(
        timestamp => tempoAtual - timestamp < janelaTempoMS
    );

    if (armazenamento_IP_requisicoes[ip].length >= maximoRequisicoes) {
        return res.status(429).send('Você atingiu o limite de requisições. Tente novamente mais tarde.');
    }

    armazenamento_IP_requisicoes[ip].push(tempoAtual);
    next();
};

module.exports = limitadorDeRequisicoes;
