<template>
    <view class="fanc-filter-bar">
        <!-- 主筛选栏 -->
        <view class="fanc-filter-bar__main">
            <!-- 筛选项列表 -->
            <scroll-view scroll-x class="fanc-filter-bar__scroll" :scroll-left="scrollLeft">
                <view class="fanc-filter-bar__items">
                    <view
                        v-for="(item, index) in filterItems"
                        :key="index"
                        class="fanc-filter-bar__item"
                        :class="{
                            'fanc-filter-bar__item--active': activeIndexes.includes(index),
                            'fanc-filter-bar__item--disabled': item.disabled,
                        }"
                        @click="handleItemClick(item, index)"
                    >
                        <text class="fanc-filter-bar__item-text">{{ item.text }}</text>
                        <fanc-icon
                            v-if="item.type === 'dropdown' || item.type === 'drawer'"
                            :name="activeIndexes.includes(index) ? 'chevron-up' : 'chevron-down'"
                            size="12"
                            :color="
                                activeIndexes.includes(index)
                                    ? 'var(--fanc-primary-color)'
                                    : 'var(--text-secondary)'
                            "
                        ></fanc-icon>
                    </view>
                </view>
            </scroll-view>

            <!-- 更多筛选按钮 -->
            <view
                v-if="showMore"
                class="fanc-filter-bar__more"
                :class="{ 'fanc-filter-bar__more--active': showDrawer }"
                @click="toggleDrawer"
            >
                <text class="fanc-filter-bar__more-text">{{ moreText }}</text>
                <fanc-icon
                    :name="showDrawer ? 'chevron-up' : 'chevron-down'"
                    size="12"
                    :color="showDrawer ? 'var(--fanc-primary-color)' : 'var(--text-secondary)'"
                ></fanc-icon>
            </view>
        </view>

        <!-- 下拉菜单 -->
        <view
            v-if="currentDropdownIndex !== -1 && !showDrawer"
            class="fanc-filter-bar__dropdown"
            :style="{ height: dropdownHeight + 'px' }"
        >
            <view class="fanc-filter-bar__dropdown-content">
                <view
                    v-for="(option, index) in currentDropdownOptions"
                    :key="index"
                    class="fanc-filter-bar__dropdown-item"
                    :class="{ 'fanc-filter-bar__dropdown-item--active': isOptionActive(option) }"
                    @click="handleOptionClick(option)"
                >
                    <text class="fanc-filter-bar__dropdown-text">{{ option.text }}</text>
                    <fanc-icon
                        v-if="isOptionActive(option)"
                        name="check"
                        size="14"
                        color="var(--fanc-primary-color)"
                    ></fanc-icon>
                </view>
            </view>
        </view>

        <!-- 抽屉筛选面板 -->
        <fanc-popup
            v-model="showDrawer"
            position="top"
            :overlay="true"
            :z-index="100"
            :safe-area-inset-top="false"
            :round="false"
            @close="closeDrawer"
        >
            <view class="fanc-filter-bar__drawer">
                <view class="fanc-filter-bar__drawer-content">
                    <!-- 抽屉筛选项 -->
                    <view
                        v-for="(group, groupIndex) in drawerItems"
                        :key="groupIndex"
                        class="fanc-filter-bar__drawer-group"
                    >
                        <view class="fanc-filter-bar__drawer-title">{{ group.title }}</view>
                        <view class="fanc-filter-bar__drawer-options">
                            <view
                                v-for="(option, optionIndex) in group.options"
                                :key="optionIndex"
                                class="fanc-filter-bar__drawer-option"
                                :class="{
                                    'fanc-filter-bar__drawer-option--active': isDrawerOptionActive(
                                        group.id,
                                        option
                                    ),
                                }"
                                @click="handleDrawerOptionClick(group.id, option)"
                            >
                                <text class="fanc-filter-bar__drawer-option-text">{{
                                    option.text
                                }}</text>
                            </view>
                        </view>
                    </view>
                </view>

                <!-- 抽屉底部按钮 -->
                <view class="fanc-filter-bar__drawer-footer">
                    <view
                        class="fanc-filter-bar__drawer-btn fanc-filter-bar__drawer-btn--reset"
                        @click="resetDrawerFilters"
                    >
                        {{ resetText }}
                    </view>
                    <view
                        class="fanc-filter-bar__drawer-btn fanc-filter-bar__drawer-btn--confirm"
                        @click="confirmDrawerFilters"
                    >
                        {{ confirmText }}
                    </view>
                </view>
            </view>
        </fanc-popup>

        <!-- 遮罩层 -->
        <view
            v-if="currentDropdownIndex !== -1 && !showDrawer"
            class="fanc-filter-bar__mask"
            @click="closeDropdown"
        ></view>
    </view>
