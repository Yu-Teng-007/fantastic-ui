# Message 消息通知

用于全局提示消息的组件，支持多种类型及自定义配置。已针对 uni-app 环境优化，支持跨平台使用。

## 基础用法

最简单的通知消息，默认在 3 秒后自动关闭。

```js
// 普通消息
this.$message.info("这是一条普通消息");

// 成功消息
this.$message.success("操作成功");

// 警告消息
this.$message.warning("警告提示");

// 错误消息
this.$message.error("出错了");
```

## 消息类型

支持四种不同类型的消息通知：info、success、warning、error。

对应图片中所示的：普通通知、成功通知、警示通知、错误通知。

## 自定义配置

可以通过传入对象配置更多选项。

```js
this.$message.info({
    message: "这是一条普通消息",
    duration: 5000, // 显示时间，单位毫秒
    showIcon: true, // 是否显示图标
    closable: true, // 是否显示关闭按钮
    zIndex: 2000, // 层级
    onClose: () => {
        // 关闭时的回调函数
        console.log("消息已关闭");
    },
});
```

## 带操作按钮

可以添加一个操作按钮，用于执行特定操作。

```js
this.$message.warning({
    message: "检测到风险",
    actionText: "查看详情", // 操作按钮文本
    duration: 0, // 设为0则不自动关闭
    closable: true, // 显示关闭按钮
    closeOnAction: true, // 点击操作按钮后是否自动关闭消息
    onAction: () => {
        // 点击操作按钮的回调函数
        console.log("查看详情");
    },
});
```

不同类型的消息通知可以设置不同的操作按钮：

```js
// 成功消息带撤销按钮
this.$message.success({
    message: "操作已完成",
    actionText: "撤销",
    onAction: () => {
        console.log("执行撤销操作");
    },
});

// 错误消息带重试按钮
this.$message.error({
    message: "提交失败",
    actionText: "重试",
    onAction: () => {
        console.log("执行重试操作");
    },
});
```

### 操作按钮不关闭消息

默认情况下，点击操作按钮会自动关闭消息。如果需要保持消息显示，可以设置 `closeOnAction` 为 `false`：

```js
this.$message.action({
    message: "点击操作按钮不会关闭此消息",
    actionText: "执行操作",
    closeOnAction: false, // 点击操作按钮后不自动关闭
    closable: true,
    onAction: () => {
        console.log("执行操作但保持消息显示");
        // 可以显示另一条消息来提示用户操作已执行
        this.$message.info("操作已执行，但原消息保持显示");
    },
});
```

这对于需要用户执行多次操作的场景非常有用。

## 横向滚动消息

当消息内容较长时，可以启用横向滚动功能，使消息在一个固定宽度内自动滚动显示完整内容。

```js
// 使用scroll方法直接创建滚动消息
this.$message.scroll("这是一条较长的消息，将会自动横向滚动显示全部内容，避免内容被截断。");

// 使用对象方式创建自定义滚动消息
this.$message.scroll({
    message: "这是一条自定义配置的滚动消息，可以设置滚动速度和其他属性。",
    type: "success",
    scrollSpeed: 70, // 滚动速度，单位像素/秒，值越大滚动越快
    duration: 5000,
    closable: true,
});

// 也可以为任何消息类型启用滚动
this.$message.warning({
    message: "这是一条很长的警告消息，启用了横向滚动功能，当内容超出最大宽度时会自动滚动显示。",
    scrollable: true,
    actionText: "查看详情",
});
```

## 富文本消息

支持在消息中使用 HTML 标签，可以创建更丰富的内容展示。

```js
// 使用html方法直接创建富文本消息
this.$message.html('<span style="color: #409eff;">蓝色文本</span> 和 <b>粗体文本</b>');

// 使用对象方式创建自定义富文本消息
this.$message.html({
    type: "warning",
    message: '检测到 <b>安全风险</b>，请及时 <span style="color: #ff4d4f;">处理</span>',
    actionText: "查看详情",
    closable: true,
    onAction: () => {
        console.log("查看安全风险详情");
    },
});

// 富文本消息也可以启用横向滚动
this.$message.html({
    type: "error",
    message: '<span style="color: #ff4d4f;">重要通知：</span> 这是一条包含 <b>富文本格式</b> 的滚动消息',
    scrollable: true,
    duration: 5000,
});
```

