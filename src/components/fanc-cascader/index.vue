<template>
    <view class="fanc-cascader" :style="customStyle">
        <!-- 选择器触发器 -->
        <view
            class="fanc-cascader__trigger"
            :class="{ 'fanc-cascader__trigger--disabled': disabled }"
            @click="onTriggerClick"
        >
            <view class="fanc-cascader__trigger-content">
                <text class="fanc-cascader__trigger-text" :style="valueTextStyle">
                    {{ displayText || placeholder }}
                </text>
            </view>
            <view
                class="fanc-cascader__trigger-arrow"
                :class="{ 'fanc-cascader__trigger-arrow--active': showPopup }"
            ></view>
        </view>

        <!-- 级联选择器弹出层 -->
        <fanc-popup
            v-model="showPopup"
            position="bottom"
            :round="true"
            :overlay="true"
            :overlay-closable="closeOnClickOverlay"
            @open="onPopupOpen"
            @close="onPopupClose"
        >
            <view class="fanc-cascader__container">
                <!-- 标题栏 -->
                <view class="fanc-cascader__header">
                    <view class="fanc-cascader__cancel" @click="onCancel">取消</view>
                    <view class="fanc-cascader__title">{{ title }}</view>
                    <view class="fanc-cascader__confirm" @click="onConfirm">确定</view>
                </view>

                <!-- 选项内容区 -->
                <view class="fanc-cascader__content">
                    <!-- 选择面板 -->
                    <scroll-view
                        class="fanc-cascader__tabs"
                        scroll-x
                        :scroll-with-animation="true"
                        :show-scrollbar="false"
                    >
                        <view class="fanc-cascader__tabs-inner">
                            <view
                                v-for="(tab, index) in tabs"
                                :key="index"
                                class="fanc-cascader__tab"
                                :class="{
                                    'fanc-cascader__tab--active': activeTab === index,
                                }"
                                @click="switchTab(index)"
                            >
                                <text class="fanc-cascader__tab-text">{{ tab.text }}</text>
                            </view>
                        </view>
                    </scroll-view>

                    <!-- 选项列表 -->
                    <view class="fanc-cascader__options">
                        <scroll-view class="fanc-cascader__options-scroller" scroll-y>
                            <view
                                v-for="(option, index) in currentOptions"
                                :key="option.value || index"
                                class="fanc-cascader__option"
                                :class="{
                                    'fanc-cascader__option--active': isActiveOption(option),
                                    'fanc-cascader__option--disabled': option.disabled,
                                }"
                                @click="onOptionClick(option)"
                            >
                                <text class="fanc-cascader__option-text">{{ option.text }}</text>
                                <view
                                    v-if="isActiveOption(option)"
                                    class="fanc-cascader__option-selected"
                                >
                                    <view class="fanc-cascader__option-check"></view>
                                </view>
                            </view>
                        </scroll-view>
                    </view>
                </view>
            </view>
        </fanc-popup>
    </view>
</template>

<script>
/**
 * fanc-cascader 级联选择器
 * @description 级联选择器，用于多层级数据的选择，如地区选择等
 * @property {Array} options - 选项数据
 * @property {Array} value - 当前选中值
 * @property {String} placeholder - 占位符文本
 * @property {String} title - 弹窗标题
 * @property {Boolean} disabled - 是否禁用
 * @property {Boolean} closeable - 是否显示关闭按钮
 * @property {Boolean} closeOnClickOverlay - 是否点击遮罩关闭弹窗
 * @property {String} activeColor - 选中项的颜色
 * @property {Boolean} immediateChange - 是否选择即改变(不需确认)
 * @event {Function} change - 选择值改变时触发
 * @event {Function} confirm - 点击确认按钮时触发
 * @event {Function} cancel - 点击取消按钮时触发
 */
