const uuid = require('uuid').v4;
const { get } = require('lodash');
const db = require('./db');

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
        name: user.name, // TODO: mask user data
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
    const roles = get(socket, 'decoded_token.resource_access.obelix.roles', []);
    console.log(roles);

    if (!roles || !roles.includes('admin')) {
      socket.emit('createRentable', { error: 'access denied' });
      return;
    }

    rentable.id = uuid();

    db.get('rentables').push(rentable).write();
    socket.emit('createRentable', rentable);
  });
}

module.exports = createSocket;
