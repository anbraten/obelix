import { Application } from '../declarations';
import AuthenticationService from './authentication/authentication';
import UsersService from './users/users.service';
import BookablesService from './bookables/bookables.service';
import BookingsService from './bookings/bookings.service';

export default function (app: Application): void {
  app.configure(AuthenticationService);
  app.configure(UsersService);
  app.configure(BookablesService);
  app.configure(BookingsService);
}
