import { assign, interpret, Machine } from 'xstate'

// const fetchTrackMeta = (trackId) => fetch(`url/to/track/${trackId}`)
//   .then((response) => response.json())

const ambisonicsMachine = Machine({
  id: 'ambisonicsPlayer',
  initial: 'idle',
  context: {
    trackMeta: null,
    track: null,
    metaRetries: 0,
    trackRetries: 0,
  },
  on: {
    RESET: {
      target: 'idle',
      actions: assign(() => ({
        trackMeta: null,
        track: null,
        metaRetries: 0,
        trackRetries: 0,
      })),
    },
  },
  states: {
    idle: {
      on: {
        FETCH_TRACK_META: 'loading',
      },
    },
    loading: {
      entry: 'showSpinner',
      exit: 'hideSpinner',
      on: {
        REJECT: 'failure',
        RESOLVE: 'trackMetaLoaded',
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
    trackMetaLoaded: {
      entry: 'updateMeta',
      exit: 'clearMeta',
      initial: 'idle',
      states: {
        idle: {
          on: {
            INITIALIZE_AMBISONICS: {
              target: 'audioWired',
              actions: 'init',
            },
          },
        },
        audioWired: {
          on: {
            LOAD_TRACK: {
              target: 'loading',
              actions: 'load',
            },
          },
        },
        loading: {
          entry: 'showDownloadProgress',
          exit: 'hideDownloadProgress',
          on: {
            REJECT: 'failure',
            RESOLVE: 'trackReady',
          },
        },
        failure: {
          on: {
            RETRY: {
              target: 'loading',
              actions:
                assign({
                  trackRetries: (context) => context.trackRetries + 1,
                }),
            },
          },
        },
        trackReady: {
          type: 'parallel',
          states: {
            playback: {
              initial: 'paused',
              states: {
                paused: {
                  on: {
                    PLAY: {
                      target: 'playing',
                      actions:
                        'playFrom(0)',
                    },
                    PLAY_FROM: {
                      target: 'playing',
                      actions:
                        'playFrom(position)',
                    },
                  },
                },
                playing: {
                  on: {
                    TIMING: {
                      target: 'playing',
                      actions: 'getElapsed',
                    },
                    PAUSE: 'paused',
                    PLAY_FROM: {
                      target: 'playing',
                      actions: 'playFrom(position)',
                    },
                    END: 'ended',
                  },
                },
                ended: {
                  on: {
                    PLAY: {
                      target: 'playing',
                      actions: 'playFrom(0)',
                    },
                    PLAY_FROM: {
                      target: 'playing',
                      actions: 'playFrom(position)',
                    },
                  },
                },
              },
            },
            looping: {
              initial: 'terminated',
              states: {
                terminated: {
                  on: {
                    SWITCH: {
                      target: 'looped',
                      actions: 'setLooping',
                    },
                  },
                },
                looped: {
                  on: {
                    SWITCH: {
                      target: 'terminated',
                      actions: 'setLooping',
                    },
                  },
                },
              },
            },
            gain: {
              entry: 'setGain',
              on: {
                GAIN: {
                  target: 'gain',
                  actions:
                    'setGain',
                },
              },
            },
            rotation: {
              entry: 'setRotation',
              on: {
                ROTATE: {
                  target: 'rotation',
                  actions: 'setRotation',
                },
              },
            },
          },
        },
      },
    },
  },
})

const service = interpret(ambisonicsMachine)
  .onTransition((state) => {
    console.log(state.value)
  })

service.start()

export default {
  namespaced: true,
  state: {
    machineState: ambisonicsMachine.initial,
  },
  mutations: {
    init(state) {
      state.machineState = service.send('FETCH_TRACK_META')
    },
  },
  actions: {},
  getters: {
    isPlaying: (state) => state.machineState.value === 'playing'
    ,
  },
}
