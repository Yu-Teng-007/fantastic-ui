<template>
    <view class="indexes-demo">
        <view class="demo-header">
            <text class="demo-header__title">索引列表</text>
            <text class="demo-header__desc">用于页面中信息快速检索</text>
        </view>

        <!-- 基础用法 -->
        <view class="demo-block">
            <view class="demo-block__title">基础用法</view>
            <view class="demo-block__content indexes-wrapper">
                <fanc-indexes
                    :data="cityData"
                    @select="onSelect"
                    @click="onItemClick"
                    @change="onChange"
                >
                </fanc-indexes>
            </view>
        </view>

        <!-- 自定义索引列表 -->
        <view class="demo-block">
            <view class="demo-block__title">自定义索引列表</view>
            <view class="demo-block__content indexes-wrapper">
                <fanc-indexes :index-list="customIndexList" :data="customData" position="left">
                </fanc-indexes>
            </view>
        </view>

        <!-- 自定义内容 -->
        <view class="demo-block">
            <view class="demo-block__title">自定义内容</view>
            <view class="demo-block__content indexes-wrapper">
                <fanc-indexes :data="fruitData">
                    <template #item="{ item, anchor }">
                        <view class="custom-item">
                            <image
                                class="custom-item__icon"
                                :src="item.icon"
                                mode="aspectFit"
                            ></image>
                            <view class="custom-item__content">
                                <text class="custom-item__name">{{ item.name }}</text>
                                <text class="custom-item__desc">{{ item.desc }}</text>
                            </view>
                        </view>
                    </template>
                </fanc-indexes>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            // 城市数据
            cityData: {
                A: [
                    { text: "阿拉善盟", id: "als" },
                    { text: "鞍山", id: "as" },
                    { text: "安庆", id: "aq" },
                    { text: "安阳", id: "ay" },
                ],
                B: [
                    { text: "北京", id: "bj" },
                    { text: "保定", id: "bd" },
                    { text: "包头", id: "bt" },
                    { text: "宝鸡", id: "bj2" },
                ],
                C: [
                    { text: "长沙", id: "cs" },
                    { text: "长春", id: "cc" },
                    { text: "成都", id: "cd" },
                    { text: "重庆", id: "cq" },
                ],
                D: [
                    { text: "大连", id: "dl" },
                    { text: "大庆", id: "dq" },
                    { text: "大同", id: "dt" },
                    { text: "东莞", id: "dg" },
                ],
                E: [],
                F: [
                    { text: "佛山", id: "fs" },
                    { text: "福州", id: "fz" },
                ],
                G: [
                    { text: "广州", id: "gz" },
                    { text: "贵阳", id: "gy" },
                ],
                H: [
                    { text: "哈尔滨", id: "heb" },
                    { text: "海口", id: "hk" },
                    { text: "杭州", id: "hz" },
                    { text: "合肥", id: "hf" },
                    { text: "惠州", id: "huizhou" },
                ],
                J: [
                    { text: "济南", id: "jn" },
                    { text: "嘉兴", id: "jx" },
                ],
                K: [{ text: "昆明", id: "km" }],
                L: [
                    { text: "兰州", id: "lz" },
                    { text: "廊坊", id: "lf" },
                    { text: "丽水", id: "ls" },
                ],
                M: [{ text: "绵阳", id: "my" }],
                N: [
                    { text: "南京", id: "nj" },
                    { text: "南昌", id: "nc" },
                    { text: "南宁", id: "nn" },
                    { text: "宁波", id: "nb" },
                ],
                P: [],
                Q: [
                    { text: "青岛", id: "qd" },
                    { text: "泉州", id: "qz" },
                ],
                R: [],
                S: [
                    { text: "上海", id: "sh" },
                    { text: "深圳", id: "sz" },
                    { text: "沈阳", id: "sy" },
                    { text: "石家庄", id: "sjz" },
                    { text: "苏州", id: "sz2" },
                ],
                T: [
                    { text: "天津", id: "tj" },
                    { text: "太原", id: "ty" },
                ],
                W: [
                    { text: "武汉", id: "wh" },
                    { text: "无锡", id: "wx" },
                    { text: "温州", id: "wz" },
                ],
                X: [
                    { text: "厦门", id: "xm" },
                    { text: "西安", id: "xa" },
                    { text: "徐州", id: "xz" },
                ],
                Y: [
                    { text: "烟台", id: "yt" },
                    { text: "扬州", id: "yz" },
                ],
                Z: [
                    { text: "郑州", id: "zz" },
                    { text: "中山", id: "zs" },
                    { text: "珠海", id: "zh" },
                ],
            },

            // 自定义索引列表
            customIndexList: ["热门", "最近", "#", "爱", "超", "大"],
            customData: {
                热门: [
                    { text: "热门城市1", id: "hot1" },
                    { text: "热门城市2", id: "hot2" },
                    { text: "热门城市3", id: "hot3" },
                ],
                最近: [
                    { text: "最近访问1", id: "recent1" },
                    { text: "最近访问2", id: "recent2" },
                ],
                "#": [
                    { text: "#特殊标签1", id: "special1" },
                    { text: "#特殊标签2", id: "special2" },
                ],
                爱: [
                    { text: "爱尔兰", id: "ireland" },
                    { text: "爱丁堡", id: "edinburgh" },
                ],
                超: [{ text: "超级城市", id: "supercity" }],
                大: [
                    { text: "大连", id: "dalian" },
                    { text: "大庆", id: "daqing" },
                    { text: "大同", id: "datong" },
                ],
            },

            // 水果数据（带图标）
            fruitData: {
                A: [
                    { name: "苹果", desc: "一种常见的水果", icon: "/static/fruits/apple.png" },
                    { name: "杏", desc: "黄色小水果", icon: "/static/fruits/apricot.png" },
                ],
                B: [
                    { name: "香蕉", desc: "黄色弯曲水果", icon: "/static/fruits/banana.png" },
                    { name: "蓝莓", desc: "小型蓝色浆果", icon: "/static/fruits/blueberry.png" },
                ],
                C: [
                    { name: "樱桃", desc: "小型红色水果", icon: "/static/fruits/cherry.png" },
                    { name: "椰子", desc: "热带坚果", icon: "/static/fruits/coconut.png" },
                ],
                M: [{ name: "芒果", desc: "热带水果", icon: "/static/fruits/mango.png" }],
                O: [{ name: "橙子", desc: "柑橘类水果", icon: "/static/fruits/orange.png" }],
                P: [
                    { name: "桃子", desc: "软而多汁的水果", icon: "/static/fruits/peach.png" },
                    { name: "梨", desc: "甜脆水果", icon: "/static/fruits/pear.png" },
                ],
                S: [{ name: "草莓", desc: "红色小浆果", icon: "/static/fruits/strawberry.png" }],
                W: [{ name: "西瓜", desc: "大型多汁水果", icon: "/static/fruits/watermelon.png" }],
            },
        };
    },
    methods: {
        // 选择索引时触发
        onSelect(event) {
            this.$toast.text(`选择了索引: ${event.anchor}`);
        },

        // 点击列表项时触发
        onItemClick(event) {
            const itemText = event.item.text || event.item.name || event.item;
            this.$toast.text(`选择了: ${itemText}`);
        },

        // 索引改变时触发
        onChange(event) {
            console.log("索引切换至:", event.anchor);
        },
    },
};
</script>

