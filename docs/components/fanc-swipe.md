# Swipe 轮播组件

Swipe 组件用于循环播放一组图片或内容，常用于广告轮播、产品展示等场景。

## 基础用法

```html
<fanc-swipe :images="images" />
```

```javascript
export default {
  data() {
    return {
      images: [
        'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
        'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
        'https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg',
        'https://fastly.jsdelivr.net/npm/@vant/assets/apple-4.jpeg',
      ],
    };
  },
};
```

## 自动轮播

通过 `autoplay` 属性设置自动轮播的间隔时间（单位为毫秒）。

```html
<fanc-swipe :images="images" :autoplay="3000" />
```

## 垂直轮播

通过 `vertical` 属性设置垂直方向轮播。

```html
<fanc-swipe :images="images" vertical :height="200" />
```

## 显示指示器

通过 `indicator` 属性设置是否显示指示器。

```html
<fanc-swipe :images="images" indicator />
```

## 自定义指示器

通过 `indicator-slot` 插槽自定义指示器的样式。

```html
<fanc-swipe :images="images" :current="current">
  <template #indicator>
    <view class="custom-indicator">{{ current + 1 }}/{{ images.length }}</view>
  </template>
</fanc-swipe>
```

## 卡片风格

通过 `card` 属性设置卡片风格的轮播。

```html
<fanc-swipe :images="images" card :width="300" :height="200" />
```

## 轮播项标题

通过 `items` 属性传入带有标题的数据，或者通过 `title` 插槽自定义标题样式。

```html
<fanc-swipe :items="items" show-title />
```

```javascript
export default {
  data() {
    return {
      items: [
        {
          image: 'https://i.111666.best/image/yBRMi1WsEqoWerpuaNRsXS.jpeg',
          title: '第一张图片的标题',
        },
        {
          image: 'https://i.111666.best/image/vTByNbWWwxNDfQhzP9AIaA.jpeg',
          title: '第二张图片的标题',
        },
        {
          image: 'https://i.111666.best/image/iqgUbDMVKzfVU87dz0DxzF.jpeg',
          title: '第三张图片的标题',
        },
        {
          image: 'https://i.111666.best/image/DrbccUIarcm0QlN2HGO2F1.jpeg',
          title: '第四张图片的标题',
        },
      ],
    };
  },
};
```

## 自定义轮播内容

通过默认插槽自定义轮播项的内容。

```html
<fanc-swipe :total="3" :height="150">
  <template #default="{ index }">
    <view class="custom-slide" :style="{ background: colors[index] }">
      {{ index + 1 }}
    </view>
  </template>
</fanc-swipe>
```

```javascript
export default {
  data() {
    return {
      colors: ['#f44336', '#2196f3', '#4caf50'],
    };
  },
};
```

## 方法

通过 ref 获取组件实例，调用实例方法。

```html
<fanc-swipe ref="swipe" :images="images" />
<view class="swipe-buttons">
  <fanc-button size="small" @click="prev">上一张</fanc-button>
  <fanc-button size="small" @click="next">下一张</fanc-button>
  <fanc-button size="small" @click="swipeTo(2)">跳转到第3张</fanc-button>
</view>
```

```javascript
export default {
  methods: {
    prev() {
      this.$refs.swipe.prev();
    },
    next() {
      this.$refs.swipe.next();
    },
    swipeTo(index) {
      this.$refs.swipe.swipeTo(index);
    },
  },
};
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| images | 图片数组 | _string[]_ | `[]` |
| items | 带标题的轮播项数组，格式为 `{ image, title }` | _object[]_ | `[]` |
| autoplay | 自动轮播间隔，单位为 ms，为 0 时不自动轮播 | _number_ | `0` |
| duration | 动画时长，单位为 ms | _number_ | `300` |
| initial-swipe | 初始位置索引值 | _number_ | `0` |
| width | 轮播宽度，单位为 px | _number \| string_ | `100%` |
| height | 轮播高度，单位为 px | _number \| string_ | `auto` |
| show-title | 是否显示标题 | _boolean_ | `false` |
| indicator | 是否显示指示器 | _boolean_ | `false` |
| indicator-color | 指示器颜色 | _string_ | `#fff` |
| indicator-active-color | 当前指示器的颜色 | _string_ | `#1989fa` |
| vertical | 是否为纵向滚动 | _boolean_ | `false` |
| touchable | 是否可以通过手势滑动 | _boolean_ | `true` |
| card | 是否启用卡片模式 | _boolean_ | `false` |
| loop | 是否开启循环播放 | _boolean_ | `true` |
| lazy-render | 是否延迟渲染未展示的轮播 | _boolean_ | `true` |
| total | 轮播项总数量，用于自定义内容 | _number_ | `0` |
| current | 当前轮播项索引 | _number_ | `0` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 当前轮播项变化时触发 | _index: number_ |
| click | 点击轮播项时触发 | _index: number_ |

### Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| default | 自定义轮播内容 | _{ index: number }_ |
| indicator | 自定义指示器 | - |
| title | 自定义标题 | _{ title: string, index: number }_ |

### Methods

通过 ref 可以获取到 Swipe 实例并调用实例方法。

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| prev | 切换到上一张 | - | - |
| next | 切换到下一张 | - | - |
| swipeTo | 切换到指定位置 | _index: number, immediate?: boolean_ | - |
| resize | 外层元素大小变化后，可以调用此方法来触发重绘 | - | - |

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式：

| 名称 | 默认值 | 说明 |
| --- | --- | --- |
| --swipe-height | auto | 轮播高度 |
| --swipe-item-border-radius | 0 | 轮播项圆角 |
| --swipe-indicator-size | 8px | 指示器大小 |
| --swipe-indicator-margin | 0 4px | 指示器间距 |
| --swipe-indicator-active-opacity | 1 | 当前指示器透明度 |
| --swipe-indicator-inactive-opacity | 0.3 | 非当前指示器透明度 |
| --swipe-indicator-active-background | var(--primary-color) | 当前指示器背景色 |
| --swipe-indicator-inactive-background | #ebedf0 | 非当前指示器背景色 |
| --swipe-title-background | rgba(0, 0, 0, 0.6) | 标题背景色 |
| --swipe-title-color | white | 标题文字颜色 |
| --swipe-title-font-size | 14px | 标题字体大小 |
| --swipe-title-padding | 8px 12px | 标题内边距 |
| --swipe-card-border-radius | 8px | 卡片模式圆角 |
| --swipe-card-scale | 0.9 | 卡片模式缩放比例 | 