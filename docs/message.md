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

| 参数     | 说明                                         | 类型     | 默认值 |
| -------- | -------------------------------------------- | -------- | ------ |
| message  | 消息内容                                     | String   | -      |
| type     | 消息类型，可选值：info/success/warning/error | String   | info   |
| duration | 显示时间，单位毫秒，设为 0 则不自动关闭      | Number   | 3000   |
| showIcon | 是否显示图标                                 | Boolean  | true   |
| closable | 是否显示关闭按钮                             | Boolean  | false  |
| zIndex   | 层级                                         | Number   | 2000   |
| onClose  | 关闭时的回调函数                             | Function | -      |

### Message 方法

| 方法名   | 说明         | 参数          | 返回值   |
| -------- | ------------ | ------------- | -------- |
| info     | 显示普通消息 | string/object | 消息实例 |
| success  | 显示成功消息 | string/object | 消息实例 |
| warning  | 显示警告消息 | string/object | 消息实例 |
| error    | 显示错误消息 | string/object | 消息实例 |
| closeAll | 关闭所有消息 | -             | void     |

## 故障排除

如果在使用过程中遇到问题，请检查：

1. 确保已正确导入和注册组件
2. 检查控制台是否有报错信息
3. 在 H5 环境和小程序环境可能会有细微差异，请根据实际情况调整样式
