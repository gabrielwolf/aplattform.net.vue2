<template>
  <button @click="send('TOGGLE')">
    {{
      state.value === 'paused'
        ? 'Paused'
        : 'Playing'
    }}
  </button>
</template>

<script>
import { useMachine } from '@xstate/vue'
import { Machine } from 'xstate'

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

export default {
  setup() {
    const { state, send } = useMachine(toggleMachine)
    return {
      state,
      send,
    }
  }
  ,
}
</script>
