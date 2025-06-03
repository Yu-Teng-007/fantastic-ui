# Indexes 索引列表

索引列表组件，用于页面中信息快速检索，可以根据目录中的页码快速找到所需的内容。常用于联系人列表、城市选择等场景。

## 基础用法

通过 `data` 属性传入索引数据，数据格式为一个对象，key 为索引字母，value 为该索引下的数据数组。

```html
<fanc-indexes
  :data="cityData"
  @select="onSelect"
  @click="onItemClick"
  @change="onChange"
>
</fanc-indexes>
```

```js
export default {
  data() {
    return {
      cityData: {
        A: [
          { text: '阿拉善盟', id: 'als' },
          { text: '鞍山', id: 'as' },
          { text: '安庆', id: 'aq' },
          { text: '安阳', id: 'ay' }
        ],
        B: [
          { text: '北京', id: 'bj' },
          { text: '保定', id: 'bd' },
          { text: '包头', id: 'bt' },
          { text: '宝鸡', id: 'bj2' }
        ],
        // 更多数据...
      }
    };
  },
  methods: {
    onSelect(event) {
      console.log('选择索引:', event);
    },
    onItemClick(event) {
      console.log('点击项:', event);
    },
    onChange(event) {
      console.log('索引变化:', event);
    }
  }
};
```

## 自定义索引列表

默认情况下，索引列表为 A-Z 字母表，可以通过 `index-list` 属性自定义索引列表。

```html
<fanc-indexes
  :index-list="customIndexList"
  :data="customData"
  position="left"
>
</fanc-indexes>
```

```js
export default {
  data() {
    return {
      customIndexList: ['热门', '最近', '#', '爱', '超', '大'],
      customData: {
        '热门': [
          { text: '热门城市1', id: 'hot1' },
          { text: '热门城市2', id: 'hot2' },
          { text: '热门城市3', id: 'hot3' }
        ],
        '最近': [
          { text: '最近访问1', id: 'recent1' },
          { text: '最近访问2', id: 'recent2' }
        ],
        // 更多数据...
      }
    };
  }
};
```

## 自定义内容

可以通过插槽自定义列表项的内容。

```html
<fanc-indexes
  :data="fruitData"
>
  <template #item="{ item, anchor }">
    <view class="custom-item">
      <image class="custom-item__icon" :src="item.icon" mode="aspectFit"></image>
      <view class="custom-item__content">
        <text class="custom-item__name">{{ item.name }}</text>
        <text class="custom-item__desc">{{ item.desc }}</text>
      </view>
    </view>
  </template>
</fanc-indexes>
```

```js
export default {
  data() {
    return {
      fruitData: {
        A: [
          { name: '苹果', desc: '一种常见的水果', icon: '/static/fruits/apple.png' },
          { name: '杏', desc: '黄色小水果', icon: '/static/fruits/apricot.png' }
        ],
        B: [
          { name: '香蕉', desc: '黄色弯曲水果', icon: '/static/fruits/banana.png' },
          { name: '蓝莓', desc: '小型蓝色浆果', icon: '/static/fruits/blueberry.png' }
        ],
        // 更多数据...
      }
    };
  }
};
```

## API

### Props

| 参数            | 说明                                | 类型               | 默认值   |
| --------------- | ---------------------------------- | ----------------- | -------- |
| index-list      | 索引字符列表                        | `Array`           | `A-Z 字母表` |
| highlighted-index | 高亮的索引                         | `Number \| String` | `0`      |
| data            | 每个字母下的数据，key 为索引字符，value 为数据数组 | `Object` | `{}` |
| custom-style    | 自定义样式                         | `Object`          | `{}`     |
| position        | 侧边栏位置，可选值为 `left` `right` | `String`          | `right`  |
| show-anchor     | 是否显示锚点背景                   | `Boolean`         | `true`   |
| throttle        | 页面滚动节流时间（毫秒）           | `Number \| String` | `100`    |
| scroll-to-anchor | 滚动到指定锚点                    | `String`          | `''`     |

### Events

| 事件名    | 说明                   | 回调参数                            |
| --------- | --------------------- | ---------------------------------- |
| select    | 点击侧边栏索引时触发   | `{ anchor: string, index: number }` |
| click     | 点击列表项时触发       | `{ item: any, anchor: string }`     |
| change    | 索引改变时触发         | `{ anchor: string, index: number }` |

### Slots

| 名称    | 说明                                |
| ------- | ---------------------------------- |
| default | 列表项的内容                        |
| item    | 自定义列表项的内容，参数为 `{ item, anchor }` |
| top     | 内容区域顶部内容                    |
| bottom  | 内容区域底部内容                    |
| [anchor] | 以索引名命名的插槽，用于自定义该索引下的所有内容 |

## 样式变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称 | 默认值 | 说明 |
| ---- | ----- | ---- |
| --indexes-sidebar-bg-color | transparent | 侧边栏背景色 |
| --indexes-sidebar-active-color | var(--fanc-primary-color) | 侧边栏激活项文字颜色 |
| --indexes-sidebar-text-color | var(--text-secondary) | 侧边栏文字颜色 |
| --indexes-sidebar-active-bg-color | #f2f3f5 | 侧边栏激活项背景色 |
| --indexes-sidebar-font-size | 12px | 侧边栏文字大小 |
| --indexes-anchor-bg-color | #f7f8fa | 锚点背景色 |
| --indexes-anchor-text-color | var(--text-secondary) | 锚点文字颜色 |
| --indexes-anchor-font-size | 14px | 锚点文字大小 |
| --indexes-item-text-color | var(--text-primary) | 列表项文字颜色 |
| --indexes-item-font-size | 14px | 列表项文字大小 |
| --indexes-item-line-height | 48px | 列表项行高 |
| --indexes-item-bg-color | var(--white) | 列表项背景色 |
| --indexes-item-active-bg-color | #f2f3f5 | 列表项激活背景色 |
| --indexes-item-border-color | var(--border-color) | 列表项边框颜色 |
| --indexes-z-index | 1 | 组件层级 |
| --indexes-sidebar-z-index | 2 | 侧边栏层级 |
| --indexes-sidebar-item-height | 16px | 侧边栏项高度 |
| --indexes-sidebar-item-padding | 0 8px | 侧边栏项内边距 | 