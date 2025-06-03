<template>
    <view
        class="fanc-table"
        :class="[
            `fanc-table--${size}`,
            {
                'is-bordered': bordered,
                'is-striped': striped,
                'is-loading': loading,
                'is-hover': hover,
                'is-selectable': selectable,
            },
        ]"
    >
        <!-- 加载层 -->
        <view v-if="loading" class="fanc-table__loading">
            <view class="fanc-table__loading-spinner"></view>
            <text v-if="loadingText" class="fanc-table__loading-text">{{ loadingText }}</text>
        </view>

        <scroll-view scroll-x class="fanc-table__scroll" :style="{ maxHeight: maxHeight }">
            <view class="fanc-table__wrapper">
                <!-- 表头 -->
                <view class="fanc-table__header">
                    <view class="fanc-table__row">
                        <!-- 选择列 -->
                        <view
                            v-if="selectable"
                            class="fanc-table__cell fanc-table__cell--selection"
                            :style="{ width: '56px' }"
                        >
                            <checkbox
                                v-if="data.length"
                                :checked="isAllSelected"
                                @click="handleSelectAll"
                            />
                        </view>

                        <!-- 普通列头 -->
                        <view
                            v-for="(column, columnIndex) in columns"
                            :key="columnIndex"
                            class="fanc-table__cell fanc-table__header-cell"
                            :class="[
                                `fanc-table__cell--align-${column.align || align}`,
                                {
                                    'is-sortable': column.sortable || (sortable && column.key),
                                },
                            ]"
                            :style="{ width: column.width || defaultColumnWidth }"
                            @click="handleSortChange(column)"
                        >
                            <view class="fanc-table__cell-content">
                                {{ column.title }}

                                <!-- 排序图标 -->
                                <view
                                    v-if="column.sortable || (sortable && column.key)"
                                    class="fanc-table__sort-icons"
                                    :class="{ 'is-right': sortIconPosition === 'right' }"
                                >
                                    <fanc-icon
                                        name="caret-up"
                                        size="12"
                                        :color="
                                            sortInfo.key === column.key && sortInfo.order === 'asc'
                                                ? 'var(--table-sort-icon-active-color)'
                                                : 'var(--table-sort-icon-color)'
                                        "
                                    />
                                    <fanc-icon
                                        name="caret-down"
                                        size="12"
                                        :color="
                                            sortInfo.key === column.key && sortInfo.order === 'desc'
                                                ? 'var(--table-sort-icon-active-color)'
                                                : 'var(--table-sort-icon-color)'
                                        "
                                    />
                                </view>
                            </view>
                        </view>
                    </view>
                </view>

                <!-- 表格主体 -->
                <view class="fanc-table__body">
                    <!-- 空数据展示 -->
                    <view v-if="!data.length" class="fanc-table__empty">
                        <slot name="empty">
                            <text class="fanc-table__empty-text">{{ emptyText }}</text>
                        </slot>
                    </view>

                    <!-- 数据展示 -->
                    <view
                        v-for="(row, rowIndex) in processedData"
                        :key="rowKey ? row[rowKey] : rowIndex"
                        class="fanc-table__row"
                        :class="{ 'is-selected': selectedRowKeys.includes(row[rowKey || 'id']) }"
                        @click="handleRowClick(row, rowIndex)"
                    >
                        <!-- 选择列 -->
                        <view
                            v-if="selectable"
                            class="fanc-table__cell fanc-table__cell--selection"
                            :style="{ width: '56px' }"
                            @click.stop="handleSelect(row)"
                        >
                            <checkbox :checked="isSelected(row)" />
                        </view>

                        <!-- 数据列 -->
                        <view
                            v-for="(column, columnIndex) in columns"
                            :key="columnIndex"
                            class="fanc-table__cell"
                            :class="`fanc-table__cell--align-${column.align || align}`"
                            :style="{ width: column.width || defaultColumnWidth }"
                        >
                            <view class="fanc-table__cell-content">
                                <!-- 使用自定义渲染 -->
                                <slot
                                    v-if="$scopedSlots[`column-${column.key}`]"
                                    :name="`column-${column.key}`"
                                    :row="row"
                                    :index="rowIndex"
                                >
                                </slot>
                                <!-- 使用默认渲染 -->
                                <text v-else>{{ row[column.key] }}</text>
                            </view>
                        </view>
                    </view>
                </view>

                <!-- 表尾 -->
                <view v-if="$slots.footer" class="fanc-table__footer">
                    <slot name="footer"></slot>
                </view>
            </view>
        </scroll-view>

        <!-- 分页 -->
        <view v-if="showPagination" class="fanc-table__pagination">
            <slot name="pagination">
                <view class="fanc-table__pagination-info" v-if="pagination.showTotal">
                    共 {{ total }} 条
                </view>
                <view class="fanc-table__pagination-buttons">
                    <view
                        class="fanc-table__pagination-button"
                        :class="{ 'is-disabled': currentPage <= 1 }"
                        @click="handlePageChange(currentPage - 1)"
                    >
                        <fanc-icon name="chevron-left" size="14" />
                    </view>

                    <view
                        v-for="page in displayPages"
                        :key="page"
                        class="fanc-table__pagination-button"
                        :class="{ 'is-active': currentPage === page }"
                        @click="handlePageChange(page)"
                    >
                        {{ page }}
                    </view>

                    <view
                        class="fanc-table__pagination-button"
                        :class="{ 'is-disabled': currentPage >= totalPages }"
                        @click="handlePageChange(currentPage + 1)"
                    >
                        <fanc-icon name="chevron-right" size="14" />
                    </view>
                </view>

                <view v-if="pagination.showSizeChanger" class="fanc-table__pagination-size">
                    <picker
                        :value="pageSizeIndex"
                        :range="pagination.pageSizeOptions"
                        @change="handlePageSizeChange"
                    >
                        <view class="fanc-table__pagination-size-selector">
                            {{ pageSize }}条/页
                            <fanc-icon name="chevron-down" size="14" />
                        </view>
                    </picker>
                </view>
            </slot>
        </view>
    </view>
