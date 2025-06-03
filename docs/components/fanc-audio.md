# fanc-audio 音频播放器组件

## 组件介绍

`fanc-audio` 是一个功能完善的音频播放器组件，用于音频文件的播放控制和展示。它支持多种主题样式，提供了丰富的播放控制功能和自定义选项，适用于音乐播放、语音消息、有声读物等场景。

## 组件特性

- 支持多种主题：默认、主要、成功、警告、危险和信息
- 支持播放/暂停、进度控制、音量调节等基础功能
- 支持封面图片展示和旋转效果
- 支持迷你模式，适用于空间有限的场景
- 支持禁用状态和自动播放
- 支持音频下载功能
- 支持循环播放功能
- 提供丰富的事件回调，方便业务逻辑处理

## 组件用法

### 基础用法

```vue
<fanc-audio
  src="https://example.com/audio.mp3"
  title="音频标题"
  author="作者名称"
  cover="https://example.com/cover.jpg"
></fanc-audio>
```

### 不同主题

```vue
<fanc-audio
  src="https://example.com/audio.mp3"
  title="音频标题"
  type="primary"
></fanc-audio>

<fanc-audio
  src="https://example.com/audio.mp3"
  title="音频标题"
  type="success"
></fanc-audio>

<fanc-audio
  src="https://example.com/audio.mp3"
  title="音频标题"
  type="warning"
></fanc-audio>

<fanc-audio
  src="https://example.com/audio.mp3"
  title="音频标题"
  type="danger"
></fanc-audio>

<fanc-audio
  src="https://example.com/audio.mp3"
  title="音频标题"
  type="info"
></fanc-audio>
```

### 迷你模式

适用于空间有限的场景，只显示播放/暂停按钮和标题。

```vue
<fanc-audio
  src="https://example.com/audio.mp3"
  title="音频标题"
  mini
></fanc-audio>
```

### 无封面

不显示封面图片，只展示控制区域。

```vue
<fanc-audio
  src="https://example.com/audio.mp3"
  title="音频标题"
  :showCover="false"
></fanc-audio>
```

### 下载按钮

显示下载按钮，允许用户下载音频文件。

```vue
<fanc-audio
  src="https://example.com/audio.mp3"
  title="音频标题"
  :showDownload="true"
></fanc-audio>
```

### 禁用状态

禁用状态下，用户无法操作播放器。

```vue
<fanc-audio
  src="https://example.com/audio.mp3"
  title="音频标题"
  disabled
></fanc-audio>
```

### 自动播放

页面加载后自动开始播放音频（注意：由于浏览器政策限制，自动播放可能会被阻止）。

```vue
<fanc-audio
  src="https://example.com/audio.mp3"
  title="音频标题"
  :autoplay="true"
></fanc-audio>
```

### 循环播放

音频播放完成后自动重新开始播放。

```vue
<fanc-audio
  src="https://example.com/audio.mp3"
  title="音频标题"
  :loop="true"
></fanc-audio>
```

### 事件监听

```vue
<fanc-audio
  src="https://example.com/audio.mp3"
  title="音频标题"
  @play="onPlay"
  @pause="onPause"
  @ended="onEnded"
  @timeupdate="onTimeUpdate"
  @volumechange="onVolumeChange"
></fanc-audio>
```

```javascript
export default {
  methods: {
    onPlay() {
      console.log('音频开始播放');
    },
    onPause() {
      console.log('音频暂停播放');
    },
    onEnded() {
      console.log('音频播放结束');
    },
    onTimeUpdate(data) {
      console.log('当前播放时间:', data.currentTime);
      console.log('总时长:', data.duration);
    },
    onVolumeChange(volume) {
      console.log('音量变化:', volume);
    }
  }
}
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| src | 音频源URL（必填） | String | - |
| title | 音频标题 | String | '' |
| author | 作者名称 | String | '' |
| cover | 封面图片URL | String | '' |
| type | 主题类型，可选值为 `default` `primary` `success` `warning` `danger` `info` | String | 'default' |
| autoplay | 是否自动播放 | Boolean | false |
| disabled | 是否禁用 | Boolean | false |
| mini | 是否使用迷你模式 | Boolean | false |
| showCover | 是否显示封面 | Boolean | true |
| showVolume | 是否显示音量控制 | Boolean | true |
| showDownload | 是否显示下载按钮 | Boolean | false |
| defaultVolume | 初始音量，范围 0-1 | Number | 1 |
| loop | 是否循环播放 | Boolean | false |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| play | 开始播放时触发 | - |
| pause | 暂停播放时触发 | - |
| ended | 播放结束时触发 | - |
| timeupdate | 播放进度更新时触发 | {currentTime, duration} |
| volumechange | 音量变化时触发 | volume: Number (0-1) |
| canplay | 音频可以播放时触发 | - |
| error | 音频加载错误时触发 | error对象 |
| waiting | 音频加载中时触发 | - |
| download | 点击下载按钮时触发 | src: String |

### Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| play | 开始播放 | - |
| pause | 暂停播放 | - |

## 注意事项

1. 由于浏览器安全策略限制，自动播放功能在某些浏览器中可能无法生效，需要用户与页面进行交互后才能播放。
2. 在某些平台（如iOS）上，音频播放需要用户主动触发，请避免在页面加载时自动播放。
3. 音频下载功能受浏览器安全策略影响，可能在某些情况下无法正常工作，建议根据实际情况自定义下载逻辑。
4. 在小程序环境中，请确保音频文件的域名已在小程序管理后台的"开发设置"中添加为合法域名。 