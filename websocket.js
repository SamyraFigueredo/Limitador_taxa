const http = require('http');
const WebSocket = require('ws');

const port = 8081;

const server = http.createServer();

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws, req) => {
    const ip = req.socket.remoteAddress;
    console.log(`Cliente conectado via WebSocket: ${ip}`);

    ws.send('Bem-vindo ao WebSocket!');

    ws.on('message', (message) => {
        console.log(`Mensagem recebida do cliente (${ip}): ${message}`);
        ws.send(`Servidor recebeu: ${message}`);
    });

    ws.on('close', () => {
        console.log(`Cliente desconectado: ${ip}`);
    });
});

server.listen(port, () => {
    console.log(`Servidor WebSocket rodando em ws://localhost:${port}`);
});