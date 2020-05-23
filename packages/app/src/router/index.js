import Vue from 'vue';
import VueRouter from 'vue-router';

import OnlineWrapper from '@/components/OnlineWrapper.vue';
import RouterWrapper from '@/components/RouterWrapper.vue';
import auth from '@/libs/auth';

Vue.use(VueRouter);

// route level code-splitting
// this generates a separate chunk (name.[hash].js) for this route
// which is lazy-loaded when the route is visited.
// function loadView(...view) {
//   return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view.join('/')}.vue`);
// }

const routes = [
  // protected routes
  {
    path: '/',
    component: OnlineWrapper,
    children: [
      {
        path: '',
        name: 'home',
        redirect: { name: 'bookings' },
        meta: { authName: auth.authName },
      },
      {
        path: 'bookings',
        name: 'bookings',
        component: () => import(/* webpackChunkName: "home" */ '../views/Bookings.vue'),
        meta: { authName: auth.authName },
      },
      {
        path: 'booking/create',
        name: 'booking-create',
        component: () => import(/* webpackChunkName: "booking-create" */ '../views/BookingCreate.vue'),
        meta: { authName: auth.authName },
      },
      {
        path: 'about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        meta: {
          title: 'About',
          authName: auth.authName,
        },
      },
      {
        path: 'admin',
        component: RouterWrapper,
        meta: {
          title: 'Admin',
          authName: auth.authName,
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

auth.useRouter(router);

export default router;
