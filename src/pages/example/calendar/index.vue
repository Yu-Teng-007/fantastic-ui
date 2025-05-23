<template>
    <view class="container">
        <view class="header">
            <view class="title">日历</view>
            <view class="subtitle">日历组件用于选择日期，支持单个日期、多个日期、日期范围选择</view>
        </view>

        <!-- 使用单元格组展示所有示例 -->
        <view class="section">
            <view class="section-title">基础用法</view>
            <fanc-cell-group>
                <!-- 基础用法 -->
                <fanc-cell
                    title="基础用法"
                    description="选择单个日期"
                    is-link
                    @click="showBasicCalendar"
                >
                    <text v-if="selectedDate">{{ selectedDate }}</text>
                    <text v-else>请选择</text>
                </fanc-cell>

                <!-- 年月切换模式 -->
                <fanc-cell
                    title="年月切换模式"
                    description="可同时切换年份和月份"
                    is-link
                    @click="showYearMonthCalendar"
                >
                    <text v-if="selectedYearMonthDate">{{ selectedYearMonthDate }}</text>
                    <text v-else>请选择</text>
                </fanc-cell>

                <!-- 月份切换模式 -->
                <fanc-cell
                    title="月份切换模式"
                    description="只能切换月份"
                    is-link
                    @click="showMonthCalendar"
                >
                    <text v-if="selectedMonthDate">{{ selectedMonthDate }}</text>
                    <text v-else>请选择</text>
                </fanc-cell>
            </fanc-cell-group>
        </view>

        <view class="section">
            <view class="section-title">选择模式</view>
            <fanc-cell-group>
                <!-- 多选模式 -->
                <fanc-cell
                    title="多选模式"
                    description="可以选择多个日期"
                    is-link
                    @click="showMultipleCalendar"
                >
                    <text v-if="selectedMultipleDates && selectedMultipleDates.length">
                        已选 {{ selectedMultipleDates.length }} 个日期
                    </text>
                    <text v-else>请选择</text>
                </fanc-cell>

                <!-- 日期范围选择 -->
                <fanc-cell
                    title="日期范围选择"
                    description="可以选择日期范围"
                    is-link
                    @click="showRangeCalendar"
                >
                    <text v-if="selectedDateRange && selectedDateRange.length === 2">
                        {{ selectedDateRange[0] }} 至 {{ selectedDateRange[1] }}
                    </text>
                    <text v-else>请选择</text>
                </fanc-cell>
            </fanc-cell-group>
        </view>

        <view class="section">
            <view class="section-title">自定义配置</view>
            <fanc-cell-group>
                <!-- 自定义日期文案 -->
                <fanc-cell
                    title="自定义日期文案"
                    description="可以为特定日期添加自定义文案"
                    is-link
                    @click="showTextCalendar"
                >
                    <text v-if="selectedTextDate">{{ selectedTextDate }}</text>
                    <text v-else>请选择</text>
                </fanc-cell>

                <!-- 自定义周起始日 -->
                <fanc-cell
                    title="自定义周起始日"
                    description="可以设置以周一为一周的开始"
                    is-link
                    @click="showWeekCalendar"
                >
                    <text v-if="selectedWeekDate">{{ selectedWeekDate }}</text>
                    <text v-else>请选择</text>
                </fanc-cell>

                <!-- 滚动模式 -->
                <fanc-cell
                    title="滚动模式"
                    description="显示多个月份，可以滚动选择"
                    is-link
                    @click="showScrollCalendar"
                >
                    <text v-if="selectedScrollDate">{{ selectedScrollDate }}</text>
                    <text v-else>请选择</text>
                </fanc-cell>

                <!-- 日期范围限制 -->
                <fanc-cell
                    title="日期范围限制"
                    description="限制可选日期的范围"
                    is-link
                    @click="showLimitCalendar"
                >
                    <text v-if="selectedLimitDate">
                        {{ selectedLimitDate[0] }} 至 {{ selectedLimitDate[1] }}</text
                    >
                    <text v-else>请选择</text>
                </fanc-cell>

                <!-- 弹出位置 -->
                <fanc-cell
                    title="弹出位置"
                    description="可以设置从中心弹出"
                    is-link
                    @click="showCenterCalendar"
                >
                    <text v-if="selectedCenterDate">{{ selectedCenterDate }}</text>
                    <text v-else>请选择</text>
                </fanc-cell>
            </fanc-cell-group>
        </view>

        <!-- 选择结果展示 -->
        <view class="section" v-if="hasSelectedData">
            <view class="section-title">选择结果</view>
            <fanc-cell-group>
                <!-- 单选或滚动模式结果 -->
                <fanc-cell v-if="isSingleSelect" title="选择日期" :content="getSingleSelectedDate">
                </fanc-cell>

                <!-- 多选模式结果 -->
                <template v-if="isMultipleSelect">
                    <fanc-cell
                        title="已选日期数"
                        :content="selectedMultipleDates.length + '个'"
                    ></fanc-cell>
                    <fanc-cell
                        v-for="(date, index) in selectedMultipleDates"
                        :key="index"
                        :title="'日期 ' + (index + 1)"
                        :content="date"
                    >
                    </fanc-cell>
                </template>

                <!-- 范围选择结果 -->
                <template v-if="isRangeSelect">
                    <fanc-cell title="开始日期" :content="selectedDateRange[0]"></fanc-cell>
                    <fanc-cell title="结束日期" :content="selectedDateRange[1]"></fanc-cell>
                    <fanc-cell title="共计天数" :content="getRangeDays + '天'"> </fanc-cell>
                </template>
            </fanc-cell-group>
        </view>

        <!-- 日历组件实例 -->
        <fanc-calendar
            v-model="showCalendar"
            :type="calendarType"
            :title="calendarTitle"
            :subtitle="calendarSubtitle"
            :position="calendarPosition"
            :first-day-of-week="calendarFirstDay"
            :show-confirm="calendarShowConfirm"
            :confirm-text="calendarConfirmText"
            :scroll="calendarScroll"
            :default-date="calendarDefaultDate"
            :min-date="calendarMinDate"
            :max-date="calendarMaxDate"
            :text-formatter="calendarTextFormatter"
            :mode="calendarMode"
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
            selectedMultipleDates: [],
            selectedDateRange: [],
            selectedTextDate: "",
            selectedWeekDate: "",
            selectedScrollDate: "",
            selectedLimitDate: "",
            selectedCenterDate: "",
            selectedYearMonthDate: "",
            selectedMonthDate: "",

            // 日历配置
            showCalendar: false,
            calendarType: "single",
            calendarTitle: "日期选择",
            calendarSubtitle: "",
            calendarPosition: "bottom",
            calendarFirstDay: 0,
            calendarShowConfirm: true,
            calendarConfirmText: "确认",
            calendarScroll: false,
            calendarDefaultDate: null,
            calendarMinDate: null,
            calendarMaxDate: null,
            calendarTextFormatter: null,
            calendarMode: "month",

            // 当前操作类型，用于在确认回调中区分处理逻辑
            currentAction: "",
        };
    },

    computed: {
        // 判断是否有选择的数据
        hasSelectedData() {
            return (
                this.selectedDate ||
                (this.selectedMultipleDates && this.selectedMultipleDates.length) ||
                (this.selectedDateRange && this.selectedDateRange.length === 2) ||
                this.selectedTextDate ||
                this.selectedWeekDate ||
                this.selectedScrollDate ||
                this.selectedLimitDate ||
                this.selectedCenterDate ||
                this.selectedYearMonthDate ||
                this.selectedMonthDate
            );
        },

        // 判断是否为单选模式结果
        isSingleSelect() {
            return (
                this.selectedDate ||
                this.selectedTextDate ||
                this.selectedWeekDate ||
                this.selectedScrollDate ||
                this.selectedCenterDate ||
                this.selectedLimitDate ||
                this.selectedYearMonthDate ||
                this.selectedMonthDate
            );
        },

        // 判断是否为多选模式结果
        isMultipleSelect() {
            return this.selectedMultipleDates && this.selectedMultipleDates.length;
        },

        // 判断是否为范围选择结果
        isRangeSelect() {
            return this.selectedDateRange && this.selectedDateRange.length === 2;
        },

        // 获取单选模式下的已选日期
        getSingleSelectedDate() {
            return (
                this.selectedDate ||
                this.selectedTextDate ||
                this.selectedWeekDate ||
                this.selectedScrollDate ||
                this.selectedCenterDate ||
                this.selectedLimitDate ||
                this.selectedYearMonthDate ||
                this.selectedMonthDate
            );
        },

        // 计算范围选择的天数
        getRangeDays() {
            if (!this.selectedDateRange || this.selectedDateRange.length !== 2) {
                return 0;
            }

            const startDate = new Date(this.selectedDateRange[0]);
            const endDate = new Date(this.selectedDateRange[1]);
            const diffTime = Math.abs(endDate - startDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

            return diffDays;
        },
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
                    if (day === new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate())
                        return "月末";
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
            this.calendarType = "range";
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

        // 显示年月切换模式的日历
        showYearMonthCalendar() {
            this.resetCalendarConfig();
            this.calendarType = "single";
            this.calendarTitle = "年月切换模式";
            this.calendarMode = "year-month";
            this.showCalendar = true;
            this.currentAction = "year-month";
        },

        // 显示月份切换模式的日历
        showMonthCalendar() {
            this.resetCalendarConfig();
            this.calendarType = "single";
            this.calendarTitle = "月份切换模式";
            this.calendarMode = "month";
            this.showCalendar = true;
            this.currentAction = "month";
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
            this.calendarPosition = "bottom";
            this.calendarFirstDay = 0;
            this.calendarShowConfirm = true;
            this.calendarConfirmText = "确认";
            this.calendarScroll = false;
            this.calendarDefaultDate = null;
            this.calendarMinDate = null;
            this.calendarMaxDate = null;
            this.calendarTextFormatter = null;
            this.calendarMode = "month";
        },

        // 日历确认回调
        onCalendarConfirm(value) {
            switch (this.currentAction) {
                case "basic":
                    this.selectedDate = value;
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
                case "year-month":
                    this.selectedYearMonthDate = value;
                    break;
                case "month":
                    this.selectedMonthDate = value;
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
</style>
