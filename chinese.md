# mini-flip

> 这是学习 FLIP 动画技术的一个很好的方式！源于 Google 一个停止维护的库 ，遗憾的是已经被扔进了冻结名单，并且不能跑起来了。

中文 | [English](./README.md)

## FLIP

对于 FLIP 技术就不再赘述。感兴趣童鞋可以阅读以下文章：

[1. CSS3 transition动画的FLIP动画学习，反转动画来解决动画的卡顿，闪烁。](http://www.webfront-js.com/articaldetail/98.html)</br>
[2. FLIP Your Animations](https://aerotwist.com/blog/flip-your-animations/)</br>
[3. FLIP技术给Web布局带来的变化](https://www.w3cplus.com/javascript/animating-layouts-with-the-flip-technique.html/)</br>
[4. 让动画变得更简单之FLIP技术](https://juejin.im/post/5c5258ffe51d45299a08e012)</br>

## mini-flip

希望通过最简单明了的 API 和使用方式，能够轻松上手 FLIP 动画！

### API

核心 API 非常的简单，首先需要实例化。

```js
const flip = new Flip(config)
```

1. flip.play()

记录当前的位置信息，通过 getBoundingClientRect()。

> getBoundingClientRect 会强制刷新浏览器的队列去做布局计算，引发重排重绘，但是其性能损耗我们不必纠结。

2. flip.last(lastClassName)

记录结束位置的信息，也是通过 getBoundingClientRect().

> 这里也可以不用传 class，只要是目标元素产生了布局变化直接调用 `flip.last()` 也行

3. flip.invert()

记录变化，主要是 x 轴向的和 y 轴向的还有缩放比列、透明度差等。

4. flip.play()

让目标元素由假定的初始位置向最后的位置移动，具体的动画执行由一些简单的、内置的动画渲染引擎提供。

5. flip.snapshot(lastClassName)

等同于执行 `flip.first().last().invert()`

👇 是一些静态方法，需要由 Flip 调用。

6. Flip.version 获取版本号

7. Flip.extends(name, player) 自定义动画渲染拓展

8. Flip.player 获取所有的动画引擎

⚠️ 可以链式调用：`flip.first().last().invert()`

⚠️ `first() last() invert() play()`有顺序要求，毕竟叫做 FLIP

### 如何自定义动画渲染引擎

很简单，只需要如下步骤：

1. 创建一个对象，包含一个 play 函数。

```js
// a.js
export default {
  play() {

  }
}
```

2. 该对象的在你使用注册函数 Flip.extends('raf', RAF) 的时候会绑定 flip 实例到 this。

```js
// a.js
export default {
  play() {
    console.log(this);
    // 输出：
    // _duration: 300, _delay: 0, _invert: {x: 34, y: 45, ...}
    // 你可以使用这些数据完成你的动画，可以参考 built-in 文件夹中的方式。

    // 比如：
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

3. 在使用之前务必先注册你的动画渲染器

```js
import A from 'a'
Flip.extends('A', A)
```

4. 然后实例化的时候告诉 mini-flip 你要使用自己的动画渲染器而不是内置的

```js
const flip = new Flip({
  customPlay: 'A' //如果要使用自己的渲染器 customPlay 这个字段是必须传的，而且值必须等于你注册时候的名字 ‘A’
})

// 然后，㊗️愉快！
```

### demo

在 demo 文件夹中有一些案例，我会不断补充。

在线 demo 列表：

[1. 预览]()

### todo

- [ ] 加入私有属性和私有方法
- [ ] 增加物理动画引擎
- [ ] React 和 mini-flip 的结合
