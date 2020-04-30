const path = require('path');
const express = require('express');
const socketIo = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
const DIST_DIR = [__dirname, 'dist'];
let connectedClients = 0;

function start() {
  const io = socketIo(server, { path: '/api/socket' });

  app.use(express.static(path.join(...DIST_DIR)));

  app.use('/status', (req, resp) => {
    const status = {
      version: process.env.VERSION || null,
      clients: connectedClients,
    };

    // pretty json
    resp.header('Content-Type', 'application/json');
    resp.send(JSON.stringify(status, null, 4));
  });

  app.use('*', (req, resp) => {
    resp.sendFile(path.join(...DIST_DIR, 'index.html'));
  });

  io.sockets.on('connection', (socket) => {
    connectedClients += 1;

    // TODO

    socket.on('disconnect', () => {
      connectedClients -= 1;
    });
  });

  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`);
  });
}

start();
