<template>
    <view class="container">
        <view class="header">
            <view class="title">分页</view>
            <view class="subtitle">数据量过多时，采用分页的形式将数据分隔，每次只加载一个页面</view>
        </view>

        <!-- 基础用法 -->
        <view class="section">
            <view class="section-title">基础用法</view>
            <view class="section-content">
                <fanc-pagination
                    :current="currentPage1"
                    :total="100"
                    @change="
                        (page) => {
                            currentPage1 = page;
                            handlePageChange(page);
                        }
                    "
                ></fanc-pagination>
            </view>
        </view>

        <!-- 简单模式 -->
        <view class="section">
            <view class="section-title">简单模式</view>
            <view class="section-content">
                <fanc-pagination
                    :current="currentPage2"
                    :total="100"
                    simple
                    @change="
                        (page) => {
                            currentPage2 = page;
                        }
                    "
                ></fanc-pagination>
            </view>
        </view>

        <!-- 显示省略号 -->
        <view class="section">
            <view class="section-title">显示省略号</view>
            <view class="section-content">
                <fanc-pagination
                    :current="currentPage3"
                    :total="200"
                    showEllipsis
                    @change="
                        (page) => {
                            currentPage3 = page;
                        }
                    "
                ></fanc-pagination>
            </view>
        </view>

        <!-- 自定义插槽 -->
        <view class="section">
            <view class="section-title">自定义插槽</view>
            <view class="section-content">
                <fanc-pagination
                    :current="currentPage8"
                    :total="100"
                    @change="
                        (page) => {
                            currentPage8 = page;
                        }
                    "
                >
                    <template #prev>
                        <fanc-icon name="angle-left" />
                    </template>
                    <template #next>
                        <fanc-icon name="angle-right" />
                    </template>
                </fanc-pagination>
            </view>
        </view>

        <!-- 自定义页码 -->
        <view class="section">
            <view class="section-title">自定义页码</view>
            <view class="section-content">
                <fanc-pagination
                    :current="currentPage9"
                    :total="100"
                    @change="
                        (page) => {
                            currentPage9 = page;
                        }
                    "
                >
                    <template #page="{ page }">
                        <text class="custom-page">{{ page }}</text>
                    </template>
                </fanc-pagination>
            </view>
        </view>

        <!-- 迷你版本 -->
        <view class="section">
            <view class="section-title">迷你版本</view>
            <view class="section-content">
                <fanc-pagination
                    :current="currentPage5"
                    :total="100"
                    mini
                    @change="
                        (page) => {
                            currentPage5 = page;
                        }
                    "
                ></fanc-pagination>
            </view>
        </view>

        <!-- 自定义页码数量 -->
        <view class="section">
            <view class="section-title">自定义页码数量</view>
            <view class="section-content">
                <fanc-pagination
                    :current="currentPage6"
                    :total="300"
                    :pageSize="10"
                    :pagerCount="7"
                    showEllipsis
                    @change="
                        (page) => {
                            currentPage6 = page;
                        }
                    "
                ></fanc-pagination>
            </view>
        </view>

        <!-- 深色主题 -->
        <view class="section">
            <view class="section-title">深色主题</view>
            <view class="section-content">
                <fanc-pagination
                    :current="currentPage7"
                    :total="100"
                    dark
                    @change="
                        (page) => {
                            currentPage7 = page;
                        }
                    "
                ></fanc-pagination>
            </view>
        </view>

        <!-- 加载商品列表的示例 -->
        <view class="section">
            <view class="section-title">商品列表示例</view>
            <view class="product-list">
                <view class="product-item" v-for="(item, index) in displayProducts" :key="index">
                    <image src="/static/img/cheese.png" class="product-image"></image>
                    <view class="product-content">
                        <view class="product-name">{{ item.name }}</view>
                        <view class="product-desc">{{ item.desc }}</view>
                        <view class="product-price">¥{{ item.price.toFixed(2) }}</view>
                    </view>
                </view>
            </view>
            <view class="pagination-container">
                <fanc-pagination
                    :current="productPage"
                    :total="mockProducts.length"
                    :pageSize="5"
                    @change="handleProductPageChange"
                ></fanc-pagination>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            currentPage1: 1,
            currentPage2: 1,
            currentPage3: 1,
            currentPage5: 1,
            currentPage6: 1,
            currentPage7: 1,
            currentPage8: 1,
            currentPage9: 1,
            productPage: 1,
            mockProducts: Array.from({ length: 25 }, (_, index) => ({
                id: index + 1,
                name: `商品 ${index + 1}`,
                desc: `这是商品 ${index + 1} 的描述信息，描述了商品的特点和用途。`,
                price: Math.floor(Math.random() * 1000) + 100,
            })),
        };
    },
    computed: {
        displayProducts() {
            const pageSize = 5;
            const startIndex = (this.productPage - 1) * pageSize;
            return this.mockProducts.slice(startIndex, startIndex + pageSize);
        },
    },
    methods: {
        handlePageChange(page) {
            this.$toast.text(`当前页: ${page}`);
        },
        handleProductPageChange(page) {
            this.productPage = page;
            this.$toast.text(`加载第${page}页商品`);
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
    background-color: #f7f7f7;
}

.product-list {
    padding: 16px;
}

.product-item {
    display: flex;
    padding: 16px 0;
    border-bottom: 1px solid #f2f2f2;
}

.product-item:last-child {
    border-bottom: none;
}

.product-image {
    width: 80px;
    height: 80px;
    background-color: #f7f8fa;
    border-radius: 4px;
    margin-right: 12px;
}

.product-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.product-name {
    font-size: 16px;
    font-weight: 500;
    color: #323233;
    margin-bottom: 4px;
}

.product-desc {
    font-size: 14px;
    color: #969799;
    margin-bottom: 8px;
    line-height: 1.5;
}

.product-price {
    font-size: 16px;
    font-weight: 500;
    color: #f44336;
}

.pagination-container {
    padding: 16px;
    border-top: 1px solid #f2f2f2;
}

/* 自定义样式 */
.custom-page {
    font-weight: 500;
}
</style>
