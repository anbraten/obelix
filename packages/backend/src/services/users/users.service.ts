import hooks from './users.hooks';
import { Application } from '../../declarations';
import User from '../../types/user';
import { MongooseServiceOptions, Service } from 'feathers-mongoose';
import { Document, Model as MongooseModel, model, Schema, SchemaTypes } from 'mongoose';
import { ServiceAddons } from '@feathersjs/feathers';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'users': Service<User> & ServiceAddons<User>;
  }
}

export const name = 'users';

const UserSchema = new Schema<Document, MongooseModel<Document, unknown>, User>({
  name: { type: SchemaTypes.String, required: true },
  email: { type: SchemaTypes.String, required: true },
}, {
  timestamps: true,
});

export const UserModel = model<User & Document>(name, UserSchema);

export default (app: Application): void => {
  const options: Partial<MongooseServiceOptions> = {
    Model: UserModel,
  };

  app.use(name, new Service(options));

  app.service(name).hooks(hooks);
};

