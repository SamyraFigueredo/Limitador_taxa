const path = require('path');

const LIMITE_POR_JANELA = 10;
const TAMANHO_DA_JANELA = 60 * 1000;

const janelas = {};

const contadorDeJanelaFixa = (req, res, next) => {
    const ip = req.ip;
    const tempo_atual = Date.now();

    if (!janelas[ip]) {
        janelas[ip] = {
            janelaInicio: tempo_atual,
            contador: 1
        };
        return next();
    }

    const janela = janelas[ip];

    // Verifica se ainda está na mesma janela
    if (tempo_atual - janela.janelaInicio < TAMANHO_DA_JANELA) {
        if (janela.contador >= LIMITE_POR_JANELA) {
            return res.status(429).sendFile(path.join(__dirname, 'views', 'erro429Fixed.html'));
        } else {
            janela.contador += 1;
            return next();
        }
    } else {
        // Nova janela: reinicia contador e tempo
        janelas[ip] = {
            janelaInicio: tempo_atual,
            contador: 1
        };
        return next();
    }
};

module.exports = contadorDeJanelaFixa;