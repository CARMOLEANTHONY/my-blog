// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './utils/elementUi/index'
import './fetch/index'
import './assets/common/index.sass'
import mixins from './mixins/index'
import './directives/highlight'
import './utils/vueQuillEditor'
import 'highlight.js/styles/googlecode.css'
import 'animate.css/animate.min.css'

Vue.mixin(mixins)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
