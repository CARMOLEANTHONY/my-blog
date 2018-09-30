import Vue from 'vue'
import Vuex from 'vuex'

const state = {
  userInfo: null
}
const getters = {}
const mutations = {
  setUserInfo(state, data) {
    state.setuserInfo = data
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