export default {
    name: "fanc-cascader",

    model: {
        prop: "value",
        event: "change",
    },

    props: {
        // 选项数据，格式为多层级的数组
        options: {
            type: Array,
            default: () => [],
        },
        // 当前选中值，用于双向绑定
        value: {
            type: Array,
            default: () => [],
        },
        // 占位符文本
        placeholder: {
            type: String,
            default: "请选择",
        },
        // 弹窗标题
        title: {
            type: String,
            default: "请选择",
        },
        // 是否禁用
        disabled: {
            type: Boolean,
            default: false,
        },
        // 是否显示关闭按钮
        closeable: {
            type: Boolean,
            default: true,
        },
        // 是否点击遮罩关闭弹窗
        closeOnClickOverlay: {
            type: Boolean,
            default: true,
        },
        // 选中项的颜色
        activeColor: {
            type: String,
            default: "",
        },
        // 是否选择即改变(不需确认)
        immediateChange: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            showPopup: false, // 是否显示弹出层
            activeTab: 0, // 当前激活的选项卡
            tabs: [], // 选项卡数据
            selectedValues: [], // 当前选择的值
            selectedOptions: [], // 当前选择的选项对象
            tempSelectedValues: [], // 临时存储选择的值
            tempSelectedOptions: [], // 临时存储选择的选项对象
        };
    },

    computed: {
        // 计算显示文本
        displayText() {
            if (!this.selectedOptions.length) return "";
            return this.selectedOptions.map((option) => option.text).join(" / ");
        },

        // 计算值文本样式
        valueTextStyle() {
            return {
                color: this.displayText ? "" : "#c8c9cc",
            };
        },

        // 获取当前激活选项卡的选项列表
        currentOptions() {
            if (this.activeTab === 0) {
                return this.options;
            }

            // 获取上一级选中项
            const parentOption = this.tempSelectedOptions[this.activeTab - 1];
            return parentOption && parentOption.children ? parentOption.children : [];
        },

        // 自定义样式
        customStyle() {
            if (!this.activeColor) return {};

            // 生成半透明背景色
            const generateLightColor = (color) => {
                // 处理hex颜色
                if (color.startsWith("#")) {
                    return `${color}1A`; // 添加10%透明度，1A是十六进制的10%
                }
                // 处理rgb/rgba颜色
                else if (color.startsWith("rgb")) {
                    if (color.startsWith("rgba")) {
                        return color; // 已经有透明度了
                    }
                    // 转换rgb为rgba
                    return color.replace("rgb", "rgba").replace(")", ", 0.1)");
                }
                // 其他颜色名称，使用rgba
                return `rgba(${color}, 0.1)`;
            };

            const cssVars = {
                "--cascader-active-color": this.activeColor,
                "--cascader-active-background": generateLightColor(this.activeColor),
            };

            return cssVars;
        },
    },

    watch: {
        // 监听外部传入的value变化
        value: {
            handler(newVal) {
                this.initSelectedState(newVal);
            },
            immediate: true,
            deep: true,
        },

        // 监听选项数据变化
        options: {
            handler() {
                this.initSelectedState(this.value);
            },
            deep: true,
        },
    },

    methods: {
        // 初始化选择状态
        initSelectedState(values) {
            if (!this.options.length) return;

            this.selectedValues = [...(values || [])];
            this.selectedOptions = [];

            // 根据选择的值，找到对应的选项对象
            let currentOptions = this.options;

            if (this.selectedValues.length) {
                for (let i = 0; i < this.selectedValues.length; i++) {
                    const value = this.selectedValues[i];
                    const option = currentOptions.find((opt) => opt.value === value);

                    if (!option) break;

                    this.selectedOptions.push(option);

                    if (option.children && option.children.length) {
                        currentOptions = option.children;
                    } else {
                        break;
                    }
                }
            }

            // 初始化临时选中状态
            this.tempSelectedValues = [...this.selectedValues];
            this.tempSelectedOptions = [...this.selectedOptions];

            // 初始化选项卡
            this.updateTabs();
        },

        // 触发器点击事件
        onTriggerClick() {
            if (this.disabled) return;
            this.showPopup = true;
        },

        // 弹出层打开事件
        onPopupOpen() {
            // 初始化临时选中状态
            this.tempSelectedValues = [...this.selectedValues];
            this.tempSelectedOptions = [...this.selectedOptions];

            // 更新选项卡
            this.updateTabs();

            // 设置默认激活的选项卡
            this.activeTab = Math.max(0, this.tempSelectedOptions.length - 1);

            this.$emit("open");
        },

        // 弹出层关闭事件
        onPopupClose() {
            this.$emit("close");
        },

        // 更新选项卡数据
        updateTabs() {
            // 确保即使没有选择也至少有一个"请选择"标签
            if (this.tempSelectedOptions.length === 0) {
                this.tabs = [{ text: "请选择", value: null }];
                return;
            }

            this.tabs = this.tempSelectedOptions.map((option) => ({
                text: option.text,
                value: option.value,
            }));

            // 如果还有下一级可选，增加一个选项卡
            const lastOption = this.tempSelectedOptions[this.tempSelectedOptions.length - 1];
            if (lastOption && lastOption.children && lastOption.children.length) {
                this.tabs.push({ text: "请选择", value: null });
            }
        },

        // 切换选项卡
        switchTab(index) {
            this.activeTab = index;
        },

        // 判断选项是否被选中
        isActiveOption(option) {
            return this.tempSelectedValues[this.activeTab] === option.value;
        },

        // 选项点击事件
        onOptionClick(option) {
            if (option.disabled) return;

            // 清除当前级后的所有选择
            this.tempSelectedValues.splice(this.activeTab);
            this.tempSelectedOptions.splice(this.activeTab);

            // 添加当前选中项
            this.tempSelectedValues.push(option.value);
            this.tempSelectedOptions.push(option);

            // 更新选项卡
            this.updateTabs();

            // 如果有子级，跳转到下一级
            if (option.children && option.children.length) {
                this.activeTab++;
                // 如果设置了选择即改变(immediateChange)，则自动确认并关闭
                if (this.immediateChange) {
                    this.onConfirm();
                }
            } else {
                // 如果选择的是最后一级(没有子级)，则自动确认并关闭
                this.onConfirm();
            }
        },

        // 确认按钮点击事件
        onConfirm() {
            // 更新选中状态
            this.selectedValues = [...this.tempSelectedValues];
            this.selectedOptions = [...this.tempSelectedOptions];

            // 关闭弹出层
            this.showPopup = false;

            // 触发事件
            this.$emit("change", this.selectedValues);
            this.$emit("confirm", {
                values: this.selectedValues,
                options: this.selectedOptions,
            });
        },

        // 取消按钮点击事件
        onCancel() {
            // 恢复之前的选中状态
            this.tempSelectedValues = [...this.selectedValues];
            this.tempSelectedOptions = [...this.selectedOptions];

            // 关闭弹出层
            this.showPopup = false;

            // 触发事件
            this.$emit("cancel");
        },
    },
};
</script>

