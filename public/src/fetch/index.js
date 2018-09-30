import Vue from 'vue'
import router from '../router/index'
import {
  localStorageGet,
  localStorageRemove
} from '../utils'
import axios from 'axios'
import {
  Loading,
  Message
} from 'element-ui'

let loading = null

const fetch = axios.create({
  // baseURL: process.env.apiHost,
  timeout: 30000,
  withCredentials: true
})

fetch.interceptors.request.use(
  config => {
    loading = Loading.service({
      lock: true,
      background: 'rgba(0, 0, 0, 0.7)'
    })

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

    if (!res.data.success) {
      Message.error(res.data.message || '服务器异常')
    }

    return res
  },
  err => {
    console.log(err)
    Message.error(err || '服务器异常')
    loading.close();
  }
)

// fetch.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

Vue.prototype.$fetch = fetch
