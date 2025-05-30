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
import FancRadio from "@/components/fanc-radio/index.vue";
import FancRadioGroup from "@/components/fanc-radio-group/index.vue";
import FancNumberKeyboard from "@/components/fanc-number-keyboard/index.vue";
import FancCascader from "@/components/fanc-cascader/index.vue";
import FancPicker from "@/components/fanc-picker/index.vue";
import FancStepper from "@/components/fanc-stepper/index.vue";
import FancSignature from "@/components/fanc-signature/index.vue";
import FancSearch from "@/components/fanc-search/index.vue";
import FancField from "@/components/fanc-field/index.vue";
import FancForm from "@/components/fanc-form/index.vue";
import FancDatePicker from "@/components/fanc-date-picker/index.vue";
import FancUploader from "@/components/fanc-uploader/index.vue";
import FancRate from "@/components/fanc-rate/index.vue";
import FancTabs from "@/components/fanc-tabs/index.vue";
import FancTab from "@/components/fanc-tab/index.vue";
import FancTabbar from "@/components/fanc-tabbar/index.vue";
import Message from "@/plugins/message";
import Toast from "@/plugins/toast";
import Dialog from "@/plugins/dialog";
import Validator from "@/plugins/validator";

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
    FancRadio,
    FancRadioGroup,
    FancNumberKeyboard,
    FancCascader,
    FancPicker,
    FancStepper,
    FancSignature,
    FancSearch,
    FancField,
    FancForm,
    FancDatePicker,
    FancUploader,
    FancRate,
    FancTabs,
    FancTab,
    FancTabbar,
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
    FancRadio,
    FancRadioGroup,
    FancNumberKeyboard,
    FancCascader,
    FancPicker,
    FancStepper,
    FancSignature,
    FancSearch,
    FancField,
    FancForm,
    FancDatePicker,
    FancUploader,
    FancRate,
    FancTabs,
    FancTab,
    FancTabbar,
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

        // 注册Validator全局方法
        Vue.prototype.$validator = Validator.validator;
    },
};
