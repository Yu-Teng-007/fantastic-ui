<template>
    <view class="fanc-signature" :class="{ 'is-disabled': disabled }">
        <canvas
            type="2d"
            class="fanc-signature__canvas"
            :style="canvasStyle"
            :canvas-id="canvasId"
            :id="canvasId"
            @touchstart="onTouchStart"
            @touchmove="onTouchMove"
            @touchend="onTouchEnd"
            @touchcancel="onTouchEnd"
            disable-scroll
        ></canvas>
        <view class="fanc-signature__actions" v-if="showActions">
            <view class="fanc-signature__actions-left">
                <fanc-button
                    v-if="showClear"
                    size="small"
                    :disabled="isEmpty || disabled"
                    @click="clear"
                >
                    {{ clearText }}
                </fanc-button>
            </view>
            <view class="fanc-signature__actions-right">
                <fanc-button v-if="showCancel" size="small" plain @click="handleCancel">
                    {{ cancelText }}
                </fanc-button>
                <fanc-button
                    v-if="showConfirm"
                    type="primary"
                    size="small"
                    :disabled="isEmpty || disabled"
                    @click="handleConfirm"
                >
                    {{ confirmText }}
                </fanc-button>
            </view>
        </view>
    </view>
</template>

<script>
/**
 * fanc-signature 签名
 * @description 签名组件，用于手写签名场景
 * @property {String} penColor - 画笔颜色
 * @property {Number} penWidth - 画笔宽度
 * @property {String|Number} width - 画布宽度，默认为100%
 * @property {String|Number} height - 画布高度，默认为200px
 * @property {Boolean} disabled - 是否禁用
 * @property {Boolean} showActions - 是否显示操作按钮
 * @property {Boolean} showClear - 是否显示清除按钮
 * @property {Boolean} showConfirm - 是否显示确认按钮
 * @property {Boolean} showCancel - 是否显示取消按钮
 * @property {String} clearText - 清除按钮文本
 * @property {String} confirmText - 确认按钮文本
 * @property {String} cancelText - 取消按钮文本
 * @property {String} background - 画布背景色
 * @property {Boolean} isTransparent - 导出图片是否透明背景
 * @event {Function} clear - 清除签名时触发
 * @event {Function} confirm - 确认签名时触发，返回签名图片的base64编码
 * @event {Function} cancel - 取消签名时触发
 * @event {Function} start - 开始签名时触发
 * @event {Function} signing - 签名过程中触发
 * @event {Function} end - 结束签名时触发
 */
