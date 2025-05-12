import FancButton from "@/components/fanc-button/index.vue";
import FancIcon from "@/components/fanc-icon/index.vue";
import FancCell from "@/components/fanc-cell";
import FancCellGroup from "@/components/fanc-cell-group";

// 组件列表
const components = [FancButton, FancIcon, FancCell, FancCellGroup];

// 组件库版本
const version = "0.1.1";

// 导出单个组件
export { FancButton, FancIcon, FancCell, FancCellGroup };

// 导出版本信息
export { version };

// 批量注册组件
export default {
    version,
    install(Vue) {
        components.forEach((component) => {
            Vue.component(component.name, component);
        });
    },
};
