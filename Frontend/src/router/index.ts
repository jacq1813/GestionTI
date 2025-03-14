import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '../modulos/autenticacion/SignIn.vue' 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Autenticacion',
      component: SignIn,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../modulos/autenticacion/SingOut.vue'),
    },
  ],
})

export default router
