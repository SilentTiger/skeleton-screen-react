[English](./README.MD)

想进一步了解设计思路相关信息，可以阅读 [Instruction](docs/Instruction.zh-cn.md) 文档。

# 简介

### skeleton-screen-react 是一个轻量且功能强大的骨架屏组件，它基于 React 实现。

![demo](./docs/assets/default_capture.gif)

### [Demo](https://silenttiger.online/skeleton-screen-react/)

# 背景

市面上已经有了一些骨架屏实现方案，但他们或多或少有些问题：

1. 骨架屏中的元素不能实现全局连续动画

   这是最常见的问题，你会发现骨架屏中显示动画效果的那些元素，是分别执行各自的动画效果，看起来就不那么优雅。

2. 只能显示简单的统一颜色变化效果

   为了避免暴露问题 1，有些骨架屏方案选择只能让所有动画元素一起执行一个统一的色彩或透明度变化效果，而无法实现色彩线性渐变流转的效果。

3. 使用门槛

   为了彻底解决上面的两个问题，有些骨架屏方案选择用 svg 来实现，但这样无疑会使得骨架屏组件的使用门槛变高。

skeleton-screen-react 就是为解决这些问题而生！

# 示例

skeleton-screen-react 使用非常灵活，你可以用很简单的代码来实现一个普通的骨架屏效果

![demo default](./docs/assets/default_capture.gif)

或者把产品名称之类的文字作为骨架屏的占位符，像这样

![demo text](./docs/assets/text_capture.gif)

甚至，如果确实需要的话，你还可以用设计师提供的 SVG 版的产品 Logo 来作为骨架屏的占位符

![demo svg](./docs/assets/svg_capture.gif)

# 如何使用

### 初步上手

首先在你的项目中添加对 Laser Pen 的依赖：

```shell
yarn add skeleton-screen-react
```

或者

```shell
npm i skeleton-screen-react
```

接下来在代码中引入 skeleton 组件和它的样式文件

```typescript
import { Skeleton } from "skeleton-screen-react";
import "skeleton-screen-react/dist/styles/skeleton.css";
```

再然后，在页面上加载 Skeleton 组件，并设置好相应的属性

```typescript

<Skeleton
  maskColor='#fff'
  animationColorBackground='#fafafa'
  animationColorHighlight='#ebebeb'
  >
  {(color: string) => {
      // skeleton placeholder elements
      return (
         <div style={{ position: 'relative', width: '100%', height: '100%', textAlign: 'center', fontSize: '20px', color }}>
            skeleton-screen-react<br/>Silent Tiger
         </div>
      );
  }}
</Skeleton>
```

这样，你就得到了一个以文本 “skeleton-screen-react Silent Tiger” 为占位符的骨架屏效果。

### 参数配置
|Property                  |Type                           |Required|Description|
|---                       |---                            |---     |---        |
|maskColor                 |string                         |Y       |遮罩部分的颜色|
|animationColorBackground  |string                         |Y       |动画效果中的背景色|
|animationColorHighlight   |string                         |Y       |动画效果中高亮的颜色|
|children                  |(color: string) => ReactElement|Y       |返回骨架屏动画元素的函数|
|wrapperStyle              |CSSProperties                  |        |骨架屏组件外层容器自定义样式|
|backgroundStyle           |CSSProperties                  |        |骨架屏背景动画自定义样式|
|isDarkMode                |boolean                        |        |黑暗模式|
|className                 |string                         |        |骨架屏组件外层容器自定义 class name|

skeleton-screen-react 的实现方式类似于在一个有着渐变动画效果的背景上覆盖了一层由用户自行定义结构的蒙板，通过 ```maskColor```、```animationColorBackground```、```animationColorHighlight``` 三个属性就可以基本确定骨架屏的整体色彩效果，如下图所示

![layout](./docs/assets/layout.png)

而 ```children``` 函数则定义了“蒙板”的结构，需要注意的是，```children``` 函数接收了一个 ```color``` 参数，只需把这个参数赋值给需要“镂空”区域的元素的颜色属性即可，如果镂空的区域是一个矩形区域，则可以把 ```color``` 参数赋值给一个 div 的 ```background-color``` 样式属性，如果需要镂空的部分是文字，则可以把 ```color``` 参数赋值给文字的 ```color``` 样式属性，以此类推。

这里要特别提一下 ```isDarkMode``` 属性，当 ```animationColorBackground``` 所指定的颜色比 ```maskColor``` 更浅的时候，记得把 ```isDarkMode``` 标记为 ```true```，否则你可能会在镂空区域的边缘看到一些毛刺，这个属性在你的页面处于黑暗模式的时候可能会很有用。

你可以在这个 [Storybook](https://silenttiger.online/skeleton-screen-react/) 页面尝试各种属性的效果。

### 定制化开发
skeleton-screen-react 提供了尽可能灵活的定制能力，如果 skeleton-screen-react 默认的动画效果不能满足你的要求，你可以通过```backgroundStyle```属性个性化地修改动画效果，如果 skeleton-screen-react 组件在页面中布局时有特殊需求，也可以通过```wrapperStyle```属性进行设置，而且，你还可以通过```className```属性再更大范围内修改 skeleton-screen-react 的样式或区分不同类型的 Skeleton。

另外，你还可以通过覆盖 skeleton-screen-react 提供的 css 样式文件来进行更彻底和深入的样式定制开发。

Have fun!

# License

MIT
