<template>
    <view class="fanc-cascader">
        <fanc-popup
            v-model="showPopup"
            :position="position"
            :overlay="overlay"
            :round="round"
            :closeable="false"
            :close-icon-position="closeIconPosition"
            :z-index="zIndex"
            :overlay-closable="overlayClosable"
            @close="onClose"
        >
            <view :style="customStyle">
                <!-- 顶部标题栏 -->
                <view class="fanc-cascader__header" v-if="showHeader">
                    <view class="fanc-cascader__header-btn" @click="onClose">
                        <text class="fanc-cascader__header-cancel">{{ cancelText }}</text>
                    </view>
                    <view class="fanc-cascader__header-title">{{ title }}</view>
                    <view class="fanc-cascader__header-btn" @click="onFinish">
                        <text class="fanc-cascader__header-confirm">{{ confirmText }}</text>
                    </view>
                </view>

                <!-- 级联选择主体 -->
                <view class="fanc-cascader__content">
                    <!-- 选项卡 -->
                    <scroll-view
                        class="fanc-cascader__tabs"
                        scroll-x="true"
                        scroll-with-animation="true"
                        :scroll-into-view="activeTabId"
                    >
                        <view class="fanc-cascader__tabs-inner">
                            <view
                                v-for="(tab, index) in tabs"
                                :key="index"
                                :id="`tab-${index}`"
                                :class="[
                                    'fanc-cascader__tab',
                                    { 'fanc-cascader__tab--active': activeTab === index },
                                ]"
                                @click="onTabClick(index)"
                            >
                                {{ tab }}
                            </view>
                        </view>
                    </scroll-view>

                    <!-- 选项内容 -->
                    <swiper
                        class="fanc-cascader__options"
                        :current="activeTab"
                        @change="onSwiperChange"
                    >
                        <swiper-item v-for="(options, tabIndex) in optionsList" :key="tabIndex">
                            <scroll-view class="fanc-cascader__option-list" scroll-y="true">
                                <view
                                    v-for="(option, index) in options"
                                    :key="index"
                                    :class="[
                                        'fanc-cascader__option',
                                        {
                                            'fanc-cascader__option--active': isOptionSelected(
                                                tabIndex,
                                                option
                                            ),
                                            'fanc-cascader__option--disabled': option.disabled,
                                        },
                                    ]"
                                    @click="onOptionClick(tabIndex, option)"
                                >
                                    <text class="fanc-cascader__option-text">{{
                                        option.text
                                    }}</text>
                                    <view
                                        class="fanc-cascader__option-icon"
                                        v-if="isOptionSelected(tabIndex, option)"
                                    >
                                        <view class="fanc-cascader__option-icon-check"></view>
                                    </view>
                                </view>
                            </scroll-view>
                        </swiper-item>
                    </swiper>
                </view>
            </view>
        </fanc-popup>
    </view>
</template>

<script>
/**
 * fanc-cascader 级联选择组件
 * @description 级联选择器，用于从一组相关联的数据集合中进行选择，常用于省市区、分类选择等场景
 * @property {Boolean} show - 是否显示级联选择器
 * @property {Array} options - 可选项数据源
 * @property {Array} defaultValue - 默认选中项
 * @property {Boolean} showHeader - 是否显示头部
 * @property {String} title - 标题
 * @property {String} confirmText - 确认按钮文字
 * @property {String} cancelText - 取消按钮文字
 * @property {String} activeColor - 选中项的高亮颜色
 * @property {Boolean} resetOnClose - 关闭时是否重置选中值
 * @property {Boolean} overlay - 是否显示遮罩层
 * @property {Boolean} round - 是否显示圆角
 * @property {String} closeIconPosition - 关闭图标位置
 * @property {Number|String} zIndex - 弹出层层级
 * @property {Boolean} overlayClosable - 是否点击遮罩层关闭弹窗
 * @event {Function} change - 选中项变化时触发
 * @event {Function} pathSelected - 选择完成一个完整路径时触发
 * @event {Function} finish - 点击确认按钮时触发
 * @event {Function} close - 关闭时触发
 * @event {Function} update:show - 更新show属性值的事件
 */
