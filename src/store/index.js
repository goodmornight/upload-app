import Vue from 'vue'
import Vuex from 'vuex'
import { Toast } from 'vant'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    serverIP:''
  },
  mutations: {
    SET_SERVER_IP(state, newIP) {
      state.serverIP = newIP
    },
  },
  actions: {
    setServerIP({ commit }, newIP) {
      commit('SET_SERVER_IP', newIP)
      saveState('server-ip', newIP)
      Toast.success('Success!')
    },
  },
  modules: {
  }
})

function saveState(key, state) {
  window.localStorage.setItem(key, state)
}