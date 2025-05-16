<template>
    <view class="fanc-dropdown-menu">
        <scroll-view class="fanc-dropdown-menu__bar" scroll-x :scroll-with-animation="true" :show-scrollbar="false">
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
                    <text class="fanc-dropdown-menu__title">{{ item.title }}</text>
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
                    :class="{ 'fanc-dropdown-menu__option--active': selectedValues[activeIndex] === option.value }"
                    @click="onOptionClick(option)"
                >
                    <text class="fanc-dropdown-menu__option-text">{{ option.text }}</text>
                    <view v-if="selectedValues[activeIndex] === option.value" class="fanc-dropdown-menu__option-icon">
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
    },
    data() {
        return {
            activeIndex: null,
            showPopup: false,
            selectedValues: [],
            tempSelectedValue: null,
        };
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
            }
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

            // 关闭菜单
            this.closeMenu();

            // 触发选择事件
            this.$emit("select", {
                menuIndex: this.activeIndex,
                option: option,
                value: option.value,
            });
        },

        // 关闭菜单
        closeMenu() {
            // 如果设置了关闭后重置，则恢复临时值
            if (this.resetOnClose && this.tempSelectedValue !== null) {
                this.selectedValues[this.activeIndex] = this.tempSelectedValue;
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
                this.$emit("change", {
                    menuIndex: menuIndex,
                    value: value,
                });
            }
        },

        // 重置所有选择
        reset() {
            this.initSelectedValues();
            this.$emit("reset", this.selectedValues);
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
    }

    &__bar-inner {
        display: flex;
        min-width: 100%;
        height: 100%;
    }

    &__item {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 96px;
        height: 100%;
        padding: 0 16px;
        cursor: pointer;
        position: relative;
        transition: all var(--dropdown-menu-transition-duration);

        &--active {
            color: var(--dropdown-menu-active-color);
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
        max-height: 60vh;
        overflow-y: auto;
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
    }

    &__option {
        display: flex;
        align-items: center;
        padding: 12px 16px;
        position: relative;
        cursor: pointer;
        transition: all calc(var(--dropdown-menu-transition-duration) * 0.6);
        background-color: var(--dropdown-menu-option-bg);

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
