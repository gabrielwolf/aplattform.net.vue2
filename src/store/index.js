import Vue from 'vue'
import Vuex from 'vuex'
import toggleMachine from '@/FSM/toggleMachine'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentState: toggleMachine.initial,
  },
  mutations: {
    transition(state, action) {
      state.currentState = toggleMachine.transition(state.currentState, action).value
    },
  },
  actions: {},
  modules: {},
})
