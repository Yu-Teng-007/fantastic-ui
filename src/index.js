import FancButton from "@/components/fanc-button/index.vue";
import FancIcon from "@/components/fanc-icon/index.vue";
import FancCell from "@/components/fanc-cell";
import FancCellGroup from "@/components/fanc-cell-group";

const components = [FancButton, FancIcon, FancCell, FancCellGroup];

export { FancButton, FancIcon, FancCell, FancCellGroup };

export default {
    install(Vue) {
        components.forEach((component) => {
            Vue.component(component.name, component);
        });
    },
};
