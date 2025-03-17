import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '@/modulos/autenticacion/SignIn.vue' 
import SingOut from '@/modulos/autenticacion/SingOut.vue'
import Main from '@/modulos/principal/MainVue.vue'
import IncidentVue from '@/modulos/principal/IncidentVue.vue'
import AssingIncidet from '@/modulos/incidents/vista/AsignarIncidencia.vue'

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
      component: Main,
    },
    {

      path: '/Incidentes',
      name: 'Incidentes',
      component: IncidentVue,

    },
    {
      path: '/AsignarIncidente',
      name: 'AsignarIncidente',
      component: AssingIncidet,
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
