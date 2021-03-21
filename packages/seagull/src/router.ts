import { setupLayouts } from 'layouts-generated';
import NProgress from 'nprogress';
import generatedRoutes from 'virtual:generated-pages';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import { isAuthenticated, load as loadAuthentication } from '~/compositions/useAuthentication';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const routes = setupLayouts(generatedRoutes) as RouteRecordRaw[];
const router = createRouter({
  strict: true,
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _, next) => {
  NProgress.start();

  const pageAuthentication = (to.meta.authentication as string) || 'needed';

  if (pageAuthentication === 'ignored') {
    next();
    return;
  }

  await loadAuthentication();

  if (pageAuthentication === 'needed' && !isAuthenticated.value) {
    next({ name: 'auth-login' });
    return;
  }

  if (pageAuthentication === 'guests-only' && isAuthenticated.value) {
    next({ name: 'home' });
    return;
  }

  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
