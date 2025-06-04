# Album 相册

相册组件提供一个类似相册的功能，让开发者开发起来更加得心应手，减少重复的模板代码。

## 基础用法

通过 `images` 属性设置图片列表，默认为网格模式展示。

```html
<fanc-album :images="images" :columns="3" :gap="8"></fanc-album>
```

```js
export default {
  data() {
    return {
      images: [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
        'https://example.com/image3.jpg',
        'https://example.com/image4.jpg',
        'https://example.com/image5.jpg',
        'https://example.com/image6.jpg'
      ]
    };
  }
};
```

## 带标题和副标题

通过 `title` 和 `subtitle` 属性设置相册标题和副标题，需要将 `show-header` 设置为 `true`。

```html
<fanc-album 
  title="我的旅行相册" 
  subtitle="记录美好时刻"
  :show-header="true"
  :images="images" 
  :columns="3" 
  :gap="8"
></fanc-album>
```

## 带边框

通过 `border` 属性设置相册是否显示边框。

```html
<fanc-album 
  :images="images" 
  :columns="3" 
  :gap="8"
  :border="true"
></fanc-album>
```

## 不同列数

通过 `columns` 属性设置相册的列数，默认为 3 列。

```html
<!-- 2列 -->
<fanc-album :images="images" :columns="2" :gap="8"></fanc-album>

<!-- 4列 -->
<fanc-album :images="images" :columns="4" :gap="8"></fanc-album>
```

## 带添加按钮

通过 `show-add-button` 属性设置是否显示添加按钮，通过 `add-text` 属性设置添加按钮文字。

```html
<fanc-album 
  :images="images" 
  :columns="3" 
  :gap="8"
  :show-add-button="true"
  add-text="添加图片"
  @add="handleAddImage"
></fanc-album>
```

```js
export default {
  methods: {
    handleAddImage() {
      // 处理添加图片逻辑
    }
  }
};
```

## 带图片说明

图片对象可以包含 `caption` 属性，通过 `show-caption` 属性设置是否显示图片说明。

```html
<fanc-album 
  :images="captionImages" 
  :columns="2" 
  :gap="8"
  :show-caption="true"
></fanc-album>
```

```js
export default {
  data() {
    return {
      captionImages: [
        {
          url: 'https://example.com/image1.jpg',
          caption: '美丽的风景'
        },
        {
          url: 'https://example.com/image2.jpg',
          caption: '城市夜景'
        },
        {
          url: 'https://example.com/image3.jpg',
          caption: '海边日落'
        },
        {
          url: 'https://example.com/image4.jpg',
          caption: '山间小路'
        }
      ]
    };
  }
};
```

## 列表模式

通过 `mode` 属性设置相册的展示模式，可选值为 `grid`、`list`、`waterfall`、`swiper`，默认为 `grid`。

```html
<fanc-album 
  mode="list"
  :images="listImages"
>
  <template #right="{ item }">
    <fanc-icon name="ellipsis-v" size="18" color="#999"></fanc-icon>
  </template>
</fanc-album>
```

```js
export default {
  data() {
    return {
      listImages: [
        {
          url: 'https://example.com/image1.jpg',
          title: '风景照片',
          description: '拍摄于2023年夏天的旅行',
          date: '2023-07-15',
          size: '2.5MB'
        },
        {
          url: 'https://example.com/image2.jpg',
          title: '城市夜景',
          description: '城市灯光璀璨的夜晚',
          date: '2023-08-20',
          size: '3.1MB'
        }
      ]
    };
  }
};
```

## 瀑布流模式

瀑布流模式适合展示不同高度的图片，需要为每个图片设置 `aspectRatio` 属性。

```html
<fanc-album 
  mode="waterfall"
  :images="waterfallImages" 
  :columns="2" 
  :gap="8"
  :show-caption="true"
></fanc-album>
```

```js
export default {
  data() {
    return {
      waterfallImages: [
        {
          url: 'https://example.com/image1.jpg',
          caption: '风景照片',
          aspectRatio: 0.75 // 宽高比
        },
        {
          url: 'https://example.com/image2.jpg',
          caption: '城市夜景',
          aspectRatio: 1
        },
        {
          url: 'https://example.com/image3.jpg',
          caption: '海边日落',
          aspectRatio: 0.6
        }
      ]
    };
  }
};
```

## 轮播模式

轮播模式适合全屏展示图片，支持自动轮播。

```html
<fanc-album 
  mode="swiper"
  :images="images" 
  :indicator-dots="true"
  :autoplay="true"
  :interval="3000"
  :show-caption="true"
  @change="handleSwiperChange"
></fanc-album>
```

```js
export default {
  methods: {
    handleSwiperChange(e) {
      console.log('当前索引', e.index);
      console.log('当前图片', e.item);
    }
  }
};
```

## 不同类型

通过 `type` 属性设置相册的类型，可选值为 `default`、`primary`、`success`、`warning`、`danger`、`info`。

```html
<fanc-album 
  type="primary"
  title="主要类型" 
  :show-header="true"
  :images="images" 
  :columns="3" 
  :gap="8"
></fanc-album>
```

## 禁用状态

通过 `disabled` 属性设置相册是否禁用。

```html
<fanc-album 
  :disabled="true"
  :images="images" 
  :columns="3" 
  :gap="8"
></fanc-album>
```

## 空状态

当图片列表为空时，会显示空状态。

```html
<fanc-album 
  :images="[]" 
  :columns="3" 
  :gap="8"
></fanc-album>
```

## 自定义空状态

通过 `empty` 插槽自定义空状态内容。

