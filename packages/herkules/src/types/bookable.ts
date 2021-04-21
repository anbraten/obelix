import AbstractEntity from './abstractEntity';

export default class Bookable extends AbstractEntity {
  name!: string;
  tags!: string[];
}
