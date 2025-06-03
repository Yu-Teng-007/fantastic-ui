/**
 * Table 表格组件默认配置
 */
export default {
    // 默认表格尺寸
    size: "medium", // medium, small, large

    // 默认表格边框样式
    bordered: true,

    // 默认表格斑马线样式
    striped: false,

    // 默认加载状态
    loading: false,

    // 默认分页配置
    pagination: {
        showSizeChanger: true,
        pageSizeOptions: [10, 20, 50, 100],
        defaultPageSize: 10,
        showTotal: true,
    },

    // 默认空数据显示文本
    emptyText: "暂无数据",

    // 默认表格是否可以排序
    sortable: false,

    // 默认表格是否允许选择行
    selectable: false,

    // 默认启用行悬停效果
    hover: true,

    // 排序箭头位置
    sortIconPosition: "right",

    // 单元格对齐方式
    align: "left", // left, center, right

    // 默认列宽
    defaultColumnWidth: "120px",

    // 行是否可点击
    rowClickable: false,
};
