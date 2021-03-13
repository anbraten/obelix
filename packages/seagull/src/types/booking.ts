import { Ref } from './ref';
import AbstractEntity from './abstractEntity';
import Bookable from './bookable';
import User from './user';

export default class Booking extends AbstractEntity {
  bookable!: Ref<Bookable>;
  bookedBy!: Ref<User>;
  startDate!: Date;
  note!: string;
}
