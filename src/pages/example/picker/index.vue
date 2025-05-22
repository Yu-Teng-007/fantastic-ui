<template>
    <view class="example-page">
        <view class="example-page__header">
            <text class="example-page__header-title">选择器组件</text>
            <text class="example-page__header-desc">用于在多个选项中选择一项或多项</text>
        </view>

        <fanc-cell-group title="基础用法" description="单列选择器，最简单的用法" inset>
            <fanc-cell title="单列选择器" is-link @click="showBasicPicker = true">
                <template #content>
                    <view class="picker-result">{{ basicResult || "请选择" }}</view>
                </template>
            </fanc-cell>
        </fanc-cell-group>

        <fanc-cell-group title="多列选择器" description="支持同时选择多列数据" inset>
            <fanc-cell title="多列选择器" is-link @click="showMultiPicker = true">
                <template #content>
                    <view class="picker-result">{{ multiResult || "请选择" }}</view>
                </template>
            </fanc-cell>
        </fanc-cell-group>

        <fanc-cell-group
            title="对象数组"
            description="数据为对象数组格式，可通过textKey和valueKey指定显示的文本和值"
            inset
        >
            <fanc-cell title="对象选择器" is-link @click="showObjectPicker = true">
                <template #content>
                    <view class="picker-result">{{ objectResult || "请选择" }}</view>
                </template>
            </fanc-cell>
        </fanc-cell-group>

        <fanc-cell-group title="自定义样式" description="自定义标题、按钮文字和样式" inset>
            <fanc-cell title="自定义样式" is-link @click="showCustomPicker = true">
                <template #content>
                    <view class="picker-result">{{ customResult || "请选择" }}</view>
                </template>
            </fanc-cell>
        </fanc-cell-group>

        <fanc-cell-group title="禁用选项" description="禁用某些选项，使其不可选择" inset>
            <fanc-cell title="禁用选项" is-link @click="showDisabledPicker = true">
                <template #content>
                    <view class="picker-result">{{ disabledResult || "请选择" }}</view>
                </template>
            </fanc-cell>
        </fanc-cell-group>

        <fanc-cell-group
            title="无顶部栏"
            description="不显示顶部栏，通常用于嵌入到其他组件中"
            inset
        >
            <fanc-cell title="无顶部栏" is-link @click="showNoToolbarPicker = true">
                <template #content>
                    <view class="picker-result">{{ noToolbarResult || "请选择" }}</view>
                </template>
            </fanc-cell>
        </fanc-cell-group>

        <fanc-cell-group title="级联选择" description="选择一项会联动地改变下一列的选项内容" inset>
            <fanc-cell title="级联选择" is-link @click="showCascadePicker = true">
                <template #content>
                    <view class="picker-result">{{ cascadeResult || "请选择" }}</view>
                </template>
            </fanc-cell>
        </fanc-cell-group>

        <!-- 选择器组件 -->
        <fanc-picker
            :show="showBasicPicker"
            :columns="fruitColumns"
            @confirm="onBasicConfirm"
            @cancel="showBasicPicker = false"
            @change="onChange"
            :default-index="[2]"
            @update:show="showBasicPicker = $event"
        />

        <fanc-picker
            :show="showMultiPicker"
            :columns="multiColumns"
            @confirm="onMultiConfirm"
            @cancel="showMultiPicker = false"
            @update:show="showMultiPicker = $event"
        />

        <fanc-picker
            :show="showObjectPicker"
            :columns="objectColumns"
            text-key="label"
            value-key="id"
            @confirm="onObjectConfirm"
            @cancel="showObjectPicker = false"
            @update:show="showObjectPicker = $event"
        />

        <fanc-picker
            :show="showCustomPicker"
            :columns="fruitColumns"
            title="请选择水果"
            confirm-text="完成"
            cancel-text="返回"
            :round="true"
            @confirm="onCustomConfirm"
            @cancel="showCustomPicker = false"
            @update:show="showCustomPicker = $event"
        />

        <fanc-picker
            :show="showDisabledPicker"
            :columns="disabledColumns"
            @confirm="onDisabledConfirm"
            @cancel="showDisabledPicker = false"
            @update:show="showDisabledPicker = $event"
        />

        <fanc-picker
            :show="showNoToolbarPicker"
            :columns="fruitColumns"
            :show-toolbar="false"
            @change="onNoToolbarChange"
            @cancel="showNoToolbarPicker = false"
            @update:show="showNoToolbarPicker = $event"
        />

        <fanc-picker
            :show="showCascadePicker"
            :columns="cascadeColumns"
            :cascade="true"
            :default-index="[0, 0, 0]"
            title="请选择地区"
            @confirm="onCascadeConfirm"
            @cancel="showCascadePicker = false"
            @update:show="showCascadePicker = $event"
        />
    </view>
