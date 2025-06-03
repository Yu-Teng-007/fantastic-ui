# Guide 引导

逐步骤进行指引或解释说明的组件，常用于用户不熟悉的或需进行特别强调的页面。

## 引入

```js
import { FancGuide } from 'fantastic-ui';

Vue.use(FancGuide);
```

## 代码演示

### 基础用法

最简单的引导框，居中显示，包含标题、内容和关闭按钮。

```html
<fanc-button type="primary" @click="showBasicGuide = true">显示基础引导</fanc-button>
<fanc-guide
  v-model:show="showBasicGuide"
  title="欢迎使用"
  text="这是一个简单的引导示例，点击完成按钮关闭引导。"
  centered
></fanc-guide>
```

```js
export default {
  data() {
    return {
      showBasicGuide: false
    };
  }
};
```

### 多步骤引导

通过 `steps` 属性配置多步骤引导，可以使用 `v-model:step` 双向绑定当前步骤。

```html
<fanc-button type="primary" @click="showStepsGuide = true">显示多步骤引导</fanc-button>
<fanc-guide
  v-model:show="showStepsGuide"
  v-model:step="currentStep"
  :steps="steps"
  :title="steps[currentStep]?.title"
  :text="steps[currentStep]?.content"
  centered
  @finish="handleFinish"
></fanc-guide>
```

```js
export default {
  data() {
    return {
      showStepsGuide: false,
      currentStep: 0,
      steps: [
        { title: "第一步", content: "这是第一步的引导内容，点击下一步继续。" },
        { title: "第二步", content: "这是第二步的引导内容，介绍更多功能。" },
        { title: "第三步", content: "这是最后一步，点击完成按钮结束引导。" }
      ]
    };
  },
  methods: {
    handleFinish() {
      this.$toast.success("引导完成！");
      this.currentStep = 0;
    }
  }
};
```

### 自定义位置

通过 `position` 属性可以自定义引导框的位置。

```html
<fanc-button type="primary" @click="showPositionGuide = true">显示自定义位置引导</fanc-button>
<fanc-guide
  v-model:show="showPositionGuide"
  title="自定义位置"
  text="这个引导框位于页面右上角。"
  :position="{ top: '100px', right: '20px' }"
></fanc-guide>
```

### 不同主题

Guide 组件提供了三种主题：`light`、`dark` 和 `primary`。

```html
<fanc-button type="default" @click="showLightTheme">浅色主题</fanc-button>
<fanc-button type="primary" @click="showDarkTheme">深色主题</fanc-button>
<fanc-button type="info" @click="showPrimaryTheme">主色主题</fanc-button>

<fanc-guide
  v-model:show="showThemeGuide"
  :theme="currentTheme"
  title="主题演示"
  :text="`这是${themeNames[currentTheme]}主题的引导框。`"
  centered
></fanc-guide>
```

```js
export default {
  data() {
    return {
      showThemeGuide: false,
      currentTheme: "light",
      themeNames: {
        light: "浅色",
        dark: "深色",
        primary: "主色"
      }
    };
  },
  methods: {
    showLightTheme() {
      this.currentTheme = "light";
      this.showThemeGuide = true;
    },
    showDarkTheme() {
      this.currentTheme = "dark";
      this.showThemeGuide = true;
    },
    showPrimaryTheme() {
      this.currentTheme = "primary";
      this.showThemeGuide = true;
    }
  }
};
```

### 自动播放

设置 `autoplay` 属性可以让引导自动播放，通过 `autoplay-delay` 设置播放间隔时间（毫秒）。

```html
<fanc-button type="primary" @click="showAutoplayGuide = true">显示自动播放引导</fanc-button>
<fanc-guide
  v-model:show="showAutoplayGuide"
  v-model:step="autoplayStep"
  :steps="autoplaySteps"
  :title="autoplaySteps[autoplayStep]?.title"
  :text="autoplaySteps[autoplayStep]?.content"
  centered
  autoplay
  :autoplay-delay="2000"
  @finish="handleAutoplayFinish"
></fanc-guide>
```

```js
export default {
  data() {
    return {
      showAutoplayGuide: false,
      autoplayStep: 0,
      autoplaySteps: [
        { title: "自动播放", content: "这个引导会自动播放，每2秒切换一次。" },
        { title: "无需点击", content: "无需手动点击，系统会自动切换到下一步。" },
        { title: "播放结束", content: "自动播放结束后，引导会自动关闭。" }
      ]
    };
  },
  methods: {
    handleAutoplayFinish() {
      this.$toast.success("自动播放引导完成！");
      this.autoplayStep = 0;
    }
  }
};
```

### 自定义内容

Guide 组件提供了丰富的插槽，可以自定义标题、内容和底部区域。

```html
<fanc-button type="primary" @click="showCustomGuide = true">显示自定义内容引导</fanc-button>
<fanc-guide v-model:show="showCustomGuide" centered>
  <template #title>
    <view class="custom-title">
      <fanc-icon name="star" color="#ffc107" size="20"></fanc-icon>
      <text>自定义标题</text>
    </view>
  </template>
  <view class="custom-content">
    <image class="custom-image" src="/static/logo.png" mode="widthFix"></image>
    <text class="custom-text">这是一个带有自定义内容的引导框，可以添加图片、按钮等元素。</text>
    <fanc-button type="primary" size="small" class="custom-button">了解更多</fanc-button>
  </view>
  <template #footer>
    <view class="custom-footer">
      <fanc-button type="primary" block @click="showCustomGuide = false">我知道了</fanc-button>
    </view>
  </template>
</fanc-guide>
```

### 功能引导

结合自定义位置，可以实现功能引导效果。

