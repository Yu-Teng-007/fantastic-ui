# Swipe 轮播组件

Swipe 组件用于循环播放一组图片或内容，常用于广告轮播、产品展示等场景。

## 基础用法

```html
<fanc-swipe :list="list" />
```

```javascript
export default {
  data() {
    return {
      list: [
        {
          image: 'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg',
        },
        {
          image: 'https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989_1280.jpg',
        },
        {
          image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
          title: '春日花树',
        },
        {
          image: 'https://cdn.pixabay.com/photo/2017/02/01/22/02/mountain-landscape-2031539_1280.jpg',
          title: '山脉风景',
        },
      ],
    };
  },
};
```

## 自动轮播

通过 `autoplay` 属性设置是否自动轮播，通过 `interval` 设置轮播间隔（单位为毫秒）。

```html
<fanc-swipe :list="list" :autoplay="true" :interval="3000" />
```

## 垂直轮播

通过 `vertical` 属性设置垂直方向轮播。垂直模式下，指示器会显示在右侧，上下页按钮会显示在顶部和底部。

```html
<fanc-swipe :list="list" vertical :height="200" />
```

## 显示指示器

通过 `show-indicator` 属性设置是否显示指示器。

```html
<fanc-swipe :list="list" :show-indicator="true" />
```

## 自定义指示器样式

通过 `indicator-color` 和 `indicator-active-color` 属性自定义指示器样式。

```html
<fanc-swipe 
  :list="list" 
  :indicator-color="'rgba(0, 123, 255, 0.3)'" 
  :indicator-active-color="'var(--fanc-primary-color)'" 
/>
```

## 显示上下页切换按钮

通过 `show-nav-buttons` 属性设置是否显示上下页切换按钮。

```html
<fanc-swipe :list="list" :show-nav-buttons="true" />
```

## 卡片风格

通过 `previous-margin` 和 `next-margin` 属性设置卡片风格的轮播。

```html
<fanc-swipe :list="list" :previous-margin="'10px'" :next-margin="'10px'" />
```

## 轮播项标题

通过 `list` 属性传入带有标题的数据，并设置 `show-title` 为 `true` 显示标题。

```html
<fanc-swipe :list="items" :show-title="true" />
```

```javascript
export default {
  data() {
    return {
      items: [
        {
          image: 'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg',
          title: '自然风景',
        },
        {
          image: 'https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989_1280.jpg',
          title: '海洋风光',
        },
        {
          image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
          title: '春日花树',
        },
        {
          image: 'https://cdn.pixabay.com/photo/2017/02/01/22/02/mountain-landscape-2031539_1280.jpg',
          title: '山脉风景',
        },
      ],
    };
  },
};
```

## 自定义轮播内容

通过默认插槽自定义轮播项的内容。

```html
<fanc-swipe :list="customSlides" :height="150">
  <template v-slot="{ item }">
    <view class="custom-slide" :style="{ backgroundColor: item.color }">
      <text class="custom-slide-text">{{ item.text }}</text>
    </view>
  </template>
</fanc-swipe>
```

```javascript
export default {
  data() {
    return {
      customSlides: [
        { color: "#007bff", text: "自定义内容 1" },
        { color: "#28a745", text: "自定义内容 2" },
        { color: "#dc3545", text: "自定义内容 3" },
        { color: "#ffc107", text: "自定义内容 4" },
      ],
    };
  },
};
```

## 受控轮播

通过 ref 获取组件实例，调用实例方法。

```html
<fanc-swipe ref="swipe" :list="list" :autoplay="false" />
<view class="swipe-controls">
  <fanc-button size="small" type="primary" @click="prevSlide">上一张</fanc-button>
  <fanc-button size="small" type="primary" @click="nextSlide">下一张</fanc-button>
</view>
```

```javascript
export default {
  methods: {
    prevSlide() {
      this.$refs.swipe.prev();
    },
    nextSlide() {
      this.$refs.swipe.next();
    },
  },
};
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| list | 轮播项数组，格式为 `[{ image: 'url', title: '标题', ... }]` | _array_ | `[]` |
| autoplay | 是否自动播放 | _boolean_ | `true` |
| interval | 自动播放间隔时间（毫秒） | _number_ | `3000` |
| duration | 切换动画时长（毫秒） | _number_ | `500` |
| circular | 是否循环播放 | _boolean_ | `true` |
| vertical | 是否垂直方向播放 | _boolean_ | `false` |
| show-indicator | 是否显示指示器 | _boolean_ | `true` |
| custom-indicator | 使用自定义指示器样式 | _boolean_ | `true` |
| indicator-color | 指示器颜色 | _string_ | `rgba(255, 255, 255, 0.6)` |
| indicator-active-color | 当前指示器颜色 | _string_ | `#ffffff` |
| show-title | 是否显示标题 | _boolean_ | `false` |
| height | 轮播高度，单位为px | _number \| string_ | `200` |
| image-mode | 图片裁剪、缩放模式 | _string_ | `aspectFill` |
| previous-margin | 前边距，单位px | _string_ | `0px` |
| next-margin | 后边距，单位px | _string_ | `0px` |
| initial-index | 初始显示的轮播索引 | _number_ | `0` |
| show-nav-buttons | 是否显示上下页切换按钮 | _boolean_ | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 当前轮播项变化时触发 | `{ index: number, item: object }` |
| click | 点击轮播项时触发 | `{ index: number, item: object }` |
| error | 图片加载错误时触发 | `{ index: number, item: object, event: Event }` |

### Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| default | 自定义轮播内容 | `{ item: object, index: number }` |

### Methods

通过 ref 可以获取到 Swipe 实例并调用实例方法。

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| prev | 切换到上一张 | - | - |
| next | 切换到下一张 | - | - |
| setCurrentIndex | 切换到指定位置 | `index: number` | - |

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式：

| 名称 | 默认值 | 说明 |
| --- | --- | --- |
| --swipe-bg-color | #f2f2f2 | 轮播背景色 |