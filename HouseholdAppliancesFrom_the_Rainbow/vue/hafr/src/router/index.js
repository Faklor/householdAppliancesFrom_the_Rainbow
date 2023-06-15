import { Store } from 'express-session'
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user',
    name: 'user',
    component: () => import( '../views/Auth.vue'),
    meta:{
      requiredAuthorization: true
    }
  },
  {
    path: '/shop',
    name: 'ShopSlyder',
    component: () => import( '../views/Shop.vue')
  },
  {
    path: '/shopmain',
    name: 'ShopMain',
    component: {template:'<div class="a">Страница A</div>'}
  },
  {
    path: '/about',
    name: 'About',
    component: () => import( '../views/About.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    //redirect: '/',
    // beforeEnter(to, from, next){
    //   const role = localStorage.userRole
    //   if (to.meta?.roles?.includes(role) == 'Admin'){
    //     next()
    //   }
    //   else{
    //     next('/404-page')
    //   }
    // },
    component: () => import( '../views/Admin.vue'),
    meta:{
      requiresAuth: true,
      is_admin:true,
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
