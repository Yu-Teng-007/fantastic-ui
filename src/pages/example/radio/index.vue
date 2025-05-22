<template>
    <div class="radio-demo">
        <h2>单选框示例</h2>

        <div class="demo-section">
            <h3>基础用法</h3>
            <fanc-radio v-model="checked1" label="单选框1" />
            <fanc-radio v-model="checked2" label="单选框2" disabled />
        </div>

        <div class="demo-section">
            <h3>不同形状</h3>
            <fanc-radio v-model="shapeChecked1" label="圆形" shape="round" />
            <fanc-radio v-model="shapeChecked2" label="方形" shape="square" />
        </div>

        <div class="demo-section">
            <h3>不同选中样式</h3>
            <fanc-radio v-model="checkTypeChecked1" label="圆点样式" />
            <fanc-radio v-model="checkTypeChecked2" label="对勾样式" check-type="check" />
        </div>

        <div class="demo-section">
            <h3>不同尺寸</h3>
            <fanc-radio v-model="checked3" label="小尺寸" icon-size="small" />
            <fanc-radio v-model="checked4" label="正常尺寸" />
            <fanc-radio v-model="checked5" label="大尺寸" icon-size="large" />
        </div>

        <div class="demo-section">
            <h3>自定义颜色</h3>
            <fanc-radio v-model="checked6" label="红色" checked-color="#f44336" />
            <fanc-radio v-model="checked7" label="绿色" checked-color="#4caf50" />
            <fanc-radio v-model="checked8" label="蓝色" checked-color="#2196f3" />
        </div>

        <div class="demo-section">
            <h3>单选框组</h3>
            <fanc-radio-group v-model="groupValue" checked-color="#1989fa">
                <fanc-radio name="a" label="选项A" />
                <fanc-radio name="b" label="选项B" />
                <fanc-radio name="c" label="选项C" />
            </fanc-radio-group>
            <div class="radio-demo__value">当前选中值: {{ groupValue }}</div>
        </div>

        <div class="demo-section">
            <h3>单选框组选中样式</h3>
            <fanc-radio-group
                v-model="groupCheckTypeValue"
                check-type="check"
                checked-color="#1989fa"
            >
                <fanc-radio name="a" label="选项A" />
                <fanc-radio name="b" label="选项B" />
                <fanc-radio name="c" label="选项C" />
            </fanc-radio-group>
            <div class="radio-demo__value">当前选中值: {{ groupCheckTypeValue }}</div>
        </div>

        <div class="demo-section">
            <h3>单选框组形状</h3>
            <fanc-radio-group v-model="groupShapeValue" shape="square" checked-color="#1989fa">
                <fanc-radio name="a" label="选项A" />
                <fanc-radio name="b" label="选项B" />
                <fanc-radio name="c" label="选项C" />
            </fanc-radio-group>
            <div class="radio-demo__value">当前选中值: {{ groupShapeValue }}</div>
        </div>

        <div class="demo-section">
            <h3>禁用状态</h3>
            <fanc-radio-group v-model="groupDisabledValue" disabled>
                <fanc-radio name="a" label="选项A" />
                <fanc-radio name="b" label="选项B" />
                <fanc-radio name="c" label="选项C" />
            </fanc-radio-group>
            <div class="radio-demo__value">当前选中值: {{ groupDisabledValue }}</div>
        </div>

        <div class="demo-section">
            <h3>垂直排列</h3>
            <fanc-radio-group v-model="groupVerticalValue" direction="vertical">
                <fanc-radio name="a" label="选项A" />
                <fanc-radio name="b" label="选项B" />
                <fanc-radio name="c" label="选项C" />
            </fanc-radio-group>
            <div class="radio-demo__value">当前选中值: {{ groupVerticalValue }}</div>
        </div>

        <div class="demo-section">
            <h3>单选框组混合形状</h3>
            <fanc-radio-group v-model="groupMixedShapeValue" shape="round">
                <fanc-radio name="a" label="继承圆形" />
                <fanc-radio name="b" label="指定方形" shape="square" />
            </fanc-radio-group>
            <div class="radio-demo__value">当前选中值: {{ groupMixedShapeValue }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "radio-demo",

    data() {
        return {
            // 基础用法
            checked1: true,
            checked2: false,

            // 不同形状
            shapeChecked1: true,
            shapeChecked2: true,

            // 不同选中样式
            checkTypeChecked1: true,
            checkTypeChecked2: true,

            // 不同尺寸
            checked3: true,
            checked4: true,
            checked5: true,

            // 自定义颜色
            checked6: true,
            checked7: true,
            checked8: true,

            // 单选框组
            groupValue: "a",

            // 单选框组选中样式
            groupCheckTypeValue: "b",

            // 单选框组形状
            groupShapeValue: "b",

            // 禁用状态
            groupDisabledValue: "b",

            // 垂直排列
            groupVerticalValue: "c",

            // 单选框组混合形状
            groupMixedShapeValue: "a",
        };
    },
};
</script>

<style>
.radio-demo {
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

.radio-demo__value {
    margin-top: 8px;
    font-size: 14px;
    color: #646566;
}

/* 设置主题色变量，这里不使用CSS变量 */
:root {
    --fanc-primary-color: #1989fa;
    --text-primary: #323233;
    --text-disabled: #c8c9cc;
}
</style>