export default {
    name: "FancCascader",
    model: {
        prop: "show",
        event: "update:show",
    },
    props: {
        // 是否显示级联选择器
        show: {
            type: Boolean,
            default: false,
        },
        // 级联数据
        options: {
            type: Array,
            default: () => [],
            validator: (value) => {
                return (
                    Array.isArray(value) &&
                    value.every((option) => {
                        return (
                            typeof option === "object" &&
                            option.hasOwnProperty("text") &&
                            (option.children === undefined || Array.isArray(option.children))
                        );
                    })
                );
            },
        },
        // 默认选中的值
        defaultValue: {
            type: Array,
            default: () => [],
        },
        // 是否显示顶部栏
        showHeader: {
            type: Boolean,
            default: true,
        },
        // 顶部标题
        title: {
            type: String,
            default: "请选择",
        },
        // 确认按钮文字
        confirmText: {
            type: String,
            default: "确定",
        },
        // 取消按钮文字
        cancelText: {
            type: String,
            default: "取消",
        },
        // 自定义选中态颜色
        activeColor: {
            type: String,
            default: "",
        },
        // 是否使用关闭后重置已选项
        resetOnClose: {
            type: Boolean,
            default: false,
        },
        // 是否显示遮罩层
        overlay: {
            type: Boolean,
            default: true,
        },
        // 是否显示圆角
        round: {
            type: Boolean,
            default: true,
        },
        // 关闭图标位置
        closeIconPosition: {
            type: String,
            default: "top-right",
        },
        // 弹出层层级
        zIndex: {
            type: [Number, String],
            default: 1000,
        },
        // 是否点击遮罩层关闭弹窗
        overlayClosable: {
            type: Boolean,
            default: true,
        },
        // 弹出位置
        position: {
            type: String,
            default: "bottom",
        },
    },
    data() {
        return {
            // 控制弹窗显示
            showPopup: this.show,
            // 当前选中的值
            selectedValues: [],
            // 当前选中的文本
            selectedTexts: [],
            // 选项卡标题
            tabs: [],
            // 选项数据列表
            optionsList: [],
            // 当前活动选项卡
            activeTab: 0,
            // 表示选择中状态，防止多次触发事件
            selecting: false,
            // 是否已选中完整路径
            pathSelected: false,
        };
    },
    computed: {
        // 当前活动的选项卡ID，用于scroll-into-view
        activeTabId() {
            return `tab-${this.activeTab}`;
        },
        // 生成自定义样式，设置CSS变量
        customStyle() {
            if (!this.activeColor) return {};

            return {
                "--cascader-active-color": this.activeColor,
                "--cascader-option-active-bg": `${this.activeColor}1A`, // 10%透明度
            };
        },
    },
    watch: {
        options: {
            handler() {
                this.initCascader();
            },
            immediate: true,
        },
        defaultValue: {
            handler(newValue) {
                if (Array.isArray(newValue) && newValue.length > 0) {
                    this.setDefaultSelected(newValue);
                }
            },
            immediate: true,
        },
        // 同步外部show属性变化
        show(val) {
            this.showPopup = val;
        },
        // 同步内部showPopup变化到外部
        showPopup(val) {
            this.$emit("update:show", val);
        },
    },
    created() {
        this.initCascader();
    },
    methods: {
        // 初始化级联选择器
        initCascader() {
            if (!this.options || this.options.length === 0) {
                return;
            }

            // 设置第一层选项
            this.optionsList = [this.options];

            // 设置第一个标签为"请选择"
            this.tabs = ["请选择"];

            // 如果有默认值，设置选中项
            if (this.defaultValue && this.defaultValue.length > 0) {
                this.setDefaultSelected(this.defaultValue);
            }
        },

        // 设置默认选中项
        setDefaultSelected(values) {
            if (!Array.isArray(values) || values.length === 0 || !this.options) {
                return;
            }

            this.selectedValues = [];
            this.selectedTexts = [];
            this.optionsList = [this.options];
            this.tabs = ["请选择"];
            this.activeTab = 0;

            // 遍历默认值，设置选中状态
            let currentOptions = this.options;
            for (let i = 0; i < values.length; i++) {
                const value = values[i];
                const option = currentOptions.find((opt) => opt.value === value);

                if (!option) {
                    console.warn(`默认值 ${value} 找不到对应选项`);
                    break;
                }

                // 保存选中的值和文本
                this.selectedValues[i] = option.value;
                this.selectedTexts[i] = option.text;

                // 将当前 tab 的文本替换为选中的选项文本
                this.tabs[i] = option.text;

                // 如果有子选项，添加到选项列表中
                if (option.children && option.children.length > 0) {
                    currentOptions = option.children;
                    this.optionsList[i + 1] = currentOptions;

                    // 添加下一级标签 - 默认显示"请选择"
                    this.tabs[i + 1] = "请选择";

                    // 移动到下一个标签
                    this.activeTab = i + 1;
                } else {
                    this.pathSelected = true;
                    break;
                }
            }
        },

        // 判断选项是否被选中
        isOptionSelected(tabIndex, option) {
            return this.selectedValues[tabIndex] === option.value;
        },

        // 点击选项
        onOptionClick(tabIndex, option) {
            if (option.disabled || this.selecting) {
                return;
            }

            this.selecting = true;

            // 如果点击的不是当前激活的标签对应的选项，则忽略
            if (tabIndex !== this.activeTab) {
                this.selecting = false;
                return;
            }

            // 更新选中值
            this.selectedValues[tabIndex] = option.value;
            this.selectedTexts[tabIndex] = option.text;

            // 将当前 tab 的文本替换为选中的选项文本
            this.tabs[tabIndex] = option.text;

            // 如果后面有选中的值，清除
            if (tabIndex < this.selectedValues.length - 1) {
                this.selectedValues.splice(tabIndex + 1);
                this.selectedTexts.splice(tabIndex + 1);
                this.optionsList.splice(tabIndex + 1);
                this.tabs.splice(tabIndex + 1);
            }

            // 判断是否有子选项
            if (option.children && option.children.length > 0) {
                // 添加子选项
                this.optionsList[tabIndex + 1] = option.children;

                // 添加标签 - 默认显示"请选择"
                this.tabs[tabIndex + 1] = "请选择";

                // 切换到下一个标签
                this.activeTab = tabIndex + 1;
                this.pathSelected = false;
            } else {
                // 没有子选项，选择完成
                this.pathSelected = true;
                this.$emit("pathSelected", {
                    values: [...this.selectedValues],
                    texts: [...this.selectedTexts],
                    options: this.getSelectedOptions(),
                });

                // 自动完成选择并关闭
                this.onFinish();
            }

            // 触发change事件
            this.$emit("change", {
                value: option.value,
                tabIndex: tabIndex,
                values: [...this.selectedValues],
                texts: [...this.selectedTexts],
            });

            this.selecting = false;
        },

        // 点击标签
        onTabClick(index) {
            this.activeTab = index;
        },

        // 滑动改变
        onSwiperChange(e) {
            this.activeTab = e.detail.current;
        },

        // 获取选中的所有选项
        getSelectedOptions() {
            const result = [];
            let currentOptions = this.options;

            for (let i = 0; i < this.selectedValues.length; i++) {
                const option = currentOptions.find((opt) => opt.value === this.selectedValues[i]);
                if (option) {
                    result.push(option);
                    if (option.children && option.children.length > 0) {
                        currentOptions = option.children;
                    } else {
                        break;
                    }
                } else {
                    break;
                }
            }

            return result;
        },

        // 完成选择
        onFinish() {
            if (this.pathSelected) {
                this.$emit("finish", {
                    values: [...this.selectedValues],
                    texts: [...this.selectedTexts],
                    options: this.getSelectedOptions(),
                });
                this.onClose();
            } else {
                uni.showToast({
                    title: "请选择完整路径",
                    icon: "none",
                });
            }
        },

        // 关闭选择器
        onClose() {
            this.showPopup = false;

            // 如果需要重置，则重置选择
            if (this.resetOnClose) {
                this.selectedValues = [];
                this.selectedTexts = [];
                this.tabs = ["请选择"];
                this.initCascader();
            }

            this.$emit("close");
        },

        // 重置选择
        reset() {
            this.selectedValues = [];
            this.selectedTexts = [];
            this.tabs = ["请选择"];
            this.initCascader();
        },
    },
};
</script>

