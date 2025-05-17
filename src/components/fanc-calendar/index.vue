<template>
    <view class="fanc-calendar" :class="customClass">
        <fanc-popup
            v-model="showCalendar"
            :position="position"
            :overlay="overlay"
            :closeable="closeable"
            :close-icon-position="closeIconPosition"
            :round="round"
            :z-index="zIndex"
            :overlay-closable="overlayClosable"
            @close="onClose"
        >
            <view class="fanc-calendar__header">
                <view class="fanc-calendar__title">{{ title || "日期选择" }}</view>
                <view class="fanc-calendar__subtitle" v-if="subtitle">{{ subtitle }}</view>
            </view>
            <view class="fanc-calendar__body" :class="{ 'fanc-calendar__body--scroll': scroll }">
                <view class="fanc-calendar__toolbar">
                    <view class="fanc-calendar__toolbar-button" @click="prevMonth">
                        <fanc-icon name="arrow-left" size="16" />
                    </view>
                    <view class="fanc-calendar__toolbar-title">{{ formatYearMonth }}</view>
                    <view class="fanc-calendar__toolbar-button" @click="nextMonth">
                        <fanc-icon name="arrow-right" size="16" />
                    </view>
                </view>

                <!-- 日历头部：星期 -->
                <view class="fanc-calendar__weekdays">
                    <view
                        v-for="(weekday, index) in weekdaysWithOffset"
                        :key="index"
                        class="fanc-calendar__weekday"
                        >{{ weekday }}</view
                    >
                </view>

                <!-- 当前月的日期 -->
                <view class="fanc-calendar__days" v-if="!scroll">
                    <view
                        v-for="(day, index) in daysWithPlaceholders"
                        :key="index"
                        class="fanc-calendar__day"
                        :class="getDayClass(day)"
                        @click="selectDate(day)"
                    >
                        <view class="fanc-calendar__day-content">
                            <text>{{ day.day }}</text>
                            <view class="fanc-calendar__day-text" v-if="day.text">{{
                                day.text
                            }}</view>
                        </view>
                    </view>
                </view>

                <!-- 滚动模式：显示多个月 -->
                <view class="fanc-calendar__months" v-if="scroll">
                    <view
                        class="fanc-calendar__month"
                        v-for="(month, monthIndex) in months"
                        :key="monthIndex"
                    >
                        <view class="fanc-calendar__month-title">
                            {{ formatYearMonthTitle(month.year, month.month) }}
                        </view>
                        <view class="fanc-calendar__month-days">
                            <view
                                v-for="(day, dayIndex) in month.days"
                                :key="dayIndex"
                                class="fanc-calendar__day"
                                :class="getDayClass(day)"
                                @click="selectDate(day)"
                            >
                                <view class="fanc-calendar__day-content">
                                    <text>{{ day.day }}</text>
                                    <view class="fanc-calendar__day-text" v-if="day.text">{{
                                        day.text
                                    }}</view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="fanc-calendar__footer">
                <fanc-button
                    v-if="showConfirm"
                    block
                    :disabled="!canConfirm"
                    :color="color"
                    @click="confirm"
                    >{{ confirmText || "确认" }}</fanc-button
                >
            </view>
        </fanc-popup>
    </view>
</template>

<script>
/**
 * fanc-calendar 日历组件
 * @description 日历选择器，支持单个日期、多个日期、日期范围选择
 * @property {Boolean} show - 是否显示日历
 * @property {String} type - 选择类型，可选值为 single/multiple/range
 * @property {String} title - 日历标题
 * @property {String} subtitle - 日历副标题
 * @property {String} color - 主题色
 * @property {String} position - 弹出位置，可选值为 center/bottom
 * @property {Boolean} round - 是否显示圆角
 * @property {Boolean} overlay - 是否显示遮罩层
 * @property {Boolean} closeable - 是否显示关闭图标
 * @property {String} closeIconPosition - 关闭图标位置
 * @property {Number|String} zIndex - 弹出层层级
 * @property {Boolean} overlayClosable - 是否点击遮罩层关闭弹窗
 * @property {Boolean} showConfirm - 是否显示确认按钮
 * @property {String} confirmText - 确认按钮文字
 * @property {Number} firstDayOfWeek - 周起始日，0 表示周日，1-6 表示周一至周六
 * @property {Boolean} scroll - 是否使用滚动模式
 * @property {Array} defaultDate - 默认选中的日期，type 为 single 时为字符串，multiple/range 时为数组
 * @property {String|Array} minDate - 可选择的最小日期
 * @property {String|Array} maxDate - 可选择的最大日期
 * @property {Object} textFormatter - 日期文案格式化函数
 * @property {String} customClass - 自定义类名
 * @event {Function} change - 选择日期时触发
 * @event {Function} confirm - 点击确认按钮时触发
 * @event {Function} close - 关闭弹窗时触发
 */