```html
<view class="feature-buttons">
  <view class="feature-button" @click="showFeature('search')">
    <fanc-icon name="search" size="24"></fanc-icon>
    <text>搜索</text>
  </view>
  <view class="feature-button" @click="showFeature('cart')">
    <fanc-icon name="shopping-cart" size="24"></fanc-icon>
    <text>购物车</text>
  </view>
  <view class="feature-button" @click="showFeature('user')">
    <fanc-icon name="user" size="24"></fanc-icon>
    <text>我的</text>
  </view>
</view>

<fanc-button type="primary" @click="startFeatureGuide">开始功能引导</fanc-button>

<fanc-guide
  v-model:show="showFeatureGuide"
  v-model:step="featureStep"
  :steps="featureGuides"
  :title="featureGuides[featureStep]?.title"
  :text="featureGuides[featureStep]?.content"
  :position="featurePositions[featureStep]"
  @finish="handleFeatureFinish"
></fanc-guide>
```

```js
export default {
  data() {
    return {
      showFeatureGuide: false,
      featureStep: 0,
      featureGuides: [
        { title: "搜索功能", content: "点击这里可以搜索您需要的商品。" },
        { title: "购物车", content: "您的购物车，查看已选商品。" },
        { title: "个人中心", content: "查看您的订单和个人信息。" }
      ],
      featurePositions: [
        { top: "100px", left: "20px" },
        { top: "100px", left: "50%" },
        { top: "100px", right: "20px" }
      ]
    };
  },
  methods: {
    showFeature(feature) {
      this.$toast.text(`点击了${feature}功能`);
    },
    startFeatureGuide() {
      this.featureStep = 0;
      this.showFeatureGuide = true;
    },
    handleFeatureFinish() {
      this.$toast.success("功能引导完成！");
      this.featureStep = 0;
    }
  }
};
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| show | 是否显示引导框 | _boolean_ | `true` |
| title | 引导标题 | _string_ | - |
| text | 引导内容文本 | _string_ | - |
| steps | 引导步骤数据 | _array_ | `[]` |
| step | 当前步骤 | _number_ | `0` |
| mask | 是否显示遮罩层 | _boolean_ | `true` |
| close-on-click-mask | 点击遮罩是否关闭 | _boolean_ | `false` |
| show-close | 是否显示关闭按钮 | _boolean_ | `true` |
| show-footer | 是否显示底部 | _boolean_ | `true` |
| show-prev-button | 是否显示上一步按钮 | _boolean_ | `true` |
| prev-button-text | 上一步按钮文本 | _string_ | `上一步` |
| next-button-text | 下一步按钮文本 | _string_ | `下一步` |
| finish-button-text | 完成按钮文本 | _string_ | `完成` |
| position | 引导框位置 | _object_ | - |
| centered | 是否居中显示 | _boolean_ | `false` |
| theme | 主题风格，可选值为 `light`、`dark`、`primary` | _string_ | `light` |
| width | 引导框宽度 | _number \| string_ | `280` |
| max-width | 引导框最大宽度 | _number \| string_ | `80%` |
| autoplay | 是否自动播放 | _boolean_ | `false` |
| autoplay-delay | 自动播放间隔时间（毫秒） | _number_ | `3000` |
| loop | 是否循环播放 | _boolean_ | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:show | 引导框显示状态变化时触发 | _show: boolean_ |
| update:step | 当前步骤变化时触发 | _step: number_ |
| next | 点击下一步按钮时触发 | _step: number_ |
| prev | 点击上一步按钮时触发 | _step: number_ |
| finish | 点击完成按钮或自动播放结束时触发 | - |
| close | 点击关闭按钮或遮罩层关闭时触发 | - |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义内容 |
| title | 自定义标题 |
| footer | 自定义底部内容 |
| prev-button | 自定义上一步按钮 |
| next-button | 自定义下一步按钮 |
| close-icon | 自定义关闭图标 |

## 样式变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称 | 默认值 | 说明 |
| --- | --- | --- |
| --guide-bg-color | `var(--white)` | 引导框背景颜色 |
| --guide-title-color | `var(--text-primary)` | 标题颜色 |
| --guide-text-color | `var(--text-secondary)` | 内容文本颜色 |
| --guide-mask-color | `rgba(0, 0, 0, 0.5)` | 遮罩层颜色 |
| --guide-close-bg-color | `var(--gray-100)` | 关闭按钮背景颜色 |
| --guide-close-hover-bg-color | `var(--gray-200)` | 关闭按钮悬停背景颜色 |
| --guide-close-icon-color | `var(--text-secondary)` | 关闭图标颜色 |
| --guide-step-bg-color | `var(--gray-300)` | 步骤点背景颜色 |
| --guide-step-active-bg-color | `var(--fanc-primary-color)` | 当前步骤点背景颜色 |
| --guide-prev-button-bg-color | `var(--gray-100)` | 上一步按钮背景颜色 |
| --guide-prev-button-text-color | `var(--text-secondary)` | 上一步按钮文本颜色 |
| --guide-next-button-bg-color | `var(--fanc-primary-color)` | 下一步按钮背景颜色 |
| --guide-next-button-text-color | `var(--white)` | 下一步按钮文本颜色 |
| --guide-shadow-color | `rgba(0, 0, 0, 0.15)` | 引导框阴影颜色 |
| --guide-border-radius | `8px` | 引导框圆角大小 |
| --guide-padding | `20px` | 引导框内边距 |
| --guide-title-font-size | `18px` | 标题字体大小 |
| --guide-text-font-size | `14px` | 内容文本字体大小 |
| --guide-button-font-size | `14px` | 按钮字体大小 |
| --guide-step-size | `8px` | 步骤点大小 |
| --guide-z-index | `9999` | 引导框层级 |
| --guide-transition-duration | `0.3s` | 过渡动画时长 |
</rewritten_file> 