import Vue from 'vue'
import Router from 'vue-router'
import MovieList from '@/components/MovieList'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect:'/signin'
    },
    {
      path: '/',
      redirect: '/signin'
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/movie',
      name: 'MovieList',
      component: MovieList,
      meta:{
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !currentUser) {
    next('signin')
  } else if (!requiresAuth && currentUser) {
    next('movie')
  } else {
    next()
  }
})
export default router
