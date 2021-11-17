'use strict'

const DefaultCardInfo = {
  basePosition: {x: 0, y: 0, z: 0},
  dimensions: { x: 4, y: 6, z: 0.1 },
  itemSpacingIn: 0.1,
  itemSpacingOut: -0.1,
  left: {
    basePosition: {x: 0, y: 0, z: 0},
    name: 'left-card',
    rotation: 0,
    color: 'eeffeef',
    in: {
      framesActive: true,
      greeting: {
        name: 'greeting',
        message: 'Happy Birthday!'
      },
      frames: {
        left: {
          name: 'left-in-left-frame',
          color: '55ff55'
        },
        right: {
          name: 'left-in-right-frame',
          color: 'ff5555'
        },
        top: {
          name: 'left-in-top-frame',
          color: '5555ff'
        },
        bottom: {
          name: 'left-in-bottom-frame',
          color: 'ff55ff'
        }
      },
      other: [],
      items: {}
    },
    out: {
      framesActive: true,
      frames: {
        left: {
          name: 'left-out-left-frame',
          color: '55ff55'
        },
        right: {
          name: 'left-out-right-frame',
          color: 'ff5555'
        },
        top: {
          name: 'left-out-top-frame',
          color: '5555ff'
        },
        bottom: {
          name: 'left-out-bottom-frame',
          color: 'ff55ff'
        }
      },
      other: [],
      items: {}
    }
  },
  right: {
    name: 'right-card',
    rotation: 0,
    color: 'eeffeef',
    in: {
      framesActive: true,
      frames: {
        left: {
          name: 'right-in-left-frame',
          color: '55ff55'
        },
        right: {
          name: 'right-in-right-frame',
          color: 'ff5555'
        },
        top: {
          name: 'right-in-top-frame',
          color: '5555ff'
        },
        bottom: {
          name: 'right-in-bottom-frame',
          color: 'ff55ff'
        },
      },
      claim: {
        message: {
          name: 'claim-message',
          message: 'Claim your tokens!',
        },
        button: {
          name: 'claim-button'
        },
        buttonText: {
          name: 'claim-button-text',
          message: 'Claim!'
        }
      },
      other: [],
      items: {}
    },
    out: {
      framesActive: true,
      frames: {
        left: {
          name: 'right-out-left-frame',
          color: '55ff55'
        },
        right: {
          name: 'right-out-right-frame',
          color: 'ff5555'
        },
        top: {
          name: 'right-out-top-frame',
          color: '5555ff'
        },
        bottom: {
          name: 'right-out-bottom-frame',
          color: 'ff55ff'
        }
      },
      other: [],
      items: {}
    }
  }
}

export default DefaultCardInfo