</template>

<script>
export default {
    name: "FancFilterBar",
    props: {
        // 筛选项配置
        items: {
            type: Array,
            default: () => [],
            /* 
        item 格式:
        {
          text: '筛选项文本',
          type: 'dropdown' | 'drawer' | 'radio', // 下拉菜单、抽屉筛选、单选切换
          value: '', // 当前选中的值
          options: [ // 选项列表，type为dropdown时必填
            { text: '选项1', value: 'value1' },
            { text: '选项2', value: 'value2' }
          ],
          disabled: false // 是否禁用
        }
      */
        },
        // 抽屉筛选项配置
        drawerItems: {
            type: Array,
            default: () => [],
            /*
        drawerItem 格式:
        {
          id: 'category', // 分组唯一标识
          title: '分类', // 分组标题
          multiple: false, // 是否多选
          options: [ // 选项列表
            { text: '选项1', value: 'value1' },
            { text: '选项2', value: 'value2' }
          ],
          value: '' // 当前选中的值，多选时为数组
        }
      */
        },
        // 是否显示更多筛选按钮
        showMore: {
            type: Boolean,
            default: true,
        },
        // 更多筛选按钮文本
        moreText: {
            type: String,
            default: "更多筛选",
        },
        // 重置按钮文本
        resetText: {
            type: String,
            default: "重置",
        },
        // 确认按钮文本
        confirmText: {
            type: String,
            default: "确定",
        },
        // 下拉菜单高度
        dropdownHeight: {
            type: Number,
            default: 300,
        },
        // 是否固定在顶部
        fixed: {
            type: Boolean,
            default: false,
        },
        // 是否显示底部边框
        border: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            activeIndexes: [], // 当前激活的筛选项索引
            currentDropdownIndex: -1, // 当前打开的下拉菜单索引
            showDrawer: false, // 是否显示抽屉
            scrollLeft: 0, // 横向滚动位置
            filterValues: {}, // 筛选值对象
            drawerValues: {}, // 抽屉筛选值对象
            tempDrawerValues: {}, // 临时存储抽屉筛选值
        };
    },
    computed: {
        // 筛选项列表
        filterItems() {
            return this.items.map((item) => {
                // 处理选项文本显示
                if (item.type === "dropdown" && item.value) {
                    const selectedOption = item.options.find(
                        (option) => option.value === item.value
                    );
                    if (selectedOption) {
                        return {
                            ...item,
                            text: item.showSelectedText
                                ? `${item.text}: ${selectedOption.text}`
                                : item.text,
                        };
                    }
                }
                return item;
            });
        },
        // 当前下拉菜单选项
        currentDropdownOptions() {
            if (this.currentDropdownIndex === -1) return [];
            const currentItem = this.items[this.currentDropdownIndex];
            return currentItem && currentItem.options ? currentItem.options : [];
        },
    },
    created() {
        // 初始化筛选值
        this.initFilterValues();
        this.initDrawerValues();
    },
    methods: {
        // 初始化筛选值
        initFilterValues() {
            const values = {};
            this.items.forEach((item, index) => {
                if (item.value !== undefined) {
                    values[index] = item.value;
                }
            });
            this.filterValues = values;
        },
        // 初始化抽屉筛选值
        initDrawerValues() {
            const values = {};
            this.drawerItems.forEach((group) => {
                values[group.id] = group.multiple ? group.value || [] : group.value;
            });
            this.drawerValues = JSON.parse(JSON.stringify(values));
            this.tempDrawerValues = JSON.parse(JSON.stringify(values));
        },
        // 处理筛选项点击
        handleItemClick(item, index) {
            if (item.disabled) return;

            if (item.type === "dropdown") {
                // 切换下拉菜单
                if (this.currentDropdownIndex === index) {
                    this.closeDropdown();
                } else {
                    this.openDropdown(index);
                }
            } else if (item.type === "drawer") {
                // 打开抽屉
                this.toggleDrawer();
            } else if (item.type === "radio") {
                // 单选切换
                const newValue = !this.filterValues[index];
                this.$set(this.filterValues, index, newValue);

                // 更新激活状态
                if (newValue) {
                    if (!this.activeIndexes.includes(index)) {
                        this.activeIndexes.push(index);
                    }
                } else {
                    const activeIndex = this.activeIndexes.indexOf(index);
                    if (activeIndex > -1) {
                        this.activeIndexes.splice(activeIndex, 1);
                    }
                }

                // 触发筛选变化事件
                this.emitFilterChange();
            }
        },
        // 打开下拉菜单
        openDropdown(index) {
            this.closeDrawer();
            this.currentDropdownIndex = index;

            // 更新激活状态
            if (!this.activeIndexes.includes(index)) {
                this.activeIndexes.push(index);
            }
        },
        // 关闭下拉菜单
        closeDropdown() {
            if (this.currentDropdownIndex === -1) return;

            // 如果没有选中值，移除激活状态
            const index = this.currentDropdownIndex;
            if (!this.filterValues[index]) {
                const activeIndex = this.activeIndexes.indexOf(index);
                if (activeIndex > -1) {
                    this.activeIndexes.splice(activeIndex, 1);
                }
            }

            this.currentDropdownIndex = -1;
        },
        // 切换抽屉显示状态
        toggleDrawer() {
            this.closeDropdown();
            this.showDrawer = !this.showDrawer;

            // 打开抽屉时，复制当前值到临时存储
            if (this.showDrawer) {
                this.tempDrawerValues = JSON.parse(JSON.stringify(this.drawerValues));
            }
        },
        // 关闭抽屉
        closeDrawer() {
            this.showDrawer = false;
        },
        // 处理下拉选项点击
        handleOptionClick(option) {
            if (this.currentDropdownIndex === -1) return;

            // 更新选中值
            this.$set(this.filterValues, this.currentDropdownIndex, option.value);

            // 关闭下拉菜单
            this.closeDropdown();

            // 更新激活状态
            if (option.value && !this.activeIndexes.includes(this.currentDropdownIndex)) {
                this.activeIndexes.push(this.currentDropdownIndex);
            }

            // 触发筛选变化事件
            this.emitFilterChange();
        },
        // 判断选项是否激活
        isOptionActive(option) {
            if (this.currentDropdownIndex === -1) return false;
            return this.filterValues[this.currentDropdownIndex] === option.value;
        },
        // 处理抽屉选项点击
        handleDrawerOptionClick(groupId, option) {
            const group = this.drawerItems.find((item) => item.id === groupId);
            if (!group) return;

            if (group.multiple) {
                // 多选处理
                const values = this.tempDrawerValues[groupId] || [];
                const index = values.indexOf(option.value);

                if (index > -1) {
                    values.splice(index, 1);
                } else {
                    values.push(option.value);
                }

                this.$set(this.tempDrawerValues, groupId, values);
            } else {
                // 单选处理
                this.$set(this.tempDrawerValues, groupId, option.value);
            }
        },
        // 判断抽屉选项是否激活
        isDrawerOptionActive(groupId, option) {
            const value = this.tempDrawerValues[groupId];
            if (Array.isArray(value)) {
                return value.includes(option.value);
            }
            return value === option.value;
        },
        // 重置抽屉筛选
        resetDrawerFilters() {
            // 重置临时值
            this.drawerItems.forEach((group) => {
                this.$set(this.tempDrawerValues, group.id, group.multiple ? [] : "");
            });
        },
        // 确认抽屉筛选
        confirmDrawerFilters() {
            // 应用临时值
            this.drawerValues = JSON.parse(JSON.stringify(this.tempDrawerValues));

            // 关闭抽屉
            this.closeDrawer();

            // 更新激活状态
            const hasActiveDrawerFilter = Object.keys(this.drawerValues).some((key) => {
                const value = this.drawerValues[key];
                return Array.isArray(value) ? value.length > 0 : Boolean(value);
            });

            // 找到drawer类型的筛选项索引
            const drawerIndex = this.items.findIndex((item) => item.type === "drawer");
            if (drawerIndex !== -1) {
                if (hasActiveDrawerFilter) {
                    if (!this.activeIndexes.includes(drawerIndex)) {
                        this.activeIndexes.push(drawerIndex);
                    }
                } else {
                    const activeIndex = this.activeIndexes.indexOf(drawerIndex);
                    if (activeIndex > -1) {
                        this.activeIndexes.splice(activeIndex, 1);
                    }
                }
            }

            // 触发筛选变化事件
            this.emitFilterChange();
        },
        // 触发筛选变化事件
        emitFilterChange() {
            // 构建完整的筛选结果
            const result = {
                filter: {},
                drawer: this.drawerValues,
            };

            // 处理普通筛选项
            this.items.forEach((item, index) => {
                if (item.type === "dropdown" && this.filterValues[index]) {
                    result.filter[item.id || index] = this.filterValues[index];
                } else if (item.type === "radio" && this.filterValues[index]) {
                    result.filter[item.id || index] = true;
                }
            });

            // 触发事件
            this.$emit("filter-change", result);
        },
    },
};
</script>

