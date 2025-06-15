const http = require('http');
const WebSocket = require('ws');

const port = 8081;
const server = http.createServer();
const wss = new WebSocket.Server({ server });

const limitsInfo = {
    "/unlimited": "Sem limite",
    "/limited": "Token Bucket: 5 req/s",
    "/fixed": "Janela Fixa: 10 req/min",
    "/log": "Janela Deslizante (log): 3 req/10s",
    "/sliding": "Janela Deslizante (contador): 4 req/30s",
    "/redis": "Redis Rate Limit: 20 req/min por IP"
};

wss.on('connection', (ws, req) => {
    const ip = req.socket.remoteAddress;
    console.log(`Cliente conectado via WebSocket: ${ip}`);

    // Mensagens iniciais
    ws.send('Bem-vindo ao WebSocket!');
    ws.send(JSON.stringify({ type: "limits", data: limitsInfo }));

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