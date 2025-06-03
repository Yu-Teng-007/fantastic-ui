# fanc-card 卡片组件

## 组件介绍

`fanc-card` 是一个用于展示完整独立信息的卡片组件，常作为更复杂和详细信息的入口点。卡片内容可包含标题、副标题、描述文本、封面图、标签、价格信息、作者信息等，适用于文章预览、商品展示、个人资料等多种场景。

## 组件特性

- 支持封面图展示，可设置图片尺寸、圆角等
- 支持标题、副标题、描述文本等内容的展示
- 支持标签展示，可自定义标签类型和颜色
- 支持价格和原价的展示，适用于商品卡片
- 支持底部信息栏展示，包含作者头像、名称、时间等
- 支持点赞、评论、分享等交互按钮
- 支持卡片点击跳转功能
- 支持自定义样式，包括圆角、阴影、边框等
- 丰富的插槽，支持内容的自定义布局

## 组件用法

### 基础用法

最简单的卡片，只包含标题、副标题和描述文本。

```vue
<fanc-card
  title="基础卡片"
  subtitle="包含标题和内容"
  desc="这是一个基础卡片示例，展示了卡片的基本用法。卡片常用于展示完整独立的信息，同时让用户理解他的作用。"
>
</fanc-card>
```

### 带封面图卡片

通过设置 `thumb` 属性来添加封面图，还可以设置图片的高度、宽度和显示方式。

```vue
<fanc-card
  title="风景摄影"
  subtitle="自然风光"
  desc="大自然的鬼斧神工创造了令人惊叹的美景。"
  thumb="https://example.com/image.jpg"
  thumb-height="200"
>
</fanc-card>
```

### 圆角阴影卡片

通过 `round` 和 `shadow` 属性设置圆角和阴影效果，使卡片更具立体感。

```vue
<fanc-card
  title="设计灵感"
  subtitle="现代简约风格"
  desc="简约不等于简单，现代简约设计风格强调线条简洁、色彩明快。"
  thumb="https://example.com/design.jpg"
  round
  shadow
>
</fanc-card>
```

### 带标签卡片

通过 `tag` 属性添加标签，可以用来标识卡片内容的状态或分类。

```vue
<fanc-card
  title="新品发布"
  subtitle="限时优惠"
  desc="全新智能手表，支持心率监测、睡眠分析等多种功能。"
  thumb="https://example.com/product.jpg"
  tag="新品"
  tag-type="danger"
>
</fanc-card>
```

### 商品卡片

结合 `price` 和 `origin-price` 属性，适合用于商品展示场景。

```vue
<fanc-card
  title="智能手表 Pro"
  subtitle="运动健康新选择"
  desc="支持心率监测、睡眠分析、运动追踪等多种功能"
  thumb="https://example.com/watch.jpg"
  price="1299"
  origin-price="1499"
  tag="新品"
>
</fanc-card>
```

### 文章卡片

通过设置 `show-footer`、`avatar`、`author` 等属性，展示文章作者信息和互动数据。

```vue
<fanc-card
  title="前端技术的未来趋势"
  subtitle="Web开发的新方向"
  desc="随着技术的不断发展，前端开发已经从简单的页面制作演变成为复杂的应用开发。"
  thumb="https://example.com/tech.jpg"
  show-footer
  avatar="https://example.com/avatar.jpg"
  author="技术先锋"
  time="2小时前"
  show-actions
  like-count="328"
  comment-count="46"
>
</fanc-card>
```

### 自定义内容卡片

通过默认插槽和具名插槽，可以完全自定义卡片内容。

```vue
<fanc-card title="自定义内容示例">
  <view class="custom-content">
    <!-- 自定义内容 -->
  </view>
  <template #footer>
    <view class="custom-footer">
      <fanc-button size="small" type="primary">查看详情</fanc-button>
    </view>
  </template>
</fanc-card>
```

### 可点击卡片

