# Indexes 索引列表

Indexes 索引列表组件，常用于联系人列表、城市选择等场景，用于根据首字母快速定位到特定内容。

## 基础用法

```html
<fanc-indexes :data="indexList" @select="onSelect">
  <template #default="{ item }">
    <view class="index-item">{{ item.name }}</view>
  </template>
</fanc-indexes>
```

```javascript
export default {
  data() {
    return {
      indexList: [
        {
          key: 'A',
          list: [
            { id: 'a1', name: '安徽省' },
            { id: 'a2', name: '澳门特别行政区' },
          ],
        },
        {
          key: 'B',
          list: [
            { id: 'b1', name: '北京市' },
          ],
        },
        {
          key: 'C',
          list: [
            { id: 'c1', name: '重庆市' },
          ],
        },
        {
          key: 'F',
          list: [
            { id: 'f1', name: '福建省' },
          ],
        },
        {
          key: 'G',
          list: [
            { id: 'g1', name: '甘肃省' },
            { id: 'g2', name: '广东省' },
            { id: 'g3', name: '广西壮族自治区' },
            { id: 'g4', name: '贵州省' },
          ],
        },
        {
          key: 'H',
          list: [
            { id: 'h1', name: '海南省' },
            { id: 'h2', name: '河北省' },
            { id: 'h3', name: '河南省' },
            { id: 'h4', name: '黑龙江省' },
            { id: 'h5', name: '湖北省' },
            { id: 'h6', name: '湖南省' },
          ],
        },
        {
          key: 'J',
          list: [
            { id: 'j1', name: '吉林省' },
            { id: 'j2', name: '江苏省' },
            { id: 'j3', name: '江西省' },
          ],
        },
        {
          key: 'L',
          list: [
            { id: 'l1', name: '辽宁省' },
          ],
        },
      ],
    };
  },
  methods: {
    onSelect(item) {
      console.log('选中项:', item);
    },
  },
};
```

## 自定义索引栏

可以通过 `index-bar` 插槽自定义索引栏的内容和样式。

```html
<fanc-indexes :data="indexList" @select="onSelect">
  <template #default="{ item }">
    <view class="index-item">{{ item.name }}</view>
  </template>
  <template #index-bar="{ indexes, activeIndex, onClick }">
    <view class="custom-index-bar">
      <view
        v-for="(index, i) in indexes"
        :key="index"
        class="custom-index-button"
        :class="{ active: activeIndex === i }"
        @click="onClick(i)"
      >
        {{ index }}
      </view>
    </view>
  </template>
</fanc-indexes>
```

## 自定义分组标题

可以通过 `index-title` 插槽自定义分组标题的内容和样式。

```html
<fanc-indexes :data="indexList" @select="onSelect">
  <template #default="{ item }">
    <view class="index-item">{{ item.name }}</view>
  </template>
  <template #index-title="{ index }">
    <view class="custom-index-title">
      <fanc-icon name="location" size="14" />
      <text>{{ index }}</text>
    </view>
  </template>
</fanc-indexes>
```

## 自定义按钮显示

可以通过 `show-index-bar` 属性控制是否显示索引栏。

```html
<fanc-indexes :data="indexList" :show-index-bar="false" @select="onSelect">
  <template #default="{ item }">
    <view class="index-item">{{ item.name }}</view>
  </template>
</fanc-indexes>
```

## 自定义选中项的高亮样式

可以通过 `active-color` 属性设置选中项的高亮颜色。

```html
<fanc-indexes 
  :data="indexList" 
  active-color="#ff6700" 
  @select="onSelect"
>
  <template #default="{ item }">
    <view class="index-item">{{ item.name }}</view>
  </template>
</fanc-indexes>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 索引列表数据，格式为 `{ key: string, list: any[] }[]` | _array_ | `[]` |
| height | 列表高度，单位为 px | _number \| string_ | `100%` |
| sticky | 是否开启粘性布局 | _boolean_ | `true` |
| sticky-offset-top | 粘性布局距离顶部的偏移量，单位为 px | _number_ | `0` |
| highlight-on-touch | 是否在触摸时高亮当前索引 | _boolean_ | `true` |
| show-index-bar | 是否显示索引栏 | _boolean_ | `true` |
| index-bar-position | 索引栏位置，可选值为 `right` 和 `left` | _string_ | `right` |
| index-bar-width | 索引栏宽度，单位为 px | _number \| string_ | `20` |
| sticky-title-height | 粘性标题高度，单位为 px | _number \| string_ | `30` |
| title-height | 分组标题高度，单位为 px | _number \| string_ | `30` |
| item-height | 列表项高度，单位为 px | _number \| string_ | `50` |
| active-color | 选中项的高亮颜色 | _string_ | `#1989fa` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| select | 点击列表项时触发 | _item: any, index: number_ |
| change | 当前高亮的索引发生变化时触发 | _index: number_ |

### Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| default | 自定义列表项内容 | _item: any_ |
| index-bar | 自定义索引栏 | _{ indexes: string[], activeIndex: number, onClick: (index: number) => void }_ |
| index-title | 自定义分组标题 | _{ index: string }_ |

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式：

| 名称 | 默认值 | 说明 |
| --- | --- | --- |
| --indexes-background-color | var(--white) | 背景颜色 |
| --indexes-title-background-color | #f2f2f2 | 标题背景色 |
| --indexes-title-color | var(--text-secondary) | 标题文字颜色 |
| --indexes-title-font-size | 14px | 标题字体大小 |
| --indexes-title-height | 32px | 标题高度 |
| --indexes-title-padding | 0 16px | 标题内边距 |
| --indexes-item-height | 48px | 列表项高度 |
| --indexes-item-padding | 0 16px | 列表项内边距 |
| --indexes-item-font-size | 14px | 列表项字体大小 |
| --indexes-item-color | var(--text-primary) | 列表项文字颜色 |
| --indexes-bar-width | 22px | 索引栏宽度 |
| --indexes-bar-font-size | 10px | 索引栏字体大小 |
| --indexes-bar-color | var(--text-secondary) | 索引栏文字颜色 |
| --indexes-bar-active-color | var(--primary-color) | 索引栏激活颜色 |
| --indexes-bar-background | transparent | 索引栏背景 |
| --indexes-indicator-background | rgba(0, 0, 0, 0.7) | 指示器背景 |
| --indexes-indicator-color | white | 指示器文字颜色 |
| --indexes-indicator-font-size | 16px | 指示器字体大小 |
| --indexes-indicator-size | 50px | 指示器大小 |
``` 