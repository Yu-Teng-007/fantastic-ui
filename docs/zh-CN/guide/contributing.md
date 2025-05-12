# 贡献指南

感谢您对 Fantastic UI 的关注和支持！我们非常欢迎各种形式的贡献，包括但不限于提交问题、改进文档、修复 Bug、开发新功能等。本指南将帮助您了解如何参与贡献 Fantastic UI 组件库。

## 行为准则

参与 Fantastic UI 项目的所有贡献者都应遵循我们的行为准则：

-   尊重每一位贡献者
-   鼓励开放和包容的讨论
-   注重技术本身，避免无关争论
-   保持建设性的交流态度

## 贡献流程

### 1. 提交问题（Issues）

如果您在使用过程中发现问题或有新功能建议，请先查看现有 Issues 是否已经有相关讨论。如果没有，可以创建新的 Issue，并提供以下信息：

-   问题描述：清晰描述问题或建议
-   复现步骤：如何重现这个问题
-   预期结果：您期望的正确行为
-   实际结果：实际发生的情况
-   环境信息：操作系统、浏览器版本、组件库版本等

### 2. 准备开发环境

如果您希望通过提交代码参与贡献，请按以下步骤准备开发环境：

1. Fork 项目仓库到您的 GitHub 账户
2. 克隆您 Fork 的仓库到本地：

```bash
git clone https://github.com/您的用户名/fantastic-ui.git
cd fantastic-ui
```

3. 安装依赖：

```bash
# 推荐使用 pnpm
pnpm install

# 或使用 npm
npm install

# 或使用 yarn
yarn
```

4. 设置上游仓库：

```bash
git remote add upstream https://github.com/原始仓库拥有者/fantastic-ui.git
```

### 3. 开发新功能或修复问题

1. 创建新的分支：

```bash
# 创建并切换到新分支，分支名应能反映您的修改内容
git checkout -b feature/new-component
# 或
git checkout -b fix/button-issue
```

2. 进行开发和修改

3. 遵循编码规范：

    - 使用 TypeScript 编写代码
    - 遵循项目的代码风格（ESLint 和 Prettier 配置）
    - 编写必要的测试用例
    - 更新相关文档

4. 提交您的修改：

```bash
git add .
git commit -m "feat: 添加新组件" # 使用语义化提交信息
```

提交信息请使用以下规范：

-   `feat`: 新功能
-   `fix`: 修复 Bug
-   `docs`: 仅修改文档
-   `style`: 不影响代码功能的样式修改
-   `refactor`: 重构（即不是新功能，也不是修复 Bug）
-   `perf`: 性能优化
-   `test`: 增加或修改测试用例
-   `chore`: 构建过程或辅助工具的变动

### 4. 提交 Pull Request (PR)

1. 将您的分支推送到 GitHub：

```bash
git push origin 您的分支名
```

2. 在 GitHub 上创建 Pull Request
3. 在 PR 描述中：
    - 关联相关 Issue
    - 简要描述您的修改
    - 说明测试方法和结果

### 5. 代码审查和合并

PR 提交后，项目维护者会进行代码审查，可能会提出修改建议。您需要根据反馈进行调整，直到 PR 被接受。

## 开发指南

### 项目结构

```
fantastic-ui/
├── docs/                 # 文档
├── src/                  # 源代码
│   ├── components/       # 组件目录
│   │   ├── fanc-button/  # 按钮组件
│   │   ├── fanc-icon/    # 图标组件
│   │   └── ...
│   ├── styles/           # 样式文件
│   ├── utils/            # 工具函数
│   └── index.js          # 入口文件
├── public/               # 静态资源
├── tests/                # 测试文件
├── package.json          # 项目配置
└── README.md             # 项目说明
```

### 组件开发规范

#### 1. 文件命名

-   组件目录使用 `fanc-` 前缀，如 `fanc-button`
-   组件文件使用 `index.vue` 命名
-   类型定义文件使用 `index.d.ts` 命名

#### 2. 组件样式

-   组件样式使用 SCSS 编写
-   组件样式应使用 `fanc-` 前缀避免冲突
-   使用变量控制主题样式

#### 3. 组件接口设计

-   Props 设计要考虑灵活性和易用性
-   提供必要的事件回调
-   组件应支持自定义样式和插槽

### 版本发布流程

我们使用语义化版本控制（SemVer）来管理版本：

-   主版本号（Major）：不兼容的 API 变更
-   次版本号（Minor）：向下兼容的功能新增
-   修订号（Patch）：向下兼容的问题修复

## 文档贡献

除了代码贡献外，我们也非常欢迎文档改进：

1. 修正错别字和语法错误
2. 完善组件使用文档
3. 添加更多示例和最佳实践
4. 翻译文档到其他语言

## 常见问题

### Q: 我不会写代码，如何贡献？

A: 您可以通过提交错误报告、改进文档、参与讨论等方式贡献。

### Q: 我有一个组件想法，如何提出？

A: 请创建 Issue 描述您的想法，包括使用场景、功能需求等。

### Q: 提交代码前需要进行哪些检查？

A: 确保代码通过 ESLint 检查，测试用例通过，文档更新完整。

## 联系我们

如果您有任何问题或建议，可以通过以下方式联系我们：

-   GitHub Issues: [https://github.com/yourusername/fantastic-ui/issues](https://github.com/yourusername/fantastic-ui/issues)
-   邮箱: support@fantastic-ui.com
-   社区交流群: [具体信息]

再次感谢您对 Fantastic UI 的贡献！
