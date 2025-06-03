# Swipe 轮播

Swipe 组件用于循环播放一组图片或内容，常用于广告轮播、产品展示等场景。

## 基础用法

```html
<fanc-swipe :list="images"></fanc-swipe>
```

```js
export default {
  data() {
    return {
      images: [
        { image: 'https://example.com/image1.jpg' },
        { image: 'https://example.com/image2.jpg' },
        { image: 'https://example.com/image3.jpg' },
      ]
    };
  }
};
```

## 显示标题

设置 `show-title` 属性后，将显示图片的标题。标题需要在 list 数据中设置 title 属性。

```html
<fanc-swipe :list="imagesWithTitle" show-title></fanc-swipe>
```

```js
export default {
  data() {
    return {
      imagesWithTitle: [
        { image: 'https://example.com/image1.jpg', title: '图片标题1' },
        { image: 'https://example.com/image2.jpg', title: '图片标题2' },
        { image: 'https://example.com/image3.jpg', title: '图片标题3' },
      ]
    };
  }
};
```

## 自定义高度

通过 `height` 属性可以自定义轮播的高度，默认单位为 px。

```html
<fanc-swipe :list="images" :height="150"></fanc-swipe>
```

## 垂直方向轮播

设置 `vertical` 属性为 true 可以实现垂直方向轮播。

```html
<fanc-swipe :list="images" vertical :height="200"></fanc-swipe>
```

## 自定义指示器样式

可以通过 `indicator-color` 和 `indicator-active-color` 属性自定义指示器的颜色。

```html
<fanc-swipe 
  :list="images" 
  :indicator-color="'rgba(0, 123, 255, 0.3)'" 
  :indicator-active-color="'#007bff'"
></fanc-swipe>
```

## 卡片效果

通过设置 `previous-margin` 和 `next-margin` 属性，可以露出前后一部分轮播内容，实现卡片效果。

```html
<fanc-swipe 
  :list="images" 
  :previous-margin="'10px'" 
  :next-margin="'10px'"
></fanc-swipe>
```

## 自定义内容

除了图片外，您还可以通过插槽自定义轮播的内容。

```html
<fanc-swipe :list="customSlides" :height="150">
  <template v-slot="{ item }">
    <view class="custom-slide" :style="{ backgroundColor: item.color }">
      <text class="custom-slide-text">{{ item.text }}</text>
    </view>
  </template>
</fanc-swipe>
```

```js
export default {
  data() {
    return {
      customSlides: [
        { color: '#007bff', text: '自定义内容 1' },
        { color: '#28a745', text: '自定义内容 2' },
        { color: '#dc3545', text: '自定义内容 3' },
      ]
    };
  }
};
```

## 受控轮播

通过禁用自动播放并使用 `next()` 和 `prev()` 方法，可以手动控制轮播的切换。

```html
<fanc-swipe :list="images" :autoplay="false" ref="controlledSwipe"></fanc-swipe>
<view class="swipe-controls">
  <fanc-button size="small" type="primary" @click="prevSlide">上一张</fanc-button>
  <fanc-button size="small" type="primary" @click="nextSlide">下一张</fanc-button>
</view>
```

```js
export default {
  methods: {
    prevSlide() {
      this.$refs.controlledSwipe.prev();
    },
    nextSlide() {
      this.$refs.controlledSwipe.next();
    }
  }
};
```

## 事件监听

Swipe 组件提供了 `click` 和 `change` 事件，用于监听用户交互。

```html
<fanc-swipe :list="images" @click="onSwipeItemClick" @change="onSwipeChange"></fanc-swipe>
```

```js
export default {
  methods: {
    onSwipeItemClick(data) {
      console.log('点击了第', data.index, '项', data.item);
    },
    onSwipeChange(data) {
      console.log('当前展示第', data.index, '项', data.item);
    }
  }
};
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| list | 轮播数据数组，格式为 [{image: 'url', title: '标题', ...}] | Array | [] |
| autoplay | 是否自动播放 | Boolean | true |
| interval | 自动播放间隔时间（毫秒） | Number | 3000 |
| duration | 切换动画时长（毫秒） | Number | 500 |
| circular | 是否循环播放 | Boolean | true |
| vertical | 是否垂直方向播放 | Boolean | false |
| showIndicator | 是否显示指示器 | Boolean | true |
| customIndicator | 使用自定义指示器样式 | Boolean | true |
| indicatorColor | 指示器颜色 | String | rgba(255, 255, 255, 0.6) |
| indicatorActiveColor | 当前指示器颜色 | String | #ffffff |
| showTitle | 是否显示标题 | Boolean | false |
| height | 轮播高度，单位为px | Number/String | 200 |
| imageMode | 图片裁剪、缩放模式 | String | aspectFill |
| previousMargin | 前边距，可用于露出前一项的一小部分，单位px | String | '0px' |
| nextMargin | 后边距，可用于露出后一项的一小部分，单位px | String | '0px' |
| initialIndex | 初始显示的轮播索引 | Number | 0 |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击轮播项时触发 | {item, index} |
| change | 轮播切换时触发 | {item, index} |
| error | 图片加载错误时触发 | {item, index, event} |

### 方法

通过 ref 可以获取到组件实例并调用实例方法。

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| next | 切换到下一张 | - |
| prev | 切换到上一张 | - |
| setCurrentIndex | 设置当前展示的轮播索引 | index: number |

### 插槽

| 名称 | 说明 | 插槽 Prop |
| --- | --- | --- |
| default | 自定义轮播内容 | {item, index} |

## 注意事项

1. 轮播图片建议使用相同尺寸的图片，以保证展示效果一致
2. 在小程序环境中，某些功能可能会受到平台限制
3. 使用垂直方向轮播时，建议设置一个合适的高度 