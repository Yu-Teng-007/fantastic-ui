import Vue from "vue";
import App from "./App";
import "./uni.promisify.adaptor";
import installUI from "./index";

// 引入Font Awesome图标库
import '@fortawesome/fontawesome-free/css/all.min.css'

Vue.use(installUI);
Vue.config.productionTip = false;

App.mpType = "app";

const app = new Vue({
    ...App,
});

app.$mount();
