import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import AppLayout from '@/layout/index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: AppLayout,
    children: [
      {
        path: '',
        meta: {
          title: 'Home Page',
          subTitle: 'Public posts',
        },
        component: () => import('@/views/PostsPage.vue'),
      },
      {
        path: 'profile',
        meta: {
          title: 'Profile',
          subTitle: 'Your profile',
        },
        component: () => import('@/views/ProfilePage.vue'),
      },
    ],
  },
  {
    path: '/about',
    name: 'about',

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
