<template>
    <div class="checkbox-demo">
        <h2>复选框示例</h2>

        <div class="demo-section">
            <h3>基础用法</h3>
            <fanc-checkbox v-model="checked1" label="复选框1" />
            <fanc-checkbox v-model="checked2" label="复选框2" disabled />
        </div>

        <div class="demo-section">
            <h3>不同尺寸</h3>
            <fanc-checkbox v-model="checked3" label="小尺寸" icon-size="small" />
            <fanc-checkbox v-model="checked4" label="正常尺寸" />
            <fanc-checkbox v-model="checked5" label="大尺寸" icon-size="large" />
        </div>

        <div class="demo-section">
            <h3>不同形状</h3>
            <fanc-checkbox v-model="checked6" label="圆形" shape="round" />
            <fanc-checkbox v-model="checked7" label="方形" shape="square" />
        </div>

        <div class="demo-section">
            <h3>自定义颜色</h3>
            <fanc-checkbox v-model="checked8" label="红色" checked-color="#f44336" />
            <fanc-checkbox v-model="checked9" label="绿色" checked-color="#4caf50" />
            <fanc-checkbox v-model="checked10" label="蓝色" checked-color="#2196f3" />
        </div>

        <div class="demo-section">
            <h3>复选框组</h3>
            <fanc-checkbox-group v-model="groupValue" checked-color="#1989fa">
                <fanc-checkbox name="a" label="选项A" />
                <fanc-checkbox name="b" label="选项B" />
                <fanc-checkbox name="c" label="选项C" />
            </fanc-checkbox-group>
            <div class="checkbox-demo__value">当前选中值: {{ JSON.stringify(groupValue) }}</div>
        </div>

        <div class="demo-section">
            <h3>最大可选数量</h3>
            <fanc-checkbox-group
                v-model="groupMaxValue"
                checked-color="#1989fa"
                :max="2"
                @exceed-max="onExceedMax"
            >
                <fanc-checkbox name="a" label="选项A" />
                <fanc-checkbox name="b" label="选项B" />
                <fanc-checkbox name="c" label="选项C" />
                <fanc-checkbox name="d" label="选项D" />
            </fanc-checkbox-group>
            <div class="checkbox-demo__value">当前选中值: {{ JSON.stringify(groupMaxValue) }}</div>
            <div>最多可选2项</div>
        </div>

        <div class="demo-section">
            <h3>禁用状态</h3>
            <fanc-checkbox-group v-model="groupDisabledValue" disabled>
                <fanc-checkbox name="a" label="选项A" />
                <fanc-checkbox name="b" label="选项B" />
                <fanc-checkbox name="c" label="选项C" />
            </fanc-checkbox-group>
            <div class="checkbox-demo__value">
                当前选中值: {{ JSON.stringify(groupDisabledValue) }}
            </div>
        </div>

        <div class="demo-section">
            <h3>垂直排列</h3>
            <fanc-checkbox-group v-model="groupVerticalValue" direction="vertical">
                <fanc-checkbox name="a" label="选项A" />
                <fanc-checkbox name="b" label="选项B" />
                <fanc-checkbox name="c" label="选项C" />
            </fanc-checkbox-group>
            <div class="checkbox-demo__value">
                当前选中值: {{ JSON.stringify(groupVerticalValue) }}
            </div>
        </div>
    </div>
</template>

<script>
import FancCheckbox from "../components/fanc-checkbox/index.vue";
import FancCheckboxGroup from "../components/fanc-checkbox-group/index.vue";

export default {
    name: "checkbox-demo",

    components: {
        FancCheckbox,
        FancCheckboxGroup,
    },

    data() {
        return {
            // 基础用法
            checked1: false,
            checked2: true,

            // 不同尺寸
            checked3: true,
            checked4: true,
            checked5: true,

            // 不同形状
            checked6: true,
            checked7: true,

            // 自定义颜色
            checked8: true,
            checked9: true,
            checked10: true,

            // 复选框组
            groupValue: ["a", "c"],

            // 最大可选数量
            groupMaxValue: [],

            // 禁用状态
            groupDisabledValue: ["a"],

            // 垂直排列
            groupVerticalValue: ["b"],
        };
    },

    methods: {
        onExceedMax(max) {
            alert(`最多只能选择${max}项`);
        },
    },
};
</script>

<style>
.checkbox-demo {
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

.demo-section {
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid #ebedf0;
    border-radius: 8px;
}

h2 {
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 600;
    color: #323233;
}

h3 {
    margin-top: 0;
    margin-bottom: 12px;
    font-size: 16px;
    font-weight: 600;
    color: #323233;
}

.checkbox-demo__value {
    margin-top: 8px;
    font-size: 14px;
    color: #646566;
}

/* 设置主题色变量 */
:root {
    --fanc-primary-color: #1989fa;
    --text-primary: #323233;
    --text-disabled: #c8c9cc;
}
</style>
