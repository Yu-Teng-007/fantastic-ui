import FancButton from "@/components/fanc-button/index.vue";
import FancIcon from "@/components/fanc-icon/index.vue";
import FancCell from "@/components/fanc-cell";
import FancCellGroup from "@/components/fanc-cell-group";
import FancPopup from "@/components/fanc-popup/index.vue";
import FancMessage from "@/components/fanc-message/index.vue";
import FancNoticebar from "@/components/fanc-noticebar/index.vue";
import FancActionSheet from "@/components/fanc-action-sheet/index.vue";
import FancPopover from "@/components/fanc-popover/index.vue";
import Message from "@/plugins/message";

// 组件列表
const components = [
    FancButton,
    FancIcon,
    FancCell,
    FancCellGroup,
    FancPopup,
    FancMessage,
    FancNoticebar,
    FancActionSheet,
    FancPopover,
];

// 组件库版本
const version = "0.1.2";

// 导出单个组件
export {
    FancButton,
    FancIcon,
    FancCell,
    FancCellGroup,
    FancPopup,
    FancMessage,
    FancNoticebar,
    FancActionSheet,
    FancPopover,
};

// 导出版本信息
export { version };

// 批量注册组件
export default {
    version,
    install(Vue) {
        components.forEach((component) => {
            Vue.component(component.name, component);
        });

        // 注册Message全局方法
        Vue.prototype.$message = Message;
    },
};