</template>

<script>
/**
 * fanc-table 表格
 * @description 表格组件，用于展示同类结构下的多种数据，易于组织、对比和分析等
 * @property {Array} columns - 表格列配置数组
 * @property {Array} data - 表格数据数组
 * @property {String} size - 表格尺寸，可选值为 large/medium/small
 * @property {Boolean} bordered - 是否显示边框
 * @property {Boolean} striped - 是否显示斑马纹
 * @property {Boolean} loading - 是否显示加载状态
 * @property {String} loadingText - 加载状态文本
 * @property {Boolean} hover - 是否启用行悬停效果
 * @property {String} emptyText - 空数据显示文本
 * @property {Boolean} sortable - 是否启用排序功能
 * @property {String} sortIconPosition - 排序图标位置，可选值为 left/right
 * @property {String} align - 单元格对齐方式，可选值为 left/center/right
 * @property {String} maxHeight - 表格最大高度
 * @property {Boolean} selectable - 是否启用行选择功能
 * @property {String} rowKey - 行数据的唯一标识字段
 * @property {Array} selectedRowKeys - 已选择的行key数组
 * @property {Object} pagination - 分页配置对象
 * @property {Number} total - 数据总数，用于分页
 * @property {Boolean} showPagination - 是否显示分页
 * @property {String} defaultColumnWidth - 默认列宽度
 * @property {Boolean} rowClickable - 行是否可点击
 * @event {Function} sort-change - 排序变化时触发
 * @event {Function} selection-change - 选择项变化时触发
 * @event {Function} row-click - 行点击时触发
 * @event {Function} page-change - 页码变化时触发
 * @event {Function} page-size-change - 每页条数变化时触发
 */
import tableConfig from "@/configs/table.js";

