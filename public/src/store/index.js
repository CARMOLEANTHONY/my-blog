import Vue from 'vue'
import Vuex from 'vuex'
import {
  sessionStorageGet
} from '../utils/index'

import realTimeMessage from './realTimeMessage'

const state = {
  userInfo: sessionStorageGet('userInfo'),
  updateCommentList: false,
  submitCommentIndex: null
}
const getters = {
  getUID(state) {
    return state.userInfo ? state.userInfo.userInfo.id : null
  },
  getUName(state) {
    return state.userInfo ? state.userInfo.userInfo.name : null
  }
}
const mutations = {
  setUserInfo(state, data) {
    state.userInfo = data
  },
  setUpdateCommentListStatus(state, data) {
    state.updateCommentList = data
  },
  setSubmitCommentIndex(state, data) {
    state.submitCommentIndex = data
  }
}
const actions = {}
const modules = {
  realTimeMessage
}

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules
})
