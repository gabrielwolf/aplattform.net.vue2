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
import toggleMachine from '@/FSM/toggleMachine'

export default {
  setup() {
    const { state, send } = useMachine(toggleMachine)
    return {
      state,
      send,
    }
  },
}
</script>
