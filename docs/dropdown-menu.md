# 下拉菜单栏组件

下拉菜单栏是一种用于展示多个选项的交互组件，常用于移动端的筛选和数据选择场景。

## 基础用法

```html
<fanc-dropdown-menu :options="options"></fanc-dropdown-menu>
```

```js
export default {
    data() {
        return {
            options: [
                {
                    title: "省份",
                    options: [
                        { text: "浙江省", value: "zhejiang" },
                        { text: "江苏省", value: "jiangsu" },
                        { text: "湖北省", value: "hubei" },
                    ],
                },
                {
                    title: "食物",
                    options: [
                        { text: "全部食物", value: "all" },
                        { text: "麻辣烫", value: "spicy" },
                        { text: "面条", value: "noodles" },
                    ],
                },
            ],
        };
    },
};
```

## 自定义默认值

可以通过设置 `defaultValues` 属性来自定义菜单的默认选中项。

```html
<fanc-dropdown-menu :options="options" :defaultValues="['zhejiang', 'noodles']"></fanc-dropdown-menu>
```

## 禁用菜单

可以在 `options` 中设置 `disabled` 属性来禁用某个菜单。

```js
options: [
    {
        title: "省份",
        options: [
            { text: "浙江省", value: "zhejiang" },
            { text: "江苏省", value: "jiangsu" },
        ],
    },
    {
        title: "食物",
        disabled: true,
        options: [
            { text: "全部食物", value: "all" },
            { text: "麻辣烫", value: "spicy" },
        ],
    },
];
```

## 向上展开

通过设置 `direction` 属性为 `up`，可以使菜单向上展开。

```html
<fanc-dropdown-menu :options="options" direction="up"></fanc-dropdown-menu>
```

## 不显示遮罩层

可以通过设置 `overlay` 属性为 `false` 来隐藏遮罩层。

```html
<fanc-dropdown-menu :options="options" :overlay="false"></fanc-dropdown-menu>
```

## 横向滑动

当有多个菜单项时，支持横向滑动。

```html
<fanc-dropdown-menu :options="manyOptions"></fanc-dropdown-menu>
```

```js
manyOptions: [
  // 第一个菜单项
  { title: '省份', options: [...] },
  // 第二个菜单项
  { title: '食物', options: [...] },
  // 第三个菜单项
  { title: '季节', options: [...] },
  // 第四个菜单项
  { title: '颜色', options: [...] },
  // 第五个菜单项
  { title: '爱好', options: [...] }
]
```

## 自定义排序

可以传入 `sortFunction` 属性来自定义选项的排序。

```html
<fanc-dropdown-menu :options="options" :sortFunction="sortByName"></fanc-dropdown-menu>
```

```js
methods: {
  // 按名称排序
  sortByName(options) {
    return [...options].sort((a, b) => a.text.localeCompare(b.text));
  }
}
```

## 事件监听

下拉菜单栏组件提供了事件监听功能，可以在菜单项选中时进行相应的操作。

```html
<fanc-dropdown-menu :options="options" @select="onSelect"></fanc-dropdown-menu>
```

```js
methods: {
  onSelect(event) {
    console.log('选中的菜单索引:', event.menuIndex);
    console.log('选中的选项:', event.option);
    console.log('选中的值:', event.value);
  }
}
```

## Props

| 参数          | 说明                              | 类型       | 默认值  |
| ------------- | --------------------------------- | ---------- | ------- |
| options       | 菜单选项配置                      | `Array`    | `[]`    |
| direction     | 下拉方向，可选值为 `up` 和 `down` | `String`   | `down`  |
| overlay       | 是否显示遮罩层                    | `Boolean`  | `true`  |
| defaultValues | 初始选中的值                      | `Array`    | `[]`    |
| resetOnClose  | 关闭后是否重置选择                | `Boolean`  | `false` |
| sortFunction  | 自定义排序函数                    | `Function` | -       |

### options 数据结构

```js
[
    {
        // 菜单标题
        title: "标题",
        // 是否禁用
        disabled: false,
        // 下拉选项数组
        options: [
            {
                // 选项文本
                text: "选项1",
                // 选项值
                value: "value1",
            },
        ],
    },
];
```

## 事件

| 事件名 | 说明                   | 回调参数                       |
| ------ | ---------------------- | ------------------------------ |
| select | 选中选项时触发         | `{ menuIndex, option, value }` |
| open   | 打开菜单时触发         | 菜单索引                       |
| close  | 关闭菜单时触发         | -                              |
| change | 选中值变化时触发       | `{ menuIndex, value }`         |
| reset  | 重置所有菜单选项时触发 | 重置后的所有选中值             |

## 方法

通过 ref 可以获取到下拉菜单实例并调用实例方法

| 方法名      | 说明                 | 参数                 |
| ----------- | -------------------- | -------------------- |
| updateValue | 更新指定菜单的选中值 | `(menuIndex, value)` |
| reset       | 重置所有选择         | -                    |
| closeMenu   | 关闭当前菜单         | -                    |

```js
// 示例
this.$refs.dropdownMenu.updateValue(0, "zhejiang");
this.$refs.dropdownMenu.reset();
```

## 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](#/zh-CN/config-provider)。

| 名称                                | 默认值                      | 说明               |
| ----------------------------------- | --------------------------- | ------------------ |
| --dropdown-menu-bg                  | `var(--white)`              | 菜单背景色         |
| --dropdown-menu-active-color        | `var(--fanc-primary-color)` | 激活状态颜色       |
| --dropdown-menu-disabled-color      | `var(--text-disabled)`      | 禁用状态颜色       |
| --dropdown-menu-disabled-opacity    | `0.6`                       | 禁用状态透明度     |
| --dropdown-menu-title-color         | `var(--text-primary)`       | 菜单标题颜色       |
| --dropdown-menu-option-active-color | `var(--fanc-primary-color)` | 选项激活状态颜色   |
| --dropdown-menu-option-bg           | `var(--white)`              | 选项背景色         |
| --dropdown-menu-option-active-bg    | `rgba(0, 123, 255, 0.05)`   | 选项激活状态背景色 |
| --dropdown-menu-shadow-color        | `rgba(0, 0, 0, 0.1)`        | 阴影颜色           |
| --dropdown-menu-mask-color          | `var(--dialog-mask-color)`  | 遮罩层颜色         |
| --dropdown-menu-arrow-color         | `var(--text-secondary)`     | 箭头颜色           |
| --dropdown-menu-border-color        | `var(--border-color-light)` | 边框颜色           |
| --dropdown-menu-active-arrow-color  | `var(--fanc-primary-color)` | 箭头激活状态颜色   |
| --dropdown-menu-transition-duration | `0.3s`                      | 过渡动画时长       |
| --dropdown-menu-z-index             | `10`                        | 菜单层级           |

```

```
