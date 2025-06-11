import Vue from "vue";
import FancImagePreview from "@/components/fanc-image-preview/index.vue";

// 创建构造器
const ImagePreviewConstructor = Vue.extend(FancImagePreview);

// 创建实例，并挂载到 body 上
let instance;

// 默认配置
const defaultConfig = {
    images: [],
    show: true,
    startIndex: 0,
    loop: true,
    closeable: true,
    showIndex: true,
    showFooter: false,
    maskClose: true,
    doubleTapZoom: true,
    onClose: null,
    onChange: null,
    onLoad: null,
    onError: null,
    onDownload: null,
    onShare: null,
};

// 预览函数
const ImagePreview = (options = {}) => {
    // 合并配置
    options =
        typeof options === "string" || Array.isArray(options)
            ? { images: Array.isArray(options) ? options : [options] }
            : options;

    options = {
        ...defaultConfig,
        ...options,
    };

    // 确保 images 为数组
    if (!Array.isArray(options.images)) {
        options.images = [options.images];
    }

    // 创建 DOM 元素
    if (!instance) {
        const vm = new ImagePreviewConstructor({
            propsData: {
                ...options,
            },
        });

        // 挂载
        vm.$mount();
        document.body.appendChild(vm.$el);
        instance = vm;
    } else {
        // 更新属性
        Object.keys(options).forEach((key) => {
            instance[key] = options[key];
        });
    }

    // 绑定事件
    instance.$off("close");
    instance.$off("change");
    instance.$off("load");
    instance.$off("error");
    instance.$off("download");
    instance.$off("share");

    // 添加关闭事件监听，当组件触发close事件时自动隐藏预览
    instance.$on("close", () => {
        instance.show = false;
        if (options.onClose) options.onClose();
    });

    if (options.onChange) instance.$on("change", options.onChange);
    if (options.onLoad) instance.$on("load", options.onLoad);
    if (options.onError) instance.$on("error", options.onError);
    if (options.onDownload) instance.$on("download", options.onDownload);
    if (options.onShare) instance.$on("share", options.onShare);

    // 显示预览
    Vue.nextTick(() => {
        instance.show = true;
    });

    return instance;
};

// 关闭预览
ImagePreview.close = () => {
    if (instance) {
        instance.show = false;
    }
};

// 修改默认配置
ImagePreview.setDefaultConfig = (config) => {
    Object.assign(defaultConfig, config);
};

// 重置默认配置
ImagePreview.resetDefaultConfig = () => {
    Object.keys(defaultConfig).forEach((key) => {
        defaultConfig[key] = defaultConfig[key];
    });
};

// 全局注册
ImagePreview.install = function (Vue) {
    Vue.prototype.$imagePreview = ImagePreview;
};

export default ImagePreview;
