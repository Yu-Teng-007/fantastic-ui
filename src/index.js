import FancButton from "@/components/fanc-button/index.vue";
import FancIcon from "@/components/fanc-icon/index.vue";
import FancCell from "@/components/fanc-cell";
import FancCellGroup from "@/components/fanc-cell-group";
import FancPopup from "@/components/fanc-popup/index.vue";
import FancMessage from "@/components/fanc-message/index.vue";
import FancNoticebar from "@/components/fanc-noticebar/index.vue";
import FancActionSheet from "@/components/fanc-action-sheet/index.vue";
import FancPopover from "@/components/fanc-popover/index.vue";
import FancToast from "@/components/fanc-toast/index.vue";
import FancDialog from "@/components/fanc-dialog/index.vue";
import FancSwipeCell from "@/components/fanc-swipe-cell/index.vue";
import FancDropdownMenu from "@/components/fanc-dropdown-menu/index.vue";
import FancImage from "@/components/fanc-image/index.vue";
import FancCalendar from "@/components/fanc-calendar/index.vue";
import FancCheckbox from "@/components/fanc-checkbox/index.vue";
import FancCheckboxGroup from "@/components/fanc-checkbox-group/index.vue";
import FancNumberKeyboard from "@/components/fanc-number-keyboard/index.vue";
import FancCascader from "@/components/fanc-cascader/index.vue";
import FancPicker from "@/components/fanc-picker/index.vue";
import FancStepper from "@/components/fanc-stepper/index.vue";
import FancSignature from "@/components/fanc-signature/index.vue";
import FancSearch from "@/components/fanc-search/index.vue";
import Message from "@/plugins/message";
import Toast from "@/plugins/toast";
import Dialog from "@/plugins/dialog";

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
    FancToast,
    FancDialog,
    FancSwipeCell,
    FancDropdownMenu,
    FancImage,
    FancCalendar,
    FancCheckbox,
    FancCheckboxGroup,
    FancNumberKeyboard,
    FancCascader,
    FancPicker,
    FancStepper,
    FancSignature,
    FancSearch,
];

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
    FancToast,
    FancDialog,
    FancSwipeCell,
    FancDropdownMenu,
    FancImage,
    FancCalendar,
    FancCheckbox,
    FancCheckboxGroup,
    FancNumberKeyboard,
    FancCascader,
    FancPicker,
    FancStepper,
    FancSignature,
    FancSearch,
};

// 批量注册组件
export default {
    install(Vue) {
        components.forEach((component) => {
            Vue.component(component.name, component);
        });

        // 注册Message全局方法
        Vue.prototype.$message = Message;

        // 注册Toast全局方法
        Vue.prototype.$toast = Toast;

        // 注册Dialog全局方法
        Vue.prototype.$dialog = Dialog;
    },
};
