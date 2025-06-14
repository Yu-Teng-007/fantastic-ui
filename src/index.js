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
import FancNotify from "@/components/fanc-notify/index.vue";
import FancDialog from "@/components/fanc-dialog/index.vue";
import FancSwipeCell from "@/components/fanc-swipe-cell/index.vue";
import FancDropdownMenu from "@/components/fanc-dropdown-menu/index.vue";
import FancImage from "@/components/fanc-image/index.vue";
import FancImagePreview from "@/components/fanc-image-preview/index.vue";
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
import FancTimePicker from "@/components/fanc-time-picker/index.vue";
import FancUploader from "@/components/fanc-uploader/index.vue";
import FancRate from "@/components/fanc-rate/index.vue";
import FancTabbar from "@/components/fanc-tabbar/index.vue";
import FancSidebar from "@/components/fanc-sidebar/index.vue";
import FancNavbar from "@/components/fanc-navbar/index.vue";
import FancIndexes from "@/components/fanc-indexes/index.vue";
import FancTabs from "@/components/fanc-tabs/index.vue";
import FancSteps from "@/components/fanc-steps/index.vue";
import FancSlider from "@/components/fanc-slider/index.vue";
import FancCollapse from "@/components/fanc-collapse/index.vue";
import FancCollapseItem from "@/components/fanc-collapse-item/index.vue";
import FancCountDown from "@/components/fanc-count-down/index.vue";
import FancCountTo from "@/components/fanc-count-to/index.vue";
import FancFooter from "@/components/fanc-footer/index.vue";
import FancList from "@/components/fanc-list/index.vue";
import FancProgress from "@/components/fanc-progress/index.vue";
import FancCircle from "@/components/fanc-circle/index.vue";
import FancSkeleton from "@/components/fanc-skeleton/index.vue";
import FancTable from "@/components/fanc-table/index.vue";
import FancGuide from "@/components/fanc-guide/index.vue";
import FancHighlight from "@/components/fanc-highlight/index.vue";
import FancTag from "@/components/fanc-tag/index.vue";
import FancTextEllipsis from "@/components/fanc-text-ellipsis/index.vue";
import FancPagination from "@/components/fanc-pagination/index.vue";
import FancGrid from "@/components/fanc-grid/index.vue";
import FancGridItem from "@/components/fanc-grid-item/index.vue";
import FancEmpty from "@/components/fanc-empty/index.vue";
import FancCard from "@/components/fanc-card/index.vue";
import FancBreadcrumb from "@/components/fanc-breadcrumb/index.vue";
import FancBreadcrumbItem from "@/components/fanc-breadcrumb-item/index.vue";
import FancSwipe from "@/components/fanc-swipe/index.vue";
import FancBacktop from "@/components/fanc-backtop/index.vue";
import FancFixedNav from "@/components/fanc-fixed-nav/index.vue";
import FancFilterBar from "@/components/fanc-filter-bar/index.vue";
import FancAudio from "@/components/fanc-audio/index.vue";
import FancVideo from "@/components/fanc-video/index.vue";
import FancSwitch from "@/components/fanc-switch/index.vue";
import FancAlert from "@/components/fanc-alert/index.vue";
import FancDivider from "@/components/fanc-divider/index.vue";
import FancAlbum from "@/components/fanc-album/index.vue";
import Message from "@/plugins/message";
import Toast from "@/plugins/toast";
import Notify from "@/plugins/notify";
import Dialog from "@/plugins/dialog";
import Validator from "@/plugins/validator";
import ImagePreview from "@/plugins/image-preview";

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
    FancNotify,
    FancDialog,
    FancSwipeCell,
    FancDropdownMenu,
    FancImage,
    FancImagePreview,
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
    FancTimePicker,
    FancUploader,
    FancRate,
    FancTabbar,
    FancSidebar,
    FancNavbar,
    FancIndexes,
    FancTabs,
    FancSteps,
    FancSlider,
    FancCollapse,
    FancCollapseItem,
    FancCountDown,
    FancCountTo,
    FancFooter,
    FancList,
    FancProgress,
    FancCircle,
    FancSkeleton,
    FancTable,
    FancGuide,
    FancHighlight,
    FancTag,
    FancTextEllipsis,
    FancPagination,
    FancGrid,
    FancGridItem,
    FancEmpty,
    FancCard,
    FancBreadcrumb,
    FancBreadcrumbItem,
    FancSwipe,
    FancBacktop,
    FancFixedNav,
    FancFilterBar,
    FancAudio,
    FancVideo,
    FancSwitch,
    FancAlert,
    FancDivider,
    FancAlbum,
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
    FancNotify,
    FancDialog,
    FancSwipeCell,
    FancDropdownMenu,
    FancImage,
    FancImagePreview,
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
    FancTimePicker,
    FancUploader,
    FancRate,
    FancTabbar,
    FancSidebar,
    FancNavbar,
    FancIndexes,
    FancTabs,
    FancSteps,
    FancSlider,
    FancCollapse,
    FancCollapseItem,
    FancCountDown,
    FancCountTo,
    FancFooter,
    FancList,
    FancProgress,
    FancCircle,
    FancSkeleton,
    FancTable,
    FancGuide,
    FancHighlight,
    FancTag,
    FancTextEllipsis,
    FancPagination,
    FancGrid,
    FancGridItem,
    FancEmpty,
    FancCard,
    FancBreadcrumb,
    FancBreadcrumbItem,
    FancSwipe,
    FancBacktop,
    FancFixedNav,
    FancFilterBar,
    FancAudio,
    FancVideo,
    FancSwitch,
    FancAlert,
    FancDivider,
    FancAlbum,
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

        // 注册Notify全局方法
        Vue.prototype.$notify = Notify;

        // 注册Dialog全局方法
        Vue.prototype.$dialog = Dialog;

        // 注册Validator全局方法
        Vue.prototype.$validator = Validator.validator;

        // 注册ImagePreview全局方法
        Vue.prototype.$imagePreview = ImagePreview;
    },
};
