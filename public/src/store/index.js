import Vue from 'vue'
import Vuex from 'vuex'
import { sessionStorageGet} from '../utils/index'

const state = {
  userInfo: sessionStorageGet('userInfo')
}
const getters = {}
const mutations = {
  setUserInfo(state, data) {
    state.userInfo = data
  }
}
const actions = {}
const modules = {}

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules
})
