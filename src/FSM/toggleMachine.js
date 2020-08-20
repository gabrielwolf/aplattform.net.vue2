import { Machine } from 'xstate'

export default Machine({
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