<style>
.indexes-demo {
    min-height: 100vh;
    background-color: #f7f8fa;
    padding-bottom: 20px;
}

.demo-header {
    padding: 20px 16px;
    background-color: #fff;
    margin-bottom: 12px;
}

.demo-header__title {
    font-size: 18px;
    font-weight: 600;
    color: #323233;
    margin-bottom: 8px;
    display: block;
}

.demo-header__desc {
    font-size: 14px;
    color: #969799;
    line-height: 1.5;
}

.demo-block {
    margin-bottom: 12px;
    background-color: #fff;
    overflow: hidden;
}

.demo-block__title {
    padding: 16px;
    font-size: 15px;
    line-height: 1.4;
    color: #323233;
    font-weight: 500;
}

.demo-block__content {
    position: relative;
}

.indexes-wrapper {
    height: 400px;
    background-color: #fff;
}

/* 自定义内容样式 */
.custom-item {
    display: flex;
    align-items: center;
    padding: 10px 16px;
}

.custom-item__icon {
    width: 30px;
    height: 30px;
    margin-right: 10px;
}

.custom-item__content {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.custom-item__name {
    font-size: 14px;
    color: #323233;
    font-weight: 500;
}

.custom-item__desc {
    font-size: 12px;
    color: #969799;
    margin-top: 4px;
}
</style>
