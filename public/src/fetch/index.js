import Vue from 'vue'
import axios from 'axios'
import {
  Message
} from 'element-ui'
import Loading from '../utils/elementUi/loading'
import {
  sessionStorageRemove,
  sessionStorageGet,
  sessionStorageSet
} from '../utils/index'
import router from '../router/index'

let loading = new Loading()

// 页面在下面时间内没有数据请求，则重新登录
const TIMEOUT = 3600000

const fetch = axios.create({
  // baseURL: process.env.apiHost,
  timeout: 30000,
  withCredentials: true
})

fetch.interceptors.request.use(
  config => {

    let cache = sessionStorageGet('userInfo')
    let now = Date.now()

    if (router.currentRoute.path != '/') {
      if (cache && now - cache.timeStamp > TIMEOUT) {
        Message.warning('账号过期，请重新登录！')

        sessionStorageRemove('userInfo')
        sessionStorageSet('ERROR_MESSAGE', 'TIMEOUT')

        router.push('/')

      } else if (!cache) {
        Message.warning('请登录！')

        sessionStorageSet('ERROR_MESSAGE', 'NOLOGIN')

        router.push('/')
      }
    }

    loading.open()

    let url = config.url;
    let timeStamp = 'timestamp=' + new Date().getTime().toString();

    url = url.indexOf('?') > 0 ? url + '&' + timeStamp : url + '?' + timeStamp

    config.url = url;

    return config
  },
  err => {
    loading.close();
    Message.error(err || '服务器异常')
  }
)

fetch.interceptors.response.use(
  res => {

    loading.close();

    if (router.currentRoute.path != '/') {
      let cache = sessionStorageGet('userInfo')

      cache.timeStamp = Date.now()
      sessionStorageSet('userInfo', cache)
    }

    if (!res.data.success) {
      Message.error(res.data.message || '服务器异常')
    }

    return res
  },
  err => {
    Message.error(err || '服务器异常')
    loading.close();
  }
)

Vue.prototype.$fetch = fetch

export default fetch
