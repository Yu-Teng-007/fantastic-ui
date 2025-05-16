<template>
    <view class="example-page">
        <view class="example-page__header">
            <text class="example-page__header-title">日历 Calendar</text>
            <text class="example-page__header-desc">日历组件用于选择日期，支持单个日期、多个日期、日期范围选择</text>
        </view>

        <!-- 基础用法 -->
        <view class="example-page__section">
            <view class="example-page__section-title">基础用法</view>
            <view class="example-page__section-desc">弹出日历组件，选择单个日期</view>
            <view class="example-page__content">
                <fanc-button block @click="showBasicCalendar">选择单个日期</fanc-button>
                <view class="example-page__result" v-if="selectedDate">
                    <view>选择日期: {{ selectedDate }}</view>
                </view>
            </view>
        </view>

        <!-- 自定义颜色和按钮文字 -->
        <view class="example-page__section">
            <view class="example-page__section-title">自定义样式</view>
            <view class="example-page__section-desc">可以自定义主题颜色和按钮文字</view>
            <view class="example-page__content">
                <fanc-button block color="#ff6b6b" @click="showColorCalendar">自定义颜色和按钮文字</fanc-button>
                <view class="example-page__result" v-if="selectedColorDate">
                    <view>选择日期: {{ selectedColorDate }}</view>
                </view>
            </view>
        </view>

        <!-- 多选模式 -->
        <view class="example-page__section">
            <view class="example-page__section-title">多选模式</view>
            <view class="example-page__section-desc">可以选择多个日期</view>
            <view class="example-page__content">
                <fanc-button block @click="showMultipleCalendar">选择多个日期</fanc-button>
                <view class="example-page__result" v-if="selectedMultipleDates && selectedMultipleDates.length">
                    <view>已选择 {{ selectedMultipleDates.length }} 个日期</view>
                    <view v-for="(date, index) in selectedMultipleDates" :key="index">
                        {{ date }}
                    </view>
                </view>
            </view>
        </view>

        <!-- 日期范围选择 -->
        <view class="example-page__section">
            <view class="example-page__section-title">日期范围选择</view>
            <view class="example-page__section-desc">可以选择日期范围</view>
            <view class="example-page__content">
                <fanc-button block @click="showRangeCalendar">选择日期范围</fanc-button>
                <view class="example-page__result" v-if="selectedDateRange && selectedDateRange.length === 2">
                    <view>开始日期: {{ selectedDateRange[0] }}</view>
                    <view>结束日期: {{ selectedDateRange[1] }}</view>
                </view>
            </view>
        </view>

        <!-- 自定义日期文案 -->
        <view class="example-page__section">
            <view class="example-page__section-title">自定义日期文案</view>
            <view class="example-page__section-desc">可以为特定日期添加自定义文案</view>
            <view class="example-page__content">
                <fanc-button block @click="showTextCalendar">带文案的日历</fanc-button>
                <view class="example-page__result" v-if="selectedTextDate">
                    <view>选择日期: {{ selectedTextDate }}</view>
                </view>
            </view>
        </view>

        <!-- 自定义周起始日 -->
        <view class="example-page__section">
            <view class="example-page__section-title">自定义周起始日</view>
            <view class="example-page__section-desc">可以设置以周一为一周的开始</view>
            <view class="example-page__content">
                <fanc-button block @click="showWeekCalendar">周一开始</fanc-button>
                <view class="example-page__result" v-if="selectedWeekDate">
                    <view>选择日期: {{ selectedWeekDate }}</view>
                </view>
            </view>
        </view>

        <!-- 滚动模式 -->
        <view class="example-page__section">
            <view class="example-page__section-title">滚动模式</view>
            <view class="example-page__section-desc">显示多个月份，可以滚动选择</view>
            <view class="example-page__content">
                <fanc-button block @click="showScrollCalendar">滚动模式</fanc-button>
                <view class="example-page__result" v-if="selectedScrollDate">
                    <view>选择日期: {{ selectedScrollDate }}</view>
                </view>
            </view>
        </view>

        <!-- 日期范围限制 -->
        <view class="example-page__section">
            <view class="example-page__section-title">日期范围限制</view>
            <view class="example-page__section-desc">限制可选日期的范围</view>
            <view class="example-page__content">
                <fanc-button block @click="showLimitCalendar">限制范围</fanc-button>
                <view class="example-page__result" v-if="selectedLimitDate">
                    <view>选择日期: {{ selectedLimitDate }}</view>
                </view>
            </view>
        </view>

        <!-- 弹出位置 -->
        <view class="example-page__section">
            <view class="example-page__section-title">弹出位置</view>
            <view class="example-page__section-desc">可以设置从中心弹出</view>
            <view class="example-page__content">
                <fanc-button block @click="showCenterCalendar">从中心弹出</fanc-button>
                <view class="example-page__result" v-if="selectedCenterDate">
                    <view>选择日期: {{ selectedCenterDate }}</view>
                </view>
            </view>
        </view>

        <!-- 日历组件实例 -->
        <fanc-calendar
            v-model="showCalendar"
            :type="calendarType"
            :title="calendarTitle"
            :subtitle="calendarSubtitle"
            :color="calendarColor"
            :position="calendarPosition"
            :first-day-of-week="calendarFirstDay"
            :show-confirm="calendarShowConfirm"
            :confirm-text="calendarConfirmText"
            :scroll="calendarScroll"
            :default-date="calendarDefaultDate"
            :min-date="calendarMinDate"
            :max-date="calendarMaxDate"
            :text-formatter="calendarTextFormatter"
            @confirm="onCalendarConfirm"
            @change="onCalendarChange"
        />
    </view>
