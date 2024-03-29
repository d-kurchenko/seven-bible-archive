import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('pages/Main.vue'),
      },
      {
        path: '/settings',
        component: () => import('pages/Settings.vue'),
      },
      {
        path: '/help',
        component: () => import('pages/Help.vue'),
      },
      {
        path: '/modules',
        component: () => import('pages/Modules.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
]

export default routes
