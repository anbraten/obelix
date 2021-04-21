import AbstractEntity from './abstractEntity';

export default class User extends AbstractEntity {
  name!: string;
  email!: string;
}