</template>

<script>
export default {
    data() {
        return {
            // 基础示例数据
            selectedDate: "",
            selectedColorDate: "",
            selectedMultipleDates: [],
            selectedDateRange: [],
            selectedTextDate: "",
            selectedWeekDate: "",
            selectedScrollDate: "",
            selectedLimitDate: "",
            selectedCenterDate: "",

            // 日历配置
            showCalendar: false,
            calendarType: "single",
            calendarTitle: "日期选择",
            calendarSubtitle: "",
            calendarColor: "",
            calendarPosition: "bottom",
            calendarFirstDay: 0,
            calendarShowConfirm: true,
            calendarConfirmText: "确认",
            calendarScroll: false,
            calendarDefaultDate: null,
            calendarMinDate: null,
            calendarMaxDate: null,
            calendarTextFormatter: null,

            // 当前操作类型，用于在确认回调中区分处理逻辑
            currentAction: "",
        };
    },

    methods: {
        // 显示基础日历
        showBasicCalendar() {
            this.resetCalendarConfig();
            this.calendarType = "single";
            this.calendarTitle = "选择日期";
            this.showCalendar = true;
            this.currentAction = "basic";
        },

        // 显示自定义颜色和按钮文字的日历
        showColorCalendar() {
            this.resetCalendarConfig();
            this.calendarType = "single";
            this.calendarTitle = "选择日期";
            this.calendarColor = "#ff6b6b";
            this.calendarConfirmText = "完成";
            this.showCalendar = true;
            this.currentAction = "color";
        },

        // 显示多选日历
        showMultipleCalendar() {
            this.resetCalendarConfig();
            this.calendarType = "multiple";
            this.calendarTitle = "选择多个日期";
            this.showCalendar = true;
            this.currentAction = "multiple";
        },

        // 显示日期范围选择日历
        showRangeCalendar() {
            this.resetCalendarConfig();
            this.calendarType = "range";
            this.calendarTitle = "选择日期范围";
            this.calendarSubtitle = "请选择开始和结束日期";
            this.showCalendar = true;
            this.currentAction = "range";
        },

        // 显示带文案的日历
        showTextCalendar() {
            this.resetCalendarConfig();
            this.calendarType = "single";
            this.calendarTitle = "带文案的日历";

            // 设置日期文案格式化函数
            this.calendarTextFormatter = (date) => {
                const day = date.getDate();
                const month = date.getMonth() + 1;

                // 为特定日期添加文案
                if (month === new Date().getMonth() + 1) {
                    if (day === 1) return "月初";
                    if (day === 15) return "中旬";
                    if (day === new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()) return "月末";
                }

                // 周末添加文案
                const weekday = date.getDay();
                if (weekday === 0 || weekday === 6) return "周末";

                return "";
            };

            this.showCalendar = true;
            this.currentAction = "text";
        },

        // 显示自定义周起始日的日历
        showWeekCalendar() {
            this.resetCalendarConfig();
            this.calendarType = "single";
            this.calendarTitle = "周一开始";
            this.calendarFirstDay = 1; // 设置周一为一周的第一天
            this.showCalendar = true;
            this.currentAction = "week";
        },

        // 显示滚动模式日历
        showScrollCalendar() {
            this.resetCalendarConfig();
            this.calendarType = "single";
            this.calendarTitle = "滚动选择";
            this.calendarScroll = true; // 启用滚动模式
            this.showCalendar = true;
            this.currentAction = "scroll";
        },

        // 显示日期范围限制的日历
        showLimitCalendar() {
            this.resetCalendarConfig();
            this.calendarType = "single";
            this.calendarTitle = "日期范围限制";

            // 设置可选日期范围（今天开始的10天内）
            const today = new Date();
            const maxDate = new Date(today);
            maxDate.setDate(today.getDate() + 10);

            this.calendarMinDate = this.formatDate(today);
            this.calendarMaxDate = this.formatDate(maxDate);

            this.showCalendar = true;
            this.currentAction = "limit";
        },

        // 显示从中心弹出的日历
        showCenterCalendar() {
            this.resetCalendarConfig();
            this.calendarType = "single";
            this.calendarTitle = "从中心弹出";
            this.calendarPosition = "center"; // 设置从中心弹出
            this.showCalendar = true;
            this.currentAction = "center";
        },

        // 格式化日期
        formatDate(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        },

        // 重置日历配置
        resetCalendarConfig() {
            this.calendarType = "single";
            this.calendarTitle = "日期选择";
            this.calendarSubtitle = "";
            this.calendarColor = "";
            this.calendarPosition = "bottom";
            this.calendarFirstDay = 0;
            this.calendarShowConfirm = true;
            this.calendarConfirmText = "确认";
            this.calendarScroll = false;
            this.calendarDefaultDate = null;
            this.calendarMinDate = null;
            this.calendarMaxDate = null;
            this.calendarTextFormatter = null;
        },

        // 日历确认回调
        onCalendarConfirm(value) {
            switch (this.currentAction) {
                case "basic":
                    this.selectedDate = value;
                    break;
                case "color":
                    this.selectedColorDate = value;
                    break;
                case "multiple":
                    this.selectedMultipleDates = value;
                    break;
                case "range":
                    this.selectedDateRange = value;
                    break;
                case "text":
                    this.selectedTextDate = value;
                    break;
                case "week":
                    this.selectedWeekDate = value;
                    break;
                case "scroll":
                    this.selectedScrollDate = value;
                    break;
                case "limit":
                    this.selectedLimitDate = value;
                    break;
                case "center":
                    this.selectedCenterDate = value;
                    break;
            }
        },

        // 日历变更回调
        onCalendarChange(value) {
            // 在此处可以响应日期变更事件，但不做存储，仅在确认时存储
            console.log("Calendar change:", value);
        },
    },
};
</script>

<style>
/* 示例特定样式，使用非变量颜色 */
.example-page__result {
    background-color: #f8f9fa;
    padding: 12px;
    margin-top: 12px;
    border-radius: 8px;
    font-size: 14px;
}
</style>