export default {
    name: "fanc-calendar",

    model: {
        prop: "show",
        event: "update:show",
    },

    props: {
        // 是否显示日历弹窗
        show: {
            type: Boolean,
            default: false,
        },
        // 选择类型：单选/多选/范围
        type: {
            type: String,
            default: "single",
            validator: (val) => ["single", "multiple", "range"].includes(val),
        },
        // 日历标题
        title: {
            type: String,
            default: "",
        },
        // 日历副标题
        subtitle: {
            type: String,
            default: "",
        },
        // 主题色
        color: {
            type: String,
            default: "",
        },
        // 弹出位置
        position: {
            type: String,
            default: "bottom",
            validator: (val) => ["center", "bottom"].includes(val),
        },
        // 是否显示圆角
        round: {
            type: Boolean,
            default: true,
        },
        // 是否显示遮罩层
        overlay: {
            type: Boolean,
            default: true,
        },
        // 是否显示关闭图标
        closeable: {
            type: Boolean,
            default: true,
        },
        // 关闭图标位置
        closeIconPosition: {
            type: String,
            default: "top-right",
        },
        // 弹出层层级
        zIndex: {
            type: [Number, String],
            default: 1000,
        },
        // 是否点击遮罩层关闭弹窗
        overlayClosable: {
            type: Boolean,
            default: true,
        },
        // 是否显示确认按钮
        showConfirm: {
            type: Boolean,
            default: true,
        },
        // 确认按钮文字
        confirmText: {
            type: String,
            default: "确认",
        },
        // 周起始日(0-6 表示周日到周六)
        firstDayOfWeek: {
            type: Number,
            default: 0,
            validator: (val) => val >= 0 && val <= 6,
        },
        // 是否使用滚动模式
        scroll: {
            type: Boolean,
            default: false,
        },
        // 默认选中的日期
        defaultDate: {
            type: [String, Date, Array],
            default: null,
        },
        // 可选择的最小日期 (YYYY-MM-DD)
        minDate: {
            type: [String, Date],
            default: null,
        },
        // 可选择的最大日期 (YYYY-MM-DD)
        maxDate: {
            type: [String, Date],
            default: null,
        },
        // 日期格式化函数 (返回文本内容显示在日期下方)
        textFormatter: {
            type: Function,
            default: null,
        },
        // 自定义类名
        customClass: {
            type: String,
            default: "",
        },
    },

    data() {
        return {
            showCalendar: false,
            currentYear: 0,
            currentMonth: 0,
            selectedDates: [],
            months: [],
            weekdays: ["日", "一", "二", "三", "四", "五", "六"],
        };
    },

    computed: {
        // 格式化当前年月
        formatYearMonth() {
            return `${this.currentYear}年${this.currentMonth + 1}月`;
        },

        // 根据周起始日调整星期排序
        weekdaysWithOffset() {
            const offset = this.firstDayOfWeek;
            return [...this.weekdays.slice(offset), ...this.weekdays.slice(0, offset)];
        },

        // 当前月份的日期数据（含占位符）
        daysWithPlaceholders() {
            const year = this.currentYear;
            const month = this.currentMonth;
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const firstDayOfMonth = new Date(year, month, 1).getDay();

            // 计算第一天的位置(考虑firstDayOfWeek偏移)
            const offset = (firstDayOfMonth - this.firstDayOfWeek + 7) % 7;

            const days = [];

            // 添加前一个月的占位符
            for (let i = 0; i < offset; i++) {
                days.push({ day: "" });
            }

            // 添加当前月的日期
            for (let i = 1; i <= daysInMonth; i++) {
                const date = new Date(year, month, i);
                const dateString = this.formatDate(date);

                const day = {
                    day: i,
                    date: date,
                    dateString: dateString,
                    isCurrentMonth: true,
                    disabled: this.isDateDisabled(date),
                    text: this.textFormatter ? this.textFormatter(date) : null,
                };

                days.push(day);
            }

            // 填充一行的剩余部分
            const remainingDays = (7 - (days.length % 7)) % 7;
            for (let i = 0; i < remainingDays; i++) {
                days.push({ day: "" });
            }

            return days;
        },

        // 是否可以确认选择
        canConfirm() {
            if (this.type === "single") {
                return this.selectedDates.length === 1;
            } else if (this.type === "multiple") {
                return this.selectedDates.length > 0;
            } else if (this.type === "range") {
                return this.selectedDates.length === 2;
            }
            return false;
        },
    },

    watch: {
        show(val) {
            this.showCalendar = val;
            if (val) {
                this.initCalendar();
            }
        },
    },

    created() {
        // 初始化当前日期
        const today = new Date();
        this.currentYear = today.getFullYear();
        this.currentMonth = today.getMonth();

        // 初始化默认选中日期
        this.initSelectedDates();
    },

    methods: {
        // 格式化日期为YYYY-MM-DD
        formatDate(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        },

        // 解析日期字符串为Date对象
        parseDate(dateString) {
            if (!dateString) return null;
            if (dateString instanceof Date) return dateString;

            const [year, month, day] = dateString.split("-");
            return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        },

        // 格式化年月标题
        formatYearMonthTitle(year, month) {
            return `${year}年${month + 1}月`;
        },

        // 初始化日历数据
        initCalendar() {
            if (this.scroll) {
                this.generateMonths();
            }
        },

        // 生成滚动模式下的多个月份数据
        generateMonths() {
            const months = [];
            const startDate = this.minDate ? this.parseDate(this.minDate) : new Date();
            const endDate = this.maxDate
                ? this.parseDate(this.maxDate)
                : new Date(startDate.getFullYear() + 1, startDate.getMonth(), startDate.getDate());

            let currentDate = new Date(startDate);
            while (currentDate <= endDate) {
                const year = currentDate.getFullYear();
                const month = currentDate.getMonth();

                const monthData = {
                    year,
                    month,
                    days: this.generateDaysForMonth(year, month),
                };

                months.push(monthData);

                // 移至下一个月
                currentDate.setMonth(currentDate.getMonth() + 1);
            }

            this.months = months;
        },

        // 生成指定月份的日期数据
        generateDaysForMonth(year, month) {
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const firstDayOfMonth = new Date(year, month, 1).getDay();

            // 计算第一天的位置(考虑firstDayOfWeek偏移)
            const offset = (firstDayOfMonth - this.firstDayOfWeek + 7) % 7;

            const days = [];

            // 添加前一个月的占位符
            for (let i = 0; i < offset; i++) {
                days.push({ day: "" });
            }

            // 添加当前月的日期
            for (let i = 1; i <= daysInMonth; i++) {
                const date = new Date(year, month, i);
                const dateString = this.formatDate(date);

                const day = {
                    day: i,
                    date: date,
                    dateString: dateString,
                    isCurrentMonth: true,
                    disabled: this.isDateDisabled(date),
                    text: this.textFormatter ? this.textFormatter(date) : null,
                };

                days.push(day);
            }

            // 填充一行的剩余部分
            const remainingDays = (7 - (days.length % 7)) % 7;
            for (let i = 0; i < remainingDays; i++) {
                days.push({ day: "" });
            }

            return days;
        },

        // 初始化默认选中日期
        initSelectedDates() {
            if (!this.defaultDate) {
                // 如果没有默认日期，默认选中今天
                if (this.type === "single") {
                    const today = new Date();
                    this.selectedDates = [today];
                } else {
                    this.selectedDates = [];
                }
                return;
            }

            if (this.type === "single") {
                const date = this.parseDate(this.defaultDate);
                if (date && !this.isDateDisabled(date)) {
                    this.selectedDates = [date];
                }
            } else if (this.type === "multiple" || this.type === "range") {
                const dates = Array.isArray(this.defaultDate)
                    ? this.defaultDate
                          .map((d) => this.parseDate(d))
                          .filter((d) => d && !this.isDateDisabled(d))
                    : [];
                this.selectedDates = dates;
            }
        },

        // 判断日期是否在可选范围内
        isDateDisabled(date) {
            if (!date) return true;

            // 检查最小日期限制
            if (this.minDate) {
                const minDate = this.parseDate(this.minDate);
                if (minDate && date < minDate) return true;
            }

            // 检查最大日期限制
            if (this.maxDate) {
                const maxDate = this.parseDate(this.maxDate);
                if (maxDate && date > maxDate) return true;
            }

            return false;
        },

        // 获取日期单元格的类名
        getDayClass(day) {
            if (!day.isCurrentMonth || !day.day) {
                return "fanc-calendar__day--disabled";
            }

            const classes = [];

            if (day.disabled) {
                classes.push("fanc-calendar__day--disabled");
            }

            // 检查是否选中
            const isSelected = this.selectedDates.some(
                (d) =>
                    d &&
                    day.date &&
                    d.getFullYear() === day.date.getFullYear() &&
                    d.getMonth() === day.date.getMonth() &&
                    d.getDate() === day.date.getDate()
            );

            if (isSelected) {
                classes.push("fanc-calendar__day--selected");
            }

            // 处理范围选择
            if (this.type === "range" && this.selectedDates.length === 2) {
                const [startDate, endDate] = this.selectedDates.sort((a, b) => a - b);

                if (day.date > startDate && day.date < endDate) {
                    classes.push("fanc-calendar__day--range");
                }

                if (
                    day.date &&
                    startDate &&
                    day.date.getFullYear() === startDate.getFullYear() &&
                    day.date.getMonth() === startDate.getMonth() &&
                    day.date.getDate() === startDate.getDate()
                ) {
                    classes.push("fanc-calendar__day--start");
                }

                if (
                    day.date &&
                    endDate &&
                    day.date.getFullYear() === endDate.getFullYear() &&
                    day.date.getMonth() === endDate.getMonth() &&
                    day.date.getDate() === endDate.getDate()
                ) {
                    classes.push("fanc-calendar__day--end");
                }
            }

            return classes;
        },

        // 选择日期
        selectDate(day) {
            if (!day.isCurrentMonth || !day.day || day.disabled) {
                return;
            }

            if (this.type === "single") {
                this.selectedDates = [day.date];
            } else if (this.type === "multiple") {
                // 检查是否已经选择
                const index = this.selectedDates.findIndex(
                    (d) =>
                        d.getFullYear() === day.date.getFullYear() &&
                        d.getMonth() === day.date.getMonth() &&
                        d.getDate() === day.date.getDate()
                );

                if (index > -1) {
                    // 如果已选择，则取消选择
                    this.selectedDates.splice(index, 1);
                } else {
                    // 否则添加选择
                    this.selectedDates.push(day.date);
                }
            } else if (this.type === "range") {
                if (this.selectedDates.length === 0 || this.selectedDates.length === 2) {
                    // 如果没有选择或已经选择了2个日期，则重新开始选择
                    this.selectedDates = [day.date];
                } else {
                    // 已经选择了1个日期，现在选择第2个
                    this.selectedDates.push(day.date);
                    // 确保开始日期早于结束日期
                    this.selectedDates.sort((a, b) => a - b);
                }
            }

            // 发送选择变更事件
            this.$emit("change", this.getSelectedValues());

            // 如果是单选模式且不需要确认按钮，直接确认
            if (this.type === "single" && !this.showConfirm) {
                this.confirm();
            }
        },

        // 获取格式化后的选中值
        getSelectedValues() {
            if (this.type === "single") {
                return this.selectedDates.length > 0
                    ? this.formatDate(this.selectedDates[0])
                    : null;
            } else {
                return this.selectedDates.map((date) => this.formatDate(date));
            }
        },

        // 切换到上个月
        prevMonth() {
            if (this.currentMonth === 0) {
                this.currentYear--;
                this.currentMonth = 11;
            } else {
                this.currentMonth--;
            }
        },

        // 切换到下个月
        nextMonth() {
            if (this.currentMonth === 11) {
                this.currentYear++;
                this.currentMonth = 0;
            } else {
                this.currentMonth++;
            }
        },

        // 确认选择
        confirm() {
            if (!this.canConfirm) return;

            this.$emit("confirm", this.getSelectedValues());
            this.close();
        },

        // 关闭日历弹窗
        close() {
            this.showCalendar = false;
            this.$emit("update:show", false);
            this.$emit("close");
        },

        // 点击弹窗外部时关闭
        onClose() {
            this.close();
        },

        // 空函数，防止点击内容区域关闭弹窗
        noop() {},
    },
};
</script>