<style lang="scss">
.fanc-cascader {
    position: relative;

    /* 触发器样式 */
    &__trigger {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-height: 44px;
        padding: 0 16px;
        background-color: var(--white, #fff);
        border-radius: 4px;
        border: 1px solid var(--cascader-border-color, #e8e8e8);

        &--disabled {
            opacity: var(--cascader-disabled-opacity, 0.6);
            cursor: not-allowed;
        }

        &-content {
            flex: 1;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        &-text {
            font-size: var(--cascader-font-size, 14px);
            color: var(--cascader-text-color, #333);
        }

        &-arrow {
            width: 0;
            height: 0;
            margin-left: 8px;
            border-width: var(--cascader-arrow-size, 5px) var(--cascader-arrow-size, 5px) 0;
            border-style: solid;
            border-color: var(--cascader-disabled-color, #c8c9cc) transparent transparent;
            transition: transform var(--cascader-transition-duration, 0.3s);

            &--active {
                transform: rotate(180deg);
                border-color: var(--cascader-active-color, var(--fanc-primary-color)) transparent
                    transparent;
            }
        }
    }

    /* 容器样式 */
    &__container {
        width: 100%;
        max-height: 70vh;
        overflow: hidden;
        background-color: var(--white, #fff);
    }

    /* 头部样式 */
    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: var(--cascader-toolbar-height, 44px);
        padding: 0 16px;
        font-size: var(--cascader-title-font-size, 16px);
        border-bottom: 1px solid var(--cascader-header-border-color, #ebedf0);
    }

    &__title {
        font-weight: 500;
    }

    &__cancel {
        color: var(--cascader-cancel-color, #969799);
    }

    &__confirm {
        color: var(--cascader-active-color, var(--fanc-primary-color));
    }

    /* 内容区样式 */
    &__content {
        display: flex;
        flex-direction: column;
        height: calc(70vh - var(--cascader-toolbar-height, 44px));
    }

    /* 选项卡样式 */
    &__tabs {
        flex-shrink: 0;
        width: 100%;
        height: var(--cascader-tab-height, 44px);
        white-space: nowrap;
        border-bottom: 1px solid var(--cascader-header-border-color, #ebedf0);
    }

    &__tabs-inner {
        display: flex;
    }

    &__tab {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 80px;
        height: var(--cascader-tab-height, 44px);
        padding: 0 12px;
        font-size: var(--cascader-font-size, 14px);
        color: var(--cascader-text-color, #323233);

        &--active {
            color: var(--cascader-active-color, var(--fanc-primary-color));

            &::after {
                content: "";
                position: absolute;
                bottom: 0;
                left: 50%;
                width: var(--cascader-tab-active-line-width, 40px);
                height: var(--cascader-tab-active-line-height, 2px);
                background-color: var(--cascader-active-color, var(--fanc-primary-color));
                transform: translateX(-50%);
            }
        }

        &-text {
            display: block;
            max-width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }

    /* 选项列表样式 */
    &__options {
        flex: 1;
        overflow: hidden;
    }

    &__options-scroller {
        height: 100%;
    }

    &__option {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;
        height: var(--cascader-option-height, 44px);
        font-size: var(--cascader-option-font-size, 14px);
        color: var(--cascader-text-color, #323233);

        &--active {
            color: var(--cascader-active-color, var(--fanc-primary-color));
            background-color: var(--cascader-active-background, rgba(0, 123, 255, 0.1));
        }

        &--disabled {
            color: var(--cascader-option-disabled-color, #c8c9cc);
            cursor: not-allowed;
        }

        &-text {
            flex: 1;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        &-selected {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 16px;
            height: 16px;
        }

        &-check {
            width: 8px;
            height: 12px;
            color: var(--cascader-active-color, var(--fanc-primary-color));
            border-style: solid;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
            border-color: currentColor;
        }
    }
}
</style>
