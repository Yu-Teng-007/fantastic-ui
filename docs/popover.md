# Popover 弹出气泡

气泡组件用于在元素周围弹出简短的提示内容，通常用于鼠标悬停或点击元素时显示更多信息。

## 基础用法

点击触发弹出气泡，展示提示内容。

```html
<fanc-popover content="这是一个简单的气泡框提示内容">
    <fanc-button type="primary">点击查看</fanc-button>
</fanc-popover>
```

## 不同位置

通过 `placement` 属性设置气泡出现的位置，支持 `top`、`bottom`、`left` 和 `right` 四个方向。

```html
<fanc-popover content="顶部气泡" placement="top">
    <fanc-button>上</fanc-button>
</fanc-popover>
<fanc-popover content="右侧气泡" placement="right">
    <fanc-button>右</fanc-button>
</fanc-popover>
<fanc-popover content="底部气泡" placement="bottom">
    <fanc-button>下</fanc-button>
</fanc-popover>
<fanc-popover content="左侧气泡" placement="left">
    <fanc-button>左</fanc-button>
</fanc-popover>
```

## 触发方式

通过设置 `trigger` 属性来改变触发方式，支持 `click` 和 `hover` 两种模式。

```html
<fanc-popover content="点击触发的气泡" trigger="click">
    <fanc-button type="primary">点击触发</fanc-button>
</fanc-popover>
<fanc-popover content="触摸触发的气泡" trigger="hover">
    <fanc-button type="success">触摸触发</fanc-button>
</fanc-popover>
```

## 主题风格

通过 `theme` 属性设置不同风格，支持 `dark` 和 `light` 两种主题。

```html
<fanc-popover content="暗色主题气泡" theme="dark">
    <fanc-button>暗色主题</fanc-button>
</fanc-popover>
<fanc-popover content="亮色主题气泡" theme="light">
    <fanc-button>亮色主题</fanc-button>
</fanc-popover>
```

## 带标题的气泡

使用 `title` 属性添加气泡标题。

```html
<fanc-popover title="提示标题" content="这是一条带有标题的气泡提示">
    <fanc-button type="primary">带标题气泡</fanc-button>
</fanc-popover>
```

## 自动关闭

通过 `duration` 属性设置自动关闭时间，单位为毫秒，默认为 0 表示不自动关闭。

```html
<fanc-popover content="3秒后自动关闭" :duration="3000">
    <fanc-button type="warning">点击查看</fanc-button>
</fanc-popover>
```

## 自定义内容

使用 `content` 插槽可以自定义气泡内容，实现丰富的交互。

```html
<fanc-popover>
    <fanc-button type="primary">自定义内容</fanc-button>
    <template #content>
        <view class="custom-content">
            <view class="custom-content-item">
                <fanc-icon name="user" size="16"></fanc-icon>
                <text>用户信息</text>
            </view>
            <view class="custom-content-item">
                <fanc-icon name="settings" size="16"></fanc-icon>
                <text>设置</text>
            </view>
            <view class="custom-content-item">
                <fanc-icon name="logout" size="16"></fanc-icon>
                <text>退出登录</text>
            </view>
        </view>
    </template>
</fanc-popover>
```

## 手动控制

可以通过 ref 实例方法控制气泡的显示和隐藏。

```html
<fanc-popover ref="customPopover" content="手动控制显示和隐藏">
    <fanc-button type="primary">内容</fanc-button>
</fanc-popover>
<fanc-button type="success" @click="openPopover">打开气泡</fanc-button>
<fanc-button type="danger" @click="closePopover">关闭气泡</fanc-button>

<script>
    export default {
        methods: {
            openPopover() {
                this.$refs.customPopover.open();
            },
            closePopover() {
                this.$refs.customPopover.close();
            },
        },
    };
</script>
```

## API

### Props

| 参数      | 说明                                             | 类型   | 默认值  |
| --------- | ------------------------------------------------ | ------ | ------- |
| content   | 气泡显示的文本内容                               | String | -       |
| title     | 气泡标题                                         | String | -       |
| theme     | 气泡主题，可选值为 `light` `dark`                | String | `dark`  |
| trigger   | 触发方式，可选值为 `click` `hover`               | String | `click` |
| placement | 气泡位置，可选值为 `top` `bottom` `left` `right` | String | `top`   |
| duration  | 自动关闭延时，单位毫秒，0 表示不自动关闭         | Number | `0`     |

### Events

| 事件名 | 说明           | 回调参数 |
| ------ | -------------- | -------- |
| open   | 气泡打开时触发 | -        |
| close  | 气泡关闭时触发 | -        |

### Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 触发气泡的元素 |
| content | 自定义气泡内容 |

### 实例方法

| 方法名 | 说明             | 参数 |
| ------ | ---------------- | ---- |
| open   | 打开气泡         | -    |
| close  | 关闭气泡         | -    |
| toggle | 切换气泡显示状态 | -    |

## 最佳实践

### 使用场景

-   **信息提示**：提供不太重要的额外信息
-   **操作提示**：解释按钮或图标功能
-   **扩展菜单**：显示更多操作选项
-   **图形注解**：为图表、图片添加解释文本

### 设计建议

-   内容保持简短，避免过长文本
-   气泡位置应该自然衔接触发元素
-   深色主题适合突出显示，浅色主题适合内容丰富的场景
-   避免在气泡内放置重要操作按钮，这些应当独立放置
-   使用适当延时，避免频繁闪烁干扰用户

### 无障碍设计

-   确保气泡内容有足够对比度
-   可通过键盘操作触发和关闭气泡
-   重要信息不应仅通过气泡呈现，应有其他方式获取
