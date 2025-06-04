# TabBar 标签栏

### 介绍

TabBar 是一个底部导航组件，用于在不同页面之间进行切换。

### 引入

```js
import { FancTabbar } from 'fantastic-ui';

// 全局注册
Vue.component(FancTabbar.name, FancTabbar);

// 局部注册
export default {
  components: {
    FancTabbar
  }
}
```

## 代码演示

### 基础用法

通过`v-model`绑定当前选中标签的索引值，通过`items`属性设置标签内容。

```html
<fanc-tabbar v-model="active" :items="items" />
```

```js
export default {
  data() {
    return {
      active: 0,
      items: [
        { text: '首页', icon: 'home' },
        { text: '分类', icon: 'list' },
        { text: '消息', icon: 'comment' },
        { text: '我的', icon: 'user' }
      ]
    };
  }
};
```

### 使用name属性

在标签指定`name`属性的情况下，`v-model`的值为当前标签的`name`。

```html
<fanc-tabbar v-model="activeName" :items="items" />
```

```js
export default {
  data() {
    return {
      activeName: 'home',
      items: [
        { text: '首页', icon: 'home', name: 'home' },
        { text: '分类', icon: 'list', name: 'category' },
        { text: '消息', icon: 'comment', name: 'message' },
        { text: '我的', icon: 'user', name: 'user' }
      ]
    };
  }
};
```

### 自定义颜色

通过设置`color`和`activeColor`属性，可以自定义标签的颜色。

```html
<fanc-tabbar v-model="active" :items="items" />
```

```js
export default {
  data() {
    return {
      active: 0,
      items: [
        { text: '首页', icon: 'home', color: '#7d7e80', activeColor: '#1989fa' },
        { text: '分类', icon: 'list', color: '#7d7e80', activeColor: '#1989fa' },
        { text: '消息', icon: 'comment', color: '#7d7e80', activeColor: '#1989fa' },
        { text: '我的', icon: 'user', color: '#7d7e80', activeColor: '#1989fa' }
      ]
    };
  }
};
```

### 徽标提示

通过设置`badge`属性，可以在标签右上角显示徽标。

```html
<fanc-tabbar v-model="active" :items="items" />
```

```js
export default {
  data() {
    return {
      active: 0,
      items: [
        { text: '首页', icon: 'home', badge: 3 },
        { text: '分类', icon: 'list' },
        { text: '消息', icon: 'comment', badge: 12 },
        { text: '我的', icon: 'user', badge: true }
      ]
    };
  }
};
```

### 禁用标签

通过设置`disabled`属性，可以禁用某个标签。

```html
<fanc-tabbar v-model="active" :items="items" />
```

```js
export default {
  data() {
    return {
      active: 0,
      items: [
        { text: '首页', icon: 'home' },
        { text: '分类', icon: 'list' },
        { text: '消息', icon: 'comment', disabled: true },
        { text: '我的', icon: 'user' }
      ]
    };
  }
};
```

### 自定义图标尺寸

通过设置`iconSize`属性，可以自定义所有图标的尺寸，也可以为每个标签单独设置图标尺寸。

```html
<!-- 统一设置所有图标尺寸 -->
<fanc-tabbar v-model="active" :items="items" icon-size="30" />

<!-- 单独设置每个标签的图标尺寸 -->
<fanc-tabbar v-model="active" :items="itemsWithCustomSize" />
```

```js
export default {
  data() {
    return {
      active: 0,
      items: [
        { text: '首页', icon: 'home' },
        { text: '分类', icon: 'list' },
        { text: '消息', icon: 'comment' },
        { text: '我的', icon: 'user' }
      ],
      itemsWithCustomSize: [
        { text: '首页', icon: 'home', iconSize: 28 },
        { text: '分类', icon: 'list', iconSize: 24 },
        { text: '消息', icon: 'comment', iconSize: 26 },
        { text: '我的', icon: 'user', iconSize: 30 }
      ]
    };
  }
};
```

### 使用图片图标

通过设置`image`和`activeImage`属性，可以使用自定义图片作为图标。同时支持通过`imageSize`属性或每个标签的`imageSize`属性自定义图片尺寸。

```html
<!-- 使用图片图标 -->
<fanc-tabbar v-model="active" :items="imageItems" />

<!-- 设置统一图片尺寸 -->
<fanc-tabbar v-model="active" :items="imageItems" image-size="32" />

<!-- 单独设置每个图片的尺寸 -->
<fanc-tabbar v-model="active" :items="imageItemsWithCustomSize" />
```

```js
export default {
  data() {
    return {
      active: 0,
      imageItems: [
        { text: '首页', image: '/static/img/home.png', activeImage: '/static/img/home-active.png' },
        { text: '分类', image: '/static/img/category.png', activeImage: '/static/img/category-active.png' },
        { text: '消息', image: '/static/img/message.png', activeImage: '/static/img/message-active.png' },
        { text: '我的', image: '/static/img/user.png', activeImage: '/static/img/user-active.png' }
      ],
      imageItemsWithCustomSize: [
        { text: '首页', image: '/static/img/home.png', activeImage: '/static/img/home-active.png', imageSize: 36 },
        { text: '分类', image: '/static/img/category.png', activeImage: '/static/img/category-active.png', imageSize: 28 },
        { text: '消息', image: '/static/img/message.png', activeImage: '/static/img/message-active.png', imageSize: 32 },
        { text: '我的', image: '/static/img/user.png', activeImage: '/static/img/user-active.png', imageSize: 30 }
      ]
    };
  }
};
```

### 胶囊模式

通过设置`capsule`属性为`true`，可以使用胶囊样式的标签栏。

```html
<fanc-tabbar v-model="active" :items="items" :capsule="true" />
```

### 纯图标模式

