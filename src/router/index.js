import { createRouter, createWebHistory } from 'vue-router'
// import { getCurrentUser } from 'vuefire'
import { getCurrentUser } from "../../services/currentUser"


import LandingPage from '../views/pages/LandingPage.vue'
import Home from "../views/pages/Home.vue"
import Login from "../views/pages/Login.vue"
import ManageDevices from '../views/pages/ManageDevices.vue'
import Stats from "../views/pages/Stats.vue"


import pageNotFound from '../views/pages/PageNotFound.vue'
import Unauthorized from "../views/pages/Unauthorized.vue"



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: LandingPage,
      meta: { hideNavigation: true }
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      meta: { isProtected: true }
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/manage",
      name: "manage",
      component: ManageDevices,
      meta: { isProtected: true }
    },
    {
      path: "/stats",
      component: Stats,
      meta: { isProtected: true }
    },
    {
      path: "/forbidden",
      component: Unauthorized,
      meta: { hideNavigation: true }
    },
    {
      path: "/:pathMatch(.*)",
      name: "404",
      component: pageNotFound
    }
  ]
})

// router.beforeEach(async (to, from) => {
//   const user = await getCurrentUser()
//   to.meta.user = user;
//   if(to.meta.isProtected && !user){
//     return { path: "/forbidden"}
//   }
// })

router.beforeEach(async (to, from) => {
  // CHECK USER IS LOGGED IN
  const user = await getCurrentUser()
  to.meta.user = user;
  if (to.meta.isProtected && !user) {
    return { path: "/forbidden" }
  }
})


export default router
