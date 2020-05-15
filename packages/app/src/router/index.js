import Vue from 'vue';
import VueRouter from 'vue-router';

import RouterWrapper from '@/components/RouterWrapper.vue';
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
    path: '/',
    name: 'home',
    redirect: { name: 'bookings' },
    meta: { requiresAuth: true },
  },
  {
    path: '/bookings',
    name: 'bookings',
    component: () => import(/* webpackChunkName: "home" */ '../views/Bookings.vue'),
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
  {
    path: '/admin',
    component: RouterWrapper,
    meta: {
      title: 'Admin',
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        name: 'admin',
        component: () => import(/* webpackChunkName: "admin" */ '../views/admin/Admin.vue'),
      },
      {
        path: 'rentables',
        name: 'admin-rentables',
        component: () => import(/* webpackChunkName: "admin-rentables" */ '../views/admin/AdminRentables.vue'),
      },
      {
        path: 'rentable/create',
        name: 'admin-create-rentable',
        component: () => import(/* webpackChunkName: "admin-rentable" */ '../views/admin/AdminRentable.vue'),
      },
      {
        path: 'rentable/:rentableId',
        name: 'admin-rentable',
        component: () => import(/* webpackChunkName: "admin-rentable" */ '../views/admin/AdminRentable.vue'),
      },
      {
        path: 'categories',
        name: 'admin-categories',
        component: () => import(/* webpackChunkName: "admin-categories" */ '../views/admin/AdminCategories.vue'),
      },
      {
        path: 'users',
        name: 'admin-users',
        component: () => import(/* webpackChunkName: "admin-users" */ '../views/admin/AdminUsers.vue'),
      },
    ],
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

  await Store.dispatch('auth/loadUser');

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
