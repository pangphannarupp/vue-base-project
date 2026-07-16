import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '../layouts/MainLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'day',
          component: () => import('../views/DayView.vue'),
        },
        {
          path: 'month',
          name: 'month',
          component: () => import('../views/MonthView.vue'),
        },
        {
          path: 'events',
          name: 'events',
          component: () => import('../views/EventsView.vue'),
        },
        {
          path: 'weather',
          name: 'weather',
          component: () => import('../views/WeatherView.vue'),
        },
        {
          path: 'more',
          name: 'more',
          component: () => import('../views/MoreView.vue'),
        }
      ]
    },
    {
      path: '/new-task',
      name: 'new-task',
      component: () => import('../views/NewTaskView.vue'),
    }
  ]
});

export default router;
