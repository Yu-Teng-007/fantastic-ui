import Vue from "vue";
import NotifyComponent from "@/components/fanc-notify/index.vue";

// 创建Notify构造器
const NotifyConstructor = Vue.extend(NotifyComponent);

// 当前实例
let currentNotify = null;
// 当前z-index基础值
let zIndex = 3000;
// 计数器
let seed = 1;

// 创建Notify实例
const createNotify = (options) => {
    // 如果当前存在Notify实例，先销毁它
    if (currentNotify) {
        currentNotify.close();
        currentNotify = null;
    }

    // 生成ID
    const id = `notify_${seed++}`;

    // 如果只是字符串，转换为对象
    if (typeof options === "string") {
        options = {
            message: options,
        };
    }

    // 保存回调函数
    const userOnClose = options.onClose;
    const userOnClick = options.onClick;

    // 创建Notify组件的DOM容器
    const container = document.createElement("view");
    document.body.appendChild(container);

    // 实例化组件
    const instance = new NotifyConstructor({
        propsData: {
            id,
            zIndex: zIndex++,
            ...options,
        },
    });

    // 设置点击回调
    instance.onClick = () => {
        instance.handleClick();

        // 调用用户传入的点击回调
        if (typeof userOnClick === "function") {
            userOnClick();
        }
    };

    // 设置关闭回调
    instance.onClose = () => {
        // 在DOM中移除组件
        if (document.body.contains(instance.$el)) {
            document.body.removeChild(instance.$el);
        }

        // 如果当前实例就是被关闭的实例，清空引用
        if (currentNotify === instance) {
            currentNotify = null;
        }

        // 调用用户传入的回调
        if (typeof userOnClose === "function") {
            userOnClose();
        }
    };

    // 挂载到DOM
    instance.$mount(container);

    // 保存为当前实例
    currentNotify = instance;

    return instance;
};

// 定义Notify插件
const Notify = function (options) {
    // 直接调用Notify函数时，使用primary类型
    return Notify.primary(options);
};

// 添加各种方法
Notify.primary = function (options) {
    if (typeof options === "string") {
        options = {
            message: options,
            type: "primary",
        };
    } else {
        options.type = "primary";
    }
    return createNotify(options);
};

// 成功提示
Notify.success = function (options) {
    if (typeof options === "string") {
        options = {
            message: options,
            type: "success",
        };
    } else {
        options.type = "success";
    }
    return createNotify(options);
};

// 错误提示
Notify.error = function (options) {
    if (typeof options === "string") {
        options = {
            message: options,
            type: "error",
        };
    } else {
        options.type = "error";
    }
    return createNotify(options);
};

// 警告提示
Notify.warning = function (options) {
    if (typeof options === "string") {
        options = {
            message: options,
            type: "warning",
        };
    } else {
        options.type = "warning";
    }
    return createNotify(options);
};

// 关闭当前实例
Notify.close = function () {
    if (currentNotify) {
        currentNotify.close();
        currentNotify = null;
    }
};

export default Notify;
