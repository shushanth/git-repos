import { createRouter, createWebHistory } from "vue-router";

import Repositories from "../views/RepositoriesView.vue";

const routes = [
  {
    path: "/",
    name: "repositories",
    component: Repositories,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
