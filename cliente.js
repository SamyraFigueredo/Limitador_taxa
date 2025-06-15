const WebSocket = require('ws');

const socket = new WebSocket('ws://localhost:8081');

socket.on('open', () => {
    console.log('Conexão aberta');
    socket.send('Olá servidor!');
});

socket.on('message', (data) => {
    console.log('Recebido do servidor:', data.toString());
});

socket.on('close', () => {
    console.log('Conexão encerrada');
});

socket.on('error', (err) => {
    console.error('Erro:', err.message);
});
