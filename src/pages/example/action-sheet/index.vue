<template>
    <view class="container">
        <view class="header">
            <view class="title">动作面板</view>
            <view class="subtitle">底部弹起的模态面板，提供和当前场景相关的多个操作</view>
        </view>

        <view class="section">
            <view class="section-title">基础用法</view>
            <fanc-cell-group>
                <fanc-cell title="基础动作面板" is-link @click="showBasic = true" />
            </fanc-cell-group>
            <fanc-action-sheet
                v-model="showBasic"
                :actions="basicActions"
                @select="onSelectAction"
                @cancel="onCancel"
                @close="onCloseAction('basic')"
                @open="onOpenAction('basic')"
            />
        </view>

        <view class="section">
            <view class="section-title">带标题和描述</view>
            <fanc-cell-group>
                <fanc-cell title="带标题动作面板" is-link @click="showWithTitle = true" />
            </fanc-cell-group>
            <fanc-action-sheet
                v-model="showWithTitle"
                :actions="basicActions"
                title="订单操作"
                description="请选择要执行的操作"
                @select="onSelectAction"
                @cancel="onCancel"
                @close="onCloseAction('title')"
                @open="onOpenAction('title')"
            />
        </view>

        <view class="section">
            <view class="section-title">带图标</view>
            <fanc-cell-group>
                <fanc-cell title="带图标动作面板" is-link @click="showWithIcon = true" />
            </fanc-cell-group>
            <fanc-action-sheet
                v-model="showWithIcon"
                :actions="actionsWithIcon"
                title="请选择操作"
                @select="onSelectAction"
                @cancel="onCancel"
                @close="onCloseAction('icon')"
                @open="onOpenAction('icon')"
            />
        </view>

        <view class="section">
            <view class="section-title">宫格模式</view>
            <fanc-cell-group>
                <fanc-cell title="宫格动作面板" is-link @click="showGrid = true" />
            </fanc-cell-group>
            <fanc-action-sheet
                v-model="showGrid"
                :actions="gridActions"
                grid-mode
                title="分享到"
                @select="onSelectAction"
                @cancel="onCancel"
                @close="onCloseAction('grid')"
                @open="onOpenAction('grid')"
            />
        </view>

        <view class="section">
            <view class="section-title">自定义列数</view>
            <fanc-cell-group>
                <fanc-cell title="自定义列数" is-link @click="showCustomColumns = true" />
            </fanc-cell-group>
            <fanc-action-sheet
                v-model="showCustomColumns"
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

        <view class="section">
            <view class="section-title">状态示例</view>
            <fanc-cell-group>
                <fanc-cell title="状态示例" is-link @click="showWithStatus = true" />
            </fanc-cell-group>
            <fanc-action-sheet
                v-model="showWithStatus"
                :actions="actionsWithStatus"
                title="状态示例"
                @select="onSelectAction"
                @cancel="onCancel"
                @close="onCloseAction('status')"
                @open="onOpenAction('status')"
            />
        </view>

        <view class="section">
            <view class="section-title">自定义关闭按钮</view>
            <fanc-cell-group>
                <fanc-cell title="自定义关闭按钮" is-link @click="showWithClose = true" />
            </fanc-cell-group>
            <fanc-action-sheet
                v-model="showWithClose"
                :actions="basicActions"
                title="自定义关闭"
                :show-close="true"
                cancel-text=""
                @select="onSelectAction"
                @close="onClose"
                @open="onOpenAction('close')"
            />
        </view>

        <view class="section">
            <view class="section-title">异步操作</view>
            <fanc-cell-group>
                <fanc-cell title="异步操作" is-link @click="showAsync = true" />
            </fanc-cell-group>
            <fanc-action-sheet
                v-model="showAsync"
                :actions="asyncActions"
                title="异步操作示例"
                @select="onSelectAsyncAction"
                @cancel="onCancel"
                @close="onCloseAction('async')"
                @open="onOpenAction('async')"
            />
        </view>

        <view class="section">
            <view class="section-title">分页显示 - 宫格模式</view>
            <fanc-cell-group>
                <fanc-cell title="宫格分页" is-link @click="showPagination = true" />
            </fanc-cell-group>
            <fanc-action-sheet
                v-model="showPagination"
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

        <view class="section">
            <view class="section-title">分页显示 - 列表模式</view>
            <fanc-cell-group>
                <fanc-cell title="列表分页" is-link @click="showListPagination = true" />
            </fanc-cell-group>
            <fanc-action-sheet
                v-model="showListPagination"
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
                { name: "复制链接", icon: "link", iconColor: "#007AFF" },
                { name: "收藏", icon: "bookmark", iconColor: "#FF9500" },
                { name: "删除", icon: "trash", iconColor: "#FF3B30" },
            ],

            // 多列宫格操作项
            gridManyActions: [
                { name: "拍照", icon: "camera", iconColor: "#1677FF" },
                { name: "相册", icon: "images", iconColor: "#FF9500" },
                { name: "文件", icon: "file", iconColor: "#34C759" },
                { name: "联系人", icon: "user-friends", iconColor: "#007AFF" },
                { name: "位置", icon: "map-marker-alt", iconColor: "#FF2442" },
                { name: "日程", icon: "calendar", iconColor: "#5856D6" },
                { name: "收藏", icon: "star", iconColor: "#FF9500" },
                { name: "音乐", icon: "music", iconColor: "#FF2D55" },
                { name: "视频", icon: "video", iconColor: "#FF3B30" },
            ],

            // 状态示例操作项
            actionsWithStatus: [
                { name: "正常选项", icon: "check", iconColor: "#34C759" },
                { name: "禁用选项", icon: "ban", iconColor: "#8E8E93", disabled: true },
                {
                    name: "加载中选项",
                    icon: "spinner",
                    iconColor: "#007AFF",
                    loading: true,
                },
                { name: "危险操作", icon: "trash", iconColor: "#FF3B30", danger: true },
            ],

            // 异步操作示例
            asyncActions: [
                { name: "保存", icon: "save", iconColor: "#007AFF" },
                { name: "删除", icon: "trash", iconColor: "#FF3B30", danger: true },
                { name: "分享", icon: "share", iconColor: "#34C759" },
            ],
        };
    },
    methods: {
        // 选择操作项
        onSelectAction(action, index) {
            uni.showToast({
                title: `选择了${action.name}，索引: ${index}`,
                icon: "none",
            });
        },

        // 异步操作示例
        onSelectAsyncAction(action, index) {
            // 如果是删除操作，需要确认
            if (index === 1) {
                uni.showModal({
                    title: "确认操作",
                    content: "确定要删除吗？此操作不可撤销",
                    success: (res) => {
                        if (res.confirm) {
                            // 模拟异步操作
                            const newActions = [...this.asyncActions];
                            newActions[index] = {
                                ...newActions[index],
                                loading: true,
                                name: "处理中...",
                            };
                            this.asyncActions = newActions;

                            setTimeout(() => {
                                uni.showToast({
                                    title: "删除成功",
                                    icon: "success",
                                });
                                this.showAsync = false;
                                // 恢复原始数据
                                this.asyncActions = [
                                    { name: "保存", icon: "save", iconColor: "#007AFF" },
                                    {
                                        name: "删除",
                                        icon: "trash",
                                        iconColor: "#FF3B30",
                                        danger: true,
                                    },
                                    { name: "分享", icon: "share", iconColor: "#34C759" },
                                ];
                            }, 2000);
                        }
                    },
                });
                return;
            }

            // 其他操作
            uni.showToast({
                title: `选择了${action.name}`,
                icon: "none",
            });
            this.showAsync = false;
        },

        // 取消事件
        onCancel() {
            uni.showToast({
                title: "点击了取消",
                icon: "none",
            });
        },

        // 关闭事件
        onClose() {
            uni.showToast({
                title: "动作面板已关闭",
                icon: "none",
            });
        },

        // 关闭指定面板
        onCloseAction(type) {
            console.log(`${type}面板已关闭`);
        },

        // 打开指定面板
        onOpenAction(type) {
            console.log(`${type}面板已打开`);
        },

        // 分页切换事件
        onPageChange(page) {
            uni.showToast({
                title: `切换到第${page}页`,
                icon: "none",
            });
        },
    },
};
</script>

<style>
.container {
    padding: 20px;
    background-color: #f8f8f8;
    min-height: 100vh;
}

.header {
    margin-bottom: 24px;
}

.title {
    font-size: 24px;
    font-weight: bold;
    color: #323233;
    margin-bottom: 8px;
}

.subtitle {
    font-size: 14px;
    color: #969799;
    line-height: 1.5;
}

.section {
    margin-bottom: 24px;
    background-color: #ffffff;
    border-radius: 8px;
    overflow: hidden;
}

.section-title {
    font-size: 16px;
    font-weight: bold;
    color: #323233;
    padding: 16px;
    border-bottom: 1px solid #f2f2f2;
}
</style>
