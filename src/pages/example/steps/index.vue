<template>
    <view class="container">
        <view class="header">
            <view class="title">步骤条</view>
            <view class="subtitle">用于引导用户按照流程完成任务或展示任务进度</view>
        </view>

        <!-- 基础功能 -->
        <view class="section">
            <view class="section-title">基础功能</view>

            <!-- 基础用法 -->
            <view class="steps-demo">
                <view class="demo-title">基础用法</view>
                <fanc-steps :steps="steps"></fanc-steps>
                <view class="demo-controls">
                    <button @click="prevStep">上一步</button>
                    <button @click="nextStep">下一步</button>
                    <button @click="completeAllSteps">完成所有</button>
                    <button @click="debugSteps">调试状态</button>
                </view>
            </view>

            <!-- 最后一步激活 -->
            <view class="steps-demo">
                <view class="demo-title">最后一步激活</view>
                <fanc-steps :steps="lastStepActive"></fanc-steps>
                <view class="demo-tip">展示最后一步处于激活状态</view>
            </view>
        </view>

        <!-- 不同类型 -->
        <view class="section">
            <view class="section-title">步骤条类型</view>

            <!-- 序号类型 -->
            <view class="steps-demo">
                <view class="demo-title">序号类型</view>
                <fanc-steps :steps="steps" type="number"></fanc-steps>
            </view>

            <!-- 图标类型 -->
            <view class="steps-demo">
                <view class="demo-title">图标类型</view>
                <fanc-steps :steps="steps" type="icon"></fanc-steps>
            </view>

            <!-- 简略类型 -->
            <view class="steps-demo">
                <view class="demo-title">简略类型</view>
                <fanc-steps :steps="steps" type="simple"></fanc-steps>
            </view>
        </view>

        <!-- 方向 -->
        <view class="section">
            <view class="section-title">步骤条方向</view>

            <!-- 水平方向 -->
            <view class="steps-demo">
                <view class="demo-title">水平方向</view>
                <fanc-steps :steps="steps" direction="horizontal"></fanc-steps>
            </view>

            <!-- 垂直方向 -->
            <view class="steps-demo">
                <view class="demo-title">垂直方向</view>
                <view style="height: 300px">
                    <fanc-steps :steps="steps" direction="vertical"></fanc-steps>
                </view>
            </view>
        </view>

        <!-- 状态展示 -->
        <view class="section">
            <view class="section-title">状态展示</view>

            <!-- 默认状态 -->
            <view class="steps-demo">
                <view class="demo-title">默认状态</view>
                <fanc-steps :steps="defaultSteps"></fanc-steps>
            </view>

            <!-- 完成状态 -->
            <view class="steps-demo">
                <view class="demo-title">完成状态</view>
                <fanc-steps :steps="finishSteps"></fanc-steps>
            </view>

            <!-- 进行中状态 -->
            <view class="steps-demo">
                <view class="demo-title">进行中状态</view>
                <fanc-steps :steps="processSteps"></fanc-steps>
            </view>

            <!-- 错误状态 -->
            <view class="steps-demo">
                <view class="demo-title">错误状态</view>
                <fanc-steps :steps="errorSteps"></fanc-steps>
            </view>
        </view>

        <!-- 自定义颜色 -->
        <view class="section">
            <view class="section-title">自定义颜色</view>

            <view class="steps-demo">
                <view class="demo-title">自定义颜色</view>
                <view class="demo-row">
                    <view class="demo-label">橙色主题</view>
                    <fanc-steps
                        :steps="steps"
                        activeColor="#ff6b00"
                        finishColor="#ff6b00"
                        defaultColor="#e0e0e0"
                    ></fanc-steps>
                </view>
                <view class="demo-row">
                    <view class="demo-label">绿色主题</view>
                    <fanc-steps
                        :steps="steps"
                        activeColor="#2ecc71"
                        finishColor="#2ecc71"
                        defaultColor="#e0e0e0"
                    ></fanc-steps>
                </view>
                <view class="demo-row">
                    <view class="demo-label">紫色主题</view>
                    <fanc-steps
                        :steps="steps"
                        activeColor="#9b59b6"
                        finishColor="#9b59b6"
                        defaultColor="#e0e0e0"
                    ></fanc-steps>
                </view>
            </view>
        </view>

        <!-- 可点击步骤 -->
        <view class="section">
            <view class="section-title">可点击步骤</view>

            <view class="steps-demo">
                <view class="demo-title">点击切换步骤</view>
                <fanc-steps
                    :steps="steps"
                    :clickable="true"
                    @click-step="handleClickStep"
                ></fanc-steps>
                <view class="demo-tip">点击步骤可以切换当前步骤</view>
            </view>
        </view>

        <!-- 交互式自定义 -->
        <view class="section">
            <view class="section-title">交互式自定义</view>

            <view class="steps-demo">
                <view class="demo-title">样式自定义器</view>

                <view class="customizer-row">
                    <text class="customizer-label">步骤条类型：</text>
                    <view class="radio-group">
                        <view class="radio-item" @click="customStyle.type = 'number'">
                            <view
                                class="radio"
                                :class="{ active: customStyle.type === 'number' }"
                            ></view>
                            <text>序号</text>
                        </view>
                        <view class="radio-item" @click="customStyle.type = 'icon'">
                            <view
                                class="radio"
                                :class="{ active: customStyle.type === 'icon' }"
                            ></view>
                            <text>图标</text>
                        </view>
                        <view class="radio-item" @click="customStyle.type = 'simple'">
                            <view
                                class="radio"
                                :class="{ active: customStyle.type === 'simple' }"
                            ></view>
                            <text>简略</text>
                        </view>
                    </view>
                </view>

                <view class="customizer-row">
                    <text class="customizer-label">方向：</text>
                    <view class="radio-group">
                        <view class="radio-item" @click="customStyle.direction = 'horizontal'">
                            <view
                                class="radio"
                                :class="{ active: customStyle.direction === 'horizontal' }"
                            ></view>
                            <text>水平</text>
                        </view>
                        <view class="radio-item" @click="customStyle.direction = 'vertical'">
                            <view
                                class="radio"
                                :class="{ active: customStyle.direction === 'vertical' }"
                            ></view>
                            <text>垂直</text>
                        </view>
                    </view>
                </view>

                <view class="customizer-row">
                    <text class="customizer-label">主题颜色：</text>
                    <view class="color-picker">
                        <view
                            class="color-item"
                            v-for="(color, index) in themeColors"
                            :key="index"
                            :style="{ backgroundColor: color.value }"
                            @click="selectThemeColor(color)"
                            :class="{ active: customStyle.activeColor === color.value }"
                        ></view>
                    </view>
                </view>

                <view class="customizer-row">
                    <text class="customizer-label">可点击：</text>
                    <view class="radio-group">
                        <view class="radio-item" @click="customStyle.clickable = false">
                            <view class="radio" :class="{ active: !customStyle.clickable }"></view>
                            <text>否</text>
                        </view>
                        <view class="radio-item" @click="customStyle.clickable = true">
                            <view class="radio" :class="{ active: customStyle.clickable }"></view>
                            <text>是</text>
                        </view>
                    </view>
                </view>

                <view class="preview-section">
                    <view class="preview-title">预览效果</view>
                    <view :style="customStyle.direction === 'vertical' ? 'height: 300px;' : ''">
                        <fanc-steps
                            :steps="customSteps"
                            :type="customStyle.type"
                            :direction="customStyle.direction"
                            :activeColor="customStyle.activeColor"
                            :finishColor="customStyle.activeColor"
                            :defaultColor="customStyle.defaultColor"
                            :clickable="customStyle.clickable"
                            @click-step="handleCustomClickStep"
                        ></fanc-steps>
                    </view>

                    <view class="demo-controls">
                        <button @click="prevCustomStep">上一步</button>
                        <button @click="resetCustomStep">重置</button>
                        <button @click="nextCustomStep">下一步</button>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            // 基础步骤数据
            steps: [
                { title: "步骤一", description: "第一步描述", status: "finish" },
                { title: "步骤二", description: "第二步描述", status: "finish" },
                { title: "步骤三", description: "第三步描述", status: "process" },
                { title: "步骤四", description: "第四步描述" },
            ],

            // 不同状态的步骤数据
            defaultSteps: [
                { title: "步骤一", description: "默认状态" },
                { title: "步骤二", description: "默认状态" },
                { title: "步骤三", description: "默认状态" },
                { title: "步骤四", description: "默认状态" },
            ],
            finishSteps: [
                { title: "步骤一", description: "已完成状态", status: "finish" },
                { title: "步骤二", description: "已完成状态", status: "finish" },
                { title: "步骤三", description: "已完成状态", status: "finish" },
                { title: "步骤四", description: "已完成状态", status: "finish" },
            ],
            processSteps: [
                { title: "步骤一", description: "已完成状态", status: "finish" },
                { title: "步骤二", description: "进行中状态", status: "process" },
                { title: "步骤三", description: "默认状态" },
                { title: "步骤四", description: "默认状态" },
            ],
            errorSteps: [
                { title: "步骤一", description: "已完成状态", status: "finish" },
                { title: "步骤二", description: "错误状态", status: "error" },
                { title: "步骤三", description: "默认状态" },
                { title: "步骤四", description: "默认状态" },
            ],

            // 自定义步骤
            customSteps: [
                { title: "步骤一", description: "第一步描述", status: "finish" },
                { title: "步骤二", description: "第二步描述", status: "process" },
                { title: "步骤三", description: "第三步描述" },
                { title: "步骤四", description: "第四步描述" },
            ],

            // 自定义样式
            customStyle: {
                type: "number",
                direction: "horizontal",
                activeColor: "#2979ff",
                defaultColor: "#c0c4cc",
                clickable: false,
            },

            // 主题颜色选项
            themeColors: [
                { name: "蓝色", value: "#2979ff" },
                { name: "绿色", value: "#2ecc71" },
                { name: "橙色", value: "#ff6b00" },
                { name: "紫色", value: "#9b59b6" },
                { name: "红色", value: "#fa3534" },
            ],

            // 最后一步激活的数据
            lastStepActive: [
                { title: "步骤一", description: "已完成", status: "finish" },
                { title: "步骤二", description: "已完成", status: "finish" },
                { title: "步骤三", description: "已完成", status: "finish" },
                { title: "步骤四", description: "进行中", status: "process" },
            ],
        };
    },
    methods: {
        // 基础步骤控制
        nextStep() {
            const currentIndex = this.findProcessIndex(this.steps);
            console.log("当前进行中的步骤索引:", currentIndex);

            // 确保所有步骤的状态都是正确的
            if (currentIndex !== -1) {
                // 先将当前步骤标记为完成
                this.steps[currentIndex].status = "finish";

                // 如果不是最后一步，则激活下一步
                if (currentIndex < this.steps.length - 1) {
                    this.steps[currentIndex + 1].status = "process";
                    console.log("已更新到下一步:", currentIndex + 1);
                }
            } else {
                // 没有找到进行中的步骤，默认激活第一步
                this.steps[0].status = "process";
                console.log("没有找到进行中的步骤，已激活第一步");
            }

            // 打印更新后的状态
            this.debugSteps();
        },
        prevStep() {
            const currentIndex = this.findProcessIndex(this.steps);
            console.log("当前进行中的步骤索引:", currentIndex);

            if (currentIndex > 0) {
                this.steps[currentIndex].status = "";
                this.steps[currentIndex - 1].status = "process";
                console.log("已更新到上一步:", currentIndex - 1);
            } else if (currentIndex === 0) {
                // 已经是第一步，保持当前状态
                console.log("已经是第一步，保持当前状态");
            } else if (currentIndex === -1) {
                // 没有找到进行中的步骤，默认激活最后一步
                this.steps[this.steps.length - 1].status = "process";
                console.log("没有找到进行中的步骤，已激活最后一步");
            }

            // 打印更新后的状态
            this.debugSteps();
        },

        // 完成所有步骤
        completeAllSteps() {
            this.steps.forEach((step, index) => {
                if (index === this.steps.length - 1) {
                    step.status = "process"; // 最后一步激活
                } else {
                    step.status = "finish"; // 其他步骤完成
                }
            });
        },

        // 自定义步骤控制
        nextCustomStep() {
            const currentIndex = this.findProcessIndex(this.customSteps);
            console.log("当前自定义步骤索引:", currentIndex);

            // 确保所有步骤的状态都是正确的
            if (currentIndex !== -1) {
                // 先将当前步骤标记为完成
                this.customSteps[currentIndex].status = "finish";

                // 如果不是最后一步，则激活下一步
                if (currentIndex < this.customSteps.length - 1) {
                    this.customSteps[currentIndex + 1].status = "process";
                    console.log("已更新到下一步:", currentIndex + 1);
                }
            } else {
                // 没有找到进行中的步骤，默认激活第一步
                this.customSteps[0].status = "process";
                console.log("没有找到进行中的步骤，已激活第一步");
            }

            // 打印更新后的状态
            this.debugCustomSteps();
        },
        prevCustomStep() {
            const currentIndex = this.findProcessIndex(this.customSteps);
            if (currentIndex > 0) {
                this.customSteps[currentIndex].status = "";
                this.customSteps[currentIndex - 1].status = "process";
            }
        },
        resetCustomStep() {
            this.customSteps.forEach((step, index) => {
                if (index === 0) {
                    step.status = "process";
                } else {
                    step.status = "";
                }
            });
        },

        // 查找当前进行中的步骤索引
        findProcessIndex(steps) {
            const index = steps.findIndex((step) => step.status === "process");
            // 如果没有找到进行中的步骤，返回-1
            return index;
        },

        // 点击步骤事件处理
        handleClickStep(index) {
            // 更新状态
            this.steps.forEach((step, i) => {
                if (i < index) {
                    step.status = "finish";
                } else if (i === index) {
                    step.status = "process";
                } else {
                    step.status = "";
                }
            });
        },

        // 自定义点击步骤事件处理
        handleCustomClickStep(index) {
            if (this.customStyle.clickable) {
                this.customSteps.forEach((step, i) => {
                    if (i < index) {
                        step.status = "finish";
                    } else if (i === index) {
                        step.status = "process";
                    } else {
                        step.status = "";
                    }
                });
            }
        },

        // 选择主题颜色
        selectThemeColor(color) {
            this.customStyle.activeColor = color.value;
        },

        // 调试步骤状态
        debugSteps() {
            console.log("当前步骤状态:");
            this.steps.forEach((step, index) => {
                console.log(`步骤${index + 1}: ${step.status || "默认"}`);
            });
        },

        // 调试自定义步骤状态
        debugCustomSteps() {
            console.log("当前自定义步骤状态:");
            this.customSteps.forEach((step, index) => {
                console.log(`步骤${index + 1}: ${step.status || "默认"}`);
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

.steps-demo {
    display: flex;
    flex-direction: column;
    padding: 16px;
    border-bottom: 1px solid #f8f8f8;
}

.steps-demo:last-child {
    border-bottom: none;
}

.demo-title {
    font-size: 14px;
    font-weight: 500;
    color: #323233;
    margin-bottom: 16px;
}

.demo-row {
    margin-bottom: 24px;
}

.demo-row:last-child {
    margin-bottom: 0;
}

.demo-label {
    font-size: 13px;
    color: #666;
    margin-bottom: 8px;
}

.demo-tip {
    margin-top: 8px;
    font-size: 12px;
    color: #969799;
}

.demo-controls {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
}

.demo-controls button {
    padding: 6px 12px;
    background-color: #2979ff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 13px;
    cursor: pointer;
}

.demo-controls button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}

/* 自定义器样式 */
.customizer-row {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    padding: 8px 0;
}

.customizer-label {
    width: 90px;
    font-size: 13px;
    color: #323233;
}

.radio-group {
    display: flex;
    flex-wrap: wrap;
}

.radio-item {
    display: flex;
    align-items: center;
    margin-right: 16px;
    cursor: pointer;
}

.radio {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid #ddd;
    margin-right: 6px;
    position: relative;
}

.radio.active {
    border-color: #2979ff;
}

.radio.active:after {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: #2979ff;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.color-picker {
    display: flex;
    flex-wrap: wrap;
}

.color-item {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 12px;
    margin-bottom: 8px;
    cursor: pointer;
    border: 2px solid transparent;
}

.color-item.active {
    border-color: #333;
    transform: scale(1.1);
}

.preview-section {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px dashed #eee;
}

.preview-title {
    font-size: 13px;
    font-weight: 500;
    color: #323233;
    margin-bottom: 16px;
}
</style>