## 多条消息

多条消息会按照队列顺序从上到下展示，每个消息间有合理间距。

```js
this.$message.info("第一条消息");
this.$message.success("第二条消息");
this.$message.warning("第三条消息");
```

## 关闭所有消息

可以批量关闭所有已显示的消息。

```js
this.$message.closeAll();
```

## 平台兼容性说明

此消息组件已针对 uni-app 环境进行了优化，可以在各种平台上正常工作，包括：

-   H5 环境
-   微信小程序
-   App 端（iOS/Android）
-   其他 uni-app 支持的平台

组件不再使用 DOM API 直接操作元素，而是通过 Vue 的响应式系统管理消息位置和状态，确保跨平台兼容性。

## API

### Message 选项

| 参数          | 说明                                           | 类型     | 默认值 |
| ------------- | ---------------------------------------------- | -------- | ------ |
| id            | 消息的唯一标识                                 | String   | ''     |
| message       | 消息内容                                       | String   | ''     |
| type          | 消息类型，可选值：info/success/warning/error   | String   | info   |
| showIcon      | 是否显示图标                                   | Boolean  | true   |
| duration      | 显示时间，单位毫秒，设为 0 则不自动关闭        | Number   | 3000   |
| closable      | 是否显示关闭按钮                               | Boolean  | false  |
| zIndex        | 消息弹窗的层级                                 | Number   | 2000   |
| offsetTop     | 消息距离顶部的距离，单位像素                   | Number   | 20     |
| actionText    | 操作按钮文本，不为空时显示操作按钮             | String   | ''     |
| closeOnAction | 点击操作按钮后是否自动关闭消息                 | Boolean  | true   |
| scrollable    | 是否启用横向滚动，内容过长时自动滚动显示       | Boolean  | false  |
| scrollSpeed   | 滚动速度，单位为像素/秒                        | Number   | 50     |
| useHtml       | 是否启用富文本支持，允许在消息中使用 HTML 标签 | Boolean  | false  |
| onClose       | 关闭时的回调函数                               | Function | -      |
| onAction      | 点击操作按钮时的回调函数                       | Function | -      |

### Message 方法

| 方法名   | 说明                 | 参数          | 返回值   |
| -------- | -------------------- | ------------- | -------- |
| info     | 显示普通消息         | string/object | 消息实例 |
| success  | 显示成功消息         | string/object | 消息实例 |
| warning  | 显示警告消息         | string/object | 消息实例 |
| error    | 显示错误消息         | string/object | 消息实例 |
| action   | 显示带操作按钮的消息 | object        | 消息实例 |
| scroll   | 显示横向滚动消息     | string/object | 消息实例 |
| html     | 显示富文本消息       | string/object | 消息实例 |
| closeAll | 关闭所有消息         | -             | void     |
| close  | 消息关闭时触发     | 无参数                               |


## 与其他组件结合使用

Message 组件可以与其他组件结合使用，例如表单提交后显示结果消息：

```js
// 与表单提交结合
submitForm() {
    // 表单验证
    if (!this.isValid) {
        this.$message.error("请完成必填字段");
        return;
    }

    // 显示加载中
    const loading = this.$loading("提交中...");

    // 发送请求
    api.submitForm(this.form).then(res => {
        loading.close();
        this.$message.success("提交成功");
    }).catch(err => {
        loading.close();
        this.$message.error({
            message: "提交失败：" + err.message,
            actionText: "重试",
            onAction: () => this.submitForm()
        });
    });
}
```

## 故障排除

如果在使用过程中遇到问题，请检查：

1. 确保已正确导入和注册组件
2. 检查控制台是否有报错信息
3. 在 H5 环境和小程序环境可能会有细微差异，请根据实际情况调整样式
