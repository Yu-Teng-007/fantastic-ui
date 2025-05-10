import FancButton from "@/components/fanc-button/index.vue";
import FancIcon from "@/components/fanc-icon/index.vue";

export { FancButton, FancIcon };

export default {
    install(app) {
        app.component(FancButton.name, FancButton);
        app.component(FancIcon.name, FancIcon);
    },
};
