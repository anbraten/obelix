import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';

import routes from 'virtual:generated-pages';

const router = createRouter({
  strict: true,
  history: createWebHistory(),
  routes,
});

router.beforeEach(() => { NProgress.start(); });
router.afterEach(() => { NProgress.done(); });

export default router;
