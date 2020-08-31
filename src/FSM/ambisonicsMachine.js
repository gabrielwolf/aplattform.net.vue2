import { assign, Machine } from 'xstate'

const fetchTrackMeta = () => fetch('http://127.0.0.1:5000/')
  .then((response) => response.json())

export default Machine({
  id: 'ambisonicsPlayer',
  initial: 'idle',
  context: {
    trackMeta: null,
    track: null,
    metaRetries: 0,
    trackRetries: 0,
  },
  states: {
    idle: {
      on: {
        FETCH_TRACK_META: 'loading',
      },
    },
    loading: {
      invoke: {
        id: 'fetchTrackMeta',
        src: fetchTrackMeta,
        onDone: {
          target: 'trackMetaLoaded',
          actions: assign({
            trackMeta: (context, event) => event.data,
          }),
        },
        onError: 'failure',
      },
    },
    failure: {
      on: {
        RETRY: {
          target: 'loading',
          actions:
            assign({
              metaRetries: (context) => context.metaRetries + 1,
            }),
        },
      },
    },
    trackMetaLoaded: {},
  },
})
