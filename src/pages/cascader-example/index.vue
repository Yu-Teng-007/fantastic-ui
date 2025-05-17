<template>
    <view class="cascader-example">
        <view class="example-block">
            <view class="block-title">基础用法</view>
            <fanc-cascader
                v-model="selectedArea"
                :options="areaOptions"
                placeholder="请选择地区"
                title="选择地区"
                @change="onChange"
            ></fanc-cascader>
            <view class="result" v-if="selectedArea.length">
                选择结果: {{ displaySelectedArea }}
            </view>
        </view>

        <view class="example-block">
            <view class="block-title">选择即改变</view>
            <fanc-cascader
                v-model="selectedCategory"
                :options="categoryOptions"
                placeholder="请选择分类"
                title="选择分类"
                :immediate-change="true"
                @change="onCategoryChange"
            ></fanc-cascader>
            <view class="result" v-if="selectedCategory.length">
                选择结果: {{ displaySelectedCategory }}
            </view>
        </view>

        <view class="example-block">
            <view class="block-title">自定义颜色</view>
            <fanc-cascader
                v-model="selectedFood"
                :options="foodOptions"
                placeholder="请选择食品"
                title="选择食品"
                active-color="#ff6600"
                @change="onFoodChange"
            ></fanc-cascader>
            <view class="result" v-if="selectedFood.length">
                选择结果: {{ displaySelectedFood }}
            </view>
            <view class="tip">通过设置active-color属性自定义选中项的颜色</view>
        </view>

        <view class="example-block">
            <view class="block-title">更多颜色示例</view>
            <fanc-cascader
                v-model="selectedColor1"
                :options="colorOptions"
                placeholder="红色主题"
                title="选择颜色"
                active-color="#F56C6C"
                @change="onColor1Change"
                style="margin-bottom: 15px"
            ></fanc-cascader>

            <fanc-cascader
                v-model="selectedColor2"
                :options="colorOptions"
                placeholder="绿色主题"
                title="选择颜色"
                active-color="#67C23A"
                @change="onColor2Change"
                style="margin-bottom: 15px"
            ></fanc-cascader>

            <fanc-cascader
                v-model="selectedColor3"
                :options="colorOptions"
                placeholder="蓝色主题"
                title="选择颜色"
                active-color="#409EFF"
                @change="onColor3Change"
            ></fanc-cascader>
        </view>

        <view class="example-block">
            <view class="block-title">禁用状态</view>
            <fanc-cascader
                v-model="selectedArea"
                :options="areaOptions"
                placeholder="禁用状态"
                title="选择地区"
                :disabled="true"
            ></fanc-cascader>
        </view>
    </view>
</template>

<script>
/**
 * 级联选择器示例
 */
