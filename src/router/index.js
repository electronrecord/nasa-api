import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/projects'
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('../views/ProjectsView.vue')
  },
  {
    path: '/project/:id',
    name: 'project',
    component: () => import('../views/ProjectView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
