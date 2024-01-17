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
  routes,
  scrollBehavior(to, from, savedPosition) {
    // If the route has a hash, scroll to the element with that id
    if (to.hash) {
      return { selector: to.hash };
    }
    // If the route has a saved position, use it
    if (savedPosition) {
      return savedPosition;
    }
    // Otherwise, scroll to the top
    return { x: 0, y: 0 };
  },
})

export default router