</template>

<script>
export default {
    data() {
        return {
            showBasicPicker: false,
            showMultiPicker: false,
            showObjectPicker: false,
            showCustomPicker: false,
            showDisabledPicker: false,
            showNoToolbarPicker: false,
            showCascadePicker: false,

            // 选择结果
            basicResult: "",
            multiResult: "",
            objectResult: "",
            customResult: "",
            disabledResult: "",
            noToolbarResult: "",
            cascadeResult: "",

            // 水果列表
            fruitColumns: [
                "苹果",
                "香蕉",
                "橙子",
                "葡萄",
                "西瓜",
                "芒果",
                "柠檬",
                "草莓",
                "樱桃",
                "菠萝",
            ],

            // 多列数据
            multiColumns: [
                // 第一列
                ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
                // 第二列
                ["上午", "下午", "晚上"],
                // 第三列
                ["8点", "9点", "10点", "11点", "12点"],
            ],

            // 对象数组数据
            objectColumns: [
                { id: "1", label: "北京", value: "beijing" },
                { id: "2", label: "上海", value: "shanghai" },
                { id: "3", label: "广州", value: "guangzhou" },
                { id: "4", label: "深圳", value: "shenzhen" },
                { id: "5", label: "杭州", value: "hangzhou" },
                { id: "6", label: "成都", value: "chengdu" },
                { id: "7", label: "武汉", value: "wuhan" },
            ],

            // 禁用选项数据
            disabledColumns: [
                { text: "选项1", value: "1" },
                { text: "选项2", value: "2", disabled: true },
                { text: "选项3", value: "3" },
                { text: "选项4", value: "4" },
                { text: "选项5", value: "5", disabled: true },
                { text: "选项6", value: "6" },
            ],

            // 级联选择数据
            cascadeColumns: [
                {
                    text: "广东省",
                    value: "guangdong",
                    children: [
                        {
                            text: "广州市",
                            value: "guangzhou",
                            children: [
                                { text: "天河区", value: "tianhe" },
                                { text: "海珠区", value: "haizhu" },
                                { text: "越秀区", value: "yuexiu" },
                                { text: "白云区", value: "baiyun" },
                                { text: "黄埔区", value: "huangpu" },
                                { text: "番禺区", value: "panyu" },
                            ],
                        },
                        {
                            text: "深圳市",
                            value: "shenzhen",
                            children: [
                                { text: "福田区", value: "futian" },
                                { text: "罗湖区", value: "luohu" },
                                { text: "南山区", value: "nanshan" },
                                { text: "宝安区", value: "baoan" },
                                { text: "龙岗区", value: "longgang" },
                                { text: "龙华区", value: "longhua" },
                            ],
                        },
                        {
                            text: "东莞市",
                            value: "dongguan",
                            children: [
                                { text: "莞城街道", value: "guancheng" },
                                { text: "东城街道", value: "dongcheng" },
                                { text: "南城街道", value: "nancheng" },
                                { text: "万江街道", value: "wanjiang" },
                                { text: "长安镇", value: "changan" },
                            ],
                        },
                    ],
                },
                {
                    text: "浙江省",
                    value: "zhejiang",
                    children: [
                        {
                            text: "杭州市",
                            value: "hangzhou",
                            children: [
                                { text: "西湖区", value: "xihu" },
                                { text: "上城区", value: "shangcheng" },
                                { text: "下城区", value: "xiacheng" },
                                { text: "江干区", value: "jianggan" },
                                { text: "拱墅区", value: "gongshu" },
                                { text: "滨江区", value: "binjiang" },
                            ],
                        },
                        {
                            text: "宁波市",
                            value: "ningbo",
                            children: [
                                { text: "海曙区", value: "haishu" },
                                { text: "江北区", value: "jiangbei" },
                                { text: "北仑区", value: "beilun" },
                                { text: "镇海区", value: "zhenhai" },
                                { text: "鄞州区", value: "yinzhou" },
                            ],
                        },
                    ],
                },
                {
                    text: "江苏省",
                    value: "jiangsu",
                    children: [
                        {
                            text: "南京市",
                            value: "nanjing",
                            children: [
                                { text: "玄武区", value: "xuanwu" },
                                { text: "秦淮区", value: "qinhuai" },
                                { text: "建邺区", value: "jianye" },
                                { text: "鼓楼区", value: "gulou" },
                                { text: "浦口区", value: "pukou" },
                                { text: "栖霞区", value: "qixia" },
                            ],
                        },
                        {
                            text: "苏州市",
                            value: "suzhou",
                            children: [
                                { text: "姑苏区", value: "gusu" },
                                { text: "虎丘区", value: "huqiu" },
                                { text: "吴中区", value: "wuzhong" },
                                { text: "相城区", value: "xiangcheng" },
                                { text: "吴江区", value: "wujiang" },
                            ],
                        },
                    ],
                },
            ],
        };
    },
    methods: {
        // 基础选择器确认事件
        onBasicConfirm(e) {
            const { items } = e;
            this.basicResult = items[0];
        },

        // 多列选择器确认事件
        onMultiConfirm(e) {
            const { items } = e;
            this.multiResult = items.join(" - ");
        },

        // 对象选择器确认事件
        onObjectConfirm(e) {
            const { items } = e;
            this.objectResult = items[0].label;
        },

        // 自定义样式选择器确认事件
        onCustomConfirm(e) {
            const { items } = e;
            this.customResult = items[0];
        },

        // 禁用选项选择器确认事件
        onDisabledConfirm(e) {
            const { items } = e;
            this.disabledResult = items[0].text;
        },

        // 选择器变化事件
        onChange(e) {
            console.log("onChange", e);
        },

        // 无顶部栏选择器变化事件
        onNoToolbarChange(e) {
            const { items } = e;
            // 将选中项转为字符串显示
            if (Array.isArray(items)) {
                this.noToolbarResult = items.join ? items.join(", ") : items;
            } else {
                this.noToolbarResult = items;
            }
        },

        // 级联选择器确认事件
        onCascadeConfirm(e) {
            const { items } = e;
            // 确保能够显示完整的选中路径
            const selectedPath = items.map((item) => item.text).join(" - ");
            this.cascadeResult = selectedPath;
            console.log("级联选择结果:", { items });
        },
    },
};
</script>

<style lang="scss" scoped>
.picker-result {
    color: var(--text-secondary);
    font-size: 14px;
}

.example-page {
    padding-bottom: 40px;
}

.example-page__header {
    padding: 24px 16px;
    background-color: #ffffff;
    margin-bottom: 12px;
}

.example-page__header-title {
    font-size: 20px;
    font-weight: 600;
    color: #323233;
    margin-bottom: 8px;
    display: block;
}

.example-page__header-desc {
    font-size: 14px;
    color: #969799;
    display: block;
}

::v-deep .fanc-cell-group {
    margin-bottom: 12px;
}
</style>
