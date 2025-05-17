<template>
    <view class="fanc-dropdown-menu" :style="customStyle">
        <scroll-view
            class="fanc-dropdown-menu__bar"
            scroll-x
            :scroll-with-animation="true"
            :show-scrollbar="false"
        >
            <view class="fanc-dropdown-menu__bar-inner">
                <view
                    v-for="(item, index) in options"
                    :key="index"
                    class="fanc-dropdown-menu__item"
                    :class="{
                        'fanc-dropdown-menu__item--active': activeIndex === index,
                        'fanc-dropdown-menu__item--disabled': item.disabled,
                    }"
                    @click="onMenuClick(index, item)"
                >
                    <text class="fanc-dropdown-menu__title">{{ getMenuText(item, index) }}</text>
                    <view
                        class="fanc-dropdown-menu__arrow"
                        :class="{ 'fanc-dropdown-menu__arrow--active': activeIndex === index }"
                    ></view>
                </view>
            </view>
        </scroll-view>

        <view
            v-if="activeIndex !== null && showPopup"
            class="fanc-dropdown-menu__popup"
            :class="{
                'fanc-dropdown-menu__popup--top': direction === 'up',
                'fanc-dropdown-menu__popup--bottom': direction === 'down',
            }"
            @click.stop
        >
            <view class="fanc-dropdown-menu__content">
                <view
                    v-for="(option, idx) in options[activeIndex].options"
                    :key="idx"
                    class="fanc-dropdown-menu__option"
                    :class="{
                        'fanc-dropdown-menu__option--active':
                            selectedValues[activeIndex] === option.value,
                    }"
                    @click="onOptionClick(option)"
                >
                    <text class="fanc-dropdown-menu__option-text">{{ option.text }}</text>
                    <view
                        v-if="selectedValues[activeIndex] === option.value"
                        class="fanc-dropdown-menu__option-icon"
                    >
                        <view class="fanc-dropdown-menu__option-icon-check"></view>
                    </view>
                </view>
            </view>
        </view>

        <view
            v-if="activeIndex !== null && showPopup && overlay"
            class="fanc-dropdown-menu__overlay"
            @click="closeMenu"
        ></view>
    </view>
</template>

