import Vue from "vue";
import MessageComponent from "@/components/fanc-message/index.vue";

// 创建消息构造器
const MessageConstructor = Vue.extend(MessageComponent);

// 消息实例列表
const instances = [];
// 消息垂直方向上的间距
const MESSAGE_GAP = 16;
// 计数器，用于确保每个实例id不同
let seed = 1;
// 当前消息的zIndex基础值
let zIndex = 2000;

// 创建消息实例
const createMessage = (options) => {
    // 生成ID
    const id = `message_${seed++}`;

    // 如果只是字符串，转换为对象
    if (typeof options === "string") {
        options = {
            message: options,
        };
    }

    // 保存回调函数
    const userOnClose = options.onClose;
    const userOnAction = options.onAction;

    // 创建消息组件的DOM容器
    const container = document.createElement("view");
    document.body.appendChild(container);

    // 计算当前消息应该显示的位置
    const verticalOffset = 20 + instances.length * (64 + MESSAGE_GAP);

    // 实例化组件
    const instance = new MessageConstructor({
        propsData: {
            id,
            zIndex: zIndex++,
            offsetTop: verticalOffset,
            ...options,
        },
    });

    // 设置关闭回调
    instance.onClose = () => {
        closeMessage(id);
        // 在DOM中移除组件
        if (document.body.contains(instance.$el)) {
            document.body.removeChild(instance.$el);
        }
        // 调用用户传入的回调
        if (typeof userOnClose === "function") {
            userOnClose();
        }
    };

    // 设置操作按钮回调
    instance.onAction = () => {
        if (typeof userOnAction === "function") {
            userOnAction(instance);
        }
    };

    // 挂载到DOM
    instance.$mount(container);

    // 显示消息
    instance.isShow = true;

    // 添加到实例列表
    instances.push(instance);

    return instance;
};

// 关闭消息的方法
const closeMessage = (id) => {
    const index = instances.findIndex((instance) => instance.id === id);
    if (index === -1) return;

    // 从实例列表中移除
    instances.splice(index, 1);

    // 更新剩余消息的位置
    for (let i = index; i < instances.length; i++) {
        const instance = instances[i];
        // 更新偏移量
        instance.offsetTop = 20 + i * (64 + MESSAGE_GAP);
    }
};

// 定义具体类型的快捷调用方法
const Message = {
    // 显示消息
    info(options) {
        if (typeof options === "string") {
            options = {
                message: options,
                type: "info",
            };
        } else {
            options.type = "info";
        }
        return createMessage(options);
    },

    // 成功消息
    success(options) {
        if (typeof options === "string") {
            options = {
                message: options,
                type: "success",
            };
        } else {
            options.type = "success";
        }
        return createMessage(options);
    },

    // 警告消息
    warning(options) {
        if (typeof options === "string") {
            options = {
                message: options,
                type: "warning",
            };
        } else {
            options.type = "warning";
        }
        return createMessage(options);
    },

    // 错误消息
    error(options) {
        if (typeof options === "string") {
            options = {
                message: options,
                type: "error",
            };
        } else {
            options.type = "error";
        }
        return createMessage(options);
    },

    // 滚动消息
    scroll(options) {
        if (typeof options === "string") {
            options = {
                message: options,
                type: "info",
                scrollable: true,
            };
        } else {
            options.type = options.type || "info";
            options.scrollable = true;
        }
        return createMessage(options);
    },

    // 带操作按钮的消息
    action(options) {
        if (typeof options === "string" || !options.actionText) {
            return this.info(options);
        }

        options.type = options.type || "info";
        // 默认不自动关闭，除非明确设置了 duration
        if (options.duration === undefined) {
            options.duration = 0;
        }
        // 默认显示关闭按钮
        if (options.closable === undefined) {
            options.closable = true;
        }
        // 设置closeOnAction的默认值
        if (options.closeOnAction === undefined) {
            options.closeOnAction = true;
        }

        return createMessage(options);
    },

    // 富文本消息
    html(options) {
        if (typeof options === "string") {
            options = {
                message: options,
                type: "info",
                useHtml: true,
            };
        } else {
            options.type = options.type || "info";
            options.useHtml = true;
        }
        return createMessage(options);
    },

    // 关闭所有实例
    closeAll() {
        for (let i = instances.length - 1; i >= 0; i--) {
            instances[i].close();
        }
    },
};

export default Message;
