# Image 图片

增强版的图片组件，支持懒加载、加载中提示、加载失败提示等特性。

## 基础用法

基础的图片展示用法。

```html
<fanc-image src="https://example.com/image.jpg" width="200" height="200" />
```

## 图片模式

通过 `mode` 属性可以设置图片裁剪、缩放的模式，与 UniApp 原生 image 组件的 mode 属性完全一致。

```html
<fanc-image src="https://example.com/image.jpg" width="100" height="100" mode="aspectFill" />
```

### mode 属性值说明

| 值           | 说明                                                                                      |
| ------------ | ----------------------------------------------------------------------------------------- |
| scaleToFill  | 不保持纵横比缩放图片，使图片完全拉伸填满元素                                              |
| aspectFit    | 保持纵横比缩放图片，使图片的长边能完全显示出来（等同于 CSS 的 contain）                   |
| aspectFill   | 保持纵横比缩放图片，只保证图片的短边能完全显示出来，长边将会被裁剪（等同于 CSS 的 cover） |
| widthFix     | 宽度不变，高度自动变化，保持原图宽高比不变                                                |
| heightFix    | 高度不变，宽度自动变化，保持原图宽高比不变                                                |
| top          | 不缩放图片，只显示图片的顶部区域                                                          |
| bottom       | 不缩放图片，只显示图片的底部区域                                                          |
| center       | 不缩放图片，只显示图片的中间区域                                                          |
| left         | 不缩放图片，只显示图片的左边区域                                                          |
| right        | 不缩放图片，只显示图片的右边区域                                                          |
| top left     | 不缩放图片，只显示图片的左上边区域                                                        |
| top right    | 不缩放图片，只显示图片的右上边区域                                                        |
| bottom left  | 不缩放图片，只显示图片的左下边区域                                                        |
| bottom right | 不缩放图片，只显示图片的右下边区域                                                        |

## 圆形图片

通过 `round` 属性可以设置图片变圆。

```html
<fanc-image src="https://example.com/image.jpg" width="100" height="100" mode="aspectFill" round />
```

## 图片懒加载

设置 `lazy-load` 属性来开启图片懒加载，需要注意的是，使用懒加载时，需要保证图片组件处于可视区域内。

```html
<fanc-image src="https://example.com/image.jpg" width="100" height="100" lazy-load />
```

## 加载中提示

Image 组件提供了默认的加载中提示，支持通过 `loading-text` 设置提示文字。

```html
<fanc-image src="https://example.com/image.jpg" width="100" height="100" loading-text="加载中..." />
```

## 加载失败提示

Image 组件提供了默认的加载失败提示，支持通过 `error-text` 设置提示文字。

```html
<fanc-image src="https://error-image-url.jpg" width="100" height="100" error-text="加载失败" />
```

## 加载失败后备图片

通过 `fallbackSrc` 属性设置图片加载失败时显示的替代图片。

```html
<fanc-image src="https://error-image-url.jpg" fallbackSrc="/static/img/demo/fail_load.png" width="100" height="100" />
```

## 自定义大小

通过 `width` 和 `height` 属性设置图片大小，支持数值或带单位字符串。

```html
<fanc-image src="https://example.com/image.jpg" width="100px" height="100px" />

<fanc-image src="https://example.com/image.jpg" width="100" height="100" />

<fanc-image src="https://example.com/image.jpg" width="100%" height="100" />
```

## 事件监听

支持监听图片的加载成功、加载失败和点击事件。

```html
<fanc-image
    src="https://example.com/image.jpg"
    width="100"
    height="100"
    @load="onImageLoad"
    @error="onImageError"
    @click="onImageClick"
/>
```

```js
export default {
    methods: {
        onImageLoad(event) {
            console.log("图片加载成功", event);
        },
        onImageError(event) {
            console.log("图片加载失败", event);
        },
        onImageClick(event) {
            console.log("图片被点击", event);
        },
    },
};
```

## 插槽自定义

支持通过插槽自定义加载中和加载失败的提示内容。

```html
<fanc-image src="https://example.com/image.jpg" width="100" height="100">
    <template #loading>
        <view class="custom-loading">自定义加载中...</view>
    </template>

    <template #error>
        <view class="custom-error">自定义加载失败</view>
    </template>
</fanc-image>
```

## API

### Props

| 参数                   | 说明                                          | 类型               | 默认值       |
| ---------------------- | --------------------------------------------- | ------------------ | ------------ |
| src                    | 图片链接                                      | _string_           | -            |
| mode                   | 图片裁剪、缩放的模式，同 UniApp 的 image 组件 | _string_           | `aspectFill` |
| width                  | 宽度，支持数值或带单位字符串                  | _number \| string_ | `100px`      |
| height                 | 高度，支持数值或带单位字符串                  | _number \| string_ | `100px`      |
| round                  | 是否显示为圆形                                | _boolean_          | `false`      |
| lazy-load              | 是否开启图片懒加载                            | _boolean_          | `false`      |
| loading-text           | 加载中提示文字                                | _string_           | -            |
| error-text             | 加载失败提示文字                              | _string_           | -            |
| background             | 背景颜色                                      | _string_           | -            |
| show-menu-by-longpress | 是否开启长按图片显示识别小程序码菜单          | _boolean_          | `false`      |
| custom-style           | 自定义样式对象                                | _object_           | -            |
| fallbackSrc            | 加载失败时显示的替代图片                      | _string_           | -            |

### Events

| 事件名 | 说明               | 回调参数       |
| ------ | ------------------ | -------------- |
| load   | 图片加载完成时触发 | _event: Event_ |
| error  | 图片加载失败时触发 | _event: Event_ |
| click  | 点击图片时触发     | _event: Event_ |

### Slots

| 名称    | 说明                   |
| ------- | ---------------------- |
| loading | 自定义加载中提示内容   |
| error   | 自定义加载失败提示内容 |

## 主题定制

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                       | 默认值          | 说明             |
| -------------------------- | --------------- | ---------------- |
| --image-bg-color           | var(--gray-100) | 图片背景颜色     |
| --image-error-bg-color     | var(--gray-100) | 加载失败背景颜色 |
| --image-error-icon-color   | var(--gray-400) | 加载失败图标颜色 |
| --image-error-text-color   | var(--gray-600) | 加载失败文本颜色 |
| --image-loading-bg-color   | var(--gray-100) | 加载中背景颜色   |
| --image-loading-icon-color | var(--gray-400) | 加载中图标颜色   |
| --image-loading-text-color | var(--gray-600) | 加载中文本颜色   |

```

```
