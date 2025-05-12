# 常见问题

本文档收集了使用 Fantastic UI 过程中常见的问题和解决方案。如果您在使用中遇到问题，可以先查阅此文档寻找答案。

## 安装和配置问题

### Q: 安装依赖时报错，如何解决？

A: 可能是网络问题或包冲突导致的，尝试以下解决方案：

1. 使用国内镜像源：

    ```bash
    # 设置淘宝镜像
    npm config set registry https://registry.npmmirror.com
    # 或
    yarn config set registry https://registry.npmmirror.com
    # 或
    pnpm config set registry https://registry.npmmirror.com
    ```

2. 清除缓存后重新安装：

    ```bash
    npm cache clean --force
    npm install
    # 或
    yarn cache clean
    yarn
    # 或
    pnpm store prune
    pnpm install
    ```

3. 检查 Node.js 版本是否符合要求（>= 12.0.0）。

### Q: 引入组件库后，样式没有正确加载怎么办？

A: 请检查以下几点：

1. 确认是否正确引入了样式文件：

    ```js
    // 在入口文件中引入样式
    import "fantastic-ui/dist/styles/index.css";
    ```

2. 如果使用按需引入，确保配置了相应的样式自动导入：

    ```js
    // babel.config.js
    module.exports = {
        plugins: [
            [
                "import",
                {
                    libraryName: "fantastic-ui",
                    libraryDirectory: "lib",
                    style: true,
                },
                "fantastic-ui",
            ],
        ],
    };
    ```

3. 检查构建工具配置是否正确处理 CSS/SCSS 文件。

## 使用问题

### Q: 组件在某些平台上显示异常，如何解决？

A: Fantastic UI 是跨平台组件库，在不同平台可能存在兼容性差异：

1. 确认组件库版本是否最新，许多兼容性问题在新版本中已修复
2. 检查是否使用了平台特定的 API 或样式
3. 参考 [兼容性指南](../guide/compatibility.md) 了解各平台差异
4. 对特定平台应用条件编译：

    ```html
    <!-- #ifdef H5 -->
    <fanc-button type="primary">H5 平台按钮</fanc-button>
    <!-- #endif -->

    <!-- #ifdef MP-WEIXIN -->
    <fanc-button type="success">微信小程序按钮</fanc-button>
    <!-- #endif -->
    ```

### Q: 如何处理按钮组件的防抖/节流？

A: Fantastic UI 的按钮组件没有内置防抖/节流功能，您可以：

1. 自行实现防抖/节流函数：

    ```js
    function debounce(func, wait) {
        let timeout;
        return function () {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(context, args);
            }, wait);
        };
    }

    export default {
        methods: {
            onClick: debounce(function () {
                // 处理点击事件
            }, 300),
        },
    };
    ```

2. 使用 `loading` 状态避免重复点击：
    ```html
    <fanc-button :loading="isLoading" @click="handleClick">提交</fanc-button>
    ```
    ```js
    methods: {
      async handleClick() {
        if (this.isLoading) return;
        this.isLoading = true;
        try {
          await this.submitData();
        } finally {
          this.isLoading = false;
        }
      }
    }
    ```

### Q: 如何实现表单验证？

A: Fantastic UI 目前没有内置表单验证功能，您可以：

1. 使用第三方库如 vee-validate、async-validator 等
2. 自行实现表单验证逻辑
3. 结合 uni-app 的表单组件使用

## 样式和主题问题

### Q: 如何修改组件的默认样式？

A: 有多种方式修改组件样式：

1. 使用主题定制，覆盖 SCSS 变量（参考[主题定制](./theme.md)）
2. 使用组件的 `custom-class` 或 `custom-style` 属性添加自定义样式
3. 使用样式穿透：
    ```scss
    .my-component {
        // 深度选择器，不同版本写法可能不同
        /deep/ .fanc-button {
            background-color: #8e44ad;
        }
        // 或
        ::v-deep .fanc-button {
            background-color: #8e44ad;
        }
        // 或
        :deep(.fanc-button) {
            background-color: #8e44ad;
        }
    }
    ```

### Q: 如何实现暗黑模式？

A: 参考[主题定制](./theme.md)中的暗黑模式部分，基本步骤为：

1. 定义暗黑模式的 CSS 变量
2. 通过添加/移除类名切换主题
3. 存储用户主题偏好

## 性能优化问题

### Q: 页面加载速度慢，如何优化？

A: 可以尝试以下优化措施：

1. 使用按需引入组件，减少包体积
2. 优化图片资源，使用适当的格式和压缩
3. 合理使用延迟加载和虚拟列表
4. 减少不必要的组件嵌套
5. 对于复杂列表，使用 `v-once` 或 `computed` 属性优化渲染

### Q: 在长列表中使用组件导致卡顿，如何解决？

A: 长列表渲染性能问题常见解决方案：

1. 使用虚拟滚动只渲染可视区域内的组件
2. 分页加载数据，减少一次性渲染的组件数量
3. 优化组件内部逻辑，减少不必要的计算和渲染
4. 使用 `key` 属性帮助 Vue 更高效地管理 DOM
5. 考虑使用 Fantastic UI 的 `fanc-list` 组件，它内置了虚拟滚动优化

## API 和功能问题

### Q: 为什么我的自定义事件没有触发？

A: 检查以下几点：

1. 事件名称是否正确（注意大小写和连字符）
2. 是否正确使用了 `@` 或 `v-on` 绑定事件
3. 在跨平台场景中，确认当前平台是否支持该事件
4. 检查是否有阻止事件冒泡的代码

### Q: 如何在组件中使用自定义图标？

A: Fantastic UI 支持多种方式使用自定义图标：

1. 使用图片 URL：

    ```html
    <fanc-icon name="/static/icons/custom.png" />
    ```

2. 使用 FontAwesome 图标库（已内置）：

    ```html
    <fanc-icon name="fas fa-custom-icon" />
    ```

3. 使用 SVG 图标：

    ```html
    <fanc-icon name="/static/icons/custom.svg" />
    ```

4. 自定义 Icon 组件：
    ```html
    <template #icon>
        <view class="custom-icon">自定义图标内容</view>
    </template>
    ```

## 其他问题

### Q: 组件库适配哪些屏幕尺寸？

A: Fantastic UI 组件库采用响应式设计，适配各种屏幕尺寸，从手机到平板再到桌面设备。组件使用相对单位（如 rem、em）和弹性布局，可以根据屏幕大小自动调整。

### Q: 组件库有哪些无障碍访问（A11Y）支持？

A: Fantastic UI 在无障碍访问方面做了以下努力：

1. 符合 WCAG 2.1 指南的颜色对比度
2. 键盘操作支持
3. 适当的语义化标签
4. ARIA 属性支持

### Q: 如何参与组件库的贡献？

A: 我们非常欢迎社区贡献！请参考[贡献指南](./contributing.md)了解如何参与贡献。

### Q: 在使用过程中遇到没有列出的问题怎么办？

A: 您可以通过以下渠道获取帮助：

1. 提交 [GitHub Issues](https://github.com/yourusername/fantastic-ui/issues)
2. 加入我们的社区交流群
3. 发送邮件至 support@fantastic-ui.com
4. 查阅详细的[API 文档](../README.md)