通过设置`icon-only`属性为`true`，可以只显示图标，不显示文本。

```html
<fanc-tabbar v-model="active" :items="items" :icon-only="true" />
```

### 纯文本模式

通过设置`text-only`属性为`true`，可以只显示文本，不显示图标。选中项会显示椭圆形背景。

```html
<fanc-tabbar v-model="active" :items="items" :text-only="true" />
```

### 组合模式

可以组合使用胶囊模式和纯图标/纯文本模式。

```html
<!-- 胶囊+纯图标模式 -->
<fanc-tabbar v-model="active" :items="items" :capsule="true" :icon-only="true" />

<!-- 胶囊+纯文本模式 -->
<fanc-tabbar v-model="active" :items="items" :capsule="true" :text-only="true" />
```

### 不固定在底部

通过设置`fixed`属性为`false`，可以取消标签栏固定在底部的效果。

```html
<fanc-tabbar v-model="active" :items="items" :fixed="false" />
```

### 自定义标签栏

通过默认插槽，可以完全自定义标签栏的内容和样式。使用插槽时，需要自行处理标签的点击事件和状态管理。

```html
<fanc-tabbar :fixed="false">
  <view 
    v-for="(item, index) in customItems" 
    :key="index"
    class="custom-tab-item"
    :class="{'custom-tab-item--active': activeCustom === index}"
    @click="onCustomTabClick(index)"
  >
    <view class="custom-tab-item__icon" :style="{backgroundColor: item.color}">
      <fanc-icon :name="item.icon" color="#fff" size="16"></fanc-icon>
    </view>
    <view class="custom-tab-item__text">{{ item.text }}</view>
  </view>
</fanc-tabbar>
```

```js
export default {
  data() {
    return {
      activeCustom: 0,
      customItems: [
        { text: '红色', icon: 'heart', color: '#ee0a24' },
        { text: '橙色', icon: 'star', color: '#ff976a' },
        { text: '蓝色', icon: 'info', color: '#1989fa' },
        { text: '绿色', icon: 'success', color: '#07c160' }
      ]
    };
  },
  methods: {
    onCustomTabClick(index) {
      this.activeCustom = index;
    }
  }
};
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue(v-model) | 当前选中标签的索引或name值 | _number \| string_ | `0` |
| items | 标签栏内容 | _array_ | `[]` |
| fixed | 是否固定在底部 | _boolean_ | `true` |
| placeholder | 固定在底部时是否在标签位置生成等高的占位元素 | _boolean_ | `true` |
| safeAreaInsetBottom | 是否开启底部安全区适配 | _boolean_ | `true` |
| capsule | 是否使用胶囊模式 | _boolean_ | `false` |
| iconOnly | 是否只显示图标，不显示文本 | _boolean_ | `false` |
| textOnly | 是否只显示文本，不显示图标 | _boolean_ | `false` |
| zIndex | 元素 z-index | _number_ | `10` |
| iconSize | 图标尺寸，默认单位为px | _number \| string_ | `24` |
| imageSize | 图片尺寸，默认单位为px | _number \| string_ | `24` |

### Item 数据结构

`items`属性是一个数组，数组中的每一项是一个对象，对象支持以下属性：

| 键名 | 说明 | 类型 |
| --- | --- | --- |
| text | 标签文字 | _string_ |
| name | 标签标识符，作为v-model的值 | _string \| number_ |
| icon | 图标名称，支持FancIcon组件中的图标 | _string_ |
| image | 图片图标URL，与icon互斥 | _string_ |
| activeImage | 激活状态图片图标URL | _string_ |
| iconSize | 单个标签的图标尺寸 | _number \| string_ |
| imageSize | 单个标签的图片尺寸 | _number \| string_ |
| url | 页面跳转链接 | _string_ |
| switchTab | 是否使用switchTab方式跳转页面 | _boolean_ |
| redirectTo | 是否使用redirectTo方式跳转页面 | _boolean_ |
| reLaunch | 是否使用reLaunch方式跳转页面 | _boolean_ |
| disabled | 是否禁用标签 | _boolean_ |
| badge | 徽标内容，可以是数字、字符串或true(显示小红点) | _number \| string \| boolean_ |
| color | 标签颜色 | _string_ |
| activeColor | 标签激活态颜色 | _string_ |
| disabledColor | 标签禁用态颜色 | _string_ |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 切换标签时触发 | index: 标签索引, item: 标签对象 |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义标签栏内容，设置后将不使用items属性渲染标签 |

## 主题定制

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称 | 默认值 | 说明 |
| --- | --- | --- |
| --tabbar-bg-color | `var(--white)` | 背景颜色 |
| --tabbar-border-color | `var(--border-color)` | 边框颜色 |
| --tabbar-item-color | `var(--text-secondary)` | 标签文字颜色 |
| --tabbar-item-active-color | `var(--fanc-primary-color)` | 标签激活文字颜色 |
| --tabbar-item-disabled-color | `var(--text-disabled)` | 标签禁用文字颜色 |
| --tabbar-item-disabled-opacity | `0.6` | 标签禁用透明度 |
| --tabbar-item-icon-size | `24px` | 标签图标尺寸 |
| --tabbar-item-text-size | `12px` | 标签文字尺寸 |
| --tabbar-item-text-margin-top | `4px` | 标签文字上边距 |
| --tabbar-height | `50px` | 标签栏高度 |
| --tabbar-z-index | `10` | 标签栏z-index |
| --tabbar-shadow-color | `rgba(0, 0, 0, 0.05)` | 标签栏阴影颜色 |
| --tabbar-text-only-size | `14px` | 纯文本模式下的文字尺寸 |
| --tabbar-text-active-bg-color | `rgba(25, 137, 250, 0.1)` | 纯文本模式下选中项的背景颜色 |