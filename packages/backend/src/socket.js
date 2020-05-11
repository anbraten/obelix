const uuid = require('uuid').v4;
const db = require('./db');
const { memberOf } = require('./utils');

function createSocket(socket) {
  socket.on('getCategories', () => {
    const categories = db.get('categories').value() || [];
    socket.emit('getCategories', categories);
  });

  socket.on('getBookings', (date) => {
    let bookings = db.get('bookings').filter({ date }).value() || [];

    bookings = bookings.map((booking) => {
      let user = db.get('users').find({ id: booking.user }).value();
      user = {
        id: user.id,
        name: user.name,
      };

      const rentable = db.get('rentables').find({ id: booking.rentable }).value();

      return {
        ...booking,
        user,
        rentable,
      };
    });

    socket.emit('getBookings', bookings);
  });

  socket.on('getRentables', () => {
    const rentables = db.get('rentables').value() || [];
    socket.emit('getRentables', rentables);
  });

  socket.on('createBooking', (booking) => {
    // TODO: check booking
    // if (rentable already booked at time) {
    //   socket.emit('booking', { error: 'rentable already reserved' });
    // }

    booking.id = uuid();

    // assign user id to booking
    booking.user = socket.decoded_token.sub;

    db.get('bookings').push(booking).write();
    socket.emit('createBooking', booking);
  });

  socket.on('cancelBooking', (bookingId) => {
    const booking = db.get('bookings').find({ id: bookingId }).value();

    // if booking not found or from different user
    if (!booking || booking.user !== socket.decoded_token.sub) {
      socket.emit('cancelBooking', { error: 'Permission denied' });
      return;
    }

    db.get('bookings').remove({ id: bookingId }).write();
    socket.emit('cancelBooking', { success: true });
  });

  socket.on('createRentable', (rentable) => {
    if (!memberOf(socket.decoded_token.sub, 'admin')) {
      socket.emit('createRentable', { error: 'access denied' });
      return;
    }

    rentable.id = uuid();

    db.get('rentables').push(rentable).write();
    socket.emit('createRentable', rentable);
  });

  socket.on('updateRentable', (rentable) => {
    if (!memberOf(socket.decoded_token.sub, 'admin')) {
      socket.emit('updateRentable', { error: 'access denied' });
      return;
    }

    // update data
    db.get('rentables').find({ id: rentable.id }).assign(rentable).write();

    socket.emit('updateRentable', rentable);
  });

  socket.on('getUser', () => {
    const userId = socket.decoded_token.sub;
    const user = db.get('users').find({ id: userId }).value();
    socket.emit('getUser', user);
  });

  socket.on('getUsers', () => {
    if (!memberOf(socket.decoded_token.sub, 'admin')) {
      socket.emit('getUsers', { error: 'access denied' });
      return;
    }

    const users = db.get('users').value();
    socket.emit('getUsers', users);
  });

  socket.on('removeUser', (userId) => {
    if (!memberOf(socket.decoded_token.sub, 'admin')) {
      socket.emit('removeUser', { error: 'access denied' });
      return;
    }

    const user = db.get('users').find({ id: userId }).value();

    if (!user) {
      socket.emit('removeUser', { error: 'Permission denied' });
      return;
    }

    db.get('users').remove({ id: userId }).write();
    socket.emit('removeUser', { success: true });
  });

  socket.on('updateUser', (user) => {
    if (!memberOf(socket.decoded_token.sub, 'admin')) {
      socket.emit('updateUser', { error: 'access denied' });
      return;
    }

    // update data
    db.get('users').find({ id: user.id }).assign(user).write();

    socket.emit('updateUser', user);
  });
}

module.exports = createSocket;
