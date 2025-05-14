<template>
    <view class="action-sheet-example">
        <view class="action-sheet-example__section">
            <view class="action-sheet-example__section-title">基础用法</view>
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

        <view class="action-sheet-example__section">
            <view class="action-sheet-example__section-title">带标题和描述</view>
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

        <view class="action-sheet-example__section">
            <view class="action-sheet-example__section-title">带图标</view>
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

        <view class="action-sheet-example__section">
            <view class="action-sheet-example__section-title">宫格模式</view>
            <fanc-button type="primary" @click="showGrid = true">宫格动作面板</fanc-button>
            <fanc-action-sheet
                v-model:show="showGrid"
                :actions="gridActions"
                grid-mode
                title="分享到"
                @select="onSelectAction"
                @cancel="onCancel"
                @close="onCloseAction('grid')"
                @open="onOpenAction('grid')"
            />
        </view>

        <view class="action-sheet-example__section">
            <view class="action-sheet-example__section-title">自定义列数</view>
            <fanc-button type="primary" @click="showCustomColumns = true">自定义列数</fanc-button>
            <fanc-action-sheet
                v-model:show="showCustomColumns"
                :actions="gridManyActions"
                grid-mode
                :column-number="3"
                title="更多操作"
                @select="onSelectAction"
                @cancel="onCancel"
                @close="onCloseAction('columns')"
                @open="onOpenAction('columns')"
            />
        </view>

        <view class="action-sheet-example__section">
            <view class="action-sheet-example__section-title">状态示例</view>
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

        <view class="action-sheet-example__section">
            <view class="action-sheet-example__section-title">自定义关闭按钮</view>
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

        <view class="action-sheet-example__section">
            <view class="action-sheet-example__section-title">异步操作</view>
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

        <view class="action-sheet-example__section">
            <view class="action-sheet-example__section-title">分页显示 - 宫格模式</view>
            <fanc-button type="primary" @click="showPagination = true">宫格分页</fanc-button>
            <fanc-action-sheet
                v-model:show="showPagination"
                :actions="gridActions"
                grid-mode
                title="社交应用"
                :pagination-enabled="true"
                :page-size="8"
                @select="onSelectAction"
                @cancel="onCancel"
                @close="onCloseAction('pagination')"
                @open="onOpenAction('pagination')"
                @pageChange="onPageChange"
            />
        </view>

        <view class="action-sheet-example__section">
            <view class="action-sheet-example__section-title">分页显示 - 列表模式</view>
            <fanc-button type="primary" @click="showListPagination = true">列表分页</fanc-button>
            <fanc-action-sheet
                v-model:show="showListPagination"
                :actions="gridActions"
                title="操作菜单"
                :pagination-enabled="true"
                :page-size="4"
                @select="onSelectAction"
                @cancel="onCancel"
                @close="onCloseAction('list-pagination')"
                @open="onOpenAction('list-pagination')"
                @pageChange="onPageChange"
            />
        </view>
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
            showGrid: false,
            showCustomColumns: false,
            showPagination: false,
            showListPagination: false,

            // 基础操作项
            basicActions: [{ name: "选项一" }, { name: "选项二" }, { name: "选项三" }],

            // 带图标的操作项
            actionsWithIcon: [
                { name: "拍照", icon: "camera" },
                { name: "从相册选择", icon: "photo-video" },
                { name: "保存图片", icon: "download" },
                { name: "分享", icon: "share" },
            ],

            // 宫格模式操作项
            gridActions: [
                { name: "微信", icon: "/static/img/wechat.png", iconColor: "#07C160" },
                { name: "朋友圈", icon: "/static/img/times.png", iconColor: "#07C160" },
                { name: "QQ", icon: "/static/img/qq.png", iconColor: "#1DA1F2" },
                { name: "企业微信", icon: "/static/img/wecom.png", iconColor: "#1989FA" },
                { name: "收藏", icon: "star", iconColor: "#FF9500" },
                { name: "刷新", icon: "sync", iconColor: "#8E8E93" },
                { name: "下载", icon: "download", iconColor: "#34C759" },
                { name: "编辑", icon: "edit", iconColor: "#5856D6" },
                // 第二页的图标
                { name: "微博", icon: "/static/img/weibo.png", iconColor: "#FF2442" },
                { name: "抖音", icon: "/static/img/douyin.png", iconColor: "#000000" },
                { name: "钉钉", icon: "/static/img/ding.png", iconColor: "#1677FF" },
                { name: "短信", icon: "envelope", iconColor: "#34C759" },
                { name: "飞书", icon: "/static/img/feishu.png", iconColor: "#3370FF" },
                { name: "复制链接", icon: "link", iconColor: "#8E8E93" },
                { name: "浏览器打开", icon: "globe", iconColor: "#5856D6" },
                { name: "更多", icon: "ellipsis-h", iconColor: "#8E8E93" },
            ],

            // 多列宫格模式操作项
            gridManyActions: [
                { name: "拍照", icon: "camera", iconColor: "#07C160" },
                { name: "相册", icon: "/static/img/photo.png", iconColor: "#FF3B30" },
                { name: "文件", icon: "file-alt", iconColor: "#FF9500" },
                { name: "位置", icon: "location-arrow", iconColor: "#5AC8FA" },
                { name: "语音", icon: "microphone", iconColor: "#AF52DE" },
                { name: "我的收藏", icon: "star", iconColor: "#FF9500" },
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

    created() {},

    mounted() {},

    methods: {
        // 处理打开事件
        onOpenAction(type) {},

        // 处理关闭事件
        onCloseAction(type) {},

        // 处理选择操作项事件
        onSelectAction(action, index) {
            this.$message.success({
                message: `点击了 ${action.name}，索引: ${index}`,
                duration: 2000,
            });
        },

        // 处理取消操作
        onCancel() {
            this.$message.info({
                message: "点击了取消按钮",
                duration: 2000,
            });
        },

        // 处理关闭操作
        onClose() {
            this.$message.info({
                message: "点击了关闭按钮",
                duration: 2000,
            });
        },

        // 处理异步操作
        onSelectAsyncAction(action, index) {
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

        // 处理分页变化
        onPageChange(page) {
            this.$message.info({
                message: `切换到第 ${page} 页`,
                duration: 2000,
            });
        },
    },
};
</script>

<style lang="scss">
@import "@/styles/_variables.scss";

.action-sheet-example {
    padding: 16px;
    background-color: #f7f8fa;
    min-height: 100vh;

    &__section {
        margin-bottom: 24px;
        padding: 20px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
    }

    &__section-title {
        font-size: 1.125rem;
        font-weight: 600;
        margin-bottom: 16px;
        color: #323233;
        position: relative;
        padding-left: 12px;

        &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 4px;
            height: 16px;
            width: 4px;
            background-color: #007bff;
            border-radius: 2px;
        }
    }

    .fanc-button {
        margin-bottom: 8px;
    }
}
</style>