<style>
.fanc-calendar {
    width: 100%;
}

.fanc-calendar__header {
    padding: 16px;
    text-align: center;
    border-bottom: 1px solid var(--border-color-light);
}

.fanc-calendar__title {
    font-size: 16px;
    font-weight: 500;
    color: var(--text-primary);
}

.fanc-calendar__subtitle {
    font-size: 14px;
    color: var(--text-secondary);
    margin-top: 4px;
}

.fanc-calendar__body {
    padding: 12px;
}

.fanc-calendar__body--scroll {
    max-height: 60vh;
    overflow-y: auto;
}

.fanc-calendar__toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}

.fanc-calendar__toolbar-title {
    font-size: 16px;
    font-weight: 500;
    color: var(--text-primary);
}

.fanc-calendar__toolbar-button {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-secondary);
    border-radius: 4px;
    cursor: pointer;
}

.fanc-calendar__toolbar-button:active {
    background-color: rgba(0, 0, 0, 0.05);
}

.fanc-calendar__weekdays {
    display: flex;
    margin-bottom: 8px;
}

.fanc-calendar__weekday {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: var(--text-secondary);
    padding: 8px 0;
}

.fanc-calendar__days {
    display: flex;
    flex-wrap: wrap;
}

.fanc-calendar__day {
    width: 14.28%;
    text-align: center;
    padding: 8px 0;
    position: relative;
}

