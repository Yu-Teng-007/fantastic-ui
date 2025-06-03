# fanc-video 视频播放器组件

## 组件介绍

`fanc-video` 是一个功能完善的视频播放器组件，用于视频文件的播放控制和展示。它支持多种主题样式，提供了丰富的播放控制功能和自定义选项，适用于视频播放、教学视频、产品展示等场景。

## 组件特性

- 支持多种主题：默认、主要、成功、警告、危险和信息
- 支持播放/暂停、进度控制、音量调节等基础功能
- 支持封面图片展示和中央播放按钮
- 支持全屏播放和画中画模式（如果浏览器支持）
- 支持禁用状态和自动播放
- 支持循环播放和静音功能
- 支持多种视频填充模式：包含、覆盖和填充
- 提供丰富的事件回调，方便业务逻辑处理
- 支持显示缓冲进度和加载状态

## 组件用法

### 基础用法

```vue
<fanc-video
  src="https://example.com/video.mp4"
  poster="https://example.com/poster.jpg"
></fanc-video>
```

### 不同主题

```vue
<fanc-video
  src="https://example.com/video.mp4"
  poster="https://example.com/poster.jpg"
  type="primary"
></fanc-video>

<fanc-video
  src="https://example.com/video.mp4"
  poster="https://example.com/poster.jpg"
  type="success"
></fanc-video>

<fanc-video
  src="https://example.com/video.mp4"
  poster="https://example.com/poster.jpg"
  type="warning"
></fanc-video>

<fanc-video
  src="https://example.com/video.mp4"
  poster="https://example.com/poster.jpg"
  type="danger"
></fanc-video>

<fanc-video
  src="https://example.com/video.mp4"
  poster="https://example.com/poster.jpg"
  type="info"
></fanc-video>
```

### 不同填充模式

```vue
<!-- 包含模式：保持原始比例，可能有黑边 -->
<fanc-video
  src="https://example.com/video.mp4"
  poster="https://example.com/poster.jpg"
  object-fit="contain"
></fanc-video>

<!-- 覆盖模式：填满容器，可能裁剪部分内容 -->
<fanc-video
  src="https://example.com/video.mp4"
  poster="https://example.com/poster.jpg"
  object-fit="cover"
></fanc-video>

<!-- 填充模式：拉伸以适应容器 -->
<fanc-video
  src="https://example.com/video.mp4"
  poster="https://example.com/poster.jpg"
  object-fit="fill"
></fanc-video>
```

### 禁用状态

禁用状态下，用户无法操作播放器。

```vue
<fanc-video
  src="https://example.com/video.mp4"
  poster="https://example.com/poster.jpg"
  disabled
></fanc-video>
```

### 自动播放

页面加载后自动开始播放视频（注意：由于浏览器政策限制，通常需要静音才能自动播放）。

```vue
<fanc-video
  src="https://example.com/video.mp4"
  poster="https://example.com/poster.jpg"
  :autoplay="true"
  :muted="true"
></fanc-video>
```

### 循环播放

视频播放完成后自动重新开始播放。

```vue
<fanc-video
  src="https://example.com/video.mp4"
  poster="https://example.com/poster.jpg"
  :loop="true"
></fanc-video>
```

### 初始静音

初始状态下静音播放视频。

```vue
<fanc-video
  src="https://example.com/video.mp4"
  poster="https://example.com/poster.jpg"
  :muted="true"
></fanc-video>
```

### 事件监听

```vue
<fanc-video
  src="https://example.com/video.mp4"
  poster="https://example.com/poster.jpg"
  @play="onPlay"
  @pause="onPause"
  @ended="onEnded"
  @timeupdate="onTimeUpdate"
  @loadedmetadata="onLoadedMetadata"
  @fullscreenchange="onFullscreenChange"
></fanc-video>
```

```javascript
export default {
  methods: {
    onPlay() {
      console.log('视频开始播放');
    },
    onPause() {
      console.log('视频暂停播放');
    },
    onEnded() {
      console.log('视频播放结束');
    },
    onTimeUpdate(data) {
      console.log('当前播放时间:', data.currentTime);
      console.log('总时长:', data.duration);
    },
    onLoadedMetadata(data) {
      console.log('视频元数据加载完成，时长:', data.duration);
    },
    onFullscreenChange(isFullscreen) {
      console.log('全屏状态变化:', isFullscreen);
    }
  }
}
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| src | 视频源URL（必填） | String | - |
| poster | 封面图片URL | String | '' |
| type | 主题类型，可选值为 `default` `primary` `success` `warning` `danger` `info` | String | 'default' |
| autoplay | 是否自动播放 | Boolean | false |
| loop | 是否循环播放 | Boolean | false |
| muted | 是否静音 | Boolean | false |
| disabled | 是否禁用 | Boolean | false |
| initialTime | 视频起始播放位置 | Number | 0 |
| duration | 指定视频时长 | Number | 0 |
| objectFit | 视频填充模式，可选值为 `contain` `fill` `cover` | String | 'contain' |
| showLoading | 是否显示加载中画面 | Boolean | true |
| enableProgressGesture | 是否开启控制进度的手势 | Boolean | true |
| direction | 设置全屏时视频的方向，可选值为 `0` `90` `-90` | Number | 0 |
| showControls | 是否显示控制栏 | Boolean | true |
| showVolume | 是否显示音量按钮 | Boolean | true |
| showFullscreen | 是否显示全屏按钮 | Boolean | true |
| showPictureInPicture | 是否显示画中画按钮 | Boolean | false |
| showCenterPlayBtn | 是否显示视频中央的播放按钮 | Boolean | true |
| videoId | 视频元素的id，用于获取video上下文 | String | 'fancVideo' |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| play | 开始播放时触发 | - |
| pause | 暂停播放时触发 | - |
| ended | 播放结束时触发 | - |
| timeupdate | 播放进度更新时触发 | {currentTime, duration} |
| loadedmetadata | 视频元数据加载完成时触发 | {width, height, duration} |
| fullscreenchange | 全屏状态变化时触发 | isFullscreen: Boolean |
| waiting | 视频加载中时触发 | - |
| error | 视频加载错误时触发 | error对象 |
| progress | 视频缓冲进度更新时触发 | {buffered} |
| mutechange | 静音状态变化时触发 | isMuted: Boolean |

### Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| play | 开始播放 | - |
| pause | 暂停播放 | - |
| seek | 跳转到指定时间 | time: Number (秒) |
| toggleFullscreen | 切换全屏状态 | - |
| toggleMute | 切换静音状态 | - |

## 注意事项

1. 由于浏览器安全策略限制，自动播放功能在没有用户交互的情况下通常需要设置 `muted` 为 `true` 才能生效。
2. 全屏功能和画中画功能在不同平台和浏览器的支持情况可能不同，使用前请先测试。
3. 为了获得最佳性能，建议为视频设置合适的封面图 `poster`，避免加载大量视频内容。
4. 在小程序环境中，请确保视频文件的域名已在小程序管理后台的"开发设置"中添加为合法域名。
5. 移动端设备可能限制视频的自动播放和后台播放，请根据实际情况调整使用方式。 