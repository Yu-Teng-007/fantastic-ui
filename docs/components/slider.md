# Slider 滑动选择器

滑动选择器组件，用于选择横轴上的数值、区间、档位。

## 基础用法

通过 `v-model` 绑定当前值，默认取值范围为 0-100。

```html
<fanc-slider v-model="value" @change="onChange"></fanc-slider>
```

```js
export default {
  data() {
    return {
      value: 50
    };
  },
  methods: {
    onChange(value) {
      console.log('当前值：', value);
    }
  }
};
```

## 显示当前值

设置 `show-value` 属性后，会在滑块右侧显示当前值。

```html
<fanc-slider v-model="value" show-value @change="onChange"></fanc-slider>
```

## 设置步长

通过 `step` 属性设置步长，取值必须大于 0，并且可被 (max - min) 整除。

```html
<fanc-slider v-model="value" :step="10" show-value @change="onChange"></fanc-slider>
```

## 设置范围

通过 `min` 和 `max` 属性设置滑块的最小值和最大值。

```html
<fanc-slider v-model="value" :min="-50" :max="50" show-value @change="onChange"></fanc-slider>
```

## 自定义样式

通过 `active-color` 和 `inactive-color` 属性设置进度条的激活和未激活颜色。

```html
<fanc-slider 
  v-model="value" 
  active-color="#ee0a24" 
  inactive-color="#f2f3f5"
  show-value
  @change="onChange"
></fanc-slider>
```

## 禁用状态

通过 `disabled` 属性设置是否禁用滑块。

```html
<fanc-slider v-model="value" disabled show-value></fanc-slider>
```

## 自定义按钮

通过 `thumb` 插槽可以自定义滑块按钮的内容。

```html
<fanc-slider v-model="value" show-value>
  <template #thumb>
    <view class="custom-thumb">
      {{ value }}
    </view>
  </template>
</fanc-slider>
```

```css
.custom-thumb {
  width: 26px;
  height: 26px;
  color: #fff;
  font-size: 10px;
  line-height: 26px;
  text-align: center;
  background-color: #007bff;
  border-radius: 100%;
}
```

## 垂直方向

可以通过 CSS 变换实现垂直方向的滑块。

```html
<view class="vertical-slider-container">
  <view class="vertical-slider">
    <fanc-slider 
      v-model="value" 
      active-color="#ee0a24" 
      @change="onChange"
    ></fanc-slider>
  </view>
  <view class="vertical-value">{{ value }}</view>
</view>
```

```css
.vertical-slider-container {
  display: flex;
  align-items: center;
  padding: 16px;
  height: 200px;
}

.vertical-slider {
  height: 100%;
  transform: rotate(-90deg);
  width: 200px;
  transform-origin: left center;
  margin-left: 30px;
}

.vertical-value {
  margin-left: 50px;
  font-size: 16px;
  color: #323233;
}
```

## 双滑块用法

可以通过两个滑块组件实现区间选择的效果。

```html
<view class="dual-slider">
  <fanc-slider 
    v-model="minValue" 
    :max="maxValue" 
    @change="onMinChange"
  ></fanc-slider>
  <fanc-slider 
    v-model="maxValue" 
    :min="minValue" 
    @change="onMaxChange"
  ></fanc-slider>
  <view class="dual-slider-value">
    <text>{{ minValue }}</text>
    <text>{{ maxValue }}</text>
  </view>
</view>
```

```js
export default {
  data() {
    return {
      minValue: 20,
      maxValue: 80
    };
  },
  methods: {
    onMinChange(value) {
      this.minValue = value;
      if (this.maxValue < value) {
        this.maxValue = value;
      }
    },
    onMaxChange(value) {
      this.maxValue = value;
      if (this.minValue > value) {
        this.minValue = value;
      }
    }
  }
};
```

```css
.dual-slider {
  position: relative;
  padding: 20px 0;
}

.dual-slider-value {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 14px;
  color: #323233;
}
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前进度百分比，支持 v-model 双向绑定 | _number_ | `0` |
| min | 最小值 | _number_ | `0` |
| max | 最大值 | _number_ | `100` |
| step | 步长，取值必须大于 0，并且可被 (max - min) 整除 | _number_ | `1` |
| disabled | 是否禁用滑块 | _boolean_ | `false` |
| active-color | 进度条激活部分的颜色 | _string_ | `#007bff` |
| inactive-color | 进度条未激活部分的颜色 | _string_ | `#dee2e6` |
| thumb-color | 滑块颜色 | _string_ | `#fff` |
| show-value | 是否显示当前值 | _boolean_ | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 进度变化且结束拖动后触发 | _value: number_ |
| changing | 进度变化时实时触发 | _value: number_ |

### Slots

| 名称 | 说明 |
| --- | --- |
| thumb | 自定义滑块按钮 |

## 主题定制

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称 | 默认值 | 说明 |
| --- | --- | --- |
| --slider-active-color | var(--fanc-primary-color) | 进度条激活部分的颜色 |
| --slider-inactive-color | var(--gray-300) | 进度条未激活部分的颜色 |
| --slider-disabled-color | var(--gray-400) | 禁用状态下滑块的颜色 |
| --slider-thumb-color | var(--white) | 滑块按钮的颜色 |
| --slider-thumb-shadow | 0 1px 3px rgba(0, 0, 0, 0.2) | 滑块按钮的阴影 |
| --slider-thumb-active-shadow | 0 2px 5px rgba(0, 0, 0, 0.3) | 滑块按钮激活时的阴影 |
| --slider-value-color | var(--text-primary) | 值文本的颜色 |
| --slider-disabled-opacity | 0.6 | 禁用状态的透明度 | 