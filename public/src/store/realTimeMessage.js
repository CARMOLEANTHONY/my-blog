import fetch from '../fetch'
import rootStore from './index'

const state = {
  resData: {}
}
const getters = {
  realTimeMessageList(state) {
    return state.resData.data ? state.resData.data.list : []
  }
}
const mutations = {
  setFetchParams(state, data) {
    state.resData = data
  }
}
const actions = {
  GET_MESSAGE: async ({
    commit
  }) => {

    let params = {
      uId: rootStore.getters.getUID
    }

    commit('setFetchParams', await fetch.get("/user/getMessage", {
      params
    }))
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
