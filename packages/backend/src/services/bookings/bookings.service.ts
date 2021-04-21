import { Application } from '../../declarations';
import Booking from '../../types/booking';
import { MongooseServiceOptions, Service } from 'feathers-mongoose';
import { Document, Model as MongooseModel, model, Schema, SchemaTypes } from 'mongoose';
import { ServiceAddons } from '@feathersjs/feathers';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'bookings': Service<Booking> & ServiceAddons<Booking>;
  }
}

export const name = 'bookings';

const BookingSchema = new Schema<Document, MongooseModel<Document, unknown>, Booking>({
  bookable: { type: SchemaTypes.String, required: true },
  bookedBy: { type: SchemaTypes.String, required: true },
  startDate: { type: SchemaTypes.Date, required: true },
  endDate: { type: SchemaTypes.Date, required: true },
  note: { type: SchemaTypes.String },
}, {
  timestamps: true,
});

export const BookingModel = model<Booking & Document>(name, BookingSchema);

export default (app: Application): void => {
  const options: Partial<MongooseServiceOptions> = {
    Model: BookingModel,
  };

  app.use(name, new Service(options));
};
