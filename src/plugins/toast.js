import Vue from "vue";
import ToastComponent from "@/components/fanc-toast/index.vue";

// 创建Toast构造器
const ToastConstructor = Vue.extend(ToastComponent);

// 当前实例
let currentToast = null;
// 当前z-index基础值
let zIndex = 2000;
// 计数器
let seed = 1;

// 创建Toast实例
const createToast = (options) => {
    // 如果当前存在Toast实例，先销毁它
    if (currentToast) {
        currentToast.close();
        currentToast = null;
    }

    // 生成ID
    const id = `toast_${seed++}`;

    // 如果只是字符串，转换为对象
    if (typeof options === "string") {
        options = {
            message: options,
        };
    }

    // 保存回调函数
    const userOnClose = options.onClose;

    // 创建Toast组件的DOM容器
    const container = document.createElement("view");
    document.body.appendChild(container);

    // 实例化组件
    const instance = new ToastConstructor({
        propsData: {
            id,
            zIndex: zIndex++,
            ...options,
        },
    });

    // 设置关闭回调
    instance.onClose = () => {
        // 在DOM中移除组件
        if (document.body.contains(instance.$el)) {
            document.body.removeChild(instance.$el);
        }

        // 如果当前实例就是被关闭的实例，清空引用
        if (currentToast === instance) {
            currentToast = null;
        }

        // 调用用户传入的回调
        if (typeof userOnClose === "function") {
            userOnClose();
        }
    };

    // 挂载到DOM
    instance.$mount(container);

    // 保存为当前实例
    currentToast = instance;

    return instance;
};

// 定义Toast插件
const Toast = function (options) {
    // 直接调用Toast函数时，使用text类型
    return Toast.text(options);
};

// 添加各种方法
Toast.text = function (options) {
    if (typeof options === "string") {
        options = {
            message: options,
            type: "text",
        };
    }
    return createToast(options);
};

// 成功提示
Toast.success = function (options) {
    if (typeof options === "string") {
        options = {
            message: options,
            type: "success",
        };
    } else {
        options.type = "success";
    }
    return createToast(options);
};

// 错误提示
Toast.error = function (options) {
    if (typeof options === "string") {
        options = {
            message: options,
            type: "error",
        };
    } else {
        options.type = "error";
    }
    return createToast(options);
};

// 警告提示
Toast.warning = function (options) {
    if (typeof options === "string") {
        options = {
            message: options,
            type: "warning",
        };
    } else {
        options.type = "warning";
    }
    return createToast(options);
};

// 加载提示
Toast.loading = function (options) {
    if (typeof options === "string") {
        options = {
            message: options,
            type: "loading",
            duration: 0, // 加载状态默认不自动关闭
        };
    } else {
        options.type = "loading";
        if (options.duration === undefined) {
            options.duration = 0;
        }
    }
    return createToast(options);
};

// 自定义Toast
Toast.custom = function (options) {
    return createToast(options);
};

// 关闭当前实例
Toast.close = function () {
    if (currentToast) {
        currentToast.close();
        currentToast = null;
    }
};

// 关闭所有实例（为了保持API兼容性，实际上只有一个实例）
Toast.closeAll = function () {
    if (currentToast) {
        currentToast.close();
        currentToast = null;
    }
};

export default Toast;
