/**
 * 解析时间数据
 * @param {number} time - 剩余时间，单位毫秒
 * @returns {Object} 解析后的时间数据
 */
export function parseTimeData(time) {
    const SECOND = 1000;
    const MINUTE = 60 * SECOND;
    const HOUR = 60 * MINUTE;
    const DAY = 24 * HOUR;

    const days = Math.floor(time / DAY);
    const hours = Math.floor((time % DAY) / HOUR);
    const minutes = Math.floor((time % HOUR) / MINUTE);
    const seconds = Math.floor((time % MINUTE) / SECOND);
    const milliseconds = Math.floor(time % SECOND);

    return {
        days,
        hours,
        minutes,
        seconds,
        milliseconds,
    };
}

/**
 * 格式化时间
 * @param {Object} timeData - 时间数据
 * @param {string} format - 格式化模板
 * @returns {string} 格式化后的时间字符串
 */
export function formatTime(timeData, format) {
    const { days, hours, minutes, seconds, milliseconds } = timeData;

    if (!format) {
        return "";
    }

    return format
        .replace(/DD/g, padZero(days))
        .replace(/HH/g, padZero(hours))
        .replace(/mm/g, padZero(minutes))
        .replace(/ss/g, padZero(seconds))
        .replace(/SSS/g, padZero(milliseconds, 3));
}

/**
 * 数字补零
 * @param {number} num - 需要补零的数字
 * @param {number} targetLength - 目标长度
 * @returns {string} 补零后的字符串
 */
function padZero(num, targetLength = 2) {
    let str = String(num);
    while (str.length < targetLength) {
        str = "0" + str;
    }
    return str;
}

export default {
    parseTimeData,
    formatTime,
};
