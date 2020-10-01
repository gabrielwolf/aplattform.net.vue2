<template>
  <div>
    <button @click="fetchTrackMeta">Play</button>
    <div title="Artist" v-if="trackMeta != null">
      {{ trackMeta.artist }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

const state = Vue.observable({ trackMeta: 0 })

const trackMeta = {
  render(h) {
    return h('button', {
      on: { click: () => { state.trackMeta += 1 } },
    }, `trackMeta is: ${state.trackMeta}`)
  },
}

export default {
  computed: {
    ...mapGetters('player', ['trackMeta']),
  },
  methods: {
    ...mapMutations('player', ['fetchTrackMeta']),
  },
}

</script>
