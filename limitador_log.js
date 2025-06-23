const path = require('path');

const limite = 5;
const intervalo = 10;

const logs = {};

const logJanelaDeslizante = (req, res, next) => {
    const ip = req.ip;
    const tempo_atual = Date.now() / 1000;
    if (!logs[ip]) {
        logs[ip] = [];
    }

    logs[ip] = logs[ip].filter(timestamp => tempo_atual - timestamp <= intervalo);

    if (logs[ip].length >= limite) {
        return res.status(429).sendFile(path.join(__dirname, 'views', 'erro429.html'));
    }

    logs[ip].push(tempo_atual);
    next();
};

module.exports = logJanelaDeslizante;
