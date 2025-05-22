<template>
    <view class="fanc-picker" :class="{ 'fanc-picker--disabled': disabled }">
        <view
            class="fanc-picker__mask"
            :class="{ 'fanc-picker__mask--hidden': !showPicker }"
            @click="onCancel"
            v-if="showPicker && overlay"
        ></view>

        <view
            class="fanc-picker__container"
            :class="{
                'fanc-picker__container--show': showPicker,
                'fanc-picker__container--round': round,
            }"
        >
            <!-- 标题栏 -->
            <view class="fanc-picker__header" v-if="showToolbar">
                <view
                    class="fanc-picker__cancel"
                    hover-class="fanc-picker__cancel--hover"
                    @click="onCancel"
                    >{{ cancelText }}</view
                >
                <view class="fanc-picker__title">{{ title }}</view>
                <view
                    class="fanc-picker__confirm"
                    hover-class="fanc-picker__confirm--hover"
                    @click="onConfirm"
                    >{{ confirmText }}</view
                >
            </view>

            <!-- 选择器主体 -->
            <view class="fanc-picker__body" :style="{ height: height }">
                <picker-view
                    class="fanc-picker__view"
                    :value="pickerValue"
                    :indicator-style="indicatorStyle"
                    :mask-style="maskStyle"
                    @change="onChange"
                >
                    <!-- 级联选择 -->
                    <template v-if="cascade">
                        <picker-view-column
                            v-for="(column, columnIndex) in displayColumns"
                            :key="columnIndex"
                        >
                            <view
                                class="fanc-picker__item"
                                :class="{ 'fanc-picker__item--disabled': item.disabled }"
                                v-for="(item, index) in column"
                                :key="index"
                            >
                                {{ getItemText(item) }}
                            </view>
                        </picker-view-column>
                    </template>

                    <!-- 多列数据 -->
                    <template v-else-if="isMultiColumns">
                        <picker-view-column
                            v-for="(column, columnIndex) in columns"
                            :key="columnIndex"
                        >
                            <view
                                class="fanc-picker__item"
                                :class="{ 'fanc-picker__item--disabled': item.disabled }"
                                v-for="(item, index) in column"
                                :key="index"
                            >
                                {{ getItemText(item) }}
                            </view>
                        </picker-view-column>
                    </template>

                    <!-- 单列数据 -->
                    <template v-else>
                        <picker-view-column>
                            <view
                                class="fanc-picker__item"
                                :class="{ 'fanc-picker__item--disabled': item.disabled }"
                                v-for="(item, index) in columns"
                                :key="index"
                            >
                                {{ getItemText(item) }}
                            </view>
                        </picker-view-column>
                    </template>
                </picker-view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    name: "fanc-picker",
    props: {
        // 是否显示选择器
        show: {
            type: Boolean,
            default: false,
        },
        // 选择器标题
        title: {
            type: String,
            default: "请选择",
        },
        // 确认按钮文字
        confirmText: {
            type: String,
            default: "确认",
        },
        // 取消按钮文字
        cancelText: {
            type: String,
            default: "取消",
        },
        // 选择器数据
        columns: {
            type: Array,
            default: () => [],
        },
        // 默认选中项索引数组
        defaultIndex: {
            type: Array,
            default: () => [],
        },
        // 是否显示顶部栏
        showToolbar: {
            type: Boolean,
            default: true,
        },
        // 是否禁用
        disabled: {
            type: Boolean,
            default: false,
        },
        // 选择器高度
        height: {
            type: String,
            default: "200px",
        },
        // 是否显示遮罩层
        overlay: {
            type: Boolean,
            default: true,
        },
        // 是否圆角
        round: {
            type: Boolean,
            default: false,
        },
        // 选项对象中，文字对应的键名
        textKey: {
            type: String,
            default: "text",
        },
        // 选项对象中，值对应的键名
        valueKey: {
            type: String,
            default: "value",
        },
        // 是否级联选择
        cascade: {
            type: Boolean,
            default: false,
        },
        // 级联选择中，子选项对应的键名
        childrenKey: {
            type: String,
            default: "children",
        },
    },
    data() {
        return {
            showPicker: false,
            pickerValue: [],
            currentValue: [],
            indicatorStyle: `height: 40px; line-height: 40px; border-top: 1px solid #ebedf0; border-bottom: 1px solid #ebedf0;`,
            maskStyle: `background-size: 100% 80px;`,
            isMultiColumns: false,
            // 级联选择时的展示列
            displayColumns: [],
        };
    },
    watch: {
        show: {
            handler(val) {
                this.showPicker = val;
                if (val) {
                    this.initDefaultValue();
                }
            },
            immediate: true,
        },
        defaultIndex: {
            handler() {
                this.initDefaultValue();
            },
            deep: true,
        },
        columns: {
            handler() {
                this.initDefaultValue();
            },
            deep: true,
        },
    },
    methods: {
        // 检查columns是否为多列数据
        checkMultiColumns() {
            if (this.cascade) {
                // 级联选择模式下，需要根据选中项动态生成展示列
                this.isMultiColumns = true;
            } else {
                this.isMultiColumns = Array.isArray(this.columns[0]);
            }
        },

        // 初始化级联选择的展示列
        initCascadeColumns() {
            if (!this.cascade) return;

            this.displayColumns = [];

            // 添加第一列
            this.displayColumns.push(this.columns);

            // 如果有默认选中值，则根据默认值初始化后续列
            if (this.pickerValue.length > 0) {
                const firstIndex = this.pickerValue[0];
                if (this.columns.length > 0 && firstIndex < this.columns.length) {
                    const firstItem = this.columns[firstIndex];
                    // 递归添加后续列
                    this.addSubsequentColumns(firstItem, 0);
                }
            }
        },

        // 初始化默认值
        initDefaultValue() {
            this.checkMultiColumns();

            const defaultValue = [];

            if (this.cascade) {
                // 级联选择模式
                let currentColumn = this.columns;
                let i = 0;

                // 确保初始化时能够走到最深层级
                while (currentColumn && currentColumn.length) {
                    const defaultIndex = this.defaultIndex[i] || 0;
                    const validIndex = Math.min(defaultIndex, currentColumn.length - 1);
                    defaultValue.push(validIndex);

                    const selectedItem = currentColumn[validIndex];
                    if (
                        selectedItem &&
                        selectedItem[this.childrenKey] &&
                        selectedItem[this.childrenKey].length
                    ) {
                        currentColumn = selectedItem[this.childrenKey];
                        i++;
                    } else {
                        break;
                    }
                }

                this.pickerValue = defaultValue;
                this.initCascadeColumns();
            } else if (this.isMultiColumns) {
                // 多列数据处理
                this.columns.forEach((column, index) => {
                    const defaultIndex = this.defaultIndex[index] || 0;
                    defaultValue.push(Math.min(defaultIndex, column.length - 1));
                });
                this.pickerValue = defaultValue;
            } else {
                // 单列数据处理
                const defaultIndex = this.defaultIndex[0] || 0;
                defaultValue.push(Math.min(defaultIndex, this.columns.length - 1));
                this.pickerValue = defaultValue;
            }

            this.currentValue = this.getSelectedValues();
        },

        // 获取选项文本
        getItemText(item) {
            if (typeof item === "object") {
                return item[this.textKey] || "";
            }
            return item || "";
        },

        // 获取选项值
        getItemValue(item) {
            if (typeof item === "object") {
                return item[this.valueKey];
            }
            return item;
        },

        // 获取当前选中的值
        getSelectedValues() {
            const selectedItems = this.getSelectedItems();
            return selectedItems.map((item) => this.getItemValue(item));
        },

        // 获取当前选中的项
        getSelectedItems() {
            const selectedItems = [];

            if (this.cascade) {
                // 级联选择模式
                let currentColumn = this.columns;
                for (let i = 0; i < this.pickerValue.length; i++) {
                    const index = this.pickerValue[i];
                    if (currentColumn && currentColumn.length > 0 && index < currentColumn.length) {
                        const item = currentColumn[index];
                        selectedItems.push(item);
                        if (item[this.childrenKey] && item[this.childrenKey].length) {
                            currentColumn = item[this.childrenKey];
                        } else {
                            break;
                        }
                    }
                }
            } else if (this.isMultiColumns) {
                // 多列数据处理
                this.columns.forEach((column, columnIndex) => {
                    const index = this.pickerValue[columnIndex] || 0;
                    if (column && column.length > 0 && index < column.length) {
                        selectedItems.push(column[index]);
                    }
                });
            } else {
                // 单列数据处理
                const index = this.pickerValue[0] || 0;
                if (this.columns.length > 0 && index < this.columns.length) {
                    selectedItems.push(this.columns[index]);
                }
            }

            return selectedItems;
        },

        // 更新级联选择的展示列
        updateCascadeColumns(columnIndex) {
            if (!this.cascade) return;

            // 保留当前列及之前的列
            this.displayColumns = this.displayColumns.slice(0, columnIndex + 1);

            // 重置选中值数组，只保留当前列及之前的列
            this.pickerValue = this.pickerValue.slice(0, columnIndex + 1);

            // 获取当前选中项
            let currentColumn = this.columns;
            let selectedItem = null;

            // 找到当前选中的项
            for (let i = 0; i <= columnIndex; i++) {
                const index = this.pickerValue[i];
                if (currentColumn && currentColumn.length > 0 && index < currentColumn.length) {
                    selectedItem = currentColumn[index];
                    if (i < columnIndex && selectedItem[this.childrenKey]) {
                        currentColumn = selectedItem[this.childrenKey];
                    }
                }
            }

            // 递归添加所有后续列
            this.addSubsequentColumns(selectedItem, columnIndex);
        },

        // 递归添加后续列
        addSubsequentColumns(item, columnIndex) {
            if (!item || !item[this.childrenKey] || !item[this.childrenKey].length) {
                return;
            }

            // 添加子列
            const childColumn = item[this.childrenKey];
            this.displayColumns.push(childColumn);

            // 为新列设置默认选中值（第一项）
            this.pickerValue.push(0);

            // 递归添加下一级列
            const childItem = childColumn[0];
            this.addSubsequentColumns(childItem, columnIndex + 1);
        },

        // 选择器变化事件
        onChange(e) {
            const newValue = e.detail.value;
            const oldValue = [...this.pickerValue];
            let updatedValue = [...newValue];
            let valueChanged = false;

            // 检查是否选中了禁用项
            if (this.cascade) {
                // 找出变化的列
                for (let i = 0; i < newValue.length && i < this.pickerValue.length; i++) {
                    if (newValue[i] !== this.pickerValue[i]) {
                        // 获取当前列的数据
                        let currentColumnData = i === 0 ? this.columns : this.displayColumns[i];

                        // 检查选中项是否禁用
                        if (
                            currentColumnData[newValue[i]] &&
                            currentColumnData[newValue[i]].disabled
                        ) {
                            // 如果禁用，恢复原来的值
                            updatedValue[i] = oldValue[i];
                            valueChanged = true;
                        } else {
                            // 更新选中值，只保留到变化的列
                            this.pickerValue = updatedValue.slice(0, i + 1);
                            // 更新级联列
                            this.updateCascadeColumns(i);
                            break;
                        }
                    }
                }
            } else if (this.isMultiColumns) {
                // 多列数据处理
                for (let i = 0; i < newValue.length; i++) {
                    if (newValue[i] !== oldValue[i]) {
                        const column = this.columns[i];
                        if (column[newValue[i]] && column[newValue[i]].disabled) {
                            updatedValue[i] = oldValue[i];
                            valueChanged = true;
                        }
                    }
                }
                this.pickerValue = updatedValue;
            } else {
                // 单列数据处理
                if (newValue[0] !== oldValue[0]) {
                    const selectedItem = this.columns[newValue[0]];
                    if (selectedItem && selectedItem.disabled) {
                        updatedValue[0] = oldValue[0];
                        valueChanged = true;
                    }
                }
                this.pickerValue = updatedValue;
            }

            // 如果值被修改（因为选中了禁用项），则重新设置picker的值
            if (valueChanged) {
                // 在下一个事件循环中更新视图
                this.$nextTick(() => {
                    this.pickerValue = updatedValue;
                });
            }

            this.currentValue = this.getSelectedValues();

            this.$emit("change", {
                picker: this,
                value: this.currentValue,
                index: this.pickerValue,
                items: this.getSelectedItems(),
            });
        },

        // 点击确认按钮
        onConfirm() {
            if (this.disabled) return;

            // 检查是否有选中禁用项
            const selectedItems = this.getSelectedItems();
            for (const item of selectedItems) {
                if (item && item.disabled) {
                    // 如果有禁用项被选中，不触发确认事件
                    return;
                }
            }

            this.$emit("confirm", {
                value: this.currentValue,
                index: this.pickerValue,
                items: selectedItems,
            });

            this.onCancel();
        },

        // 点击取消按钮
        onCancel() {
            if (this.disabled) return;

            this.$emit("cancel");
            this.$emit("update:show", false);
            this.showPicker = false;
        },
    },
    mounted() {
        if (this.cascade && this.show) {
            this.$nextTick(() => {
                this.initDefaultValue();
            });
        }
    },
};
</script>

