import AbstractEntity from './abstractEntity';
import BookableCategory from './bookableCategory';
import { Ref } from './ref';

export default class Bookable extends AbstractEntity {
  category!: Ref<BookableCategory>;
  name!: string;
}
