import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '@/modulos/autenticacion/SignIn.vue' 
import SingOut from '@/modulos/autenticacion/SingOut.vue'
import Inicio from '@/modulos/principal/InicioVue.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/validacion',
      name: 'validacion',
      component: SignIn,
    },
    {
      path: '/registro',
      name: 'registro',
      component: SingOut,
    },
    {
      path: '/Inicio',
      name: 'Inicio',
      component: Inicio,
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