<script>
export default {
    name: "FancDropdownMenu",
    props: {
        // 菜单选项配置
        options: {
            type: Array,
            default: () => [],
            validator: (value) => {
                return value.every(
                    (item) =>
                        typeof item === "object" &&
                        item.hasOwnProperty("title") &&
                        item.hasOwnProperty("options") &&
                        Array.isArray(item.options)
                );
            },
        },
        // 下拉方向：up-向上，down-向下
        direction: {
            type: String,
            default: "down",
            validator: (value) => ["up", "down"].includes(value),
        },
        // 是否显示遮罩层
        overlay: {
            type: Boolean,
            default: true,
        },
        // 初始选中值
        defaultValues: {
            type: Array,
            default: () => [],
        },
        // 关闭后是否重置选择
        resetOnClose: {
            type: Boolean,
            default: false,
        },
        // 自定义排序函数
        sortFunction: {
            type: Function,
            default: null,
        },
        // 自定义选中态颜色
        activeColor: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            activeIndex: null,
            showPopup: false,
            selectedValues: [],
            tempSelectedValue: null,
            selectedTexts: [], // 存储选中的文本值
        };
    },
    computed: {
        // 生成自定义样式，设置CSS变量
        customStyle() {
            if (!this.activeColor) return {};

            // 生成对应的半透明背景色
            const activeBackgroundColor = this.generateBackgroundColor(this.activeColor);

            return {
                "--dropdown-menu-active-color": this.activeColor,
                "--dropdown-menu-active-arrow-color": this.activeColor,
                "--dropdown-menu-option-active-color": this.activeColor,
                "--dropdown-menu-option-active-bg": activeBackgroundColor,
            };
        },
    },
    created() {
        // 初始化选中项
        this.initSelectedValues();

        // #ifdef H5
        // H5平台，添加点击外部关闭功能
        if (typeof document !== "undefined") {
            this._handleDocumentClick = (e) => {
                const target = e.target;
                const menu = this.$el;
                if (menu && !menu.contains(target)) {
                    this.closeMenu();
                }
            };
        }
        // #endif
    },
    methods: {
        // 初始化选中值
        initSelectedValues() {
            if (this.options && this.options.length > 0) {
                this.selectedValues = this.options.map((item, index) => {
                    // 使用默认值或第一个选项的值
                    if (this.defaultValues && this.defaultValues[index] !== undefined) {
                        return this.defaultValues[index];
                    }
                    return item.options && item.options.length > 0 ? item.options[0].value : null;
                });

                // 初始化选中文本
                this.updateSelectedTexts();
            }
        },

        // 更新选中文本
        updateSelectedTexts() {
            this.selectedTexts = this.options.map((item, index) => {
                const selectedValue = this.selectedValues[index];
                if (selectedValue !== null && item.options) {
                    const selectedOption = item.options.find(
                        (option) => option.value === selectedValue
                    );
                    return selectedOption ? selectedOption.text : item.title;
                }
                return item.title;
            });
        },

        // 获取菜单显示文本
        getMenuText(item, index) {
            if (this.selectedTexts && this.selectedTexts[index]) {
                return this.selectedTexts[index];
            }
            return item.title;
        },

        // 点击菜单项
        onMenuClick(index, item) {
            if (item.disabled) return;

            // 如果点击相同的菜单，则关闭菜单
            if (this.activeIndex === index && this.showPopup) {
                this.closeMenu();
                return;
            }

            // 保存临时选中值
            this.tempSelectedValue = this.selectedValues[index];

            // 显示下拉内容
            this.activeIndex = index;
            this.showPopup = true;

            // 排序选项
            if (this.sortFunction && typeof this.sortFunction === "function") {
                this.sortOptions(index);
            }

            // 添加点击外部关闭功能
            // #ifdef H5
            if (typeof document !== "undefined") {
                setTimeout(() => {
                    document.addEventListener("click", this._handleDocumentClick);
                }, 0);
            }
            // #endif

            this.$emit("open", index);
        },

        // 点击选项
        onOptionClick(option) {
            // 更新选中值
            this.selectedValues[this.activeIndex] = option.value;

            // 更新选中文本
            this.selectedTexts[this.activeIndex] = option.text;

            // 关闭菜单
            this.closeMenu();

            // 触发选择事件
            this.$emit("select", {
                menuIndex: this.activeIndex,
                option: option,
                value: option.value,
                text: option.text,
            });
        },

        // 关闭菜单
        closeMenu() {
            // 如果设置了关闭后重置，则恢复临时值
            if (this.resetOnClose && this.tempSelectedValue !== null) {
                this.selectedValues[this.activeIndex] = this.tempSelectedValue;
                this.updateSelectedTexts(); // 更新选中文本
            }

            this.showPopup = false;
            this.activeIndex = null;
            this.tempSelectedValue = null;

            // #ifdef H5
            if (typeof document !== "undefined") {
                document.removeEventListener("click", this._handleDocumentClick);
            }
            // #endif

            this.$emit("close");
        },

        // 排序选项
        sortOptions(index) {
            if (this.options[index] && this.options[index].options) {
                this.options[index].options = this.sortFunction(this.options[index].options);
            }
        },

        // 手动更新选中值
        updateValue(menuIndex, value) {
            if (menuIndex >= 0 && menuIndex < this.selectedValues.length) {
                this.selectedValues[menuIndex] = value;

                // 更新选中文本
                if (this.options[menuIndex] && this.options[menuIndex].options) {
                    const selectedOption = this.options[menuIndex].options.find(
                        (option) => option.value === value
                    );
                    if (selectedOption) {
                        this.selectedTexts[menuIndex] = selectedOption.text;
                    }
                }

                this.$emit("change", {
                    menuIndex: menuIndex,
                    value: value,
                    text: this.selectedTexts[menuIndex],
                });
            }
        },

        // 重置所有选择
        reset() {
            this.initSelectedValues();
            this.$emit("reset", this.selectedValues);
        },

        // 生成背景色（支持多种颜色格式）
        generateBackgroundColor(color) {
            // 默认的背景色（如果无法处理输入颜色）
            const defaultBgColor = "rgba(0, 123, 255, 0.05)";

            // 检查颜色格式
            if (!color) return defaultBgColor;

            // 处理十六进制格式
            if (color.startsWith("#")) {
                const rgbColor = this.hexToRgb(color);
                if (rgbColor) {
                    return `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.05)`;
                }
            }

            // 处理rgb格式
            if (color.startsWith("rgb(")) {
                const rgbMatch = color.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/);
                if (rgbMatch) {
                    return `rgba(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}, 0.05)`;
                }
            }

            // 处理rgba格式（保留原透明度但最小为0.05）
            if (color.startsWith("rgba(")) {
                const rgbaMatch = color.match(
                    /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9]*\.?[0-9]+)\s*\)/
                );
                if (rgbaMatch) {
                    // 取原透明度和0.05中较小的值
                    const alpha = Math.min(parseFloat(rgbaMatch[4]), 0.05);
                    return `rgba(${rgbaMatch[1]}, ${rgbaMatch[2]}, ${rgbaMatch[3]}, ${alpha})`;
                }
            }

            // 对于其他格式，或无法识别的格式，直接使用原始颜色但设置较低透明度
            try {
                // 可以使用自定义div测试颜色是否有效
                const testDiv = document.createElement("div");
                testDiv.style.color = color;

                // 如果能成功设置颜色，返回带透明度的同色系背景
                if (testDiv.style.color !== "") {
                    return `${color.split(")")[0]})`
                        .replace("rgb(", "rgba(")
                        .replace(")", ", 0.05)");
                }
            } catch (e) {
                // 忽略异常，使用默认色
            }

            return defaultBgColor;
        },

        // 将十六进制颜色转为RGB格式
        hexToRgb(hex) {
            // 移除#号（如果有）
            hex = hex.replace(/^#/, "");

            // 根据颜色字符串长度处理不同格式
            let r, g, b;
            if (hex.length === 3) {
                // 短格式 #RGB
                r = parseInt(hex.charAt(0) + hex.charAt(0), 16);
                g = parseInt(hex.charAt(1) + hex.charAt(1), 16);
                b = parseInt(hex.charAt(2) + hex.charAt(2), 16);
            } else if (hex.length === 6) {
                // 标准格式 #RRGGBB
                r = parseInt(hex.substring(0, 2), 16);
                g = parseInt(hex.substring(2, 4), 16);
                b = parseInt(hex.substring(4, 6), 16);
            } else {
                // 无效的格式
                return null;
            }

            return { r, g, b };
        },
    },
    beforeDestroy() {
        // #ifdef H5
        if (typeof document !== "undefined") {
            document.removeEventListener("click", this._handleDocumentClick);
        }
        // #endif
    },
};
</script>