export default {
    name: "fanc-signature",
    props: {
        // 画笔颜色
        penColor: {
            type: String,
            default: "#000000",
        },
        // 画笔宽度
        penWidth: {
            type: Number,
            default: 3,
        },
        // 画布宽度
        width: {
            type: [String, Number],
            default: "100%",
        },
        // 画布高度
        height: {
            type: [String, Number],
            default: 200,
        },
        // 是否禁用
        disabled: {
            type: Boolean,
            default: false,
        },
        // 是否显示操作按钮
        showActions: {
            type: Boolean,
            default: true,
        },
        // 是否显示清除按钮
        showClear: {
            type: Boolean,
            default: true,
        },
        // 是否显示确认按钮
        showConfirm: {
            type: Boolean,
            default: true,
        },
        // 是否显示取消按钮
        showCancel: {
            type: Boolean,
            default: true,
        },
        // 清除按钮文本
        clearText: {
            type: String,
            default: "清除",
        },
        // 确认按钮文本
        confirmText: {
            type: String,
            default: "确认",
        },
        // 取消按钮文本
        cancelText: {
            type: String,
            default: "取消",
        },
        // 画布背景色
        background: {
            type: String,
            default: "#ffffff",
        },
        // 导出图片是否透明背景
        isTransparent: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            canvasId: `fanc-signature-${Math.random().toString(36).slice(2, 10)}`,
            ctx: null,
            canvas: null,
            isEmpty: true,
            points: [],
            lastPoint: null,
            canvasWidth: undefined,
            canvasHeight: undefined,
            isDrawing: false,
            initialized: false,
        };
    },
    computed: {
        // 计算画布样式
        canvasStyle() {
            const style = {};
            if (typeof this.width === "number") {
                style.width = `${this.width}px`;
            } else {
                style.width = this.width;
            }
            if (typeof this.height === "number") {
                style.height = `${this.height}px`;
            } else {
                style.height = this.height;
            }
            style.backgroundColor = this.background;
            return style;
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.initCanvas();
        });
    },
    methods: {
        // 初始化画布
        initCanvas() {
            // 重置初始化状态
            this.initialized = false;

            // 在uni-app中处理Canvas，首先尝试使用2d类型的Canvas API
            // #ifdef MP-WEIXIN || APP-PLUS || H5
            try {
                const query = uni.createSelectorQuery().in(this);
                query
                    .select(`#${this.canvasId}`)
                    .fields({ node: true, size: true, context: true })
                    .exec((res) => {
                        if (res && res[0] && res[0].node) {
                            // 支持node方式的平台
                            const canvas = res[0].node;

                            try {
                                const ctx = canvas.getContext("2d");
                                if (!ctx) {
                                    this.initCanvasLegacy();
                                    return;
                                }

                                // 设置画布尺寸
                                const dpr = uni.getSystemInfoSync().pixelRatio || 1;
                                const width = res[0].width;
                                const height = res[0].height;

                                // 设置Canvas物理像素尺寸
                                canvas.width = width * dpr;
                                canvas.height = height * dpr;

                                // 根据dpr缩放绘图上下文
                                ctx.scale(dpr, dpr);

                                // 设置画笔样式
                                ctx.lineCap = "round";
                                ctx.lineJoin = "round";
                                ctx.lineWidth = this.penWidth;
                                ctx.strokeStyle = this.penColor;

                                this.ctx = ctx;
                                this.canvas = canvas;
                                this.canvasWidth = width;
                                this.canvasHeight = height;

                                // 绘制背景
                                this.drawBackground();

                                // 标记为已初始化
                                this.initialized = true;
                            } catch (ctxError) {
                                console.error("获取2D上下文失败:", ctxError);
                                this.initCanvasLegacy();
                            }
                        } else {
                            // 回退到传统方式
                            this.initCanvasLegacy();
                        }
                    });
            } catch (error) {
                console.error("初始化现代Canvas错误:", error);
                this.initCanvasLegacy();
            }
            // #else
            // 其他平台直接使用传统方式
            this.initCanvasLegacy();
            // #endif
        },

        // 传统方式初始化canvas（兼容性更好）
        initCanvasLegacy() {
            // 重置初始化状态
            this.initialized = false;

            try {
                // 获取canvas尺寸信息
                const query = uni.createSelectorQuery().in(this);
                query
                    .select(`#${this.canvasId}`)
                    .boundingClientRect((data) => {
                        if (!data) {
                            console.error("无法获取Canvas元素信息");
                            return;
                        }

                        // 获取canvas的宽高
                        const width = data.width;
                        const height = data.height;

                        // 获取canvas上下文 - 传统API
                        try {
                            const ctx = uni.createCanvasContext(this.canvasId, this);

                            if (!ctx) {
                                console.error("无法创建Canvas上下文");
                                return;
                            }

                            // 设置画笔样式
                            ctx.setLineCap("round");
                            ctx.setLineJoin("round");
                            ctx.setLineWidth(this.penWidth);
                            ctx.setStrokeStyle(this.penColor);

                            this.ctx = ctx;
                            this.canvas = null; // 确保canvas属性为null
                            this.canvasWidth = width;
                            this.canvasHeight = height;

                            // 绘制背景（传统方式）
                            this.drawBackgroundLegacy();

                            // 标记为已初始化
                            this.initialized = true;
                        } catch (error) {
                            console.error("创建传统Canvas上下文失败:", error);
                            // 尝试再次等待后初始化
                            setTimeout(() => {
                                this.retryLegacyInit();
                            }, 300);
                        }
                    })
                    .exec();
            } catch (error) {
                console.error("获取Canvas元素信息失败:", error);
            }
        },

        // 重试传统初始化
        retryLegacyInit() {
            try {
                const ctx = uni.createCanvasContext(this.canvasId, this);

                if (!ctx) {
                    console.error("重试创建Canvas上下文失败");
                    return;
                }

                // 设置画笔样式
                ctx.setLineCap("round");
                ctx.setLineJoin("round");
                ctx.setLineWidth(this.penWidth);
                ctx.setStrokeStyle(this.penColor);

                this.ctx = ctx;
                this.canvas = null;
                this.canvasWidth = 300; // 使用默认值
                this.canvasHeight = 200;

                // 绘制背景
                this.drawBackgroundLegacy();

                // 标记为已初始化
                this.initialized = true;
            } catch (error) {
                console.error("重试创建传统Canvas上下文失败:", error);
            }
        },

        // 绘制背景
        drawBackground() {
            if (!this.ctx) {
                console.error("绘制背景失败：上下文不存在");
                return;
            }

            try {
                // 现代模式
                if (this.canvas) {
                    const { width, height } = this.canvas;
                    const dpr = uni.getSystemInfoSync().pixelRatio || 1;

                    this.ctx.fillStyle = this.background;
                    this.ctx.fillRect(
                        0,
                        0,
                        this.canvasWidth || width / dpr,
                        this.canvasHeight || height / dpr
                    );
                } else {
                    console.error("绘制背景失败：canvas对象不存在");
                }
            } catch (error) {
                console.error("绘制背景出错:", error);
            }
        },

        // 传统方式绘制背景
        drawBackgroundLegacy() {
            if (!this.ctx) {
                console.error("绘制背景失败：上下文不存在");
                return;
            }

            try {
                this.ctx.setFillStyle(this.background);
                this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
                this.ctx.draw(true);
            } catch (error) {
                console.error("传统方式绘制背景出错:", error);
            }
        },

        // 判断是否使用传统Canvas API
        isLegacyMode() {
            return !this.canvas && this.canvasWidth !== undefined;
        },

        // 获取触摸坐标
        getTouchPosition(e) {
            let touchX, touchY;

            if (e.touches && e.touches[0]) {
                // 标准触摸事件
                touchX = e.touches[0].x || e.touches[0].clientX;
                touchY = e.touches[0].y || e.touches[0].clientY;
            } else if (e.changedTouches && e.changedTouches[0]) {
                // 某些平台使用changedTouches
                touchX = e.changedTouches[0].x || e.changedTouches[0].clientX;
                touchY = e.changedTouches[0].y || e.changedTouches[0].clientY;
            } else if (e.detail) {
                // 某些平台可能使用detail
                touchX = e.detail.x || e.detail.clientX;
                touchY = e.detail.y || e.detail.clientY;
            }

            return { x: touchX, y: touchY };
        },

        // 获取相对于画布的坐标
        getCanvasPosition(e, callback) {
            const query = uni.createSelectorQuery().in(this);
            query
                .select(`#${this.canvasId}`)
                .boundingClientRect((data) => {
                    if (!data) return callback(null, null);

                    // 计算相对于画布的坐标
                    const canvasRect = data;
                    let touchX, touchY;

                    if (e.touches && e.touches[0]) {
                        touchX = e.touches[0].clientX - canvasRect.left;
                        touchY = e.touches[0].clientY - canvasRect.top;
                    } else if (e.changedTouches && e.changedTouches[0]) {
                        touchX = e.changedTouches[0].clientX - canvasRect.left;
                        touchY = e.changedTouches[0].clientY - canvasRect.top;
                    }

                    callback(touchX, touchY);
                })
                .exec();
        },

        // 触摸开始事件
        onTouchStart(e) {
            if (this.disabled) return;

            // 获取触摸坐标
            const { x, y } = this.getTouchPosition(e);

            if (x && y) {
                this.startDrawing(x, y, e);
            } else if (this.isLegacyMode()) {
                // 获取相对于画布的坐标
                this.getCanvasPosition(e, (touchX, touchY) => {
                    if (touchX && touchY) {
                        this.startDrawing(touchX, touchY, e);
                    }
                });
            }
        },

        // 开始绘制
        startDrawing(x, y, e) {
            if (!this.ctx || !this.initialized) {
                console.error("开始绘制失败：上下文不存在或未初始化");
                return;
            }

            try {
                const point = { x, y };
                this.lastPoint = point;
                this.points.push(point);

                if (this.isLegacyMode()) {
                    // 传统模式
                    this.ctx.beginPath();
                    this.ctx.moveTo(point.x, point.y);

                    // 在传统模式下，立即画一个小点以确保开始点可见
                    this.ctx.arc(point.x, point.y, this.penWidth / 2, 0, 2 * Math.PI, false);
                    this.ctx.fill();
                    this.ctx.draw(true);
                } else {
                    // 新版模式
                    this.ctx.beginPath();
                    this.ctx.moveTo(point.x, point.y);

                    // 在起始点画一个小圆点，确保点击也能留下痕迹
                    this.ctx.arc(point.x, point.y, this.penWidth / 2, 0, 2 * Math.PI, false);
                    this.ctx.fill();
                }

                // 标记已开始绘制
                this.isDrawing = true;
                this.isEmpty = false; // 一旦开始绘制，就不再为空
                this.$emit("start", e);
            } catch (error) {
                console.error("开始绘制出错:", error);
            }
        },

        // 触摸移动事件
        onTouchMove(e) {
            if (this.disabled || !this.lastPoint || !this.isDrawing) return;

            // 获取触摸坐标
            const { x, y } = this.getTouchPosition(e);

            if (x && y) {
                this.continueDrawing(x, y, e);
            } else if (this.isLegacyMode()) {
                // 获取相对于画布的坐标
                this.getCanvasPosition(e, (touchX, touchY) => {
                    if (touchX && touchY) {
                        this.continueDrawing(touchX, touchY, e);
                    }
                });
            }
        },

        // 继续绘制
        continueDrawing(x, y, e) {
            if (!this.ctx || !this.initialized) {
                console.error("绘制失败：上下文不存在或未初始化");
                return;
            }

            const point = { x, y };
            this.points.push(point);

            // 贝塞尔曲线平滑处理
            const lastPoint = this.lastPoint;
            const controlPoint = lastPoint;
            const endPoint = {
                x: (point.x + lastPoint.x) / 2,
                y: (point.y + lastPoint.y) / 2,
            };

            try {
                if (this.isLegacyMode()) {
                    // 传统模式
                    this.ctx.beginPath(); // 确保路径是新的
                    this.ctx.moveTo(lastPoint.x, lastPoint.y);
                    this.ctx.lineTo(point.x, point.y); // 简化为直线，避免贝塞尔曲线的兼容性问题
                    this.ctx.stroke();
                    this.ctx.draw(true); // 增量绘制，保留上一次的内容
                } else {
                    // 新版模式
                    this.ctx.quadraticCurveTo(
                        controlPoint.x,
                        controlPoint.y,
                        endPoint.x,
                        endPoint.y
                    );
                    this.ctx.stroke();
                }

                this.lastPoint = point;
                this.isEmpty = false;

                this.$emit("signing", e);
            } catch (error) {
                console.error("绘制过程出错:", error);
            }
        },

        // 触摸结束事件
        onTouchEnd(e) {
            if (this.disabled || !this.isDrawing) return;

            if (this.isLegacyMode()) {
                // 传统模式
                this.ctx.closePath();
                this.ctx.draw(true);
            } else {
                // 新版模式
                this.ctx.closePath();
            }

            this.lastPoint = null;
            this.isDrawing = false;

            this.$emit("end", e);
        },

        // 清除签名
        clear() {
            if (!this.ctx) {
                console.error("画布上下文不存在");
                return;
            }

            if (this.isLegacyMode()) {
                // 传统模式
                try {
                    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
                    this.drawBackgroundLegacy();
                } catch (error) {
                    console.error("清除签名出错:", error);
                    // 尝试重新初始化画布
                    this.initCanvasLegacy();
                }
            } else {
                // 新版模式
                try {
                    const { width, height } = this.canvas;
                    const dpr = uni.getSystemInfoSync().pixelRatio;
                    this.ctx.clearRect(0, 0, width / dpr, height / dpr);
                    this.drawBackground();
                } catch (error) {
                    console.error("清除签名出错:", error);
                    // 尝试重新初始化画布
                    this.initCanvas();
                }
            }

            this.isEmpty = true;
            this.points = [];
            this.isDrawing = false;
            this.lastPoint = null;

            this.$emit("clear");
        },

        // 确认签名
        handleConfirm() {
            if (this.isEmpty) return;

            if (this.isLegacyMode()) {
                // 传统模式导出图片
                this.handleConfirmLegacy();
            } else {
                // 新版模式导出图片
                this.handleConfirmModern();
            }
        },

        // 传统模式下确认签名
        handleConfirmLegacy() {
            if (this.isEmpty) {
                uni.showToast({
                    title: "请先签名",
                    icon: "none",
                });
                return;
            }

            // 使用uni.canvasToTempFilePath导出图片
            uni.canvasToTempFilePath(
                {
                    canvasId: this.canvasId,
                    fileType: "png",
                    quality: 1,
                    success: (res) => {
                        // 处理不同平台下的图片导出
                        // #ifdef APP-PLUS || MP-WEIXIN
                        try {
                            // 在APP和微信小程序中使用文件系统管理器
                            const fs = uni.getFileSystemManager();
                            fs.readFile({
                                filePath: res.tempFilePath,
                                encoding: "base64",
                                success: (res) => {
                                    const base64 = "data:image/png;base64," + res.data;
                                    this.$emit("confirm", base64);
                                },
                                fail: (err) => {
                                    console.error("读取签名图片失败", err);
                                    // 直接使用临时路径
                                    this.$emit("confirm", res.tempFilePath);
                                },
                            });
                        } catch (error) {
                            console.error("处理图片失败", error);
                            // 降级方案，直接返回临时文件路径
                            this.$emit("confirm", res.tempFilePath);
                        }
                        // #endif

                        // #ifdef H5
                        // H5平台可以直接使用tempFilePath作为图片地址或转为base64
                        try {
                            // 尝试直接使用临时路径
                            this.$emit("confirm", res.tempFilePath);
                        } catch (error) {
                            console.error("H5处理图片失败", error);
                        }
                        // #endif

                        // #ifdef MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-KUAISHOU || MP-JD || MP-360
                        // 其他小程序平台可能的处理方式
                        this.$emit("confirm", res.tempFilePath);
                        // #endif
                    },
                    fail: (err) => {
                        console.error("导出签名图片失败", err);
                        uni.showToast({
                            title: "导出签名失败",
                            icon: "none",
                        });
                    },
                },
                this
            );
        },

        // 现代模式下确认签名
        handleConfirmModern() {
            if (this.isEmpty) {
                uni.showToast({
                    title: "请先签名",
                    icon: "none",
                });
                return;
            }

            try {
                // 导出签名图片
                const { width, height } = this.canvas;
                const dpr = uni.getSystemInfoSync().pixelRatio;

                // 如果需要透明背景，先保存当前画布内容，然后创建透明画布
                if (this.isTransparent) {
                    try {
                        const tempCanvas = document.createElement("canvas");
                        tempCanvas.width = width;
                        tempCanvas.height = height;

                        const tempCtx = tempCanvas.getContext("2d");
                        tempCtx.drawImage(this.canvas, 0, 0);

                        // 清除画布并设置为透明
                        this.ctx.clearRect(0, 0, width / dpr, height / dpr);

                        // 重新绘制路径
                        this.ctx.beginPath();
                        for (let i = 0; i < this.points.length; i++) {
                            const point = this.points[i];
                            if (i === 0) {
                                this.ctx.moveTo(point.x, point.y);
                            } else {
                                const prevPoint = this.points[i - 1];
                                const controlPoint = prevPoint;
                                const endPoint = {
                                    x: (point.x + prevPoint.x) / 2,
                                    y: (point.y + prevPoint.y) / 2,
                                };
                                this.ctx.quadraticCurveTo(
                                    controlPoint.x,
                                    controlPoint.y,
                                    endPoint.x,
                                    endPoint.y
                                );
                            }
                        }
                        this.ctx.stroke();

                        // 导出base64图片
                        const base64 = this.canvas.toDataURL("image/png");

                        // 恢复原来的画布
                        this.drawBackground();
                        this.ctx.drawImage(tempCanvas, 0, 0);

                        this.$emit("confirm", base64);
                    } catch (error) {
                        console.error("导出透明背景图片失败:", error);
                        // 降级处理，导出带背景的图片
                        this.exportWithBackground();
                    }
                } else {
                    // 直接导出带背景的图片
                    this.exportWithBackground();
                }
            } catch (error) {
                console.error("确认签名过程出错:", error);
                uni.showToast({
                    title: "导出签名失败",
                    icon: "none",
                });
            }
        },

        // 导出带背景的图片
        exportWithBackground() {
            try {
                const base64 = this.canvas.toDataURL("image/png");
                this.$emit("confirm", base64);
            } catch (error) {
                console.error("导出图片失败:", error);
                uni.showToast({
                    title: "导出签名失败",
                    icon: "none",
                });

                // 尝试使用传统方式导出
                try {
                    this.handleConfirmLegacy();
                } catch (fallbackError) {
                    console.error("降级导出也失败:", fallbackError);
                }
            }
        },

        // 取消签名
        handleCancel() {
            this.$emit("cancel");
        },
    },
};
</script>

<style lang="scss" scoped>
.fanc-signature {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;

    &__canvas {
        width: 100% !important;
        height: 200px !important;
        background-color: var(--signature-bg-color);
        border-radius: var(--signature-border-radius);
        border: var(--signature-border-width) solid var(--signature-border-color);
        box-sizing: border-box;
        /* 确保canvas在所有平台上可见 */
        display: block;
        /* 解决部分平台的触摸问题 */
        touch-action: none;
        z-index: 1;
    }

    &__actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: var(--signature-actions-margin-top);

        &-left {
            display: flex;
            gap: 8px;
        }

        &-right {
            display: flex;
            gap: 8px;
        }
    }

    &.is-disabled {
        opacity: var(--signature-disabled-opacity);

        .fanc-signature__canvas {
            cursor: not-allowed;
        }
    }
}

/* 确保画布在 iOS 和 Android 上能接收触摸事件 */
/* #ifdef APP-PLUS || MP-WEIXIN */
.fanc-signature__canvas {
    width: 100% !important;
    height: 200px !important;
}
/* #endif */
</style>
