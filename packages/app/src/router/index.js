import Vue from 'vue';
import VueRouter from 'vue-router';

import Store from '@/store';

Vue.use(VueRouter);

// route level code-splitting
// this generates a separate chunk (name.[hash].js) for this route
// which is lazy-loaded when the route is visited.
// function loadView(...view) {
//   return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view.join('/')}.vue`);
// }

const routes = [
  // auth routes
  {
    path: '/auth/callback',
    name: 'auth-callback',
    component: () => import(/* webpackChunkName: "auth-callback" */ '../views/auth/Callback.vue'),
  },
  {
    path: '/auth/unauthorized',
    name: 'auth-unauthorized',
    component: () => import(/* webpackChunkName: "auth-unauthorized" */ '../views/auth/Unauthorized.vue'),
  },

  // protected routes
  {
    path: '/:date?',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/booking/create',
    name: 'booking-create',
    component: () => import(/* webpackChunkName: "booking-create" */ '../views/BookingCreate.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: 'About',
      requiresAuth: true,
    },
  },

  // 404
  {
    path: '*',
    name: 'notFound',
    component: () => import(/* webpackChunkName: "notFound" */ '../views/NotFound.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  Store.commit('setTitle', to.meta.title);

  await Store.dispatch('auth/getUser');

  const isAuthenticated = Store.getters['auth/isAuthenticated'];
  if (isAuthenticated) {
    // already signed in, we can navigate anywhere
    next();
    return;
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // authentication is required. Trigger the sign in process, including the return URI
    Store.commit('auth/setRedirectUrl', to.path);

    // start authentication
    await Store.dispatch('auth/authenticate');
    return;
  }

  // No auth required. We can navigate
  next();
});

export default router;
