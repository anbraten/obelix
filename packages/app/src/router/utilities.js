// eslint-disable-next-line import/prefer-default-export
export function prefixRoutes(prefix, routes) {
  return routes.map((route) => ({
    ...route,
    path: `${prefix}/${route.path}`,
  }));
}
