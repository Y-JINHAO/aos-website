### 如何使用HTML和CSS一步一步创建一个完整的网站

网站包含导航、各种动画、悬停效果、滚动、一键回到顶部，还有切换亮暗主题。
用 localStorage 浏览器本地存储主题，确保切换主题后刷新网页不会改变主题。

网站素材说明在 Resource.md 文件中。

### AOS 页面滚动动画库的使用
> Github 地址：[AOS - Animate on scroll library](https://github.com/michalsnik/aos/tree/v2)
> [演示](后面用放到我博客里面的这个网站项目)

#### 1 安装

**基本的**

_在 html 文件的 <head> 标签中引入 AOS-CSS 文件_

```html
< link  rel =“ stylesheet ” href =“ https://unpkg.com/aos@next/dist/aos.css ” />
```

_在关闭</body>标签之前添加脚本，并初始化AOS_

```JavaScript
<script src="https://unpkg.com/aos@next/dist/aos.js"></script>
<script>
    AOS.init();
</script>
```

**包管理器**

_在项目根目录下安装 aos 包_

- `yarn add aos@next`
- `或者 npm install --save aos@next`

_导入脚本，样式并初始化AOS_

```JavaScript
import AOS from 'aos';
import 'aos/dist/aos.css'; // 也可以使用 <link> 引入样式
// ..
AOS.init();
```

为了 AOS 生效，必须确保在编写过程中配置了样式加载器，并正确绑定。

#### 2 页面中怎样使用

##### **2.1 初始化 AOS**

```JavaScript
AOS.init();

// 可以传一个可选的配置对象
// 下面列出了默认配置
AOS.init({
    // 全局配置:
    disable: false, // 禁用。可取值: 'phone'、'tablet'、'mobile'、布尔值、表达式或函数
    startEvent: 'DOMContentLoaded', // AOS 应初始化在 document 上绑定的事件名
    initClassName: 'aos-init', // 初始化后使用的 class 类
    animatedClassName: 'aos-animate', // 动画 class
    useClassNames: false, // 值为 true，将添加滚动 `data-aos` 内容为 class
    disableMutationObserver: false, // disables automatic mutations' detections (高级)
    debounceDelay: 50, // 调整窗口大小时使用的 (高级)
    throttleDelay: 99, // 滚动页面时使用的延迟 (高级)
  
    // 通过 'data-aos-*' 属性在每个元素上重写配置:
    offset: 120, // 从原始触发点的偏移量 (px)
    delay: 0, // 取值范围 0-3000, 每多 1 加 50ms
    duration: 400, // 取值范围 0-3000, 每多 1 加 50ms
    easing: 'ease', // AOS 动画默认 easing
    once: false, // 向下滑动时，动画只发生一次
    mirror: false, // 滚动到元素上方时是否应设置动画
    anchorPlacement: 'top-bottom', // 定义与窗口有关的元素的哪个位置应触发动画
});
```

##### **2.2 使用 data-aos 属性设置动画**

```html
<div data-aos="fade-in"></div>
```

使用 **data-aos-*** 来调整行为

```html
<div
    data-aos="fade-up"
    data-aos-offset="200"
    data-aos-delay="50"
    data-aos-duration="1000"
    data-aos-easing="ease-in-out"
    data-aos-mirror="true"
    data-aos-once="false"
    data-aos-anchor-placement="top-center">
</div>
```

<a href="#7 所有动画，easings 和锚点位置的完整列表">查看所有动画，easings 和锚点位置的完整列表</a>

> 注释：点击跳转有时需要按住 Ctrl

**锚点**
还有一个配置属性可以用，不过只能用在每个元素基础上

`data-aos-anchor - 元素的偏移量 offset 将用来触发动画，代替实际的`

举例：
```html
<div data-aos="fade-up" data-aos-anchor=".other-element"></div>
```
这样可以在滚动到另一元素时触发某一元素动画，对固定位置元素很有用。

#### 3 API 
三种方式使 AOS 对象成为全局变量：
- `init `- 初始化
- `refresh` - 重新计算元素的所有偏移量和位置（在窗口调整大小时调用）
- `refreshHard` - 使用 AOS 元素和触发器重新初始化数组 refresh（调用与 DOM 变化相关的 aos 元素）

#### 4 JS Events

元素在进行动画处理时，AOS 可以在文档上调度两个事件：**aos:in**` 和 `**aos:out** 用来实现一些额外的功能。

```javascript
document.addEventListener('aos:in', ({ detail }) => {
  console.log('animated in', detail);
});

document.addEventListener('aos:out', ({ detail }) => {
  console.log('animated out', detail);
});
```

也可以设置 **data-aos-id** 属性来告诉 AOS 触发自定义事件：

```html
<div data-aos="fade-in" data-aos-id="super-duper"></div>
```

此时可以监听两个自定义事件:

- `aos:in:super-duper`
- `aos:out:super-duper`

#### 5 其他方法

- **添加自定义动画**

  

  有时仅靠内置动画不能实现想要的功能，比如根据分辨率不同在一个盒子中需要两种不同的动画。这时就添加自定义动画，步骤如下，首先在 JS 中自定义动画：

  ```javascript
  [data-aos="new-animation"] {
    opacity: 0;
    transition-property: transform, opacity;
  
    &.aos-animate {
      opacity: 1;
    }
  
    @media screen and (min-width: 768px) {
      transform: translateX(100px);
  
      &.aos-animate {
        transform: translateX(0);
      }
    }
  }
  ```

  然后在 HTML 使用：

  ```html
  <div data-aos="new-animation"></div>
  ```

  该元素将只为移动设备上的 `opacity` 设置动画，但是从768px宽度开始，该元素也会从右向左滑动。

- **添加自定义 easing**

  与添加自定义动画类似：

  ```javascript
  [data-aos] {
    body[data-aos-easing="new-easing"] &,
    &[data-aos][data-aos-easing="new-easing"] {
      transition-timing-function: cubic-bezier(.250, .250, .750, .750);
    }
  }
  ```

- **自定义默认动画距离**

  内置动画的默认距离是100px，只要使用 SCSS 就可以重写默认距离：

  ```javascript
  $aos-distance: 200px; // It has to be above import
  @import 'node_modules/aos/src/sass/aos.scss';
  ```

  必须配置构建过程以允许其 `node_modules` 预先导入样式。

- **集成外部 CSS 动画库（例如 Animation.css）**

  使用 `animatedClassName` 改变 AOS 默认行为，将放置在 **data-aos** 中的 class 类名在页面滚动时生效。

  ```html
  <div data-aos="fadeInUp"></div>
  ```

  ```javascript
  AOS.init({
    useClassNames: true,
    initClassName: false,
    animatedClassName: 'animated',
  });
  ```

  上面的元素将获得两个类：`animated `和 `fadeInUp`。使用以上三个设置的不同搭配方式，能够集成任何外部 CSS 动画库。外部库在实际动画之前并不太在意动画状态，因此，若想这些元素在滚动前不可见，需要添加下面这样的样式：

  ```css
  [data-aos] {
    visibility: hidden;
  }
  [data-aos].animated {
    visibility: visible;
  }
  ```

#### 6 注意事项

**设置：`duration`, `delay`**

编写简单的 CSS 来增加另一个持续时间，如：

```javascript
 body[data-aos-duration='4000'] [data-aos],
  [data-aos][data-aos][data-aos-duration='4000'] {
    transition-duration: 4000ms;
 }
```

此代码将添加 4000ms 的 `duration` 时间，可供在 AOS 元素上设置，或在初始化 AOS 脚本时设置为全局 `duration` 时间。

注意 `[data-aos][data-aos]` 不是语法错误，而是一个技巧，可以使单个配置比全局配置更重要，这样就不需要标明 "!important"。

用法示例：

```ht
<div data-aos="fade-in" data-aos-duration="4000"></div>
```

#### 7 所有动画，easings 和锚点位置的完整列表

- 动画：
    - 淡入淡出动画
        - fade
        - fade-up
        - fade-down       
        - fade-left
        - fade-right
        - fade-up-right
        - fade-up-left
        - fade-down-right
        - fade-down-left
    - 翻转动画
        - flip-up
        - flip-down
        - flip-left    
        - flip-right
    - 滑动动画
        - slide-up
        - slide-do- wn
        - slide-left
        - slide-right
    - 缩放动画
        - zoom-in
        - zoom-in-up
        - zoom-in-down
        - zoom-in-left
        - zoom-in-right
        - zoom-out
        - zoom-out-up
        - zoom-out-down
        - zoom-out-left
        - zoom-out-right
- 锚点位置：
    - top-bottom
    - top-center
    - top-top
    - center-bottom
    - center-center
    - center-top
    - bottom-bottom
    - bottom-center
    - bottom-top
- easing 函数：
    - linear
    - ease
    - ease-in
    - ease-out
    - ease-in-out
    - ease-in-back
    - ease-out-back
    - ease-in-out-back
    - ease-in-sine
    - ease-out-sine
    - ease-in-out-sine
    - ease-in-quad
    - ease-out-quad
    - ease-in-out-quad
    - ease-in-cubic
    - ease-out-cubic
    - ease-in-out-cubic
    - ease-in-quart
    - ease-out-quart
    - ease-in-out-quart

