<template>
    <view class="action-sheet-example">
        <view class="example-section">
            <view class="section-title">基础用法</view>
            <fanc-button type="primary" @click="showBasic = true">基础动作面板</fanc-button>
            <fanc-action-sheet
                v-model:show="showBasic"
                :actions="basicActions"
                @select="onSelectAction"
                @cancel="onCancel"
                @close="onCloseAction('basic')"
                @open="onOpenAction('basic')"
            />
        </view>

        <view class="example-section">
            <view class="section-title">带标题和描述</view>
            <fanc-button type="primary" @click="showWithTitle = true">带标题动作面板</fanc-button>
            <fanc-action-sheet
                v-model:show="showWithTitle"
                :actions="basicActions"
                title="订单操作"
                description="请选择要执行的操作"
                @select="onSelectAction"
                @cancel="onCancel"
                @close="onCloseAction('title')"
                @open="onOpenAction('title')"
            />
        </view>

        <view class="example-section">
            <view class="section-title">带图标</view>
            <fanc-button type="primary" @click="showWithIcon = true">带图标动作面板</fanc-button>
            <fanc-action-sheet
                v-model:show="showWithIcon"
                :actions="actionsWithIcon"
                title="请选择操作"
                @select="onSelectAction"
                @cancel="onCancel"
                @close="onCloseAction('icon')"
                @open="onOpenAction('icon')"
            />
        </view>

        <view class="example-section">
            <view class="section-title">状态示例</view>
            <fanc-button type="primary" @click="showWithStatus = true">状态示例</fanc-button>
            <fanc-action-sheet
                v-model:show="showWithStatus"
                :actions="actionsWithStatus"
                title="状态示例"
                @select="onSelectAction"
                @cancel="onCancel"
                @close="onCloseAction('status')"
                @open="onOpenAction('status')"
            />
        </view>

        <view class="example-section">
            <view class="section-title">自定义关闭按钮</view>
            <fanc-button type="primary" @click="showWithClose = true">自定义关闭按钮</fanc-button>
            <fanc-action-sheet
                v-model:show="showWithClose"
                :actions="basicActions"
                title="自定义关闭"
                :show-close="true"
                cancel-text=""
                @select="onSelectAction"
                @close="onClose"
                @open="onOpenAction('close')"
            />
        </view>

        <view class="example-section">
            <view class="section-title">异步操作</view>
            <fanc-button type="primary" @click="showAsync = true">异步操作</fanc-button>
            <fanc-action-sheet
                v-model:show="showAsync"
                :actions="asyncActions"
                title="异步操作示例"
                @select="onSelectAsyncAction"
                @cancel="onCancel"
                @close="onCloseAction('async')"
                @open="onOpenAction('async')"
            />
        </view>

        <fanc-message ref="message" />
    </view>
</template>

<script>
/**
 * ActionSheet动作面板示例
 * 展示了ActionSheet组件的各种使用场景和配置选项
 */
export default {
    data() {
        return {
            showBasic: false,
            showWithTitle: false,
            showWithIcon: false,
            showWithStatus: false,
            showWithClose: false,
            showAsync: false,

            // 基础操作项
            basicActions: [{ name: "选项一" }, { name: "选项二" }, { name: "选项三" }],

            // 带图标的操作项
            actionsWithIcon: [
                { name: "拍照", icon: "camera" },
                { name: "从相册选择", icon: "picture" },
                { name: "保存图片", icon: "download" },
                { name: "分享", icon: "share" },
            ],

            // 不同状态的操作项
            actionsWithStatus: [
                { name: "正常选项", type: "primary" },
                { name: "禁用选项", disabled: true },
                { name: "警告操作", type: "warning" },
                { name: "危险操作", type: "danger" },
                { name: "成功操作", type: "success" },
                { name: "带有副标题", subname: "这是副标题说明文字" },
            ],

            // 异步操作项
            asyncActions: [
                { name: "保存", type: "primary" },
                { name: "删除", type: "danger" },
                { name: "更新", type: "success" },
            ],
        };
    },

    created() {
        console.log("示例页面 created");
    },

    mounted() {
        console.log("示例页面 mounted");
    },

    methods: {
        // 处理打开事件
        onOpenAction(type) {
            console.log(`${type} ActionSheet @open 事件触发`);
        },

        // 处理关闭事件
        onCloseAction(type) {
            console.log(`${type} ActionSheet @close 事件触发`);
        },

        // 处理选择操作项事件
        onSelectAction(action, index) {
            console.log("示例页面 onSelectAction 触发:", action.name, index);
            this.$message.success({
                message: `点击了 ${action.name}，索引: ${index}`,
                duration: 2000,
            });
        },

        // 处理取消操作
        onCancel() {
            console.log("示例页面 onCancel 触发");
            this.$message.info({
                message: "点击了取消按钮",
                duration: 2000,
            });
        },

        // 处理关闭操作
        onClose() {
            console.log("示例页面 onClose 触发");
            this.$message.info({
                message: "点击了关闭按钮",
                duration: 2000,
            });
        },

        // 处理异步操作
        onSelectAsyncAction(action, index) {
            console.log("示例页面 onSelectAsyncAction 触发:", action.name, index);
            // 更新当前操作项为加载状态
            this.asyncActions[index].loading = true;

            // 模拟异步操作
            setTimeout(() => {
                // 恢复加载状态
                this.asyncActions[index].loading = false;

                // 显示操作结果
                this.$message.success({
                    message: `完成 ${action.name} 操作`,
                    duration: 2000,
                });

                // 关闭动作面板
                this.showAsync = false;
            }, 1500);
        },
    },

    watch: {
        showBasic(val) {
            console.log("showBasic changed:", val);
        },
        showWithTitle(val) {
            console.log("showWithTitle changed:", val);
        },
        showWithIcon(val) {
            console.log("showWithIcon changed:", val);
        },
        showWithStatus(val) {
            console.log("showWithStatus changed:", val);
        },
        showWithClose(val) {
            console.log("showWithClose changed:", val);
        },
        showAsync(val) {
            console.log("showAsync changed:", val);
        },
    },
};
</script>

<style lang="scss">
@import "@/styles/_variables.scss";

.action-sheet-example {
    padding: 16px;

    .example-section {
        margin-bottom: 24px;

        .section-title {
            font-size: 16px;
            font-weight: 500;
            color: $text-primary;
            margin-bottom: 12px;
        }

        .fanc-button {
            margin-bottom: 8px;
        }
    }
}
</style>
