import Vue from 'vue'
import axios from 'axios'
import {
  Message
} from 'element-ui'
import Loading from '../utils/elementUi/loading'

let loading = new Loading()
let throttle = false

const fetch = axios.create({
  // baseURL: process.env.apiHost,
  timeout: 30000,
  withCredentials: true
})

fetch.interceptors.request.use(
  config => {
    if (throttle) return

    loading.open()

    throttle = true

    let url = config.url;
    let timeStamp = 'timestamp=' + new Date().getTime().toString();

    url = url.indexOf('?') > 0 ? url + '&' + timeStamp : url + '?' + timeStamp

    config.url = url;

    return config
  },
  err => {
    loading.close();
    throttle = false
    Message.error(err || '服务器异常')
  }
)

fetch.interceptors.response.use(
  res => {

    loading.close();
    throttle = false

    if (!res.data.success) {
      Message.error(res.data.message || '服务器异常')
    }

    return res
  },
  err => {
    Message.error(err || '服务器异常')
    loading.close();
    throttle = false
  }
)

Vue.prototype.$fetch = fetch
