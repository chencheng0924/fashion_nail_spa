import { createRouter, createWebHistory } from "vue-router";

const routeModules = import.meta.glob("/src/views/*/*.vue");
const pages = Object.keys(routeModules).map((path) => {
  const name = path.match(/\/([^/]+)\.vue$/)[1];
  return {
    path: `${name}`,
    component: routeModules[path],
    name: name,
  };
});
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/home.vue"),
    children: [...pages],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: [...routes],
});
export default router;
