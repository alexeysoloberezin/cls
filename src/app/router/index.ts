import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const layouts: Record<string, () => Promise<typeof import("*.vue")>> = {
  default: () => import("@app/layouts/default.vue"),
  empty: () => import("@app/layouts/empty.vue"),
};

const routes: RouteRecordRaw[] = [
  { path: "/",name: 'Home', meta: { layout: layouts.empty}, component: () => import("@pages/Home.vue") },
  { path: "/chellenges",name: 'Chellenges', meta: { layout: layouts.empty}, component: () => import("@pages/Chellenges.vue") },

  {
    path: "/login",
    component: () => import("@pages/auth/Login.vue"),
    meta: {
      layout: layouts.empty,
    },
  },
  {
    path: "/register",
    component: () => import("@pages/auth/Register.vue"),
    meta: {
      layout: layouts.empty,
    },
  },
  {
    path: "/profile",
    component: () => import("@pages/auth/Profile.vue"),
    meta: {
      layout: layouts.empty,
    },
  },

  { path: "/logout",  meta: {
    layout: layouts.empty,
  }, component: () => import("@pages/auth/Logout.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
