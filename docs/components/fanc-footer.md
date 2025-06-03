# fanc-footer 页脚组件

## 组件介绍

`fanc-footer` 是一个用于展示网站底部信息的组件，通常包含版权声明、联系信息、重要页面链接和其他相关内容。页脚组件提供了多种主题样式和丰富的配置选项，可以满足大多数场景的页脚需求。

## 组件特性

- 支持多种主题样式：默认、暗色、亮色和主色
- 支持显示版权信息、ICP备案信息
- 支持自定义链接列表和分隔符
- 支持显示Logo和标题
- 支持自定义内容插槽
- 支持固定在页面底部
- 支持底部安全区域适配

## 组件用法

### 基础用法

最基本的用法是展示版权信息和链接列表：

```vue
<fanc-footer
  copyright="© 2024 Fantastic UI. All Rights Reserved."
  :links="[
    { text: '关于我们', url: '/pages/about/index' },
    { text: '隐私政策', url: '/pages/privacy/index' },
    { text: '服务条款', url: '/pages/terms/index' }
  ]"
></fanc-footer>
```

### 主题样式

页脚组件提供四种主题样式：默认、暗色、亮色和主色：

```vue
<!-- 默认主题 -->
<fanc-footer theme="default" copyright="© 2024 Fantastic UI"></fanc-footer>

<!-- 暗色主题 -->
<fanc-footer theme="dark" copyright="© 2024 Fantastic UI"></fanc-footer>

<!-- 亮色主题 -->
<fanc-footer theme="light" copyright="© 2024 Fantastic UI"></fanc-footer>

<!-- 主色主题 -->
<fanc-footer theme="primary" copyright="© 2024 Fantastic UI"></fanc-footer>
```

### 带Logo和标题

可以在页脚中显示Logo和标题：

```vue
<fanc-footer
  show-logo
  logo="/static/logo.png"
  title="Fantastic UI"
  copyright="© 2024 Fantastic UI. All Rights Reserved."
></fanc-footer>
```

### 带图标的链接

可以在链接中显示图标：

```vue
<fanc-footer
  copyright="© 2024 Fantastic UI"
  :links="[
    { text: '关于我们', icon: 'info-circle' },
    { text: '帮助中心', icon: 'question-circle' }
  ]"
></fanc-footer>
```

### 带备案信息

可以在页脚中显示ICP备案信息：

```vue
<fanc-footer
  copyright="© 2024 Fantastic UI. All Rights Reserved."
  icp="京ICP备12345678号-1"
></fanc-footer>
```

### 自定义内容

通过默认插槽可以自定义页脚内容：

```vue
<fanc-footer copyright="© 2024 Fantastic UI">
  <view class="custom-content">
    <view class="contact-info">
      <view class="contact-item">
        <fanc-icon name="phone" size="16"></fanc-icon>
        <text>400-123-4567</text>
      </view>
      <view class="contact-item">
        <fanc-icon name="envelope" size="16"></fanc-icon>
        <text>support@example.com</text>
      </view>
    </view>
    <view class="social-links">
      <view class="social-item">
        <fanc-icon name="weixin" size="24" color="#09BB07"></fanc-icon>
      </view>
      <view class="social-item">
        <fanc-icon name="weibo" size="24" color="#E6162D"></fanc-icon>
      </view>
    </view>
  </view>
</fanc-footer>
```

### 固定在底部

设置 `fixed` 属性可以将页脚固定在页面底部：

```vue
<fanc-footer
  fixed
  safe-area-inset-bottom
  copyright="© 2024 Fantastic UI"
></fanc-footer>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| theme | 主题样式，可选值为 `default` `dark` `light` `primary` | String | `default` |
| fixed | 是否固定在底部 | Boolean | `false` |
| safeAreaInsetBottom | 是否开启底部安全区适配 | Boolean | `true` |
| logo | Logo图片URL | String | - |
| title | 标题文本 | String | - |
| showLogo | 是否显示Logo区域 | Boolean | `false` |
| copyright | 版权信息文本 | String | - |
| icp | ICP备案信息文本 | String | - |
| links | 链接列表，每项可包含 `text` `url` `icon` `external` 属性 | Array | `[]` |
| separator | 链接之间的分隔符 | String | `\|` |
| customStyle | 自定义样式对象 | Object | `{}` |

### Links数组项属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 链接文本 | String | - |
| url | 链接地址 | String | - |
| icon | 链接图标名称 | String | - |
| external | 是否为外部链接 | Boolean | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| link-click | 点击链接时触发 | link: 当前点击的链接对象 |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义内容，显示在链接列表下方，版权信息上方 |

## CSS变量

组件提供了以下CSS变量，可以用来自定义样式：

```css
--footer-bg-color              /* 页脚背景色 */
--footer-text-color            /* 页脚文本颜色 */
--footer-border-color          /* 页脚上边框颜色 */
--footer-link-color            /* 链接文本颜色 */
--footer-separator-color       /* 链接分隔符颜色 */
--footer-dark-bg-color         /* 暗色主题背景色 */
--footer-dark-text-color       /* 暗色主题文本颜色 */
--footer-dark-border-color     /* 暗色主题边框颜色 */
--footer-light-bg-color        /* 亮色主题背景色 */
--footer-light-text-color      /* 亮色主题文本颜色 */
--footer-light-border-color    /* 亮色主题边框颜色 */
--footer-primary-bg-color      /* 主色主题背景色 */
--footer-primary-text-color    /* 主色主题文本颜色 */
--footer-primary-border-color  /* 主色主题边框颜色 */
--footer-link-dark-color       /* 暗色主题链接颜色 */
--footer-link-primary-color    /* 主色主题链接颜色 */
--footer-z-index               /* 页脚层级 */
--footer-padding               /* 页脚内边距 */
--footer-font-size             /* 页脚文本字体大小 */
--footer-logo-width            /* Logo宽度 */
--footer-logo-height           /* Logo高度 */
--footer-logo-margin-bottom    /* Logo下边距 */
--footer-title-font-size       /* 标题字体大小 */
--footer-title-font-weight     /* 标题字体粗细 */
--footer-title-margin-bottom   /* 标题下边距 */
--footer-links-margin-bottom   /* 链接列表下边距 */
--footer-link-margin           /* 链接外边距 */
--footer-link-padding          /* 链接内边距 */
--footer-link-font-size        /* 链接字体大小 */
--footer-link-icon-margin      /* 链接图标右边距 */
--footer-link-separator-margin /* 链接分隔符外边距 */
--footer-content-margin-bottom /* 自定义内容下边距 */
--footer-line-height           /* 行高 */
--footer-copyright-font-size   /* 版权信息字体大小 */
--footer-copyright-margin-bottom /* 版权信息下边距 */
--footer-icp-font-size         /* 备案信息字体大小 */
```

## 注意事项

1. 使用 `fixed` 属性时，页脚会使用固定定位，脱离文档流。
2. 在小程序和App环境中，外部链接的处理方式可能不同，请根据实际平台做相应调整。
3. 使用 `safeAreaInsetBottom` 属性可以适配iPhone X等带有底部安全区域的设备。 