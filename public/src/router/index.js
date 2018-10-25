import Vue from 'vue'
import Router from 'vue-router'
import routerHandler from './router'

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
      redirect: '/articles/list',
      component: () =>
        import('@/components/pages/home.vue'),
      children: [{
          path: '/articles/list',
          name: 'articlesList',
          component: () =>
            import('@/components/pages/article/list.vue'),
        },
        {
          path: '/articles/detail',
          name: 'articleDetail',
          component: () =>
            import('@/components/pages/article/detail.vue')
        },
        {
          path: '/articles/edit',
          name: 'articleEdit',
          component: () =>
            import('@/components/pages/article/edit.vue')
        },
        {
          path: '/messageList',
          name: 'messageList',
          component: () =>
            import('@/components/pages/messageList.vue')
        }
      ]
    },
  ]
})


router.beforeEach(routerHandler)

export default router
