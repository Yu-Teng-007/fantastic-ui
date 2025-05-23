# ActionSheet 动作面板

动作面板组件，用于从底部弹出菜单给用户选择操作。

## 基础用法

ActionSheet 组件基础用法示例：

```vue
<template>
    <view>
        <fanc-button type="primary" @click="showActionSheet = true">显示动作面板</fanc-button>

        <fanc-action-sheet v-model:show="showActionSheet" :actions="actions" @select="onSelect" @cancel="onCancel" />
    </view>
</template>

<script>
export default {
    data() {
        return {
            showActionSheet: false,
            actions: [{ name: "选项一" }, { name: "选项二" }, { name: "选项三" }],
        };
    },
    methods: {
        onSelect(action, index) {
            this.$message.show({
                type: "success",
                message: `点击了 ${action.name}，索引: ${index}`,
            });
        },
        onCancel() {
            this.$message.show({
                type: "info",
                message: "取消操作",
            });
        },
    },
};
</script>
```

## 带标题和描述

可以设置标题和描述文字：

```vue
<fanc-action-sheet
    v-model:show="showActionSheet"
    :actions="actions"
    title="标题文字"
    description="描述文字"
    @select="onSelect"
/>
```

## 带图标

配置图标选项：

```vue
<fanc-action-sheet v-model:show="showActionSheet" :actions="actionsWithIcon" title="请选择操作" @select="onSelect" />

<!-- 数据结构 -->
actionsWithIcon: [ { name: '拍照', icon: 'camera' }, { name: '从相册选择', icon: 'picture' }, { name: '保存图片', icon:
'download' }, { name: '分享', icon: 'share' } ]
```

## 宫格模式

设置 `grid-mode` 属性可以将操作项以宫格形式展示：

```vue
<fanc-action-sheet v-model:show="showActionSheet" :actions="gridActions" grid-mode title="分享到" @select="onSelect" />

<!-- 数据结构 -->
gridActions: [ { name: '微信', icon: 'weixin', iconColor: '#07C160' }, { name: '朋友圈', icon: 'circle', iconColor:
'#07C160' }, { name: 'QQ', icon: 'qq', iconColor: '#1DA1F2' }, { name: '企业微信', icon: 'comments', iconColor:
'#1989FA' }, { name: '收藏', icon: 'star', iconColor: '#FF9500' }, { name: '复制', icon: 'copy', iconColor: '#8E8E93' },
{ name: '下载', icon: 'download', iconColor: '#8E8E93' } ]
```

## 自定义列数

可以通过 `column-number` 属性自定义宫格的列数：

```vue
<fanc-action-sheet
    v-model:show="showActionSheet"
    :actions="gridActions"
    grid-mode
    :column-number="3"
    title="更多操作"
    @select="onSelect"
/>
```

## 不同状态

支持不同的状态样式：

```vue
<fanc-action-sheet v-model:show="showActionSheet" :actions="actionsWithStatus" title="状态示例" @select="onSelect" />

<!-- 数据结构 -->
actionsWithStatus: [ { name: '正常选项', type: 'primary' }, { name: '禁用选项', disabled: true }, { name: '警告操作',
type: 'warning' }, { name: '危险操作', type: 'danger' }, { name: '成功操作', type: 'success' }, { name: '带有副标题',
subname: '这是副标题说明文字' } ]
```

## 异步操作

可以实现异步操作场景：

```vue
<fanc-action-sheet
    v-model:show="showAsync"
    :actions="asyncActions"
    title="异步操作示例"
    @select="onSelectAsyncAction"
/>

<!-- JS 部分 -->
methods: { onSelectAsyncAction(action, index) { // 更新当前操作项为加载状态 this.asyncActions[index].loading = true; //
模拟异步操作 setTimeout(() => { // 恢复加载状态 this.asyncActions[index].loading = false; // 显示操作结果
this.$message.show({ type: 'success', message: `完成 ${action.name} 操作` }); // 关闭动作面板 this.showAsync = false; },
1500); } }
```

## API

### Props

| 参数                | 说明                                 | 类型          | 默认值 |
| ------------------- | ------------------------------------ | ------------- | ------ |
| show                | 是否显示动作面板                     | Boolean       | false  |
| actions             | 操作项数组，数组项见下表             | Array         | []     |
| title               | 面板标题                             | String        | ''     |
| description         | 面板描述文字                         | String        | ''     |
| cancelText          | 取消按钮文字，不设置则不显示取消按钮 | String        | '取消' |
| overlay             | 是否显示遮罩层                       | Boolean       | true   |
| closeOnClickOverlay | 是否点击遮罩层后关闭                 | Boolean       | true   |
| showClose           | 是否显示关闭按钮                     | Boolean       | false  |
| duration            | 动画时长，单位为毫秒                 | Number/String | 300    |
| zIndex              | 面板的 z-index 值                    | Number/String | 1000   |
| customStyle         | 自定义面板样式                       | String/Object | ''     |
| customClass         | 自定义面板类名                       | String        | ''     |
| gridMode            | 是否使用宫格模式展示操作项           | Boolean       | false  |
| columnNumber        | 宫格模式的列数                       | Number/String | 4      |

### Action 数据结构

`actions` 数组中的选项对象结构如下：

| 键名          | 说明                                                      | 类型          | 默认值 |
| ------------- | --------------------------------------------------------- | ------------- | ------ |
| name          | 标题                                                      | String        | -      |
| subname       | 二级标题                                                  | String        | -      |
| disabled      | 是否为禁用状态                                            | Boolean       | false  |
| loading       | 是否为加载状态                                            | Boolean       | false  |
| icon          | 图标名称                                                  | String        | -      |
| iconSize      | 图标大小                                                  | String/Number | '18'   |
| iconColor     | 图标颜色                                                  | String        | -      |
| type          | 按钮类型，可选值为 default/primary/success/warning/danger | String        | -      |
| style         | 自定义样式                                                | Object        | -      |
| closeOnSelect | 是否在点击后关闭，设为 false 时需手动关闭                 | Boolean       | true   |

### Events

| 事件名       | 说明               | 回调参数                          |
| ------------ | ------------------ | --------------------------------- |
| select       | 选中选项时触发     | action: 选项对象, index: 选项索引 |
| cancel       | 取消按钮点击时触发 | -                                 |
| open         | 打开菜单时触发     | -                                 |
| close        | 关闭菜单时触发     | -                                 |
| clickOverlay | 点击遮罩层时触发   | -                                 |
