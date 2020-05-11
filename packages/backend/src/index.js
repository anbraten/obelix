const path = require('path');
const express = require('express');
const socketIo = require('socket.io');
const socketioJwt = require('socketio-jwt');
const http = require('http');

const createSocket = require('./socket');
const db = require('./db');
// require('./seed');

const app = express();
const server = http.createServer(app);

const PORT = process.env.BACKEND_PORT || 3000;
const DIST_DIR = [__dirname, '..', 'dist'];
const JWT_SECRET = process.env.JWT_SECRET || null;
const USER_INIT_ACCESS = process.env.USER_INIT_ACCESS || 'granted'; // default access a new user will have
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
      timeout: 5000, // 5 seconds to send the authentication message
    }))
    .on('authenticated', (socket) => {
      // this socket is authenticated, we are good to handle more events from it.
      connectedClients += 1;

      const userId = socket.decoded_token.sub;
      let user = db.get('users').find({ id: userId }).value();

      // check if user already exists
      if (user) {
        // update user data from token
        user.name = socket.decoded_token.name;
        user.email = socket.decoded_token.email;

        db.get('users').find({ id: user.id }).assign(user).write();
      } else {
        // add user data to db
        user = {
          id: userId,
          name: socket.decoded_token.name,
          email: socket.decoded_token.email,
          access: USER_INIT_ACCESS,
        };

        db.get('users').push(user).write();
      }

      if (user.access === 'denied') {
        socket.emit('access', user.access);
        socket.disconnect();
      } else {
        createSocket(socket);
      }
    })
    .on('disconnect', () => {
      connectedClients -= 1;
    });

  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}! (env: ${process.env.NODE_ENV})`);
  });
}

start();
