import Bookable from './bookable';
import Booking from './booking';
import User from './user';

export type ServiceModels = {
  users: User;
  bookables: Bookable;
  bookings: Booking;
};