<style>
.fanc-picker {
    position: relative;
}

.fanc-picker--disabled {
    opacity: var(--picker-disabled-opacity);
}

.fanc-picker__mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--picker-mask-color);
    z-index: var(--picker-z-index);
    transition: opacity var(--picker-transition-duration);
}

.fanc-picker__mask--hidden {
    display: none;
}

.fanc-picker__container {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--picker-bg-color);
    transform: translateY(100%);
    transition: transform var(--picker-transition-duration);
    z-index: calc(var(--picker-z-index) + 1);
    display: flex;
    flex-direction: column;
}

.fanc-picker__container--show {
    transform: translateY(0);
}

.fanc-picker__container--round {
    border-radius: var(--picker-border-radius) var(--picker-border-radius) 0 0;
}

.fanc-picker__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--picker-header-height);
    padding: 0 var(--picker-header-padding);
    background-color: var(--picker-header-bg-color);
    position: relative;
}

.fanc-picker__header::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    background-color: var(--picker-border-color);
    transform: scaleY(0.5);
}

.fanc-picker__title {
    flex: 1;
    text-align: center;
    font-weight: 500;
    font-size: var(--picker-title-font-size);
    color: var(--picker-title-color);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.fanc-picker__cancel,
.fanc-picker__confirm {
    padding: 0 var(--picker-action-padding);
    font-size: var(--picker-action-font-size);
}

.fanc-picker__cancel {
    color: var(--picker-cancel-color);
}

.fanc-picker__confirm {
    color: var(--picker-confirm-color);
}

.fanc-picker__cancel--hover,
.fanc-picker__confirm--hover {
    opacity: 0.7;
}

.fanc-picker__body {
    position: relative;
    overflow: hidden;
}

.fanc-picker__view {
    width: 100%;
    height: 100%;
}

.fanc-picker__item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    line-height: 40px;
    padding: 0 var(--picker-item-padding);
    font-size: var(--picker-item-font-size);
    color: var(--picker-item-color);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.fanc-picker__item--disabled {
    color: var(--picker-item-disabled-color);
}
</style>
