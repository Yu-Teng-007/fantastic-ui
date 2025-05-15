<template>
    <view class="fanc-action-sheet-container">
        <fanc-popup
            :show="show"
            position="bottom"
            :z-index="zIndex"
            :overlay="overlay"
            :overlay-closable="closeOnClickOverlay"
            :duration="duration"
            :custom-style="customStyle"
            :custom-class="customClass"
            round
            @update:show="onUpdateShow"
            @open="onOpenEmit"
            @close="onCloseEmit"
            @clickOverlay="$emit('clickOverlay')"
        >
            <view class="fanc-action-sheet">
                <!-- 标题 -->
                <view v-if="title" class="fanc-action-sheet__header">
                    <text class="fanc-action-sheet__title">{{ title }}</text>
                    <view v-if="showClose" class="fanc-action-sheet__close" @click="onClose">
                        <fanc-icon name="close" size="18" />
                    </view>
                </view>

                <!-- 描述 -->
                <view v-if="description" class="fanc-action-sheet__description">
                    <text>{{ description }}</text>
                </view>

                <!-- 操作项列表 - 列表模式 -->
                <view v-if="!gridMode" class="fanc-action-sheet__content">
                    <view
                        v-for="(item, index) in paginatedActions"
                        :key="index"
                        class="fanc-action-sheet__item"
                        :class="{
                            'fanc-action-sheet__item--disabled': item.disabled,
                            'fanc-action-sheet__item--loading': item.loading,
                            [`fanc-action-sheet__item--${item.type || 'default'}`]: item.type,
                        }"
                        :style="item.style || {}"
                        @click="onSelect(item, index + currentPage * pageSize)"
                    >
                        <view v-if="item.loading" class="fanc-action-sheet__loading">
                            <view class="fanc-loading-indicator"></view>
                        </view>
                        <view v-else-if="item.icon" class="fanc-action-sheet__icon">
                            <fanc-icon :name="item.icon" :size="item.iconSize || '18'" :color="item.iconColor" />
                        </view>
                        <text class="fanc-action-sheet__name">{{ item.name }}</text>
                        <text v-if="item.subname" class="fanc-action-sheet__subname">{{ item.subname }}</text>
                    </view>
                </view>

                <!-- 操作项列表 - 宫格模式 -->
                <view v-else class="fanc-action-sheet__grid" :style="gridStyle">
                    <view
                        v-for="(item, index) in paginatedActions"
                        :key="index"
                        class="fanc-action-sheet__grid-item"
                        :class="{
                            'fanc-action-sheet__grid-item--disabled': item.disabled,
                            'fanc-action-sheet__grid-item--loading': item.loading,
                            [`fanc-action-sheet__grid-item--${item.type || 'default'}`]: item.type,
                        }"
                        :style="item.style || {}"
                        @click="onSelect(item, index + currentPage * pageSize)"
                    >
                        <view v-if="item.loading" class="fanc-action-sheet__grid-loading">
                            <view class="fanc-loading-indicator"></view>
                        </view>
                        <view v-else-if="item.icon" class="fanc-action-sheet__grid-icon">
                            <fanc-icon :name="item.icon" :size="item.iconSize || '28'" :color="item.iconColor" />
                        </view>
                        <text class="fanc-action-sheet__grid-name">{{ item.name }}</text>
                    </view>
                </view>

                <!-- 分页指示器 -->
                <view v-if="paginationEnabled && actualPagesCount > 1" class="fanc-action-sheet__pagination">
                    <view
                        v-for="page in actualPagesCount"
                        :key="page"
                        class="fanc-action-sheet__pagination-dot"
                        :class="{ 'fanc-action-sheet__pagination-dot--active': currentPage === page - 1 }"
                        @click="onPageChange(page - 1)"
                    ></view>
                </view>

                <!-- 取消按钮 -->
                <view v-if="cancelText" class="fanc-action-sheet__cancel" @click="onCancel">
                    <text class="fanc-action-sheet__cancel-text">{{ cancelText }}</text>
                </view>
            </view>
        </fanc-popup>
    </view>
</template>

<script>
/**
 * fanc-action-sheet 动作面板
 * @description 动作面板组件，用于从底部弹出菜单给用户选择操作
 * @property {Boolean} show - 是否显示动作面板
 * @property {Array} actions - 操作项数组，数组项包含name, subname, disabled, loading, icon, iconSize, iconColor, type, style属性
 * @property {String} title - 面板标题
 * @property {String} description - 面板描述文字
 * @property {String} cancelText - 取消按钮文字，不设置则不显示取消按钮
 * @property {Boolean} overlay - 是否显示遮罩层
 * @property {Boolean} closeOnClickOverlay - 是否点击遮罩层后关闭
 * @property {Boolean} showClose - 是否显示关闭按钮
 * @property {Number|String} duration - 动画时长，单位为毫秒
 * @property {Number|String} zIndex - 面板的z-index值
 * @property {String|Object} customStyle - 自定义面板样式
 * @property {String} customClass - 自定义面板类名
 * @property {Boolean} gridMode - 是否使用宫格模式
 * @property {Number|String} columnNumber - 宫格列数，默认4
 * @property {Boolean} paginationEnabled - 是否启用分页功能
 * @property {Number} pagesCount - 分页总数，如果不传入则根据actions长度和pageSize自动计算
 * @property {Number} pageSize - 每页显示的项目数量，默认为8（宫格模式）或者4（列表模式）
 * @event {Function} select - 选中操作项时触发，回调参数为选中项和索引
 * @event {Function} cancel - 点击取消按钮时触发
 * @event {Function} close - 面板关闭时触发
 * @event {Function} open - 面板打开时触发
 * @event {Function} clickOverlay - 点击遮罩层时触发
 * @event {Function} pageChange - 分页变化时触发，回调参数为页码
 */
