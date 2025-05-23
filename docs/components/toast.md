# Toast 轻提示

轻提示组件，用于提供轻量级的操作反馈。页面上只会显示一个轻提示，新的提示会替换旧的提示。

## 基础用法

最基本的文字提示用法。

```js
// 简短提示
this.$toast.text("这是一条提示消息");

// 长文本提示
this.$toast.text("这是一条较长的提示消息，Toast 会根据内容自动调整宽度。");
```

## 提示类型

Toast 支持多种类型的提示，包括：文本、成功、错误、警告和加载中。

```js
// 成功提示
this.$toast.success("操作成功");

// 错误提示
this.$toast.error("操作失败");

// 警告提示
this.$toast.warning("警告信息");

// 加载提示
this.$toast.loading("加载中...");

// 3秒后手动关闭
setTimeout(() => {
    this.$toast.close();
}, 3000);
```

## 自定义位置

Toast 可以显示在顶部、中间或底部位置。

```js
// 顶部提示
this.$toast.text({
    message: "顶部提示",
    position: "top",
});

// 中间提示（默认）
this.$toast.text({
    message: "中间提示",
    position: "center",
});

// 底部提示
this.$toast.text({
    message: "底部提示",
    position: "bottom",
});
```

## 高级配置

Toast 支持自定义持续时间和遮罩层。

```js
// 自定义时长
this.$toast.success({
    message: "5秒后自动关闭",
    duration: 5000, // 单位：毫秒
});

// 显示遮罩
this.$toast.warning({
    message: "显示背景遮罩",
    mask: true,
    duration: 3000,
});

// 点击遮罩关闭
this.$toast.success({
    message: "点击遮罩关闭",
    mask: true,
    maskClosable: true,
    duration: 0, // 0 表示不自动关闭
});

// 锁定背景滚动
this.$toast.loading({
    message: "锁定背景滚动",
    mask: true,
    lockBackground: true,
    duration: 0,
});
```

## 动态控制

可以动态控制 Toast 的显示和关闭。

```js
// 展示加载中，然后显示成功
this.$toast.loading("正在提交...");

setTimeout(() => {
    this.$toast.success("提交成功");
}, 2000);

// 手动关闭当前显示的 Toast
this.$toast.close();
```

## API

### 方法

| 方法名   | 说明                                                              | 参数              | 返回值     |
| -------- | ----------------------------------------------------------------- | ----------------- | ---------- |
| text     | 显示文本提示                                                      | message / options | toast 实例 |
| success  | 显示成功提示                                                      | message / options | toast 实例 |
| error    | 显示错误提示                                                      | message / options | toast 实例 |
| warning  | 显示警告提示                                                      | message / options | toast 实例 |
| loading  | 显示加载提示                                                      | message / options | toast 实例 |
| custom   | 自定义 Toast                                                      | options           | toast 实例 |
| close    | 关闭当前显示的 Toast                                              | -                 | -          |
| closeAll | 关闭当前显示的 Toast（与 close 效果相同，保留此方法是为了兼容性） | -                 | -          |

### 选项

| 参数           | 说明                                                          | 类型     | 默认值                                       |
| -------------- | ------------------------------------------------------------- | -------- | -------------------------------------------- |
| message        | 提示文本内容                                                  | String   | -                                            |
| type           | 提示类型，可选值为 text / success / error / warning / loading | String   | text                                         |
| position       | 显示位置，可选值为 center / top / bottom                      | String   | center                                       |
| mask           | 是否显示背景遮罩                                              | Boolean  | false                                        |
| maskClosable   | 点击遮罩是否可关闭                                            | Boolean  | false                                        |
| lockBackground | 遮罩显示时是否锁定背景滚动，仅当 mask 为 true 时有效          | Boolean  | false                                        |
| duration       | 展示时长(毫秒)，值为 0 时，toast 不会自动消失                 | Number   | 2000                                         |
| showIcon       | 是否显示图标，loading 类型下不生效                            | Boolean  | false，success/error/warning 类型默认为 true |
| zIndex         | 层级                                                          | Number   | 3000                                         |
| maxWidth       | 最大宽度                                                      | String   | '70%'                                        |
| customStyle    | 自定义样式                                                    | Object   | {}                                           |
| onClose        | 关闭时的回调函数                                              | Function | -                                            |

```

```
