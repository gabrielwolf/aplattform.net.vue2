import { Machine, interpret } from 'xstate'

const toggleMachine = Machine({
  id: 'toggle',
  initial: 'paused',
  states: {
    paused: {
      on: { TOGGLE: 'playing' },
    },
    playing: {
      on: { TOGGLE: 'paused' },
    },
  },
})

const service = interpret(toggleMachine).onTransition((state) => {
  console.log(state.value)
})

service.start()

export default {
  namespaced: true,
  state: {
    machineState: toggleMachine.initial,
  },
  mutations: {
    toggle(state) {
      state.machineState = service.send('TOGGLE')
    },
  },
  actions: {
  },
  getters: {
    isPlaying: (state) => state.machineState.value === 'playing',
  },
}
