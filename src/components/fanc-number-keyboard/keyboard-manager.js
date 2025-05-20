/**
 * 键盘管理器
 * 用于管理所有键盘实例，确保一次只能显示一个键盘
 */
class KeyboardManager {
    constructor() {
        // 当前活跃的键盘实例
        this.activeKeyboard = null;
        // 所有注册的键盘实例
        this.keyboards = new Set();
        // 是否正在处理切换操作，防止循环调用
        this.isTransitioning = false;
        // 待显示的键盘实例 - 用于处理快速切换场景
        this.pendingKeyboard = null;
        // 处理延时，防止频繁操作
        this.timer = null;
        // 调试标志
        this.debug = false;
    }

    /**
     * 注册键盘实例
     * @param {Object} keyboard 键盘实例
     */
    register(keyboard) {
        this.keyboards.add(keyboard);
        this.log("Registered keyboard", keyboard);
    }

    /**
     * 注销键盘实例
     * @param {Object} keyboard 键盘实例
     */
    unregister(keyboard) {
        this.keyboards.delete(keyboard);
        this.log("Unregistered keyboard", keyboard);

        if (this.activeKeyboard === keyboard) {
            this.log("Active keyboard unregistered", keyboard);
            this.activeKeyboard = null;
        }
        if (this.pendingKeyboard === keyboard) {
            this.log("Pending keyboard unregistered", keyboard);
            this.pendingKeyboard = null;
        }

        // 清除可能存在的定时器
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    /**
     * 显示指定键盘
     * @param {Object} keyboard 要显示的键盘实例
     */
    show(keyboard) {
        this.log("Show requested for keyboard", keyboard);

        // 防止显示未注册的键盘
        if (!this.keyboards.has(keyboard)) {
            this.log("Keyboard not registered, ignoring show request", keyboard);
            return;
        }

        // 如果已经是活跃键盘，则不需要切换
        if (this.activeKeyboard === keyboard && keyboard.isVisible === true) {
            this.log("Keyboard already active and visible, ignoring show request", keyboard);
            return;
        }

        // 如果正在切换中，记录待显示的键盘并返回
        if (this.isTransitioning) {
            this.log("Transition in progress, setting as pending keyboard", keyboard);
            this.pendingKeyboard = keyboard;
            return;
        }

        // 清除可能存在的定时器
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }

        try {
            this.isTransitioning = true;
            this.log("Starting transition, isTransitioning=true");

            // 如果有其他键盘处于活跃状态，先隐藏它
            if (this.activeKeyboard && this.activeKeyboard !== keyboard) {
                const previousKeyboard = this.activeKeyboard;
                this.log("Hiding previous active keyboard", previousKeyboard);

                // 先清空activeKeyboard，避免hideKeyboard中重复触发事件
                this.activeKeyboard = null;
                previousKeyboard.hideKeyboard();
            }

            // 设置当前键盘为活跃状态
            this.activeKeyboard = keyboard;
            this.log("Set new active keyboard", keyboard);

            // 确保键盘显示
            if (keyboard.isVisible !== true) {
                this.log("Keyboard not visible, calling showKeyboard()", keyboard);
                keyboard.showKeyboard();
            } else {
                this.log("Keyboard already visible, skipping showKeyboard()", keyboard);
            }
        } catch (error) {
            this.log("Error during keyboard transition", error);
            // 出错时重置状态
            this.pendingKeyboard = null;
            throw error;
        } finally {
            // 使用定时器延迟释放isTransitioning锁，以防止频繁切换导致的问题
            this.timer = setTimeout(() => {
                this.isTransitioning = false;
                this.log("Transition completed, isTransitioning=false");

                // 如果在处理过程中有新的键盘请求，处理它
                if (this.pendingKeyboard && this.pendingKeyboard !== keyboard) {
                    const pending = this.pendingKeyboard;
                    this.pendingKeyboard = null;
                    this.log("Processing pending keyboard", pending);

                    // 异步处理，避免递归调用
                    setTimeout(() => {
                        this.show(pending);
                    }, 50); // 适当延迟，避免过快切换
                }

                this.timer = null;
            }, 50); // 50ms防抖延迟
        }
    }

    /**
     * 隐藏当前活跃的键盘
     */
    hideActive() {
        this.log("hideActive requested");

        if (this.isTransitioning) {
            this.log("Transition in progress, ignoring hideActive request");
            return;
        }

        // 清除可能存在的定时器
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }

        try {
            this.isTransitioning = true;
            this.log("Starting hide transition, isTransitioning=true");

            if (this.activeKeyboard) {
                const keyboard = this.activeKeyboard;
                this.log("Hiding active keyboard", keyboard);

                this.activeKeyboard = null;
                keyboard.hideKeyboard();
            } else {
                this.log("No active keyboard to hide");
            }

            // 清除待处理的键盘
            if (this.pendingKeyboard) {
                this.log("Clearing pending keyboard", this.pendingKeyboard);
                this.pendingKeyboard = null;
            }
        } finally {
            // 使用定时器延迟释放isTransitioning锁
            this.timer = setTimeout(() => {
                this.isTransitioning = false;
                this.log("Hide transition completed, isTransitioning=false");
                this.timer = null;
            }, 50); // 50ms防抖延迟
        }
    }

    /**
     * 隐藏所有键盘
     */
    hideAll() {
        this.log("hideAll requested");

        if (this.isTransitioning) {
            this.log("Transition in progress, ignoring hideAll request");
            return;
        }

        // 清除可能存在的定时器
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }

        try {
            this.isTransitioning = true;
            this.log("Starting hideAll transition, isTransitioning=true");

            this.keyboards.forEach((keyboard) => {
                this.log("Hiding keyboard", keyboard);
                keyboard.hideKeyboard();
            });

            this.activeKeyboard = null;
            this.pendingKeyboard = null;
            this.log("Cleared active and pending keyboards");
        } finally {
            // 使用定时器延迟释放isTransitioning锁
            this.timer = setTimeout(() => {
                this.isTransitioning = false;
                this.log("HideAll transition completed, isTransitioning=false");
                this.timer = null;
            }, 50); // 50ms防抖延迟
        }
    }

    /**
     * 获取当前活跃的键盘
     * @returns {Object|null} 当前活跃的键盘实例或null
     */
    getActiveKeyboard() {
        return this.activeKeyboard;
    }

    /**
     * 检查指定键盘是否是当前活跃的键盘
     * @param {Object} keyboard 键盘实例
     * @returns {Boolean} 是否是当前活跃的键盘
     */
    isActive(keyboard) {
        return this.activeKeyboard === keyboard;
    }

    /**
     * 记录调试信息
     * @param {String} message 消息
     * @param {*} data 相关数据
     */
    log(message, data) {
        if (this.debug) {
            if (data !== undefined) {
                console.log(`[KeyboardManager] ${message}:`, data);
            } else {
                console.log(`[KeyboardManager] ${message}`);
            }
        }
    }

    /**
     * 启用调试模式
     */
    enableDebug() {
        this.debug = true;
        this.log("Debug mode enabled");
    }

    /**
     * 禁用调试模式
     */
    disableDebug() {
        this.log("Debug mode disabled");
        this.debug = false;
    }
}

// 创建单例实例
const keyboardManager = new KeyboardManager();

export default keyboardManager;
