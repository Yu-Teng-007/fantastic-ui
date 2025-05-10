# Fanc Icon 组件

基于 Font Awesome 的图标组件，用于在 Fantastic UI 中显示各种图标。

## 特性

-   基于 Font Awesome 图标库
-   支持自定义图标大小和颜色
-   支持点击事件
-   与 Fantastic UI 设计风格一致

## 使用方法

### 基础用法

```html
<fanc-icon name="home"></fanc-icon>
<fanc-icon name="user"></fanc-icon>
<fanc-icon name="search"></fanc-icon>
```

### 设置图标大小

```html
<fanc-icon name="cog" size="16"></fanc-icon>
<fanc-icon name="cog" size="24"></fanc-icon>
<fanc-icon name="cog" size="32"></fanc-icon>
```

### 设置图标颜色

```html
<fanc-icon name="heart" color="#dc3545"></fanc-icon>
<fanc-icon name="star" color="#ffc107"></fanc-icon>
<fanc-icon name="check" color="#28a745"></fanc-icon>
```

### 处理点击事件

```html
<fanc-icon name="bell" @click="handleIconClick"></fanc-icon>
```

```javascript
methods: {
    handleIconClick() {
        // 处理点击事件
        console.log('图标被点击了');
    }
}
```

## 属性

| 属性名      | 类型          | 默认值 | 说明                                                          |
| ----------- | ------------- | ------ | ------------------------------------------------------------- |
| name        | String        | -      | 图标名称，例如 'home'、'user' 等                              |
| type        | String        | 'fas'  | 图标类型，可选值：'fas'（实心）, 'far'（线框）, 'fab'（品牌） |
| size        | Number/String | 16     | 图标大小，可以是数字或带单位的字符串                          |
| color       | String        | -      | 图标颜色                                                      |
| customClass | String        | -      | 自定义类名                                                    |

## 事件

| 事件名 | 说明           | 回调参数     |
| ------ | -------------- | ------------ |
| click  | 点击图标时触发 | event: Event |

## 注意事项

1. 确保已在项目中引入 Font Awesome 图标库
2. 图标名称不需要包含前缀 'fa-'，组件会自动添加
3. 如需使用更多图标，请参考 [Font Awesome 官方文档](https://fontawesome.com/icons)
