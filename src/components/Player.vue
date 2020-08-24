<template>
  <button @click="toggle">
    {{ isPlaying ? 'Pause' : 'Play' }}
  </button>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('player', ['isPlaying']),
  },
  methods: {
    toggle() {
      this.$store.commit('player/toggle')
    },
  },
}

</script>