<style>
.fanc-filter-bar {
    position: relative;
    width: 100%;
    background-color: var(--bg-white);
    z-index: 10;
}

.fanc-filter-bar--fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
}

.fanc-filter-bar__main {
    display: flex;
    align-items: center;
    height: 88px;
    padding: 0 20px;
    box-sizing: border-box;
    border-bottom: 1px solid var(--border-color);
}

.fanc-filter-bar--no-border .fanc-filter-bar__main {
    border-bottom: none;
}

.fanc-filter-bar__scroll {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
}

.fanc-filter-bar__items {
    display: inline-flex;
    align-items: center;
}

.fanc-filter-bar__item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 56px;
    padding: 0 16px;
    margin-right: 16px;
    box-sizing: border-box;
    font-size: 28px;
    color: var(--text-primary);
    position: relative;
}

.fanc-filter-bar__item--active {
    color: var(--fanc-primary-color);
}

.fanc-filter-bar__item--disabled {
    color: var(--text-disabled);
    cursor: not-allowed;
}

.fanc-filter-bar__item-text {
    margin-right: 4px;
}

.fanc-filter-bar__more {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 56px;
    padding: 0 12px;
    font-size: 28px;
    color: var(--text-primary);
    white-space: nowrap;
}

.fanc-filter-bar__more--active {
    color: var(--fanc-primary-color);
}

