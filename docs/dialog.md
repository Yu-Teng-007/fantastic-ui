# Dialog 对话框

可用于消息提示、确认操作、警告提示、自定义内容展示等多种场景的弹出式对话框组件。

## 基础用法

对话框有两种调用方式：函数式和组件引用式。函数式更加方便，组件引用式更加灵活。

### 函数式调用

函数式调用是通过全局方法 `this.$dialog` 调用，展示对话框：

```js
// 确认对话框
this.$dialog.confirm({
    title: "标题",
    message: "这是一条消息提示",
    confirmText: "确定",
    cancelText: "取消",
    success: (action) => {
        if (action === "confirm") {
            // 点击确认按钮
        } else {
            // 点击取消按钮
        }
    },
});

// 提示对话框
this.$dialog.alert({
    title: "提示",
    message: "这是一条消息提示",
    confirmText: "我知道了",
});
```

### 组件引用式调用

组件引用式需要在模板中引入组件，通过控制 `show` 属性来控制显示/隐藏：

```html
<template>
    <view>
        <button @click="showDialog">显示对话框</button>
        <fanc-dialog
            :show="dialogVisible"
            title="标题"
            message="这是一条消息提示"
            @confirm="handleConfirm"
            @cancel="handleCancel"
        />
    </view>
</template>

<script>
    export default {
        data() {
            return {
                dialogVisible: false,
            };
        },
        methods: {
            showDialog() {
                this.dialogVisible = true;
            },
            handleConfirm() {
                this.dialogVisible = false;
                // 点击确认按钮的回调
            },
            handleCancel() {
                this.dialogVisible = false;
                // 点击取消按钮的回调
            },
        },
    };
</script>
```

## 对话框类型

可以通过 `type` 属性设置不同类型的对话框样式。

```js
// 成功提示
this.$dialog.alert({
    title: "成功",
    message: "操作已成功完成",
    type: "success",
    confirmText: "我知道了",
});

// 警告提示
this.$dialog.alert({
    title: "警告",
    message: "此操作需要谨慎执行",
    type: "warning",
    confirmText: "我知道了",
});

// 错误提示
this.$dialog.alert({
    title: "错误",
    message: "操作执行失败，请重试",
    type: "error",
    confirmText: "我知道了",
});

// 信息提示
this.$dialog.alert({
    title: "提示",
    message: "这是一条信息提示",
    type: "info",
    confirmText: "我知道了",
});
```

## 自定义内容

可以通过组件插槽自定义对话框内容，使其更加灵活。

```html
<fanc-dialog
    :show="customDialogVisible"
    title="自定义内容"
    @confirm="customDialogVisible = false"
    @cancel="customDialogVisible = false"
>
    <view class="custom-content">
        <view class="custom-icon">📝</view>
        <view class="custom-title">自定义表单</view>
        <view class="form-item">
            <text class="form-label">姓名：</text>
            <input type="text" class="form-input" placeholder="请输入姓名" />
        </view>
        <view class="form-item">
            <text class="form-label">备注：</text>
            <textarea class="form-textarea" placeholder="请输入备注信息"></textarea>
        </view>
    </view>
</fanc-dialog>
```

## 自定义按钮

可以通过 `footer` 插槽自定义底部按钮区域。

```html
<fanc-dialog
    :show="customButtonsDialogVisible"
    title="自定义按钮"
    message="您可以完全自定义对话框底部按钮区域"
    @close="customButtonsDialogVisible = false"
>
    <template #footer>
        <view class="custom-buttons">
            <view class="custom-button cancel" @click="customButtonsDialogVisible = false">
                <text>取消操作</text>
            </view>
            <view class="custom-button warning" @click="customButtonsDialogVisible = false">
                <text>稍后提醒</text>
            </view>
            <view class="custom-button confirm" @click="customButtonsDialogVisible = false">
                <text>确认操作</text>
            </view>
        </view>
    </template>
</fanc-dialog>
```

## 对话框位置

可以通过 `position` 属性控制对话框的显示位置。

```js
// 顶部显示
this.$dialog.alert({
    title: "顶部对话框",
    message: "显示在页面顶部",
    position: "top",
    confirmText: "我知道了",
});

// 底部显示
this.$dialog.alert({
    title: "底部对话框",
    message: "显示在页面底部",
    position: "bottom",
    confirmText: "我知道了",
});

// 中间显示（默认）
this.$dialog.alert({
    title: "中间对话框",
    message: "显示在页面中间",
    position: "center",
    confirmText: "我知道了",
});
```

## 按钮布局

可以通过 `buttonLayout` 属性控制按钮的布局方式。

```js
// 水平按钮布局（默认）
this.$dialog.confirm({
    title: "水平按钮",
    message: "水平排列的按钮布局",
    buttonLayout: "horizontal",
    confirmText: "确定",
    cancelText: "取消",
});

// 垂直按钮布局
this.$dialog.confirm({
    title: "垂直按钮",
    message: "垂直排列的按钮布局",
    buttonLayout: "vertical",
    confirmText: "确定",
    cancelText: "取消",
});
```

## 高级配置

### 显示关闭图标

可以通过 `showClose` 和 `closeIconPosition` 属性控制关闭图标的显示和位置。

```js
// 显示关闭图标（内部）
this.$dialog.alert({
    title: "带关闭图标",
    message: "右上角显示关闭图标",
    showClose: true,
    closeIconPosition: "inside",
    confirmText: "我知道了",
});

// 显示关闭图标（外部）
this.$dialog.alert({
    title: "外置关闭图标",
    message: "关闭图标显示在对话框外部",
    showClose: true,
    closeIconPosition: "outside",
    confirmText: "我知道了",
});
```

### 异步关闭