export default {
    data() {
        return {
            // 地区选择
            selectedArea: [],
            areaOptions: [
                {
                    text: "北京市",
                    value: "110000",
                    children: [
                        {
                            text: "北京市",
                            value: "110100",
                            children: [
                                { text: "东城区", value: "110101" },
                                { text: "西城区", value: "110102" },
                                { text: "朝阳区", value: "110105" },
                                { text: "海淀区", value: "110108" },
                                { text: "丰台区", value: "110106" },
                                { text: "石景山区", value: "110107" },
                            ],
                        },
                    ],
                },
                {
                    text: "上海市",
                    value: "310000",
                    children: [
                        {
                            text: "上海市",
                            value: "310100",
                            children: [
                                { text: "黄浦区", value: "310101" },
                                { text: "徐汇区", value: "310104" },
                                { text: "长宁区", value: "310105" },
                                { text: "静安区", value: "310106" },
                                { text: "普陀区", value: "310107" },
                                { text: "虹口区", value: "310109" },
                            ],
                        },
                    ],
                },
                {
                    text: "广东省",
                    value: "440000",
                    children: [
                        {
                            text: "广州市",
                            value: "440100",
                            children: [
                                { text: "荔湾区", value: "440103" },
                                { text: "越秀区", value: "440104" },
                                { text: "海珠区", value: "440105" },
                                { text: "天河区", value: "440106" },
                                { text: "白云区", value: "440111" },
                                { text: "黄埔区", value: "440112" },
                            ],
                        },
                        {
                            text: "深圳市",
                            value: "440300",
                            children: [
                                { text: "福田区", value: "440304" },
                                { text: "南山区", value: "440305" },
                                { text: "宝安区", value: "440306" },
                                { text: "龙岗区", value: "440307" },
                                { text: "盐田区", value: "440308" },
                            ],
                        },
                    ],
                },
            ],
            displaySelectedArea: "",

            // 分类选择
            selectedCategory: [],
            categoryOptions: [
                {
                    text: "电子产品",
                    value: "electronics",
                    children: [
                        {
                            text: "手机",
                            value: "phone",
                            children: [
                                { text: "苹果", value: "apple" },
                                { text: "华为", value: "huawei" },
                                { text: "小米", value: "xiaomi" },
                            ],
                        },
                        {
                            text: "电脑",
                            value: "computer",
                            children: [
                                { text: "笔记本", value: "laptop" },
                                { text: "台式机", value: "desktop" },
                                { text: "平板", value: "tablet" },
                            ],
                        },
                    ],
                },
                {
                    text: "服装",
                    value: "clothing",
                    children: [
                        {
                            text: "男装",
                            value: "men",
                            children: [
                                { text: "T恤", value: "tshirt" },
                                { text: "牛仔裤", value: "jeans" },
                                { text: "外套", value: "coat" },
                            ],
                        },
                        {
                            text: "女装",
                            value: "women",
                            children: [
                                { text: "连衣裙", value: "dress" },
                                { text: "半身裙", value: "skirt" },
                                { text: "卫衣", value: "hoodie" },
                            ],
                        },
                    ],
                },
            ],
            displaySelectedCategory: "",

            // 食品选择
            selectedFood: [],
            foodOptions: [
                {
                    text: "水果",
                    value: "fruit",
                    children: [
                        {
                            text: "进口水果",
                            value: "import",
                            children: [
                                { text: "香蕉", value: "banana" },
                                { text: "橙子", value: "orange" },
                                { text: "葡萄", value: "grape" },
                            ],
                        },
                        {
                            text: "国产水果",
                            value: "domestic",
                            children: [
                                { text: "苹果", value: "apple" },
                                { text: "梨", value: "pear" },
                                { text: "桃子", value: "peach" },
                            ],
                        },
                    ],
                },
                {
                    text: "蔬菜",
                    value: "vegetable",
                    children: [
                        {
                            text: "叶菜类",
                            value: "leaf",
                            children: [
                                { text: "白菜", value: "cabbage" },
                                { text: "菠菜", value: "spinach" },
                                { text: "生菜", value: "lettuce" },
                            ],
                        },
                        {
                            text: "根茎类",
                            value: "root",
                            children: [
                                { text: "胡萝卜", value: "carrot" },
                                { text: "土豆", value: "potato" },
                                { text: "红薯", value: "sweet-potato" },
                            ],
                        },
                    ],
                },
                {
                    text: "肉类",
                    value: "meat",
                    children: [
                        {
                            text: "家禽类",
                            value: "poultry",
                            children: [
                                { text: "鸡肉", value: "chicken" },
                                { text: "鸭肉", value: "duck" },
                                { text: "鹅肉", value: "goose" },
                            ],
                        },
                        {
                            text: "畜牧类",
                            value: "livestock",
                            children: [
                                { text: "牛肉", value: "beef", disabled: true },
                                { text: "猪肉", value: "pork" },
                                { text: "羊肉", value: "mutton" },
                            ],
                        },
                    ],
                },
            ],
            displaySelectedFood: "",

            // 颜色选择示例
            selectedColor1: [],
            selectedColor2: [],
            selectedColor3: [],
            colorOptions: [
                {
                    text: "基础色",
                    value: "basic",
                    children: [
                        {
                            text: "无彩色",
                            value: "achromatic",
                            children: [
                                { text: "黑色", value: "black" },
                                { text: "白色", value: "white" },
                                { text: "灰色", value: "gray" },
                            ],
                        },
                        {
                            text: "中性色",
                            value: "neutral",
                            children: [
                                { text: "米色", value: "beige" },
                                { text: "棕色", value: "brown" },
                                { text: "驼色", value: "camel" },
                            ],
                        },
                    ],
                },
                {
                    text: "暖色系",
                    value: "warm",
                    children: [
                        {
                            text: "红橙黄",
                            value: "roy",
                            children: [
                                { text: "红色", value: "red" },
                                { text: "橙色", value: "orange" },
                                { text: "黄色", value: "yellow" },
                            ],
                        },
                        {
                            text: "粉色系",
                            value: "pink",
                            children: [
                                { text: "粉红", value: "pink" },
                                { text: "珊瑚红", value: "coral" },
                                { text: "玫瑰粉", value: "rose" },
                            ],
                        },
                    ],
                },
                {
                    text: "冷色系",
                    value: "cold",
                    children: [
                        {
                            text: "蓝绿色",
                            value: "blue-green",
                            children: [
                                { text: "蓝色", value: "blue" },
                                { text: "青色", value: "cyan" },
                                { text: "绿色", value: "green" },
                            ],
                        },
                        {
                            text: "紫色系",
                            value: "purple",
                            children: [
                                { text: "紫色", value: "purple" },
                                { text: "薰衣草", value: "lavender" },
                                { text: "靛蓝", value: "indigo" },
                            ],
                        },
                    ],
                },
            ],
        };
    },
    methods: {
        // 地区选择变化回调
        onChange(values) {
            console.log("地区选择变化:", values);

            // 查找并显示完整路径
            this.displaySelectedArea = this.getSelectedFullPath(this.areaOptions, values);
        },

        // 分类选择变化回调
        onCategoryChange(values) {
            console.log("分类选择变化:", values);

            // 查找并显示完整路径
            this.displaySelectedCategory = this.getSelectedFullPath(this.categoryOptions, values);
        },

        // 食品选择变化回调
        onFoodChange(values) {
            console.log("食品选择变化:", values);

            // 查找并显示完整路径
            this.displaySelectedFood = this.getSelectedFullPath(this.foodOptions, values);
        },

        // 颜色选择变化回调
        onColor1Change(values) {
            console.log("红色主题选择变化:", values);
        },

        onColor2Change(values) {
            console.log("绿色主题选择变化:", values);
        },

        onColor3Change(values) {
            console.log("蓝色主题选择变化:", values);
        },

        // 获取选中项的完整路径文本
        getSelectedFullPath(options, values) {
            if (!values || !values.length) return "";

            const texts = [];
            let currentOptions = options;

            for (let i = 0; i < values.length; i++) {
                const value = values[i];
                const option = currentOptions.find((opt) => opt.value === value);

                if (!option) break;

                texts.push(option.text);

                if (option.children) {
                    currentOptions = option.children;
                } else {
                    break;
                }
            }

            return texts.join(" / ");
        },
    },
};
</script>

<style lang="scss">
.cascader-example {
    padding: 20px;

    .example-block {
        margin-bottom: 30px;

        .block-title {
            margin-bottom: 16px;
            font-size: 16px;
            font-weight: 500;
        }

        .result {
            margin-top: 16px;
            padding: 10px;
            background-color: #f2f3f5;
            border-radius: 4px;
            font-size: 14px;
        }

        .tip {
            margin-top: 8px;
            font-size: 12px;
            color: #909399;
        }
    }
}
</style>
