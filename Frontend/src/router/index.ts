import { createRouter, createWebHistory } from 'vue-router'
import { getAuth } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

import SignIn from '@/modulos/autenticacion/SignIn.vue' 
import SingOut from '@/modulos/autenticacion/SingOut.vue'
import Main from '@/modulos/principal/views/MainVue.vue'
import AdminMainVue from '@/modulos/principal/views/AdminMainVue.vue'
import JefeMainVue from '@/modulos/principal/views/JefeMainVue.vue'
import IncidentVue from '@/modulos/principal/views/IncidentVue.vue'
import AssingIncidet from '@/modulos/incidents/vista/asignarIncidencia.vue'
import NotFound from '@/modulos/autenticacion/NotFound.vue'
import RolesAdminVue from '@/modulos/principal/views/RolesAdminVue.vue'
import UpdateIncident from '@/modulos/incidents/vista/actualizarIncidencia.vue' 
import BuildingsVue from '@/modulos/principal/views/BuildingsVue.vue'
import ClassroomVue from '@/modulos/principal/views/ClassroomVue.vue'
import DevicesVue from '@/modulos/principal/views/DevicesVue.vue'
import InsertBuildings from '@/modulos/principal/views/InsertBuildingsVue.vue'
import InsertDevice from '@/modulos/principal/views/InsertDevicesVue.vue'
import InsertClassroom from '@/modulos/principal/views/InsertClassroomVue.vue'

const requireAuth = (to:any, from:any, next:any) => {
  const auth = getAuth()
  const user = auth.currentUser
  if (!user) {
    next('/validacion')
  } else {
    next()
  }
}

const requireAdmin = async (to:any, from:any, next:any) => {
  const auth = getAuth()
  const user = auth.currentUser
  
  if (!user) {
    next('/validacion')
    return
  }else{
    next()
  }

  try {
    const db = getFirestore()
    const userDoc = await getDoc(doc(db, 'usuarios', user.uid))
    if (userDoc.exists()) {
      const userData = userDoc.data()
      if (userData.Rol === 'admin') {
        next({ name: 'InicioAdmin' })
        return
      } else if (userData.Rol === 'jefe') {
        next({ name: 'InicioJefe' })
        return
      }
      next('/AccessDen')
    }
  } catch (error) {
    console.error('Error verificando rol de usuario', error)
    next('/AccessDen')
  }
}

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
      path: '/AccessDen',
      name: 'AccessDen',
      component: NotFound,
    },
    {
      path: '/Inicio',
      name: 'Inicio',
      component: Main,
      beforeEnter: requireAuth,
    },
    {
      path: '/InicioAdmin',
      name: 'InicioAdmin',
      component: AdminMainVue,
      beforeEnter: requireAdmin,
    },
    {
      path: '/InicioJefe',
      name: 'InicioJefe',
      component: JefeMainVue,
      beforeEnter: requireAdmin,
    },
    {
      path: '/RolesA',
      name: 'RolesA',
      component: RolesAdminVue,
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
      path: '/ActualizarIncidente',
      name: 'ActualizarIncidente',
      component: UpdateIncident,
    },
    {
      path: '/Edificios',
      name: 'Edificios',
      component: BuildingsVue,
    },
    {
      path: '/Salones',
      name: 'Salones',
      component: ClassroomVue,
    },
    {
      path: '/Dispositivos',
      name: 'Dispositivos',
      component: DevicesVue,
    },
    {
      path: '/InsertaEdificio',
      name: 'InsertaEdificio',
      component: InsertBuildings,
    },
    {
      path: '/InsertaEquipo',
      name: 'InsertaEquipo',
      component: InsertDevice,
    },
    {
      path: '/InsertarSalon',
      name: 'InsertarSalon',
      component: InsertClassroom,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../modulos/autenticacion/SingOut.vue'),
    },
  ],
})

export default router
