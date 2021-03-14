import { Application as ExpressFeathers } from '@feathersjs/express';

export interface ServiceTypes {}
export type Application = ExpressFeathers<ServiceTypes>;
