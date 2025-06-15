const Redis = require('ioredis-mock');
const client = new Redis();

const limite = 5;
const janela = 10;

const limitadorRedis = async (req, res, next) => {
    const ip = req.ip;
    const key = `rate_limit:${ip}`;

    try {
        // Incrementa o contador atômico no Redis (mock)
        const contador = await client.incr(key);

        if (contador === 1) {
            // Define a expiração do contador igual ao tamanho da janela (em segundos)
            await client.expire(key, janela);
        }

        if (contador > limite) {
            return res.status(429).send('Muitas requisições! Espere um pouco.');
        }

        next();
    } catch (err) {
        console.error('Erro ao acessar Redis:', err);
        next();
    }
};

module.exports = limitadorRedis;