export default {
    name: "fanc-table",
    props: {
        // 表格列配置
        columns: {
            type: Array,
            default: () => [],
        },
        // 表格数据
        data: {
            type: Array,
            default: () => [],
        },
        // 表格尺寸
        size: {
            type: String,
            default: () => tableConfig.size,
            validator: (value) => ["large", "medium", "small"].includes(value),
        },
        // 是否显示边框
        bordered: {
            type: Boolean,
            default: () => tableConfig.bordered,
        },
        // 是否显示斑马纹
        striped: {
            type: Boolean,
            default: () => tableConfig.striped,
        },
        // 是否显示加载状态
        loading: {
            type: Boolean,
            default: () => tableConfig.loading,
        },
        // 加载状态文本
        loadingText: {
            type: String,
            default: "",
        },
        // 是否启用行悬停效果
        hover: {
            type: Boolean,
            default: () => tableConfig.hover,
        },
        // 空数据显示文本
        emptyText: {
            type: String,
            default: () => tableConfig.emptyText,
        },
        // 是否启用排序功能
        sortable: {
            type: Boolean,
            default: () => tableConfig.sortable,
        },
        // 排序图标位置
        sortIconPosition: {
            type: String,
            default: () => tableConfig.sortIconPosition,
            validator: (value) => ["left", "right"].includes(value),
        },
        // 单元格对齐方式
        align: {
            type: String,
            default: () => tableConfig.align,
            validator: (value) => ["left", "center", "right"].includes(value),
        },
        // 表格最大高度
        maxHeight: {
            type: String,
            default: "",
        },
        // 是否启用行选择功能
        selectable: {
            type: Boolean,
            default: () => tableConfig.selectable,
        },
        // 行数据的唯一标识字段
        rowKey: {
            type: String,
            default: "id",
        },
        // 已选择的行key数组
        selectedRowKeys: {
            type: Array,
            default: () => [],
        },
        // 分页配置
        pagination: {
            type: Object,
            default: () => tableConfig.pagination,
        },
        // 数据总数
        total: {
            type: Number,
            default: 0,
        },
        // 是否显示分页
        showPagination: {
            type: Boolean,
            default: true,
        },
        // 默认列宽度
        defaultColumnWidth: {
            type: String,
            default: () => tableConfig.defaultColumnWidth,
        },
        // 行是否可点击
        rowClickable: {
            type: Boolean,
            default: () => tableConfig.rowClickable,
        },
    },
    data() {
        return {
            // 排序信息
            sortInfo: {
                key: "",
                order: "", // asc, desc
            },
            // 当前页码
            currentPage: 1,
            // 每页条数
            pageSize: this.pagination.defaultPageSize || 10,
            // 每页条数选项下标
            pageSizeIndex: 0,
        };
    },
    computed: {
        // 处理后的数据（排序、分页等）
        processedData() {
            let result = [...this.data];

            // 排序处理
            if (this.sortInfo.key && this.sortInfo.order) {
                result.sort((a, b) => {
                    const valueA = a[this.sortInfo.key];
                    const valueB = b[this.sortInfo.key];

                    if (this.sortInfo.order === "asc") {
                        return valueA > valueB ? 1 : -1;
                    } else {
                        return valueA < valueB ? 1 : -1;
                    }
                });
            }

            // 分页处理（仅本地数据时）
            if (this.showPagination && !this.isRemotePagination) {
                const start = (this.currentPage - 1) * this.pageSize;
                const end = this.currentPage * this.pageSize;
                result = result.slice(start, end);
            }

            return result;
        },
        // 是否为远程分页（由外部控制数据）
        isRemotePagination() {
            return this.total > 0;
        },
        // 总页数
        totalPages() {
            return Math.ceil(this.total / this.pageSize);
        },
        // 是否全选
        isAllSelected() {
            if (!this.data.length) return false;
            return this.data.every((row) => this.isSelected(row));
        },
        // 显示的页码
        displayPages() {
            const pages = [];
            const maxPageButtons = 5;
            const totalPages = this.totalPages;

            if (totalPages <= maxPageButtons) {
                // 总页数小于等于最大显示按钮数，直接显示所有页码
                for (let i = 1; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                // 总页数大于最大显示按钮数，需要计算显示哪些页码
                const halfMaxButtons = Math.floor(maxPageButtons / 2);
                let startPage = this.currentPage - halfMaxButtons;
                let endPage = this.currentPage + halfMaxButtons;

                if (startPage < 1) {
                    startPage = 1;
                    endPage = maxPageButtons;
                }

                if (endPage > totalPages) {
                    endPage = totalPages;
                    startPage = totalPages - maxPageButtons + 1;
                }

                for (let i = startPage; i <= endPage; i++) {
                    pages.push(i);
                }
            }

            return pages;
        },
    },
    created() {
        // 初始化每页条数选项下标
        const index = this.pagination.pageSizeOptions.indexOf(this.pageSize);
        this.pageSizeIndex = index >= 0 ? index : 0;
    },
    methods: {
        // 处理排序变化
        handleSortChange(column) {
            if (!column.sortable && !(this.sortable && column.key)) return;

            if (this.sortInfo.key === column.key) {
                // 已经在排序该列，切换排序方向
                this.sortInfo.order =
                    this.sortInfo.order === "asc"
                        ? "desc"
                        : this.sortInfo.order === "desc"
                        ? ""
                        : "asc";
            } else {
                // 切换到新列的排序
                this.sortInfo.key = column.key;
                this.sortInfo.order = "asc";
            }

            // 如果取消排序，重置排序信息
            if (this.sortInfo.order === "") {
                this.sortInfo.key = "";
            }

            // 触发排序事件
            this.$emit("sort-change", { ...this.sortInfo });
        },

        // 处理行点击
        handleRowClick(row, index) {
            if (this.rowClickable) {
                this.$emit("row-click", row, index);
            }
        },

        // 处理选择单行
        handleSelect(row) {
            const key = row[this.rowKey];
            const selected = this.isSelected(row);

            // 更新选中状态
            const newSelectedKeys = [...this.selectedRowKeys];

            if (selected) {
                // 取消选中
                const index = newSelectedKeys.indexOf(key);
                if (index !== -1) {
                    newSelectedKeys.splice(index, 1);
                }
            } else {
                // 选中
                newSelectedKeys.push(key);
            }

            this.$emit("update:selectedRowKeys", newSelectedKeys);
            this.$emit("selection-change", newSelectedKeys, row);
        },

        // 处理全选
        handleSelectAll() {
            const allSelected = this.isAllSelected;
            let newSelectedKeys = [];

            if (!allSelected) {
                // 全选
                newSelectedKeys = this.data.map((row) => row[this.rowKey]);
            }

            this.$emit("update:selectedRowKeys", newSelectedKeys);
            this.$emit("selection-change", newSelectedKeys);
        },

        // 检查行是否被选中
        isSelected(row) {
            const key = row[this.rowKey];
            return this.selectedRowKeys.includes(key);
        },

        // 处理页码变化
        handlePageChange(page) {
            if (page < 1 || page > this.totalPages) return;
            this.currentPage = page;
            this.$emit("page-change", page);
        },

        // 处理每页条数变化
        handlePageSizeChange(e) {
            const index = e.detail.value;
            this.pageSizeIndex = index;
            this.pageSize = this.pagination.pageSizeOptions[index];
            // 重置到第一页
            this.currentPage = 1;
            this.$emit("page-size-change", this.pageSize);
        },
    },
};
</script>

<style lang="scss" scoped>
.fanc-table {
    width: 100%;
    background-color: var(--table-bg-color);
    font-size: var(--table-font-size);
    color: var(--table-text-color);
    position: relative;
    box-sizing: border-box;

    // 尺寸变体
    &--large {
        font-size: var(--table-large-font-size);

        .fanc-table__row {
            height: var(--table-large-row-height);
        }
    }

    &--medium {
        font-size: var(--table-font-size);

        .fanc-table__row {
            height: var(--table-row-height);
        }
    }

    &--small {
        font-size: var(--table-small-font-size);

        .fanc-table__row {
            height: var(--table-small-row-height);
        }
    }

    // 边框样式
    &.is-bordered {
        border: 1px solid var(--table-border-color);

        .fanc-table__cell {
            border-right: 1px solid var(--table-border-color);
            border-bottom: 1px solid var(--table-border-color);

            &:last-child {
                border-right: none;
            }
        }

        .fanc-table__row:last-child .fanc-table__cell {
            border-bottom: none;
        }
    }

    // 斑马纹样式
    &.is-striped {
        .fanc-table__body .fanc-table__row:nth-child(even) {
            background-color: var(--table-striped-bg-color);
        }
    }

    // 悬停效果
    &.is-hover {
        .fanc-table__body .fanc-table__row:hover {
            background-color: var(--table-hover-bg-color);
        }
    }

    // 加载状态
    &.is-loading {
        .fanc-table__wrapper {
            opacity: 0.6;
        }
    }

    // 可选择行
    &.is-selectable {
        .fanc-table__row {
            cursor: pointer;

            &.is-selected {
                background-color: var(--table-selected-row-bg-color);
            }
        }
    }

    // 表格滚动容器
    &__scroll {
        width: 100%;
        overflow-x: auto;

        &::-webkit-scrollbar {
            height: 6px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 3px;
        }
    }

    // 表格包装器
    &__wrapper {
        min-width: 100%;
        width: max-content;
    }

    // 表头
    &__header {
        background-color: var(--table-header-bg-color);
        font-weight: var(--table-header-font-weight);
        color: var(--table-header-text-color);

        .fanc-table__row {
            height: var(--table-header-row-height);
        }
    }

    // 表格行
    &__row {
        display: flex;
        width: 100%;
    }

    // 表格单元格
    &__cell {
        flex: 1;
        padding: var(--table-cell-padding);
        display: flex;
        align-items: center;
        overflow: hidden;
        box-sizing: border-box;

        &--align-left {
            justify-content: flex-start;
            text-align: left;
        }

        &--align-center {
            justify-content: center;
            text-align: center;
        }

        &--align-right {
            justify-content: flex-end;
            text-align: right;
        }

        &--selection {
            flex: none;
            justify-content: center;
        }
    }

    // 表头单元格
    &__header-cell {
        &.is-sortable {
            cursor: pointer;
        }
    }

    // 单元格内容
    &__cell-content {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        position: relative;
        display: flex;
        align-items: center;
    }

    // 排序图标
    &__sort-icons {
        display: inline-flex;
        flex-direction: column;
        margin-left: 4px;
        height: 16px;
        line-height: 0;

        &.is-right {
            margin-left: auto;
        }
    }

    // 空数据展示
    &__empty {
        display: flex;
        align-items: center;
        justify-content: center;
        height: var(--table-placeholder-height);
        color: var(--table-empty-text-color);
    }

    // 加载层
    &__loading {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--table-loading-bg-color);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 10;
    }

    &__loading-spinner {
        width: 32px;
        height: 32px;
        border: 3px solid var(--fanc-primary-color);
        border-radius: 50%;
        border-top-color: transparent;
        animation: fanc-table-loading 0.8s linear infinite;
        margin-bottom: 8px;
    }

    &__loading-text {
        color: var(--text-secondary);
        font-size: 14px;
    }

    // 表尾
    &__footer {
        background-color: var(--table-footer-bg-color);
        padding: var(--table-cell-padding);
        color: var(--table-footer-text-color);
    }

    // 分页
    &__pagination {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 0;
        margin-top: var(--table-pagination-margin-top);
    }

    &__pagination-info {
        color: var(--text-secondary);
        font-size: 14px;
    }

    &__pagination-buttons {
        display: flex;
        align-items: center;
    }

    &__pagination-button {
        min-width: 32px;
        height: 32px;
        margin: 0 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        cursor: pointer;
        background-color: var(--white);
        border: 1px solid var(--border-color);

        &.is-active {
            background-color: var(--fanc-primary-color);
            color: var(--white);
            border-color: var(--fanc-primary-color);
        }

        &.is-disabled {
            cursor: not-allowed;
            color: var(--text-disabled);
        }
    }

    &__pagination-size {
        display: flex;
        align-items: center;
    }

    &__pagination-size-selector {
        display: flex;
        align-items: center;
        height: 32px;
        padding: 0 8px;
        border: 1px solid var(--border-color);
        border-radius: 4px;

        .fanc-icon {
            margin-left: 4px;
        }
    }
}

@keyframes fanc-table-loading {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