export default {
    name: "fanc-action-sheet",

    model: {
        prop: "show",
        event: "update:show",
    },

    props: {
        // 是否显示动作面板
        show: {
            type: Boolean,
            default: false,
        },
        // 操作项数组
        actions: {
            type: Array,
            default: () => [],
            validator: (value) => {
                return value.every((item) => typeof item === "object" && item.name !== undefined);
            },
        },
        // 面板标题
        title: {
            type: String,
            default: "",
        },
        // 面板描述文字
        description: {
            type: String,
            default: "",
        },
        // 取消按钮文字，不设置则不显示取消按钮
        cancelText: {
            type: String,
            default: "取消",
        },
        // 是否显示遮罩层
        overlay: {
            type: Boolean,
            default: true,
        },
        // 是否点击遮罩层后关闭
        closeOnClickOverlay: {
            type: Boolean,
            default: true,
        },
        // 是否显示关闭按钮
        showClose: {
            type: Boolean,
            default: false,
        },
        // 动画时长
        duration: {
            type: [Number, String],
            default: 300,
        },
        // 面板的z-index值
        zIndex: {
            type: [Number, String],
            default: 1000,
        },
        // 自定义面板样式
        customStyle: {
            type: [String, Object],
            default: "",
        },
        // 自定义面板类名
        customClass: {
            type: String,
            default: "",
        },
        // 是否使用宫格模式
        gridMode: {
            type: Boolean,
            default: false,
        },
        // 宫格列数
        columnNumber: {
            type: [Number, String],
            default: 4,
        },
        // 是否启用分页功能
        paginationEnabled: {
            type: Boolean,
            default: false,
        },
        // 分页总数
        pagesCount: {
            type: Number,
            default: 1,
        },
        // 每页显示的项目数量
        pageSize: {
            type: Number,
            default: 8,
        },
    },

    data() {
        return {
            // 当前页码，从0开始计数
            currentPage: 0,
        };
    },

    created() {},

    mounted() {},

    computed: {
        // 计算宫格样式
        gridStyle() {
            return {
                gridTemplateColumns: `repeat(${this.columnNumber}, 1fr)`,
            };
        },
        // 分页后的操作项
        paginatedActions() {
            return this.actions.slice(this.currentPage * this.pageSize, (this.currentPage + 1) * this.pageSize);
        },
        // 实际分页总数
        actualPagesCount() {
            return Math.ceil(this.actions.length / this.pageSize);
        },
    },

    methods: {
        // 处理更新show事件
        onUpdateShow(val) {
            this.$emit("update:show", val);
        },

        // 处理open事件
        onOpenEmit() {
            this.$emit("open");
        },

        // 处理close事件
        onCloseEmit() {
            this.$emit("close");
        },

        // 选择操作项
        onSelect(item, index) {
            // 禁用或加载状态下不触发事件
            if (item.disabled || item.loading) {
                return;
            }

            this.$emit("select", item, index);

            // 关闭面板（除非action配置了closeOnSelect: false）
            if (item.closeOnSelect !== false) {
                this.$emit("update:show", false);
            }
        },

        // 点击取消按钮
        onCancel() {
            this.$emit("cancel");
            this.$emit("update:show", false);
        },

        // 关闭面板
        onClose() {
            this.$emit("update:show", false);
        },

        // 切换页码
        onPageChange(page) {
            if (page !== this.currentPage && page >= 0 && page < this.actualPagesCount) {
                this.currentPage = page;
                this.$emit("pageChange", page);
            }
        },
    },
};
</script>

