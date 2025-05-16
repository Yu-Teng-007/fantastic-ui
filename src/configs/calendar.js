/**
 * Calendar 日历配置项
 */

// 选择类型
export const CalendarType = {
    SINGLE: "single", // 单选
    MULTIPLE: "multiple", // 多选
    RANGE: "range", // 范围选择
};

// 日历默认配置
export const CalendarDefaults = {
    // 选择类型默认为单选
    type: CalendarType.SINGLE,
    // 弹出位置默认为底部
    position: "bottom",
    // 周起始日默认为周日(0)
    firstDayOfWeek: 0,
    // 默认显示确认按钮
    showConfirm: true,
    // 确认按钮文字
    confirmText: "确认",
    // 默认启用遮罩层
    overlay: true,
    // 默认可点击遮罩层关闭
    overlayClosable: true,
    // 默认显示关闭图标
    closeable: true,
    // 默认不启用滚动模式
    scroll: false,
};

// 日期范围限制（默认最小日期为当前日期前一年，最大日期为当前日期后一年）
export const getDefaultDateRange = () => {
    const today = new Date();

    const minDate = new Date(today);
    minDate.setFullYear(today.getFullYear() - 1);

    const maxDate = new Date(today);
    maxDate.setFullYear(today.getFullYear() + 1);

    return {
        minDate: formatDate(minDate),
        maxDate: formatDate(maxDate),
    };
};

// 格式化日期为YYYY-MM-DD
export const formatDate = (date) => {
    if (!date) return "";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

// 解析日期字符串为Date对象
export const parseDate = (dateString) => {
    if (!dateString) return null;

    // 如果已经是Date对象则直接返回
    if (dateString instanceof Date) return dateString;

    const [year, month, day] = dateString.split("-");
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
};

// 获取两个日期之间的天数
export const getDaysBetween = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // 将时间设置为当天的开始时间以确保计算准确
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    // 计算毫秒差异并转换为天数
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
};

// 获取当前月份的天数
export const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
};

// 获取指定月份第一天是星期几
export const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
};

// 检查日期是否是今天
export const isToday = (date) => {
    const today = new Date();
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
};

// 周默认名称
export const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"];

// 获取调整后的星期名称数组（根据firstDayOfWeek）
export const getWeekdaysWithOffset = (firstDayOfWeek) => {
    if (firstDayOfWeek < 0 || firstDayOfWeek > 6) {
        firstDayOfWeek = 0; // 默认周日开始
    }

    return [...WEEKDAYS.slice(firstDayOfWeek), ...WEEKDAYS.slice(0, firstDayOfWeek)];
};
