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
                <view class="fanc-calendar__toolbar" v-if="!scroll || (scroll && showToolbar)">
                    <!-- 滚动模式下只显示年份切换 -->
                    <template v-if="scroll">
                        <view class="fanc-calendar__toolbar-button" @click="prevYear">
                            <fanc-icon name="angle-left" size="16" />
                        </view>
                        <view class="fanc-calendar__toolbar-title">{{ formatYearMonth }}</view>
                        <view class="fanc-calendar__toolbar-button" @click="nextYear">
                            <fanc-icon name="angle-right" size="16" />
                        </view>
                    </template>
                    
                    <!-- 非滚动模式 -->
                    <template v-else>
                        <!-- year-month模式：显示年份和月份切换 -->
                        <template v-if="mode === 'year-month'">
                            <view class="fanc-calendar__toolbar-button" @click="prevYear">
                                <fanc-icon name="angle-double-left" size="16" />
                            </view>
                            <view class="fanc-calendar__toolbar-button" @click="prevMonth">
                                <fanc-icon name="angle-left" size="16" />
                            </view>
                            <view class="fanc-calendar__toolbar-title">{{ formatYearMonth }}</view>
                            <view class="fanc-calendar__toolbar-button" @click="nextMonth">
                                <fanc-icon name="angle-right" size="16" />
                            </view>
                            <view class="fanc-calendar__toolbar-button" @click="nextYear">
                                <fanc-icon name="angle-double-right" size="16" />
                            </view>
                        </template>
                        
                        <!-- month模式：只显示月份切换 -->
                        <template v-else>
                            <view class="fanc-calendar__toolbar-button" @click="prevMonth">
                                <fanc-icon name="angle-left" size="16" />
                            </view>
                            <view class="fanc-calendar__toolbar-title">{{ formatYearMonth }}</view>
                            <view class="fanc-calendar__toolbar-button" @click="nextMonth">
                                <fanc-icon name="angle-right" size="16" />
                            </view>
                        </template>
                    </template>
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
                <scroll-view
                    class="fanc-calendar__months"
                    v-if="scroll"
                    scroll-y
                    :scroll-into-view="scrollIntoId"
                    :scroll-with-animation="localScrollWithAnimation"
                    :scroll-animation-duration="scrollAnimationDuration"
                >
                    <view
                        class="fanc-calendar__month"
                        v-for="(month, monthIndex) in months"
                        :key="monthIndex"
                        :data-month="month.month"
                        :data-year="month.year"
                        :id="'month-' + month.year + '-' + month.month"
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
                </scroll-view>
            </view>
            <view class="fanc-calendar__footer">
                <fanc-button v-if="showConfirm" type="primary" block :disabled="!canConfirm" @click="confirm">{{
                    confirmText || "确认"
                }}</fanc-button>
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
 * @property {String} mode - 工具栏模式，可选值为 year-month/month，year-month支持年月切换，month仅支持月份切换
 * @property {String} title - 日历标题
 * @property {String} subtitle - 日历副标题
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
 * @property {Boolean} showToolbar - 是否在滚动模式下显示年份切换工具栏，默认为 true
 * @property {Boolean} scrollWithAnimation - 是否在滚动时使用动画效果，默认为 true
 * @property {Number} scrollAnimationDuration - 滚动动画持续时间(ms)，默认为 100
 * @property {Array} defaultDate - 默认选中的日期，type 为 single 时为字符串，multiple/range 时为数组
 * @property {String|Array} minDate - 可选择的最小日期
 * @property {String|Array} maxDate - 可选择的最大日期
 * @property {Object} textFormatter - 日期文案格式化函数
 * @property {String} customClass - 自定义类名
 * @event {Function} change - 选择日期时触发
 * @event {Function} confirm - 点击确认按钮时触发
 * @event {Function} close - 关闭弹窗时触发
 * @description 范围选择（type="range"）支持选择同一天作为起止日期
 * @description 滚动模式（scroll=true）下只支持切换年份，不支持切换月份
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
        // 工具栏模式：year-month支持年月切换，month仅支持月份切换
        mode: {
            type: String,
            default: "month",
            validator: (val) => ["year-month", "month"].includes(val),
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
        // 是否在滚动模式下显示工具栏
        showToolbar: {
            type: Boolean,
            default: true,
        },
        // 是否在滚动时使用动画效果
        scrollWithAnimation: {
            type: Boolean,
            default: true,
        },
        // 滚动动画持续时间(ms)
        scrollAnimationDuration: {
            type: Number,
            default: 100,
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
            scrollIntoId: "", // 用于scroll-into-view
            localScrollWithAnimation: true, // 本地动画控制变量
        };
    },

    computed: {
        // 格式化当前年月
        formatYearMonth() {
            // 滚动模式下只显示年份
            if (this.scroll) {
                return `${this.currentYear}年`;
            }
            // 非滚动模式下显示年月
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
        show: {
            immediate: true,
            handler(val) {
                if (this.showCalendar !== val) {
                    this.showCalendar = val;
                    if (val) {
                        this.initCalendar();
                    }
                }
            },
        },
        showCalendar(val) {
            if (this.show !== val) {
                this.$emit("update:show", val);
            }
        },
        type: {
            handler() {
                // 当类型变化时重置选中状态
                this.selectedDates = [];
                if (this.type === "single" || this.type === "multiple") {
                    const today = new Date();
                    this.selectedDates = [today];
                }
                // 重新初始化日历数据
                this.initCalendar();
            },
        },
        scrollWithAnimation: {
            immediate: true,
            handler(val) {
                this.localScrollWithAnimation = val;
            }
        }
    },

    created() {
        // 初始化当前日期
        const today = new Date();
        this.currentYear = today.getFullYear();
        this.currentMonth = today.getMonth();

        // 初始化默认选中日期
        this.initSelectedDates();
        
        // 初始化本地动画控制状态
        this.localScrollWithAnimation = this.scrollWithAnimation;
    },

    methods: {
        // 格式化日期为YYYY-MM-DD
        formatDate(date) {
            if (!date) return '';
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        },

        // 解析日期字符串为Date对象
        parseDate(dateString) {
            if (!dateString) return null;
            if (dateString instanceof Date) return dateString;
            
            const [year, month, day] = dateString.split("-").map(Number);
            return new Date(year, month - 1, day);
        },

        // 格式化年月标题
        formatYearMonthTitle(year, month) {
            return `${year}年${month + 1}月`;
        },

        // 初始化日历数据
        initCalendar() {
            if (this.scroll) {
                // 设置为当前年份并生成月份数据
                const today = new Date();
                this.currentYear = today.getFullYear();
                this.generateMonths();
                
                // 初始化时滚动到当前月份
                setTimeout(() => {
                    this.scrollToMonth(today.getMonth(), false);
                }, 50);
            }
        },

        // 生成滚动模式下的多个月份数据
        generateMonths() {
            const months = [];
            const year = this.currentYear;
            const startMonth = 0;
            const endMonth = 11;
            
            // 获取日期限制
            const minLimit = this.getDateLimit(this.minDate);
            const maxLimit = this.getDateLimit(this.maxDate);
            
            // 检查年份限制
            if (minLimit && year < minLimit.year) {
                this.currentYear = minLimit.year;
                return this.generateMonths();
            }
            
            if (maxLimit && year > maxLimit.year) {
                this.currentYear = maxLimit.year;
                return this.generateMonths();
            }
            
            // 在当前年份范围内生成所有月份
            for (let month = startMonth; month <= endMonth; month++) {
                // 检查月份是否在限制范围内
                if (minLimit && year === minLimit.year && month < minLimit.month) continue;
                if (maxLimit && year === maxLimit.year && month > maxLimit.month) continue;
                
                months.push({
                    year,
                    month,
                    days: this.generateDaysForMonth(year, month),
                });
            }
            
            this.months = months;
        },

        // 获取日期限制
        getDateLimit(date) {
            if (!date) return null;
            const parsedDate = this.parseDate(date);
            if (!parsedDate) return null;
            
            return {
                year: parsedDate.getFullYear(),
                month: parsedDate.getMonth(),
                day: parsedDate.getDate()
            };
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
                // 如果没有默认日期，默认选中今天（针对单选和多选模式）
                if (this.type === "single" || this.type === "multiple") {
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
                } else {
                    this.selectedDates = [];
                }
            } else if (this.type === "multiple" || this.type === "range") {
                // 确保defaultDate是数组
                if (!Array.isArray(this.defaultDate)) {
                    this.selectedDates = [];
                    return;
                }

                const dates = this.defaultDate
                    .map((d) => this.parseDate(d))
                    .filter((d) => d && !this.isDateDisabled(d));

                if (this.type === "range" && dates.length > 2) {
                    // 如果是范围选择，只取前两个日期
                    this.selectedDates = dates.slice(0, 2).sort((a, b) => a - b);
                } else {
                    this.selectedDates = dates;
                }
            }
        },

        // 判断日期是否在可选范围内
        isDateDisabled(date) {
            if (!date) return true;
            
            // 使用日期限制辅助函数
            const minLimit = this.getDateLimit(this.minDate);
            const maxLimit = this.getDateLimit(this.maxDate);
            
            if (minLimit) {
                const minDate = new Date(minLimit.year, minLimit.month, minLimit.day);
                if (date < minDate) return true;
            }
            
            if (maxLimit) {
                const maxDate = new Date(maxLimit.year, maxLimit.month, maxLimit.day);
                if (date > maxDate) return true;
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
            const isSelected = this.selectedDates.some(d => d && day.date && this.isSameDate(d, day.date));
            if (isSelected) {
                classes.push("fanc-calendar__day--selected");
            }

            // 处理范围选择
            if (this.type === "range" && this.selectedDates.length === 2) {
                const [startDate, endDate] = [...this.selectedDates].sort((a, b) => a - b);
                
                if (!day.date) return classes;
                
                // 检查是否是同一天
                const isSameDay = this.isSameDate(startDate, endDate);
                
                // 如果是同一天被选为范围
                if (isSameDay && this.isSameDate(day.date, startDate)) {
                    classes.push("fanc-calendar__day--same-day-range");
                    return classes;
                }

                const currentTime = day.date.getTime();
                const startTime = startDate.getTime();
                const endTime = endDate.getTime();

                // 范围内的日期
                if (currentTime > startTime && currentTime < endTime) {
                    classes.push("fanc-calendar__day--range");
                }

                // 开始日期
                if (this.isSameDate(day.date, startDate)) {
                    classes.push("fanc-calendar__day--start");
                }

                // 结束日期
                if (this.isSameDate(day.date, endDate)) {
                    classes.push("fanc-calendar__day--end");
                }
            }

            return classes;
        },

        // 选择日期 - 精简实现
        selectDate(day) {
            if (!day.isCurrentMonth || !day.day || day.disabled) return;

            const newDate = new Date(day.date);
            
            switch (this.type) {
                case "single":
                    this.selectedDates = [newDate];
                    break;
                
                case "multiple":
                    // 检查是否已选择该日期
                    const index = this.findSelectedDateIndex(newDate);
                    if (index > -1) {
                        this.selectedDates.splice(index, 1); // 取消选择
                    } else {
                        this.selectedDates.push(newDate); // 添加选择
                    }
                    break;
                
                case "range":
                    if (this.selectedDates.length === 0 || this.selectedDates.length === 2) {
                        this.selectedDates = [newDate]; // 重新开始选择
                    } else {
                        // 检查是否与第一个日期相同
                        if (this.isSameDate(this.selectedDates[0], newDate)) {
                            this.selectedDates.push(newDate); // 允许选择同一天
                        } else {
                            this.selectedDates.push(newDate);
                            this.selectedDates.sort((a, b) => a - b); // 排序
                        }
                    }
                    break;
            }

            // 发送选择变更事件
            this.$emit("change", this.getSelectedValues());

            // 单选无需确认时自动确认
            if (this.type === "single" && !this.showConfirm) {
                this.confirm();
            }
        },

        // 查找选中日期的索引
        findSelectedDateIndex(date) {
            return this.selectedDates.findIndex(d => this.isSameDate(d, date));
        },

        // 判断两个日期是否为同一天
        isSameDate(date1, date2) {
            return date1.getFullYear() === date2.getFullYear() &&
                   date1.getMonth() === date2.getMonth() &&
                   date1.getDate() === date2.getDate();
        },

        // 获取格式化后的选中值
        getSelectedValues() {
            if (this.type === "single") {
                return this.selectedDates.length > 0 ? this.formatDate(this.selectedDates[0]) : null;
            }
            return this.selectedDates.map(date => this.formatDate(date));
        },

        // 切换到上一年
        prevYear() {
            this.currentYear--;
            this.generateMonths();
        },

        // 切换到下一年
        nextYear() {
            this.currentYear++;
            this.generateMonths();
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
            this.$emit("close");
        },

        // 点击弹窗外部时关闭
        onClose() {
            this.close();
        },

        // 重置选择状态
        reset() {
            this.selectedDates = this.type === "single" || this.type === "multiple" ? [new Date()] : [];
            this.$emit("change", this.getSelectedValues());
        },

        // 空函数，防止点击内容区域关闭弹窗
        noop() {},

        // 滚动到指定月份
        scrollToMonth(month, useAnimation = true) {
            // 设置滚动目标ID
            this.scrollIntoId = `month-${this.currentYear}-${month}`;
            
            // 如果不使用动画，临时关闭
            if (!useAnimation) {
                const originalAnimation = this.localScrollWithAnimation;
                this.localScrollWithAnimation = false;
                
                // 恢复原来的动画设置
                setTimeout(() => {
                    this.localScrollWithAnimation = originalAnimation;
                }, 50);
            }
        },
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
    border-bottom: 1px solid #ebedf0;
}

.fanc-calendar__title {
    font-size: 16px;
    font-weight: 500;
    color: #323233;
}

.fanc-calendar__subtitle {
    font-size: 14px;
    color: #969799;
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
    color: #323233;
}

.fanc-calendar__toolbar-button {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #969799;
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
    color: #969799;
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
    color: #323233;
    cursor: pointer;
    position: relative;
}

.fanc-calendar__day--disabled .fanc-calendar__day-content {
    color: #c8c9cc;
    cursor: not-allowed;
}

.fanc-calendar__day--selected .fanc-calendar__day-content {
    background-color: #1989fa;
    color: #fff;
}

/* 同一天被选为范围的特殊样式 */
.fanc-calendar__day--same-day-range .fanc-calendar__day-content {
    background-color: #1989fa;
    color: #fff;
    border-radius: 50%;
    position: relative;
    /* 添加阴影增强立体感 */
    box-shadow: 0 2px 8px rgba(25, 137, 250, 0.4);
}

/* 添加一个特殊标记，显示这是范围的起止点 */
.fanc-calendar__day--same-day-range .fanc-calendar__day-content::after {
    content: "";
    position: absolute;
    bottom: 4px;
    left: 50%;
    transform: translateX(-50%);
    width: 16px;
    height: 4px;
    background-color: #fff;
    border-radius: 2px;
    /* 添加小阴影增强视觉效果 */
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* 添加一个额外的标记，增强同一天选择的视觉区分度 */
.fanc-calendar__day--same-day-range .fanc-calendar__day-content::before {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 4px;
    background-color: #fff;
    border-radius: 50%;
}

.fanc-calendar__day--range .fanc-calendar__day-content {
    background-color: rgba(25, 137, 250, 0.1);
    border-radius: 0;
    width: 100%;
}

.fanc-calendar__day--start .fanc-calendar__day-content {
    background-color: #1989fa;
    color: #fff;
    border-top-left-radius: 50%;
    border-bottom-left-radius: 50%;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

.fanc-calendar__day--end .fanc-calendar__day-content {
    background-color: #1989fa;
    color: #fff;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
}

/* 确保单独的start和end日期也能显示为圆形 */
.fanc-calendar__day--start:not(.fanc-calendar__day--range):not(.fanc-calendar__day--end)
    .fanc-calendar__day-content,
.fanc-calendar__day--end:not(.fanc-calendar__day--range):not(.fanc-calendar__day--start)
    .fanc-calendar__day-content {
    border-radius: 50%;
}

.fanc-calendar__day-text {
    font-size: 10px;
    margin-top: 4px;
    color: inherit;
}

.fanc-calendar__months {
    display: flex;
    flex-direction: column;
    height: 60vh; /* 固定高度以启用滚动 */
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
    color: #323233;
    text-align: center;
    margin-bottom: 12px;
}

.fanc-calendar__month-days {
    display: flex;
    flex-wrap: wrap;
}

.fanc-calendar__footer {
    padding: 12px 16px;
    border-top: 1px solid #ebedf0;
}
</style>
