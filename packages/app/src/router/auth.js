import { prefixRoutes } from '@/router/utilities';

export default prefixRoutes('/auth', [
  {
    path: 'callback',
    name: 'auth-callback',
    component: () => import(/* webpackChunkName: "auth-callback" */ '@/views/auth/AuthCallback.vue'),
    meta: { isPublic: true },
  },
  {
    path: 'callback/error',
    name: 'auth-callback-error',
    component: () => import(/* webpackChunkName: "auth-callback-error" */ '@/views/auth/AuthCallbackError.vue'),
    meta: { isPublic: true },
  },
]);
