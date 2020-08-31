import ambisonicsMachine from '@/FSM/ambisonicsMachine'
import { interpret } from 'xstate'

const service = interpret(ambisonicsMachine)
  .onTransition((state) => {
    console.log(state.value)
  })

service.start()
service.send('FETCH_TRACK_META') // Demand the very first track

export default {
  namespaced: true,
  state: {
    machineState: ambisonicsMachine.initialState,
  },
  mutations: {
    fetchTrackMeta(state) {
      state.machineState = service.send('FETCH_TRACK_META')
    },
  },
  actions: {},
  getters: {
    trackMeta: (state) => state.machineState.context.trackMeta,
  },
}
