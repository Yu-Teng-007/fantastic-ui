<template>
    <view class="container">
        <view class="header">
            <view class="title">表格</view>
            <view class="subtitle">表格用于展示同类结构下的多种数据，易于组织、对比和分析等</view>
        </view>

        <!-- 基础表格 -->
        <view class="section">
            <view class="section-title">基础表格</view>
            <view class="section-content">
                <fanc-table :columns="basicColumns" :data="basicData" />
            </view>
        </view>

        <!-- 带边框表格 -->
        <view class="section">
            <view class="section-title">带边框表格</view>
            <view class="section-content">
                <fanc-table :columns="basicColumns" :data="basicData" bordered />
            </view>
        </view>

        <!-- 斑马纹表格 -->
        <view class="section">
            <view class="section-title">斑马纹表格</view>
            <view class="section-content">
                <fanc-table :columns="basicColumns" :data="basicData" striped />
            </view>
        </view>

        <!-- 紧凑型表格 -->
        <view class="section">
            <view class="section-title">紧凑型表格</view>
            <view class="section-content">
                <fanc-table :columns="basicColumns" :data="basicData" size="small" bordered />
            </view>
        </view>

        <!-- 宽松型表格 -->
        <view class="section">
            <view class="section-title">宽松型表格</view>
            <view class="section-content">
                <fanc-table :columns="basicColumns" :data="basicData" size="large" bordered />
            </view>
        </view>

        <!-- 对齐方式 -->
        <view class="section">
            <view class="section-title">对齐方式</view>
            <view class="section-content">
                <fanc-table :columns="alignColumns" :data="basicData" bordered />
            </view>
        </view>

        <!-- 可排序表格 -->
        <view class="section">
            <view class="section-title">可排序表格</view>
            <view class="section-content">
                <fanc-table
                    :columns="sortColumns"
                    :data="basicData"
                    @sort-change="handleSortChange"
                    bordered
                />
            </view>
        </view>

        <!-- 加载状态 -->
        <view class="section">
            <view class="section-title">加载状态</view>
            <view class="section-content">
                <fanc-table
                    :columns="basicColumns"
                    :data="basicData"
                    loading
                    loadingText="加载中..."
                    bordered
                />
            </view>
        </view>

        <!-- 空数据表格 -->
        <view class="section">
            <view class="section-title">空数据表格</view>
            <view class="section-content">
                <fanc-table :columns="basicColumns" :data="[]" bordered />
            </view>
        </view>

        <!-- 自定义空数据 -->
        <view class="section">
            <view class="section-title">自定义空数据</view>
            <view class="section-content">
                <fanc-table :columns="basicColumns" :data="[]" bordered>
                    <template #empty>
                        <view class="custom-empty">
                            <fanc-icon name="database" size="32" color="#cccccc" />
                            <text class="custom-empty-text">暂无数据，请稍后再试</text>
                        </view>
                    </template>
                </fanc-table>
            </view>
        </view>

        <!-- 可选择表格 -->
        <view class="section">
            <view class="section-title">可选择表格</view>
            <view class="section-content">
                <fanc-table
                    :columns="basicColumns"
                    :data="basicData"
                    selectable
                    :selectedRowKeys="selectedRowKeys"
                    @selection-change="handleSelectionChange"
                    bordered
                />
                <view class="selection-info" v-if="selectedRowKeys.length">
                    已选择 {{ selectedRowKeys.length }} 项
                    <text class="selection-clear" @click="clearSelection">清空</text>
                </view>
            </view>
        </view>

        <!-- 自定义列渲染 -->
        <view class="section">
            <view class="section-title">自定义列渲染</view>
            <view class="section-content">
                <fanc-table :columns="customColumns" :data="userList" bordered>
                    <template #column-avatar="{ row }">
                        <image class="user-avatar" :src="row.avatar" mode="aspectFill" />
                    </template>
                    <template #column-status="{ row }">
                        <view :class="['status-tag', `status-${row.status}`]">
                            {{ getStatusText(row.status) }}
                        </view>
                    </template>
                    <template #column-action="{ row }">
                        <view class="action-buttons">
                            <fanc-button size="mini" type="primary" @click="handleView(row)"
                                >查看</fanc-button
                            >
                            <fanc-button size="mini" type="danger" @click="handleDelete(row)"
                                >删除</fanc-button
                            >
                        </view>
                    </template>
                </fanc-table>
            </view>
        </view>

        <!-- 分页表格 -->
        <view class="section">
            <view class="section-title">分页表格</view>
            <view class="section-content">
                <fanc-table
                    :columns="basicColumns"
                    :data="paginatedData"
                    :total="100"
                    :showPagination="true"
                    :pagination="{
                        showTotal: true,
                        showQuickJumper: true,
                        defaultPageSize: 10,
                    }"
                    @page-change="handlePageChange"
                    bordered
                />
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            // 基础表格列配置
            basicColumns: [
                { title: "姓名", key: "name", width: "120px" },
                { title: "年龄", key: "age", width: "80px" },
                { title: "地址", key: "address" },
                { title: "电话", key: "phone", width: "150px" },
            ],

            // 基础表格数据
            basicData: [
                {
                    id: 1,
                    name: "张三",
                    age: 28,
                    address: "北京市朝阳区建国路88号",
                    phone: "13812345678",
                },
                {
                    id: 2,
                    name: "李四",
                    age: 32,
                    address: "上海市浦东新区陆家嘴金融中心",
                    phone: "13998765432",
                },
                {
                    id: 3,
                    name: "王五",
                    age: 24,
                    address: "广州市天河区珠江新城",
                    phone: "13587654321",
                },
                {
                    id: 4,
                    name: "赵六",
                    age: 35,
                    address: "深圳市南山区科技园",
                    phone: "13612378945",
                },
                {
                    id: 5,
                    name: "钱七",
                    age: 29,
                    address: "杭州市西湖区文三路",
                    phone: "13756781234",
                },
            ],

            // 对齐方式列配置
            alignColumns: [
                { title: "姓名", key: "name", width: "120px", align: "left" },
                { title: "年龄", key: "age", width: "80px", align: "center" },
                { title: "地址", key: "address", align: "left" },
                { title: "电话", key: "phone", width: "150px", align: "right" },
            ],

            // 可排序列配置
            sortColumns: [
                { title: "姓名", key: "name", width: "120px", sortable: true },
                { title: "年龄", key: "age", width: "80px", sortable: true },
                { title: "地址", key: "address" },
                { title: "电话", key: "phone", width: "150px" },
            ],

            // 自定义列配置
            customColumns: [
                { title: "头像", key: "avatar", width: "80px", align: "center" },
                { title: "用户名", key: "username", width: "120px" },
                { title: "姓名", key: "name", width: "120px" },
                { title: "邮箱", key: "email", width: "180px" },
                { title: "状态", key: "status", width: "100px", align: "center" },
                { title: "操作", key: "action", width: "160px", align: "center" },
            ],

            // 用户列表数据
            userList: [
                {
                    id: 1,
                    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
                    username: "user1",
                    name: "张三",
                    email: "user1@example.com",
                    status: "active",
                },
                {
                    id: 2,
                    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
                    username: "user2",
                    name: "李四",
                    email: "user2@example.com",
                    status: "inactive",
                },
                {
                    id: 3,
                    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
                    username: "user3",
                    name: "王五",
                    email: "user3@example.com",
                    status: "pending",
                },
            ],

            // 已选择行的key
            selectedRowKeys: [],

            // 分页数据
            paginatedData: [],
            currentPage: 1,
            pageSize: 10,
        };
    },
    created() {
        // 模拟生成分页数据
        this.generatePaginatedData();
    },
    methods: {
        // 处理排序变化
        handleSortChange({ key, order }) {
            this.$toast.text(`排序字段: ${key}, 排序方式: ${order}`);
        },

        // 处理选择变化
        handleSelectionChange(selectedKeys) {
            this.selectedRowKeys = selectedKeys;
        },

        // 清空选择
        clearSelection() {
            this.selectedRowKeys = [];
        },

        // 获取状态文本
        getStatusText(status) {
            const statusMap = {
                active: "已激活",
                inactive: "未激活",
                pending: "待审核",
            };
            return statusMap[status] || status;
        },

        // 查看用户
        handleView(row) {
            this.$toast.text(`查看用户: ${row.name}`);
        },

        // 删除用户
        handleDelete(row) {
            this.$dialog
                .confirm({
                    title: "确认删除",
                    message: `确定要删除用户 "${row.name}" 吗？`,
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                })
                .then(() => {
                    this.$toast.success(`已删除用户: ${row.name}`);
                })
                .catch(() => {
                    this.$toast.text("已取消删除");
                });
        },

        // 处理页码变化
        handlePageChange(page) {
            this.currentPage = page;
            this.generatePaginatedData();
            this.$toast.text(`页码变更为: ${page}`);
        },

        // 生成分页数据
        generatePaginatedData() {
            // 模拟根据页码和每页条数生成数据
            this.paginatedData = Array.from({ length: this.pageSize }, (_, index) => {
                const id = (this.currentPage - 1) * this.pageSize + index + 1;
                return {
                    id,
                    name: `用户${id}`,
                    age: Math.floor(Math.random() * 40) + 20,
                    address: `城市${Math.floor(id / 10) + 1}，街道${(id % 10) + 1}号`,
                    phone: `1${Math.floor(Math.random() * 10)}${String(id).padStart(9, "0")}`,
                };
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

.section-content {
    padding: 16px;
}

.selection-info {
    margin-top: 12px;
    font-size: 14px;
    color: #666;
}

.selection-clear {
    margin-left: 12px;
    color: #1989fa;
}

.user-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
}

.status-tag {
    display: inline-block;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 12px;
}

.status-active {
    background-color: #e8f7ee;
    color: #28a745;
}

.status-inactive {
    background-color: #f2f2f2;
    color: #999999;
}

.status-pending {
    background-color: #fff8e6;
    color: #ffc107;
}

.action-buttons {
    display: flex;
    gap: 8px;
    justify-content: center;
}

.custom-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 150px;
}

.custom-empty-text {
    margin-top: 8px;
    color: #999;
    font-size: 14px;
}
</style>
