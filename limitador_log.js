const limite = 5;
const intervalo = 10;

const logs = {};

const logJanelaDeslizante = (req, res, next) => {
    const ip = req.ip;
    const agora = Date.now() / 1000;
    if (!logs[ip]) {
        logs[ip] = [];
    }

    logs[ip] = logs[ip].filter(timestamp => agora - timestamp <= intervalo);

    if (logs[ip].length >= limite) {
        return res.status(429).send("Muitas requisições! Espere um pouco.");
    }

    logs[ip].push(agora);
    next();
};

module.exports = logJanelaDeslizante;
