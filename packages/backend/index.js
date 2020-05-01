const path = require('path');
const express = require('express');
const socketIo = require('socket.io');
const socketioJwt = require('socketio-jwt');
const http = require('http');

const app = express();
const server = http.createServer(app);

const PORT = process.env.BACKEND_PORT || 3000;
const DIST_DIR = [__dirname, 'dist'];
const JWT_SECRET = process.env.JWT_SECRET || null;
let connectedClients = 0;

function start() {
  if (!JWT_SECRET) {
    console.error('Please provide JWT_SECRET');
    process.exit(1);
  }

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

  io.sockets
    .on('connection', socketioJwt.authorize({
      secret: Buffer.from(JWT_SECRET, 'base64'),
      timeout: 15000, // 15 seconds to send the authentication message
    }))
    .on('authenticated', (socket) => {
      connectedClients += 1;
      // this socket is authenticated, we are good to handle more events from it.
      console.log(`hello! ${socket.decoded_token.name}`);
    })
    .on('disconnect', () => {
      connectedClients -= 1;
    });

  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`);
  });
}

start();