.fanc-filter-bar__more-text {
    margin-right: 4px;
}

.fanc-filter-bar__dropdown {
    position: absolute;
    left: 0;
    right: 0;
    top: 88px;
    z-index: 11;
    background-color: var(--bg-white);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
    overflow-y: auto;
    transition: height 0.3s ease-out;
}

.fanc-filter-bar__dropdown-content {
    padding: 16px 0;
}

.fanc-filter-bar__dropdown-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 32px;
    font-size: 28px;
    color: var(--text-primary);
}

.fanc-filter-bar__dropdown-item--active {
    color: var(--fanc-primary-color);
}

.fanc-filter-bar__mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
    background-color: rgba(0, 0, 0, 0.5);
}

.fanc-filter-bar__drawer {
    max-height: 70vh;
    display: flex;
    flex-direction: column;
}

.fanc-filter-bar__drawer-content {
    flex: 1;
    overflow-y: auto;
    padding: 24px 32px;
}

.fanc-filter-bar__drawer-group {
    margin-bottom: 32px;
}

.fanc-filter-bar__drawer-group:last-child {
    margin-bottom: 0;
}

.fanc-filter-bar__drawer-title {
    font-size: 28px;
    font-weight: 500;
    color: var(--text-primary);
    margin-bottom: 20px;
}

.fanc-filter-bar__drawer-options {
    display: flex;
    flex-wrap: wrap;
}

.fanc-filter-bar__drawer-option {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 64px;
    padding: 0 24px;
    margin-right: 20px;
    margin-bottom: 20px;
    border-radius: 32px;
    font-size: 26px;
    color: var(--text-primary);
    background-color: var(--gray-100);
}

.fanc-filter-bar__drawer-option--active {
    color: var(--white);
    background-color: var(--fanc-primary-color);
}

.fanc-filter-bar__drawer-footer {
    display: flex;
    height: 100px;
    border-top: 1px solid var(--border-color);
}

.fanc-filter-bar__drawer-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 32px;
}

.fanc-filter-bar__drawer-btn--reset {
    color: var(--text-primary);
    background-color: var(--bg-white);
}

.fanc-filter-bar__drawer-btn--confirm {
    color: var(--white);
    background-color: var(--fanc-primary-color);
}
</style>