通过 `clickable` 属性使整个卡片可点击，结合 `url` 属性或 `@click` 事件处理点击行为。

```vue
<fanc-card
  title="点击查看详情"
  subtitle="点击卡片进入详情页"
  desc="这是一个可点击的卡片示例，点击后将跳转到指定页面。"
  thumb="https://example.com/click.jpg"
  clickable
  url="/pages/detail/index"
>
</fanc-card>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 卡片标题 | String | - |
| subtitle | 卡片副标题 | String | - |
| desc | 卡片描述文本 | String | - |
| thumb | 封面图片URL | String | - |
| thumb-width | 封面图宽度 | String/Number | 100% |
| thumb-height | 封面图高度 | String/Number | 180 |
| thumb-radius | 封面图圆角 | String/Number | 0 |
| thumb-fit | 封面图填充模式，可选值为 `contain`、`cover`、`fill`、`none`、`scale-down` | String | cover |
| lazy-load | 是否开启图片懒加载 | Boolean | true |
| show-loading | 是否显示图片加载中提示 | Boolean | true |
| show-error | 是否显示图片加载失败提示 | Boolean | true |
| desc-rows | 描述文本最大显示行数 | Number | 3 |
| expand-text | 展开按钮文本 | String | 展开 |
| collapse-text | 收起按钮文本 | String | 收起 |
| toggle-expandable | 是否允许展开/收起操作 | Boolean | true |
| tag | 标签文本 | String | - |
| tag-type | 标签类型，可选值为 `primary`、`success`、`warning`、`danger`、`info` | String | primary |
| tag-color | 自定义标签颜色 | String | - |
| price | 商品价格 | String/Number | - |
| origin-price | 商品原价 | String/Number | - |
| currency | 货币符号 | String | ¥ |
| shadow | 是否显示阴影 | Boolean | false |
| round | 是否使用圆角样式 | Boolean | false |
| border | 是否显示边框 | Boolean | true |
| centered | 是否居中显示内容 | Boolean | false |
| show-footer | 是否显示底部区域 | Boolean | false |
| avatar | 作者头像URL | String | - |
| author | 作者名称 | String | - |
| time | 时间信息 | String | - |
| show-actions | 是否显示互动操作按钮 | Boolean | false |
| is-liked | 是否已点赞 | Boolean | false |
| liked-color | 点赞高亮颜色 | String | var(--fanc-danger-color) |
| like-count | 点赞数 | String/Number | - |
| comment-count | 评论数 | String/Number | - |
| share-count | 分享数 | String/Number | - |
| clickable | 是否可点击 | Boolean | false |
| url | 点击跳转链接 | String | - |
| color | 卡片文字颜色 | String | - |
| background-color | 卡片背景色 | String | - |
| title-color | 标题文字颜色 | String | - |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 卡片内容 |
| thumb | 自定义封面 |
| tag | 自定义标签 |
| title | 自定义标题 |
| subtitle | 自定义副标题 |
| desc | 自定义描述 |
| price | 自定义价格区域 |
| footer | 自定义底部区域 |
| right | 自定义右侧内容 |
| bottom | 自定义底栏区域 |
| like-icon | 自定义点赞图标 |
| comment-icon | 自定义评论图标 |
| share-icon | 自定义分享图标 |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击卡片时触发 | event: Event |
| like-click | 点击点赞按钮时触发 | - |
| comment-click | 点击评论按钮时触发 | - |
| share-click | 点击分享按钮时触发 | - |

## 注意事项

1. 当使用 `url` 属性并且 `clickable` 为 `true` 时，点击卡片会自动跳转到对应页面
2. 当设置了 `desc` 属性且内容较长时，默认最多显示 3 行，可通过 `desc-rows` 属性调整
3. 组件内部使用了 `fanc-image`、`fanc-tag` 和 `fanc-text-ellipsis` 等组件，确保这些组件已正确注册
4. 卡片样式可通过 CSS 变量进行全局配置，具体变量请参考 `variables.css` 文件 