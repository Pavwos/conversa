const express = require('express');
const http = require('node:http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Define a rota principal
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

// Gerencia conexões de socket
io.on('connection', (socket) => {
  console.log('Um usuário se conectou');

  // Quando um usuário envia uma mensagem
  socket.on('chat message', (data) => {
    io.emit('chat message', data); // Envia a mensagem para todos os usuários
  });

  // Quando um usuário se desconecta
  socket.on('disconnect', () => {
    console.log('Um usuário se desconectou');
  });
});

// O servidor vai rodar na porta 3000
server.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000/');
});
