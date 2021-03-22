import { FeathersError } from '@feathersjs/errors';
import { computed, ref } from 'vue';

import User from '~/types/user';

import feathers from './useBackend';

export const user = ref<User>();

export const isAuthenticated = computed(() => !!user.value);

feathers.on('connect', () => {
  void load();
});

feathers.on('disconnect', () => {
  user.value = undefined;
});

export async function load(): Promise<void> {
  try {
    await feathers.reAuthenticate();
    const authentication = await feathers.get('authentication');
    user.value = authentication?.user;
  } catch (e) {
    const error = e as FeathersError;

    // remove token if it seems to be invalid
    if (error.name === 'NotFound') {
      feathers.authentication.removeAccessToken();
      return;
    }
  }
}

export async function logout(): Promise<void> {
  await feathers.logout();
  user.value = undefined;
}
