# Signature 签名组件

签名组件用于手写签名场景，支持导出签名图片，适用于电子合同、快递签收等业务场景。

## 基础用法

基础的签名组件用法，提供清除、确认和取消操作。

```html
<fanc-signature @confirm="onConfirm" @cancel="onCancel" @clear="onClear" />
```

```javascript
export default {
  methods: {
    onConfirm(base64) {
      console.log('签名已确认', base64);
    },
    onCancel() {
      console.log('已取消签名');
    },
    onClear() {
      console.log('已清除签名');
    }
  }
}
```

## 自定义画笔

可以自定义画笔颜色和宽度。

```html
<fanc-signature penColor="#007bff" :penWidth="5" />
```

## 自定义尺寸

可以自定义签名区域的宽度和高度。

```html
<fanc-signature width="100%" :height="150" />
```

## 自定义按钮文本

可以自定义操作按钮的文本。

```html
<fanc-signature clearText="重写" confirmText="完成" cancelText="放弃" />
```

## 隐藏部分按钮

可以选择性地隐藏某些操作按钮。

```html
<fanc-signature :showCancel="false" />
```

## 禁用状态

禁用状态下无法进行签名操作。

```html
<fanc-signature disabled />
```

## 透明背景

导出的签名图片可以使用透明背景。

```html
<fanc-signature :isTransparent="true" background="#f8f8f8" />
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| penColor | 画笔颜色 | _string_ | `#000000` |
| penWidth | 画笔宽度 | _number_ | `3` |
| width | 画布宽度 | _string \| number_ | `100%` |
| height | 画布高度 | _string \| number_ | `200` |
| disabled | 是否禁用 | _boolean_ | `false` |
| showActions | 是否显示操作按钮 | _boolean_ | `true` |
| showClear | 是否显示清除按钮 | _boolean_ | `true` |
| showConfirm | 是否显示确认按钮 | _boolean_ | `true` |
| showCancel | 是否显示取消按钮 | _boolean_ | `true` |
| clearText | 清除按钮文本 | _string_ | `清除` |
| confirmText | 确认按钮文本 | _string_ | `确认` |
| cancelText | 取消按钮文本 | _string_ | `取消` |
| background | 画布背景色 | _string_ | `#ffffff` |
| isTransparent | 导出图片是否透明背景 | _boolean_ | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| confirm | 确认签名时触发 | `base64: string` (签名图片的base64编码) |
| cancel | 取消签名时触发 | - |
| clear | 清除签名时触发 | - |
| start | 开始签名时触发 | `event: TouchEvent` |
| signing | 签名过程中触发 | `event: TouchEvent` |
| end | 结束签名时触发 | `event: TouchEvent` |

### 方法

通过 ref 可以获取到 Signature 实例并调用实例方法。

```javascript
const signatureRef = this.$refs.signature;
```

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| clear | 清除签名 | - | - |
| handleConfirm | 确认签名 | - | - |
| handleCancel | 取消签名 | - | - |

## 常见问题

### 1. 如何保存签名图片？

签名组件通过 `confirm` 事件返回签名图片的 base64 编码，可以将其保存为图片文件或直接用于表单提交。

```javascript
onConfirm(base64) {
  // 保存到服务器
  api.uploadImage(base64);
  
  // 或保存到本地
  uni.saveImageToPhotosAlbum({
    filePath: base64,
    success: () => {
      uni.showToast({ title: '保存成功' });
    }
  });
}
```

### 2. 如何调整签名的平滑度？

签名组件内部使用贝塞尔曲线进行平滑处理，可以通过调整画笔宽度来间接影响签名的平滑效果。

### 3. 在不同设备上的兼容性如何？

签名组件已针对不同设备的像素密度进行了适配，确保在不同设备上有一致的显示效果。

### 4. 如何在表单中使用签名组件？

可以将签名组件集成到表单中，在表单提交时获取签名结果：

```html
<form @submit="onSubmit">
  <!-- 其他表单项 -->
  <fanc-signature ref="signature" @confirm="onSignatureConfirm" />
  <button form-type="submit">提交表单</button>
</form>
```

```javascript
export default {
  data() {
    return {
      formData: {
        // 其他表单数据
        signature: ''
      }
    }
  },
  methods: {
    onSignatureConfirm(base64) {
      this.formData.signature = base64;
    },
    onSubmit() {
      // 如果没有签名，可以主动调用确认方法
      if (!this.formData.signature) {
        this.$refs.signature.handleConfirm();
      }
      
      // 提交表单
      if (this.formData.signature) {
        api.submitForm(this.formData);
      } else {
        uni.showToast({ title: '请先签名', icon: 'none' });
      }
    }
  }
}
``` 