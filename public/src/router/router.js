import {
  Message,
  Notification
} from 'element-ui'
import {
  sessionStorageGet,
  sessionStorageRemove,
  sessionStorageSet
} from '@/utils/index'
import store from '../store'

const getRealTimeMessage = (to, from, next) => {
  if (to.path == '/') return

  store.dispatch('GET_MESSAGE')

  if (to.path == '/messageList') return

  if (from.path == '/messageList' && to.path == '/articles/detail') return

  if (store.getters.realTimeMessageList.length > 0) {
    if (window.myNotify) return

    window.myNotify = Notification.info({
      message: '你有新的消息',
      position: 'bottom-right',
      duration: 2000,
      onClose() {
        window.myNotify = null
      },
      onClick() {

        window.myNotify.close()
        next('/messageList')
      }
    })
  }
}

const userInfoTimeout = (to, from, next) => {

  let cache = sessionStorageGet('userInfo')
  let now = Date.now()

  if (to.path == '/') {
    next()

    return
  }

  if (cache && now - cache.timeStamp > 3600000) {
    Message.warning('账号过期，请重新登录！')
    sessionStorageRemove('userInfo')
    sessionStorageSet('ERROR_MESSAGE', 'TIMEOUT')

    next({
      path: '/'
    })
  } else if (!cache) {
    Message.warning('请登录！')
    sessionStorageSet('ERROR_MESSAGE', 'NOLOGIN')

    next({
      path: '/'
    })
  } else {
    next()
  }
}

const routerHandler = (to, from, next) => {
  getRealTimeMessage(to, from, next)
  userInfoTimeout(to, from, next)
}

export default routerHandler
