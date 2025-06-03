# List 列表

List 列表组件用于展示长列表，支持瀑布流滚动加载功能。当列表即将滚动到底部时，会触发事件并加载更多列表项。

## 基础用法

设置 `loading` 和 `no-more` 属性来控制加载状态，监听 `load` 事件来触发加载更多的逻辑。

```html
<fanc-list :loading="loading" :no-more="noMore" @load="onLoad">
  <view v-for="(item, index) in list" :key="index" class="list-item">
    <text class="list-item__title">{{ item.title }}</text>
    <text class="list-item__desc">{{ item.desc }}</text>
  </view>
</fanc-list>
```

```js
export default {
  data() {
    return {
      loading: false,
      noMore: false,
      list: [],
      page: 1
    };
  },
  methods: {
    onLoad() {
      if (this.loading || this.noMore) return;
      this.loadMore();
    },
    loadMore() {
      this.loading = true;
      
      // 模拟异步请求
      setTimeout(() => {
        const newItems = [...]; // 加载新数据
        this.list = [...this.list, ...newItems];
        
        // 判断是否已加载全部数据
        if (this.page >= 3) {
          this.noMore = true;
        } else {
          this.page++;
        }
        
        this.loading = false;
      }, 1000);
    }
  }
};
```

## 错误状态与重试

当加载失败时，可以设置 `error` 属性显示错误状态，通过监听 `retry` 事件来处理重试逻辑。

```html
<fanc-list 
  :loading="loading" 
  :error="error" 
  :no-more="noMore" 
  @load="onLoad"
  @retry="onRetry"
>
  <!-- 列表内容 -->
</fanc-list>
```

```js
export default {
  data() {
    return {
      loading: false,
      error: false,
      noMore: false,
      // ...
    };
  },
  methods: {
    onLoad() {
      if (this.loading || this.noMore || this.error) return;
      this.loadMore();
    },
    loadMore() {
      this.loading = true;
      this.error = false;
      
      // 模拟请求失败
      if (this.page === 2) {
        setTimeout(() => {
          this.loading = false;
          this.error = true;
        }, 1000);
        return;
      }
      
      // 正常加载逻辑
      // ...
    },
    onRetry() {
      this.error = false;
      this.loadMore();
    }
  }
};
```

## 空列表提示

当列表为空时，可以通过 `is-empty` 属性显示空状态，支持自定义空状态内容。

```html
<fanc-list 
  :loading="loading" 
  :is-empty="isEmpty" 
  empty-text="暂无数据"
  @load="onLoad"
>
  <!-- 列表内容 -->
  
  <!-- 自定义空状态 -->
  <template #empty>
    <view class="custom-empty">
      <fanc-icon name="inbox" size="48" color="#cccccc"></fanc-icon>
      <text>暂无列表数据</text>
      <fanc-button size="small" type="primary" @click="refresh">刷新</fanc-button>
    </view>
  </template>
</fanc-list>
```

## 瀑布流布局

List组件不限制内容布局，可以与瀑布流布局结合使用，创建更丰富的视觉效果。

```html
<fanc-list :loading="loading" :no-more="noMore" @load="onLoad">
  <view class="waterfall-list">
    <view 
      v-for="(item, index) in list" 
      :key="index" 
      class="waterfall-item"
      :style="{ height: item.height + 'px' }"
    >
      <!-- 瀑布流内容 -->
    </view>
  </view>
</fanc-list>
```

```css
.waterfall-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.waterfall-item {
  width: 50%;
  padding: 8px;
  box-sizing: border-box;
}
```

## 自定义高度

可以通过 `custom-height` 属性设置列表的固定高度。

```html
<fanc-list custom-height="500px" :loading="loading" :no-more="noMore" @load="onLoad">
  <!-- 列表内容 -->
</fanc-list>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| loading | 是否显示加载中状态 | `Boolean` | `false` |
| no-more | 是否已加载全部数据 | `Boolean` | `false` |
| is-empty | 是否为空列表 | `Boolean` | `false` |
| error | 是否出现加载错误 | `Boolean` | `false` |
| threshold | 触发加载的距离阈值 (px) | `Number` | `300` |
| loading-text | 加载中的文字提示 | `String` | `加载中...` |
| no-more-text | 加载完成的文字提示 | `String` | `没有更多了` |
| empty-text | 空列表的文字提示 | `String` | `暂无数据` |
| error-text | 加载出错的文字提示 | `String` | `加载失败` |
| retry-text | 重试按钮的文字 | `String` | `重新加载` |
| custom-height | 自定义列表高度 | `String` | `''` |
| immediate-check | 是否在挂载时立即检查位置 | `Boolean` | `true` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| load | 列表滚动到底部时触发加载事件 | - |
| retry | 点击错误状态下的重试按钮时触发 | - |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 列表内容 |
| empty | 自定义空状态内容 |

### 方法

通过 ref 可以获取到 List 实例并调用实例方法。

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| check | 检查位置并触发加载（需要在数据变化后手动触发检查） | - |

## 主题定制

### CSS变量

| 名称 | 默认值 | 说明 |
| --- | --- | --- |
| --list-bg-color | var(--bg-white) | 列表背景色 |
| --list-loading-text-color | var(--text-secondary) | 加载文字颜色 |
| --list-loading-spinner-color | var(--fanc-primary-color) | 加载图标颜色 |
| --list-error-text-color | var(--text-secondary) | 错误文字颜色 |
| --list-error-retry-color | var(--fanc-primary-color) | 重试按钮文字颜色 |
| --list-error-retry-border-color | var(--fanc-primary-color) | 重试按钮边框颜色 |
| --list-no-more-text-color | var(--text-secondary) | 无更多数据文字颜色 |
| --list-empty-icon-color | var(--gray-300) | 空状态图标颜色 |
| --list-empty-icon-bg-color | var(--gray-100) | 空状态图标背景色 |
| --list-empty-text-color | var(--text-secondary) | 空状态文字颜色 |
| --list-item-divider-color | var(--border-color-light) | 列表项分割线颜色 |
| --list-loading-duration | 0.8s | 加载动画持续时间 |
| --list-transition-duration | 0.3s | 过渡动画持续时间 |
| --list-loading-size | 20px | 加载图标尺寸 |
| --list-footer-padding | 16px 0 | 底部区域内边距 |
| --list-empty-padding | 40px 0 | 空状态区域内边距 |
| --list-empty-icon-size | 80px | 空状态图标尺寸 |
| --list-font-size | 14px | 文字大小 |
| --list-border-radius | 4px | 边框圆角 | 