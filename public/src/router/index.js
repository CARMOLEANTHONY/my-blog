import Vue from 'vue'
import Router from 'vue-router'
import {
  Message
} from 'element-ui'
import {
  localStorageGet,
  localStorageRemove
} from '@/utils/index'

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      name: 'login',
      component: () =>
        import('@/components/pages/login.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () =>
        import('@/components/pages/home.vue')
    },
    {
      path: '/articles',
      redirect: '/articles/detail',
      name: 'articles'
    },
    {
      path: '/articles/detail',
      name: 'articleDetail',
      component: () =>
        import('@/components/pages/article/detail.vue')
    },
    {
      path: '/articles/add',
      name: 'articleAdd',
      component: () =>
        import('@/components/pages/article/add.vue')
    }
  ]
})


router.beforeEach((to, from, next) => {
  let cache = localStorageGet('userName')

  let now = Date.now()

  if(to.path == '/') {
    next()

    return 
  }

  if (cache && now - cache.timeStamp > 3600000) {
    Message.warning('账号过期，请重新登录！')
    localStorageRemove('userName')

    next({
      path: '/'
    })
  } else if (!cache) {
    Message.warning('请登录！')

    next({
      path: '/'
    })
  } else {
    next()
  }
})

export default router
