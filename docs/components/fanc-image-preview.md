# fanc-image-preview 图片预览组件

## 组件介绍

`fanc-image-preview` 是一个功能丰富的图片预览组件，用于查看和浏览图片。它支持手势缩放、轮播切换、双击放大、保存图片等功能，支持组件调用和函数调用两种使用方式，满足不同场景的图片预览需求。

## 组件特性

- 支持组件调用和函数调用两种使用方式
- 支持多图片滑动切换和循环预览
- 支持手势缩放和双击放大
- 支持图片索引展示
- 支持图片下载和分享
- 支持自定义底部操作栏
- 支持点击蒙层关闭
- 支持事件监听和回调

## 组件用法

### 组件调用方式

```vue
<template>
  <!-- 显示预览按钮 -->
  <fanc-button type="primary" @click="showPreview = true">打开图片预览</fanc-button>
  
  <!-- 图片预览组件 -->
  <fanc-image-preview
    :show="showPreview"
    :images="images"
    :start-index="currentIndex"
    @close="showPreview = false"
    @change="handleChange"
  ></fanc-image-preview>
</template>

<script>
export default {
  data() {
    return {
      showPreview: false,
      currentIndex: 0,
      images: [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
        'https://example.com/image3.jpg'
      ]
    }
  },
  methods: {
    handleChange(index) {
      this.currentIndex = index;
    }
  }
}
</script>
```

### 函数调用方式

```js
// 基础用法
this.$imagePreview({
  images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
  startIndex: 0
});

// 传入配置选项
this.$imagePreview({
  images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
  startIndex: 0,
  loop: true,
  showIndex: true,
  showFooter: true,
  onClose: () => {
    console.log('预览关闭');
  },
  onChange: (index) => {
    console.log('当前图片索引:', index);
  }
});

// 单张图片预览
this.$imagePreview('https://example.com/image.jpg');

// 手动关闭
this.$imagePreview.close();
```

### 显示底部操作栏

```js
this.$imagePreview({
  images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
  showFooter: true,
  onDownload: ({ index, url }) => {
    console.log('下载图片:', url);
  },
  onShare: ({ index, url }) => {
    console.log('分享图片:', url);
  }
});
```

### 禁用循环切换

```js
this.$imagePreview({
  images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
  loop: false
});
```

### 指定起始位置

```js
this.$imagePreview({
  images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg', 'https://example.com/image3.jpg'],
  startIndex: 1  // 从第二张图片开始预览
});
```

### 自定义底部操作区域

```vue
<fanc-image-preview :show="showPreview" :images="images">
  <template #footer>
    <view class="custom-footer">
      <view class="custom-action" @click="handleCustomAction">
        <fanc-icon name="star" size="20" color="#fff"></fanc-icon>
        <text>收藏</text>
      </view>
      <view class="custom-action" @click="handleDelete">
        <fanc-icon name="trash" size="20" color="#fff"></fanc-icon>
        <text>删除</text>
      </view>
    </view>
  </template>
</fanc-image-preview>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| images | 需要预览的图片 URL 数组，支持字符串数组或对象数组，对象格式 {url, src} | Array | `[]` |
| show | 是否显示图片预览 | Boolean | `false` |
| start-index | 图片预览起始位置索引 | Number | `0` |
| loop | 是否开启循环播放 | Boolean | `true` |
| closeable | 是否显示关闭按钮 | Boolean | `true` |
| show-index | 是否显示页码 | Boolean | `true` |
| show-footer | 是否显示底部操作栏 | Boolean | `false` |
| mask-close | 点击蒙层是否关闭图片预览 | Boolean | `true` |
| double-tap-zoom | 是否开启双击缩放 | Boolean | `true` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| close | 关闭图片预览时触发 | - |
| change | 切换图片时触发 | index: 当前图片索引 |
| load | 图片加载完成时触发 | {index, event} |
| error | 图片加载失败时触发 | {index, event} |
| download | 点击下载按钮时触发 | {index, url} |
| share | 点击分享按钮时触发 | {index, url} |

### Slots

| 名称 | 说明 |
| --- | --- |
| footer | 自定义底部操作区域内容 |

### 函数调用方式 API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| images | 需要预览的图片 URL 数组，支持字符串数组或对象数组，对象格式 {url, src} | Array | `[]` |
| startIndex | 图片预览起始位置索引 | Number | `0` |
| loop | 是否开启循环播放 | Boolean | `true` |
| closeable | 是否显示关闭按钮 | Boolean | `true` |
| showIndex | 是否显示页码 | Boolean | `true` |
| showFooter | 是否显示底部操作栏 | Boolean | `false` |
| maskClose | 点击蒙层是否关闭图片预览 | Boolean | `true` |
| doubleTapZoom | 是否开启双击缩放 | Boolean | `true` |
| onClose | 关闭图片预览时的回调函数 | Function | - |
| onChange | 切换图片时的回调函数 | Function | - |
| onLoad | 图片加载完成时的回调函数 | Function | - |
| onError | 图片加载失败时的回调函数 | Function | - |
| onDownload | 点击下载按钮时的回调函数 | Function | - |
| onShare | 点击分享按钮时的回调函数 | Function | - |

### 方法

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| $imagePreview | 打开图片预览 | options |
| $imagePreview.close | 关闭图片预览 | - |
| $imagePreview.setDefaultConfig | 修改默认配置 | options |
| $imagePreview.resetDefaultConfig | 重置默认配置 | - |

## 注意事项

1. 使用函数调用方式时，如果传入字符串，会被视为单张图片预览
2. 使用函数调用方式时，如果传入数组，会被视为多张图片预览
3. 图片加载失败时，会展示加载错误状态
4. 底部操作栏提供的下载和分享功能在不同平台有不同的实现方式
5. 手势缩放功能依赖于 movable-view 组件，在低版本平台可能存在兼容性问题
6. 双击缩放功能通过判断两次点击的时间间隔实现，默认300ms内的两次点击视为双击
7. 自定义底部操作区域时，通过 footer 插槽来实现，只适用于组件调用方式
8. 函数调用方式创建的图片预览实例会被缓存，多次调用会复用同一个实例 