<style lang="scss">
.fanc-dropdown-menu {
    position: relative;
    width: 100%;

    &__bar {
        width: 100%;
        height: 48px;
        background-color: var(--dropdown-menu-bg);
        border-bottom: 1px solid var(--dropdown-menu-border-color);
        box-shadow: 0 2px 8px var(--dropdown-menu-shadow-color);
        position: relative;
    }

    &__bar-inner {
        display: flex;
        min-width: 100%;
        height: 100%;
        overflow: -moz-scrollbars-none; /* 额外处理Firefox旧版本 */
    }

    &__item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        min-width: 96px;
        height: 100%;
        padding: 0 16px;
        cursor: pointer;
        position: relative;
        transition: all var(--dropdown-menu-transition-duration);

        &--active {
            color: var(--dropdown-menu-active-color);

            .fanc-dropdown-menu__title {
                color: var(--dropdown-menu-active-color);
                font-weight: 500;
            }
        }

        &--disabled {
            opacity: var(--dropdown-menu-disabled-opacity);
            cursor: not-allowed;
            color: var(--dropdown-menu-disabled-color);
        }

        &:active {
            background-color: rgba(0, 0, 0, 0.05);
        }
    }

    &__title {
        font-size: 14px;
        flex: 1;
        text-align: center;
        margin-right: 4px;
        color: var(--dropdown-menu-title-color);
        transition: color var(--dropdown-menu-transition-duration);
    }

    &__arrow {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-top: 1px solid var(--dropdown-menu-arrow-color);
        border-right: 1px solid var(--dropdown-menu-arrow-color);
        transform: rotate(135deg);
        transition: transform var(--dropdown-menu-transition-duration);
        margin-top: -2px;

        &--active {
            transform: rotate(-45deg);
            border-color: var(--dropdown-menu-active-arrow-color);
        }
    }

    &__popup {
        position: absolute;
        left: 0;
        width: 100%;
        background-color: var(--dropdown-menu-bg);
        box-shadow: 0 2px 12px var(--dropdown-menu-shadow-color);
        z-index: var(--dropdown-menu-z-index);
        overflow: hidden;
        transform-origin: center top;
        animation: fanc-dropdown-in var(--dropdown-menu-transition-duration) both;

        &--top {
            bottom: 100%;
            border-bottom: 1px solid var(--dropdown-menu-border-color);
            transform-origin: center bottom;
        }

        &--bottom {
            top: 100%;
            border-top: 1px solid var(--dropdown-menu-border-color);
            transform-origin: center top;
        }
    }

    &__content {
        padding: 4px 0;
        max-height: calc(48px * 6); /* 最多显示6个选项 */
        overflow-y: auto;
    }

    &__option {
        display: flex;
        align-items: center;
        padding: 12px 16px;
        position: relative;
        cursor: pointer;
        transition: all calc(var(--dropdown-menu-transition-duration) * 0.6);
        background-color: var(--dropdown-menu-option-bg);
        height: 48px;
        box-sizing: border-box;

        &:active {
            background-color: var(--dropdown-menu-option-active-bg);
        }

        &--active {
            color: var(--dropdown-menu-option-active-color);
        }
    }

    &__option-text {
        flex: 1;
        font-size: 14px;
    }

    &__option-icon {
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__option-icon-check {
        width: 6px;
        height: 10px;
        border-right: 2px solid var(--dropdown-menu-active-color);
        border-bottom: 2px solid var(--dropdown-menu-active-color);
        transform: rotate(45deg);
    }

    &__overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--dropdown-menu-mask-color);
        z-index: calc(var(--dropdown-menu-z-index) - 1);
        animation: fanc-fade-in var(--dropdown-menu-transition-duration) both;
    }
}

@keyframes fanc-dropdown-in {
    from {
        opacity: 0;
        transform: scaleY(0.8);
    }
    to {
        opacity: 1;
        transform: scaleY(1);
    }
}

@keyframes fanc-fade-in {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>
