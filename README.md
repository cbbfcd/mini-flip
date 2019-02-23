# mini-flip

> This is a great way to learn FLIP animation technology! 
> It stems from Google's stop-and-maintain library, unfortunately it has been thrown into the frozen list and can't run.

[中文](./chinese.md) | English

## FLIP

The FLIP technology will not be described again. If you are interested, you can read the following article：

[1. CSS3 transition动画的FLIP动画学习，反转动画来解决动画的卡顿，闪烁。](http://www.webfront-js.com/articaldetail/98.html)</br>
[2. FLIP Your Animations](https://aerotwist.com/blog/flip-your-animations/)</br>
[3. FLIP技术给Web布局带来的变化](https://www.w3cplus.com/javascript/animating-layouts-with-the-flip-technique.html/)</br>
[4. 让动画变得更简单之FLIP技术](https://juejin.im/post/5c5258ffe51d45299a08e012)</br>

## mini-flip

I hope that with the simplest and clearest API and how to use it, I can easily get started with FLIP animation!

### API

The core API is very simple and needs to be instantiated first.

```js
import Flip from 'mini-flip'

const flip = new Flip(config)
```

1. flip.play()

Record the current location information via getBoundingClientRect().

> getBoundingClientRect will force the browser's queue to be refreshed for layout calculations,
> causing rearrangement redrawing, but we don't have to worry about performance loss.

2. flip.last(lastClassName)

The information at the end of the record is also passed to getBoundingClientRect().

> You can also pass the class here, as long as the target element has a layout change, call `flip.last()` directly.

3. flip.invert()

Record changes, mainly x-axis and y-axis, as well as scaling ratio, poor transparency, etc.

4. flip.play()

Let the target element move from the assumed initial position to the last position. The specific animation execution is provided by some simple, built-in animation rendering engines.

5. flip.snapshot(lastClassName)

Equivalent to execution`flip.first().last().invert()`

👇 is some static method that needs to be called by Flip。

6. Flip.version 

get version

7. Flip.extends(name, player)

Custom animation rendering extension

8. Flip.player 

Get all the animation engines

⚠️ Can be chained：`flip.first().last().invert()`

⚠️ `first() last() invert() play()` Must be called in order

### How to customize the animation rendering engine

Very simple, just the following steps：

1. To create an object, you must include a play function.

```js
// a.js
export default {
  play() {

  }
}
```

2. The object will bind the flip instance to this when you use the registration function Flip.extends('raf', RAF).

```js
// a.js
export default {
  play() {
    console.log(this);
    // output：
    // _duration: 300, _delay: 0, _invert: {x: 34, y: 45, ...}
    // reference file in built-in folder

    // eg：
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
        easing: this._easing
      }

      const _animate = this._target.animate(keyframes, opts)
    }
}
```

3. Be sure to register your animation renderer before using it.

```js
import A from 'a'
Flip.extends('A', A)
```

4. Then when instantiating, tell mini-flip that you want to use your own animated renderer instead of the built-in

```js
const flip = new Flip({
  //If you want to use your own renderer customPlay this field must be passed, and the value must be equal to the name you registered when ‘A’
  customPlay: 'A' 
})

// then，be happy！
```

### demo

There are some cases in the demo folder, I will continue to add.

online demo list：

[1. preview demo](https://codesandbox.io/s/8y2l40km7l)

### todo

- [ ] Distinguish private attributes, maybe use '#' is great way or ts?
- [ ] Add physics animation engine
- [ ] With React
