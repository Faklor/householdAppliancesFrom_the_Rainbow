import axios from 'axios'
import router from 'vue-router'

axios.defaults.baseURL = 'http://localhost:8080/'
axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.token

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
      if (localStorage.token == null) {
        next({
          path: '/login',
          params: { nextUrl: to.fullPath }
        })
      } else {
        let user = JSON.parse(localStorage.user)
        if(to.matched.some(record => record.meta.is_admin)) {
          if(user.is_admin == 1){
            next()
          }
          else{
            next({ name: 'userboard'})
          }
        }else {
          next()
        }
      }
    } else if(to.matched.some(record => record.meta.guest)) {
      if(localStorage.token == null){
        next()
      }
      else{
        next({ name: 'userboard'})
      }
    }else {
      next() 
    }
  })