import { Application } from '../../declarations';
import Bookable from '../../types/bookable';
import { MongooseServiceOptions, Service } from 'feathers-mongoose';
import { Document, Model as MongooseModel, model, Schema, SchemaTypes } from 'mongoose';
import { ServiceAddons } from '@feathersjs/feathers';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'bookables': Service<Bookable> & ServiceAddons<Bookable>;
  }
}

export const name = 'bookables';

const BookableSchema = new Schema<Document, MongooseModel<Document, unknown>, Bookable>({
  name: { type: SchemaTypes.String, required: true },
  tags: [{ type: SchemaTypes.String, }],
}, {
  timestamps: true,
});

export const BookableModel = model<Bookable & Document>(name, BookableSchema);

export default (app: Application): void => {
  const options: Partial<MongooseServiceOptions> = {
    Model: BookableModel,
  };

  app.use(name, new Service(options));
};
