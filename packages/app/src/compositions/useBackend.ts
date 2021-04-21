import { AdapterService } from '@feathersjs/adapter-commons';
import auth from '@feathersjs/authentication-client';
import feathers, { Application as FeathersApplication, ServiceAddons } from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';
import { ref } from 'vue';

import Bookable from '~/types/bookable';
import Booking from '~/types/booking';
import User from '~/types/user';

type Service<T> = AdapterService<T> & ServiceAddons<T>;

// Add this service to the service type index
interface ServiceTypes {
  users: Service<User>;
  bookings: Service<Booking>;
  bookables: Service<Bookable>;
}

interface AuthenticationResult {
  user: User;
}

type Application = FeathersApplication<ServiceTypes> & {
  get(key: 'authentication'): Promise<AuthenticationResult | null>;
};

function debug(...args: string[]) {
  console.log(...args);
}

export const isBackendConnected = ref(false);

const feathersClient = feathers<ServiceTypes>() as Application;

feathersClient.on('login', () => {
  debug('Backend: authenticated');
});

feathersClient.on('logout', () => {
  debug('Backend: unauthenticated bye bye');
});

feathersClient.on('connect', () => {
  isBackendConnected.value = true;
  debug('Backend: connected ;-)');
});

feathersClient.on('disconnect', () => {
  isBackendConnected.value = false;
  debug('Backend: disconnected');

  // disconnect logs the user out as well
  feathersClient.emit('logout');
});

feathersClient.hooks({
  error({ error }) {
    // TODO: add pretty error toasting
    debug('feathers-error:', error);
  },
});

const backendUrl = 'localhost:4000';
const socket = io(backendUrl, {
  path: '/api/socket',
  transports: ['websocket'],
  autoConnect: true,
  // timeout: 20 * 1000,
});

socket.on('connect', () => {
  feathersClient.emit('connect');
});

socket.on('disconnect', () => {
  feathersClient.emit('disconnect');
});

feathersClient.configure(socketio(socket));
feathersClient.configure(auth());

// @ts-ignore
window.feathers = feathersClient;

export default feathersClient;

export function load(): void {
  socket.open();
}