<style>
.fanc-cascader {
    position: relative;
    background-color: #fff;
    user-select: none;
    width: 100%;
}

/* 头部样式 */
.fanc-cascader__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 92rpx;
    border-bottom: 1px solid var(--cascader-border-color);
}

.fanc-cascader__header-title {
    flex: 1;
    color: var(--cascader-text-color);
    text-align: center;
    font-size: 32rpx;
    font-weight: 500;
}

.fanc-cascader__header-btn {
    padding: 0 32rpx;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.fanc-cascader__header-cancel {
    font-size: 28rpx;
    color: var(--cascader-text-color);
}

.fanc-cascader__header-confirm {
    font-size: 28rpx;
    color: var(--cascader-active-color);
    font-weight: 500;
}

/* 内容区域样式 */
.fanc-cascader__content {
    height: 640rpx;
    display: flex;
    flex-direction: column;
}

/* 标签栏样式 */
.fanc-cascader__tabs {
    width: 100%;
    height: 80rpx;
    white-space: nowrap;
    border-bottom: 1px solid var(--cascader-border-color);
}

.fanc-cascader__tabs-inner {
    display: flex;
    height: 100%;
}

.fanc-cascader__tab {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 32rpx;
    height: 100%;
    font-size: 28rpx;
    color: var(--cascader-text-color);
    position: relative;
}

.fanc-cascader__tab--active {
    color: var(--cascader-active-color);
    font-weight: 500;
}

.fanc-cascader__tab--active::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 40rpx;
    height: 4rpx;
    background-color: var(--cascader-active-color);
    border-radius: 2rpx;
}

/* 选项列表样式 */
.fanc-cascader__options {
    flex: 1;
    width: 100%;
}

.fanc-cascader__option-list {
    height: 100%;
}

.fanc-cascader__option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32rpx;
    height: 88rpx;
    font-size: 28rpx;
    color: var(--cascader-text-color);
}

.fanc-cascader__option--active {
    color: var(--cascader-active-color);
    background-color: var(--cascader-option-active-bg);
}

.fanc-cascader__option--disabled {
    color: var(--cascader-disabled-color);
    cursor: not-allowed;
    opacity: 0.6;
}

.fanc-cascader__option-text {
    flex: 1;
}

.fanc-cascader__option-icon {
    width: 40rpx;
    height: 40rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}

.fanc-cascader__option-icon-check {
    width: 16rpx;
    height: 10rpx;
    border-left: 2px solid var(--cascader-active-color);
    border-bottom: 2px solid var(--cascader-active-color);
    transform: rotate(-45deg);
}
</style>
