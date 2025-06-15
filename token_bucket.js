const capacidadeMaxima = 5;
const taxaDeRecarga = 1;

const buckets = {}; // Armazena info por IP

const tokenBucket = (req, res, next) => {
    const ip = req.ip;
    const agora = Date.now() / 1000;

    if (!buckets[ip]) {
        buckets[ip] = {
            tokens: capacidadeMaxima,
            ultimaRequisicao: agora
        };
    }

    const bucket = buckets[ip];
    const tempoDecorrido = agora - bucket.ultimaRequisicao;
    bucket.ultimaRequisicao = agora;

    // Recarrega os tokens com base na taxa
    bucket.tokens += tempoDecorrido * taxaDeRecarga;
    if (bucket.tokens > capacidadeMaxima) {
        bucket.tokens = capacidadeMaxima;
    }

    if (bucket.tokens < 1) {
        return res.status(429).send("Muitas requisições! Espere um pouco.");
    }

    bucket.tokens -= 1;
    next();
};

module.exports = tokenBucket;
