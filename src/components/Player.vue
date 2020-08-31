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

export default {
  computed: {
    ...mapGetters('player', ['trackMeta']),
  },
  methods: {
    ...mapMutations('player', ['fetchTrackMeta']),
  },
}

</script>
