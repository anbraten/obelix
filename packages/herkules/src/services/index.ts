import { Application } from '../declarations';
import AuthenticationService from './authentication/authentication';
import UsersService from './users/users.service';

export default function (app: Application): void {
  app.configure(AuthenticationService);
  app.configure(UsersService);
}