<style lang="scss">
.fanc-action-sheet {
    position: relative;
    max-height: 80vh;
    overflow-y: auto;

    // 头部样式
    &__header {
        position: relative;
        padding: 16px;
        text-align: center;
        font-weight: 500;
        box-sizing: border-box;
        line-height: 24px;
        border-bottom: 1px solid var(--border-color-light);
    }

    // 标题样式
    &__title {
        font-size: 16px;
        font-weight: 500;
        color: var(--text-primary);
    }

    // 关闭图标样式
    &__close {
        position: absolute;
        top: 16px;
        right: 16px;
        width: 22px;
        height: 22px;
        line-height: 22px;
        cursor: pointer;
    }

    // 描述文字样式
    &__description {
        padding: 12px 16px;
        text-align: center;
        font-size: 14px;
        color: var(--text-secondary);
        line-height: 1.5;
        border-bottom: 1px solid var(--border-color-light);
    }

    // 内容区域样式 - 列表模式
    &__content {
        width: 100%;
    }

    // 操作项样式 - 列表模式
    &__item {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 14px 16px;
        font-size: 16px;
        line-height: 22px;
        text-align: center;
        color: var(--text-primary);
        background-color: var(--bg-white);
        cursor: pointer;
        transition: all 0.2s ease;
        flex-direction: column;

        &:active {
            background-color: var(--bg-gray-light);
        }

        &::after {
            content: "";
            position: absolute;
            left: 16px;
            right: 16px;
            bottom: 0;
            height: 1px;
            background-color: var(--border-color-light);
        }

        &:last-child::after {
            display: none;
        }

        // 禁用状态
        &--disabled {
            color: var(--text-disabled);
            cursor: not-allowed;

            &:active {
                background-color: var(--bg-white);
            }
        }

        // 加载状态
        &--loading {
            cursor: default;
        }

        // 不同类型的样式
        &--primary {
            color: var(--fanc-primary-color);
        }

        &--success {
            color: var(--fanc-success-color);
        }

        &--warning {
            color: var(--fanc-warning-color);
        }

        &--danger {
            color: var(--fanc-danger-color);
        }
    }

    // 操作项名称 - 列表模式
    &__name {
        font-size: 16px;
        color: inherit;
    }

    // 操作项副标题 - 列表模式
    &__subname {
        margin-top: 4px;
        font-size: 12px;
        color: var(--text-secondary);
    }

    // 操作项图标 - 列表模式
    &__icon {
        margin-bottom: 8px;
    }

    // 加载指示器 - 列表模式
    &__loading {
        margin-bottom: 8px;

        .fanc-loading-indicator {
            border: 2px solid rgba(0, 0, 0, 0.1);
            border-left-color: currentColor;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            animation: fanc-spin 500ms linear infinite;
        }
    }

    // 宫格区域样式
    &__grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        padding: 16px 8px;
        background-color: var(--bg-white);
        gap: 8px;
        border-radius: 8px;
    }

    // 宫格项样式
    &__grid-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 12px 8px;
        text-align: center;
        cursor: pointer;
        transition: all 0.2s ease;
        border-radius: 8px;

        &:active {
            background-color: var(--bg-gray-light);
        }

        // 禁用状态
        &--disabled {
            color: var(--text-disabled);
            cursor: not-allowed;

            &:active {
                background-color: var(--bg-white);
            }
        }

        // 加载状态
        &--loading {
            cursor: default;
        }

        // 不同类型的样式
        &--primary {
            color: var(--fanc-primary-color);
        }

        &--success {
            color: var(--fanc-success-color);
        }

        &--warning {
            color: var(--fanc-warning-color);
        }

        &--danger {
            color: var(--fanc-danger-color);
        }
    }

    // 宫格图标样式
    &__grid-icon {
        margin-bottom: 8px;
        width: 52px;
        height: 52px;
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    // 宫格项名称
    &__grid-name {
        font-size: 14px;
        color: inherit;
        line-height: 1.2;
    }

    // 宫格加载指示器
    &__grid-loading {
        margin-bottom: 8px;
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;

        .fanc-loading-indicator {
            border: 2px solid rgba(0, 0, 0, 0.1);
            border-left-color: currentColor;
            border-radius: 50%;
            width: 28px;
            height: 28px;
            animation: fanc-spin 500ms linear infinite;
        }
    }

    // 分页指示器样式
    &__pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 12px 0;
        background-color: var(--bg-white);
    }

    // 分页指示器点
    &__pagination-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #dcdee0;
        margin: 0 4px;
        transition: all 0.3s ease;
        cursor: pointer;
        opacity: 0.6;

        &:hover {
            opacity: 0.8;
            transform: scale(1.1);
        }

        &--active {
            background-color: #1989fa;
            transform: scale(1.2);
            opacity: 1;
        }
    }

    // 取消按钮样式
    &__cancel {
        margin-top: 8px;
        padding: 14px 16px;
        text-align: center;
        font-size: 16px;
        color: var(--text-secondary);
        background-color: var(--bg-white);
        cursor: pointer;
        transition: all 0.2s ease;
        position: relative;
        border-top: 8px solid var(--bg-gray-light);
        box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.05);

        &:active {
            background-color: var(--bg-gray-light);
        }

        &::before {
            content: "";
            position: absolute;
            top: -8px;
            left: 0;
            right: 0;
            height: 8px;
            background-color: var(--bg-gray-light);
        }
    }

    &__cancel-text {
        display: inline-block;
        line-height: 22px;
    }
}

@keyframes fanc-spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