```html
<fanc-album 
  :images="[]" 
  :columns="3" 
  :gap="8"
>
  <template #empty>
    <view class="custom-empty">
      <fanc-icon name="image" size="36" color="#999"></fanc-icon>
      <text class="custom-empty__text">暂无图片，请添加</text>
      <fanc-button size="small" type="primary" @click="handleAddImage">添加图片</fanc-button>
    </view>
  </template>
</fanc-album>
```

## 底部插槽

通过 `footer` 插槽自定义底部内容。

```html
<fanc-album 
  :images="images" 
  :columns="3" 
  :gap="8"
>
  <template #footer>
    <view class="album-footer">
      <fanc-button size="small" type="primary" @click="handleAddImage">添加图片</fanc-button>
      <fanc-button size="small" type="danger" @click="handleClearImages">清空图片</fanc-button>
    </view>
  </template>
</fanc-album>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 相册类型，可选值为 `default` `primary` `success` `warning` `danger` `info` | _string_ | `default` |
| mode | 展示模式，可选值为 `grid` `list` `waterfall` `swiper` | _string_ | `grid` |
| images | 图片列表 | _Array_ | `[]` |
| columns | 列数（网格模式和瀑布流模式下生效） | _number_ | `3` |
| gap | 图片间距 | _number_ | `8` |
| radius | 图片圆角 | _number_ | `4` |
| imageMode | 图片填充模式 | _string_ | `aspectFill` |
| showHeader | 是否显示标题区域 | _boolean_ | `false` |
| title | 相册标题 | _string_ | - |
| subtitle | 相册副标题 | _string_ | - |
| showCaption | 是否显示图片说明 | _boolean_ | `false` |
| showAddButton | 是否显示添加按钮 | _boolean_ | `false` |
| addText | 添加按钮文字 | _string_ | - |
| disabled | 是否禁用 | _boolean_ | `false` |
| lazyLoad | 是否开启图片懒加载 | _boolean_ | `true` |
| border | 是否显示边框 | _boolean_ | `false` |
| indicatorDots | 是否显示轮播指示点（轮播模式下生效） | _boolean_ | `true` |
| autoplay | 是否自动轮播（轮播模式下生效） | _boolean_ | `false` |
| interval | 自动轮播间隔时间（轮播模式下生效） | _number_ | `3000` |
| duration | 轮播切换动画时长（轮播模式下生效） | _number_ | `500` |
| circular | 是否循环轮播（轮播模式下生效） | _boolean_ | `true` |
| showCounter | 是否显示轮播计数器（轮播模式下生效） | _boolean_ | `true` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击图片时触发 | `{ item: 图片对象, index: 索引 }` |
| preview | 预览图片时触发 | `{ urls: 图片url列表, current: 当前索引 }` |
| add | 点击添加按钮时触发 | - |
| change | 轮播切换时触发（轮播模式下生效） | `{ index: 当前索引, item: 当前图片 }` |
| error | 图片加载错误时触发 | `{ index: 图片索引, event: 错误事件 }` |

### Slots

| 名称 | 说明 |
| --- | --- |
| extra | 标题栏右侧内容 |
| right | 列表模式下每项右侧内容，参数为 `{ item: 图片对象, index: 索引 }` |
| empty | 自定义空状态内容 |
| footer | 底部内容 |

### 图片对象结构

在不同模式下，图片对象可以包含不同的属性：

#### 网格模式和轮播模式

```js
{
  url: 'https://example.com/image.jpg', // 图片地址（必填）
  caption: '图片说明', // 图片说明（可选）
  selected: true // 是否选中（可选）
}
```

#### 列表模式

```js
{
  url: 'https://example.com/image.jpg', // 图片地址（必填）
  title: '图片标题', // 图片标题（可选）
  description: '图片描述', // 图片描述（可选）
  date: '2023-07-15', // 日期（可选）
  size: '2.5MB' // 大小（可选）
}
```

#### 瀑布流模式

```js
{
  url: 'https://example.com/image.jpg', // 图片地址（必填）
  caption: '图片说明', // 图片说明（可选）
  aspectRatio: 0.75 // 宽高比（建议设置）
}
```

### CSS变量

组件提供了以下CSS变量，可用于自定义样式，使用方法请参考[ConfigProvider全局配置](#/components/config-provider)。

| 名称 | 默认值 | 说明 |
| --- | --- | --- |
| --album-bg-color | `var(--white)` | 相册背景色 |
| --album-radius | `8px` | 相册圆角 |
| --album-border-color | `var(--gray-200)` | 相册边框颜色 |
| --album-header-padding | `12px 16px` | 标题区域内边距 |
| --album-content-padding | `12px` | 内容区域内边距 |
| --album-footer-padding | `12px 16px` | 底部区域内边距 |
| --album-footer-border-color | `var(--gray-200)` | 底部边框颜色 |
| --album-title-font-size | `16px` | 标题字体大小 |
| --album-title-font-weight | `500` | 标题字体粗细 |
| --album-title-color | `var(--text-primary)` | 标题颜色 |
| --album-subtitle-font-size | `14px` | 副标题字体大小 |
| --album-subtitle-color | `var(--text-secondary)` | 副标题颜色 |
| --album-add-btn-bg | `var(--gray-100)` | 添加按钮背景色 |
| --album-add-btn-border | `var(--gray-300)` | 添加按钮边框颜色 |
| --album-add-text-color | `var(--text-secondary)` | 添加按钮文字颜色 |
| --album-add-icon-color | `var(--gray-500)` | 添加按钮图标颜色 |
| --album-list-divider-color | `var(--gray-200)` | 列表分割线颜色 |
| --album-list-title-color | `var(--text-primary)` | 列表标题颜色 |
| --album-list-desc-color | `var(--text-secondary)` | 列表描述颜色 |
| --album-list-footer-color | `var(--text-tertiary)` | 列表底部信息颜色 | 