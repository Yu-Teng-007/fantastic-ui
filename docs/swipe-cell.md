# SwipeCell 滑动单元格

滑动单元格组件提供左右滑动操作功能，可以在元素两侧设置操作按钮，常用于列表项的快捷操作。

## 引入

```js
import { FancSwipeCell } from "fantastic-ui";

Vue.use(FancSwipeCell);
```

## 代码演示

### 基础用法

最简单的用法是在右侧设置一个删除按钮，可以通过左滑触发删除操作。点击单元格内容部分会自动关闭侧边栏。

```html
<fanc-swipe-cell right-width="70">
    <fanc-cell title="基础用法" content="向左滑动" />
    <template #right>
        <view class="delete-button">删除</view>
    </template>
</fanc-swipe-cell>
```

### 左右滑动

设置 `left-width` 和 `right-width` 属性后，可以在两侧都添加操作按钮。

```html
<fanc-swipe-cell left-width="80" right-width="140">
    <fanc-cell title="左右滑动" content="支持多个按钮" />
    <template #left>
        <view class="collect-button">收藏</view>
    </template>
    <template #right>
        <view class="edit-button">编辑</view>
        <view class="delete-button">删除</view>
    </template>
</fanc-swipe-cell>
```

### 自定义内容

滑动单元格的内容插槽可以放入任意内容，不局限于 Cell 组件。

```html
<fanc-swipe-cell right-width="70">
    <view class="custom-content">
        <image class="custom-image" src="/path/to/image.jpg"></image>
        <view class="custom-info">
            <text class="custom-title">自定义内容</text>
            <text class="custom-desc">这里可以放入任何自定义内容</text>
        </view>
    </view>
    <template #right>
        <view class="delete-button">删除</view>
    </template>
</fanc-swipe-cell>
```

### 禁用状态

通过 `disabled` 属性可以禁用滑动功能。

```html
<fanc-swipe-cell right-width="70" disabled>
    <fanc-cell title="禁用状态" content="无法滑动" />
    <template #right>
        <view class="delete-button">删除</view>
    </template>
</fanc-swipe-cell>
```

### 异步关闭

结合组件实例的 `close` 方法和按钮的点击事件，可以在执行异步操作后关闭侧边栏。

```html
<fanc-swipe-cell right-width="70" ref="asyncCell">
    <fanc-cell title="异步操作" content="点击删除触发" />
    <template #right>
        <view class="delete-button" @click="handleAsyncDelete">删除</view>
    </template>
</fanc-swipe-cell>
```

```javascript
export default {
    methods: {
        handleAsyncDelete() {
            // 显示加载提示
            uni.showLoading({ title: "删除中..." });

            // 模拟异步操作
            setTimeout(() => {
                uni.hideLoading();
                // 操作完成后关闭侧边栏
                this.$refs.asyncCell.close();
                uni.showToast({ title: "删除成功" });
            }, 1000);
        },
    },
};
```

### 监听事件

组件提供了 `open`、`close` 和 `click` 事件，可以用于实现更复杂的交互逻辑。

```html
<fanc-swipe-cell right-width="70" @open="onOpen" @close="onClose" @click="onClick">
    <fanc-cell title="事件监听" :content="content" />
    <template #right>
        <view class="delete-button">删除</view>
    </template>
</fanc-swipe-cell>
```

```javascript
export default {
    data() {
        return {
            content: "滑动触发事件",
        };
    },
    methods: {
        onOpen(event) {
            this.content = `已打开 ${event.position} 侧边栏`;
        },
        onClose() {
            this.content = "已关闭侧边栏";
        },
        onClick() {
            this.content = "点击了单元格";
        },
    },
};
```

### 自定义滑动阈值

通过 `threshold` 属性可以自定义触发侧边栏打开的滑动阈值比例，默认为 0.3，表示滑动超过宽度的 30% 时会自动打开。

```html
<fanc-swipe-cell right-width="70" :threshold="0.5">
    <fanc-cell title="滑动阈值" content="需要滑动超过50%才会触发" />
    <template #right>
        <view class="delete-button">删除</view>
    </template>
</fanc-swipe-cell>
```

## API

### Props

| 参数                | 说明                           | 类型      | 默认值  |
| ------------------- | ------------------------------ | --------- | ------- |
| disabled            | 是否禁用滑动功能               | `Boolean` | `false` |
| left-width          | 左侧滑动区域宽度               | `Number`  | `0`     |
| right-width         | 右侧滑动区域宽度               | `Number`  | `0`     |
| auto-close          | 点击时是否自动关闭侧边栏       | `Boolean` | `true`  |
| threshold           | 侧边栏打开的滑动阈值比例       | `Number`  | `0.3`   |
| disable-close-names | 禁止自动关闭菜单的点击事件名称 | `Array`   | `[]`    |

### Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 自定义显示内容 |
| left    | 左侧滑动内容   |
| right   | 右侧滑动内容   |

### Events

| 事件名 | 说明             | 回调参数                     |
| ------ | ---------------- | ---------------------------- |
| open   | 打开侧边栏时触发 | { position: 'left'/'right' } |
| close  | 关闭侧边栏时触发 | -                            |
| click  | 点击单元格时触发 | event: Event                 |

### 方法

通过 ref 可以获取到 SwipeCell 实例并调用实例方法。

| 方法名 | 说明       | 参数                     |
| ------ | ---------- | ------------------------ |
| open   | 打开侧边栏 | position: 'left'/'right' |
| close  | 关闭侧边栏 | -                        |

## 样式变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                             | 默认值               | 说明                 |
| -------------------------------- | -------------------- | -------------------- |
| --swipe-cell-content-bg          | var(--white)         | 内容区域背景色       |
| --swipe-cell-indicator-bg        | rgba(0, 0, 0, 0.1)   | 指示器背景色         |
| --swipe-cell-indicator-active-bg | rgba(0, 0, 0, 0.2)   | 激活状态指示器背景色 |
| --swipe-cell-delete-bg           | var(--danger-color)  | 删除按钮背景色       |
| --swipe-cell-edit-bg             | var(--primary-color) | 编辑按钮背景色       |
| --swipe-cell-collect-bg          | var(--warning-color) | 收藏按钮背景色       |
| --swipe-cell-text-color          | var(--white)         | 按钮文字颜色         |
| --swipe-cell-disabled-opacity    | 0.6                  | 禁用状态透明度       |
| --swipe-cell-transition-duration | 0.3s                 | 过渡动画持续时间     |
| --swipe-cell-button-font-size    | 14px                 | 按钮文字大小         |

## 常见问题

### 按钮样式怎么自定义？

您可以在插槽内添加自己的样式类，例如：

```html
<template #right>
    <view class="my-delete-button">删除</view>
</template>
```

```css
.my-delete-button {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 16px;
    background-color: #ff4d4f;
    color: white;
}
```

### 如何在按钮中添加图标？

可以在按钮内部使用图标组件：

```html
<template #right>
    <view class="my-button">
        <fanc-icon name="delete" />
        <text>删除</text>
    </view>
</template>
```
