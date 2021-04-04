import AbstractEntity from './abstractEntity';

// type RowingConfiguration = {
//   rowers: number;
//   coxswain: boolean;
//   // form: 'sculling' | 'sweeping';
// };

export default class Bookable extends AbstractEntity {
  name!: string;
  // rowing!: RowingConfiguration;
  tags!: string[];
}
