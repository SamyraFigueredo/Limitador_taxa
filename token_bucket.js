const path = require('path');

const capacidadeMaxima = 5;
const taxaDeRecarga = 1;

const buckets = {}; // Armazena info por IP

const tokenBucket = (req, res, next) => {
    const ip = req.ip;
    const tempo_atual = Date.now() / 1000;

    if (!buckets[ip]) {
        buckets[ip] = {
            tokens: capacidadeMaxima,
            ultimaRequisicao: tempo_atual
        };
    }

    const bucket = buckets[ip];
    const tempoDecorrido = tempo_atual - bucket.ultimaRequisicao;
    bucket.ultimaRequisicao = tempo_atual;

    // Recarrega os tokens com base na taxa
    bucket.tokens += tempoDecorrido * taxaDeRecarga;
    if (bucket.tokens > capacidadeMaxima) {
        bucket.tokens = capacidadeMaxima;
    }

    if (bucket.tokens < 1) {
        return res.status(429).sendFile(path.join(__dirname, 'views', 'erro429.html'));
    }

    bucket.tokens -= 1;
    next();
};

module.exports = tokenBucket;