.fanc-calendar__day-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    margin: 0 auto;
    border-radius: 50%;
    font-size: 14px;
    color: var(--text-primary);
    cursor: pointer;
    position: relative;
}

.fanc-calendar__day--disabled .fanc-calendar__day-content {
    color: var(--text-disabled);
    cursor: not-allowed;
}

.fanc-calendar__day--selected .fanc-calendar__day-content {
    background-color: var(--primary-color);
    color: #fff;
}

.fanc-calendar__day--range .fanc-calendar__day-content {
    background-color: rgba(0, 123, 255, 0.1);
    border-radius: 0;
}

.fanc-calendar__day--start .fanc-calendar__day-content {
    background-color: var(--primary-color);
    color: #fff;
    border-radius: 50% 0 0 50%;
}

.fanc-calendar__day--end .fanc-calendar__day-content {
    background-color: var(--primary-color);
    color: #fff;
    border-radius: 0 50% 50% 0;
}

.fanc-calendar__day-text {
    font-size: 10px;
    margin-top: 4px;
    color: inherit;
}

.fanc-calendar__months {
    display: flex;
    flex-direction: column;
}

.fanc-calendar__month {
    margin-bottom: 16px;
}

.fanc-calendar__month:last-child {
    margin-bottom: 0;
}

.fanc-calendar__month-title {
    font-size: 16px;
    font-weight: 500;
    color: var(--text-primary);
    text-align: center;
    margin-bottom: 12px;
}

.fanc-calendar__month-days {
    display: flex;
    flex-wrap: wrap;
}

.fanc-calendar__footer {
    padding: 12px 16px;
    border-top: 1px solid var(--border-color-light);
}

/* 当自定义颜色时覆盖默认主题色 */
.fanc-calendar__day--selected .fanc-calendar__day-content,
.fanc-calendar__day--start .fanc-calendar__day-content,
.fanc-calendar__day--end .fanc-calendar__day-content {
    background-color: var(--primary-color);
}

.fanc-calendar__day--range .fanc-calendar__day-content {
    background-color: rgba(0, 123, 255, 0.1);
}
</style>
