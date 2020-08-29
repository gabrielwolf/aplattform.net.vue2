<template>
  <button @click="fetchTrackMeta">
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
    fetchTrackMeta() {
      this.$store.commit('player/init')
    },
  },
}

</script>