可以通过 `asyncClose` 属性控制对话框异步关闭，适用于需要在点击按钮后做异步操作的场景。

```js
this.$dialog.confirm({
    title: "异步关闭",
    message: "点击确认后异步关闭对话框",
    asyncClose: true,
    success: (action, dialog) => {
        if (action === "confirm") {
            // 异步操作
            setTimeout(() => {
                dialog.close();
            }, 1000);
        } else {
            dialog.close();
        }
    },
});
```

### 禁止点击遮罩关闭

可以通过 `maskClickClose` 属性控制是否允许点击遮罩关闭对话框。

```js
this.$dialog.alert({
    title: "禁止点击遮罩关闭",
    message: "点击遮罩无法关闭对话框",
    maskClickClose: false,
    confirmText: "我知道了",
});
```

## API

### Props

| 参数               | 说明                                                    | 类型          | 默认值       |
| ------------------ | ------------------------------------------------------- | ------------- | ------------ |
| show               | 是否显示对话框                                          | Boolean       | false        |
| title              | 对话框标题                                              | String        | '提示'       |
| message            | 对话框内容                                              | String        | ''           |
| type               | 对话框类型，可选值为 default/success/warning/error/info | String        | 'default'    |
| position           | 对话框位置，可选值为 center/top/bottom                  | String        | 'center'     |
| showTitle          | 是否显示标题                                            | Boolean       | true         |
| showButtons        | 是否显示按钮                                            | Boolean       | true         |
| showConfirmButton  | 是否显示确认按钮                                        | Boolean       | true         |
| showCancelButton   | 是否显示取消按钮                                        | Boolean       | true         |
| confirmText        | 确认按钮文本                                            | String        | '确定'       |
| cancelText         | 取消按钮文本                                            | String        | '取消'       |
| buttonLayout       | 按钮布局方式，可选值为 horizontal/vertical              | String        | 'horizontal' |
| messageAlign       | 内容对齐方式，可选值为 left/center/right                | String        | 'left'       |
| showClose          | 是否显示关闭图标                                        | Boolean       | false        |
| closeIconPosition  | 关闭图标位置，可选值为 inside/outside                   | String        | 'inside'     |
| mask               | 是否显示遮罩                                            | Boolean       | true         |
| maskClickClose     | 点击遮罩是否可关闭                                      | Boolean       | true         |
| round              | 是否使用圆角                                            | Boolean       | true         |
| lockScroll         | 锁定页面滚动                                            | Boolean       | true         |
| customClass        | 自定义样式类                                            | String        | ''           |
| customStyle        | 自定义样式                                              | String/Object | ''           |
| confirmButtonStyle | 自定义确认按钮样式                                      | String/Object | ''           |
| cancelButtonStyle  | 自定义取消按钮样式                                      | String/Object | ''           |
| asyncClose         | 是否异步关闭                                            | Boolean       | false        |
| duration           | 弹出动画时长（毫秒）                                    | Number        | 300          |
| zIndex             | z-index 层级                                            | Number        | 2000         |

### Events

| 事件名  | 说明                     | 回调参数 |
| ------- | ------------------------ | -------- |
| confirm | 点击确认按钮时触发       | -        |
| cancel  | 点击取消按钮时触发       | -        |
| close   | 点击关闭图标或遮罩时触发 | -        |

### Slots

| 名称    | 说明                     |
| ------- | ------------------------ |
| default | 对话框内容               |
| header  | 自定义标题栏             |
| footer  | 自定义底部按钮区域       |
| bottom  | 在对话框底部插入额外内容 |

### 函数式调用方法

#### Dialog.alert(options)

| 参数    | 说明                         | 类型   | 默认值 |
| ------- | ---------------------------- | ------ | ------ |
| options | 配置选项，支持以上所有 Props | Object | -      |

#### Dialog.confirm(options)

| 参数    | 说明                         | 类型   | 默认值 |
| ------- | ---------------------------- | ------ | ------ |
| options | 配置选项，支持以上所有 Props | Object | -      |

#### 函数式调用的回调选项

| 参数     | 说明                                             | 类型             | 默认值 |
| -------- | ------------------------------------------------ | ---------------- | ------ |
| success  | 接口调用成功的回调函数                           | Function(result) | -      |
| fail     | 接口调用失败的回调函数                           | Function(error)  | -      |
| complete | 接口调用结束的回调函数（调用成功、失败都会执行） | Function         | -      |

#### success 回调参数

| 参数   | 说明                                                  | 类型   |
| ------ | ----------------------------------------------------- | ------ |
| action | 用户操作类型，可能的值为 'confirm', 'cancel', 'close' | String |
| dialog | 对话框实例，包含 close 方法用于关闭对话框             | Object |

## 主题定制

组件样式支持通过 CSS 变量进行定制：

```css
:root {
    /* 背景颜色 */
    --dialog-bg-color: #ffffff;

    /* 文本颜色 */
    --dialog-title-color: #323233;
    --dialog-content-color: #646566;

    /* 按钮颜色 */
    --dialog-cancel-color: #646566;
    --dialog-confirm-color: #007bff;

    /* 边框颜色 */
    --dialog-border-color: #ebeef5;

    /* 阴影颜色 */
    --dialog-shadow-color: rgba(0, 0, 0, 0.1);

    /* 遮罩颜色 */
    --dialog-mask-color: rgba(0, 0, 0, 0.4);

    /* 关闭按钮颜色 */
    --dialog-close-color: #c8c9cc;

    /* 各类型对话框的主题色 */
    --dialog-success-color: #28a745;
    --dialog-warning-color: #ffc107;
    --dialog-error-color: #dc3545;
    --dialog-info-color: #17a2b8;
}
```
