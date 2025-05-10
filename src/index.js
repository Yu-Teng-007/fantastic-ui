import FancButton from "@/components/fanc-button/index.vue";

export { FancButton };

export default {
    install(app) {
        app.component(FancButton.name, FancButton);
    },
};
