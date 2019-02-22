// web animation api
'use strict'

import { assert } from '../helper'

export default {

  // every extension must have a play function
  play() {

    assert(typeof this._easing === 'string', `
      waap player only support string easing value for now.
      reference: https://www.w3schools.com/jsref/prop_style_transitiontimingfunction.asp.
    `)

    const keyframes = [
      {
        transformOrigin: this._transformOrigin,
        transform: `
          translate(${this._invert.x}px, ${this._invert.y}px) 
          scale(${this._invert.sx}, ${this._invert.sy})
        `,
        opacity: this._first.opacity
      },
      {
        transformOrigin: this._transformOrigin,
        transform: 'none',
        opacity: this._last.opacity
      }
    ]

    const opts = {
      delay: this._delay,
      duration: this._duration,
      easing: this._easing,
      fill: this._fill,
      direction: this._direction,
      iterationStart: this._iterationStart,
      iterations: this._iterations
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/animate
    // https://zhuanlan.zhihu.com/p/27867539
    const _animate = this._target.animate(keyframes, opts)

    _animate.onfinish = () => {
      this.cleanUpAndFire()
    }

    return _animate
  }
}