import Http from "./Http";
import Vue from "vue";
import store from "./store";
import router from "./router";
import Toasted from "vue-toasted";
import VModal from "vue-js-modal";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

Vue.config.productionTip = false;
Vue.use(VModal);
Vue.use(Toasted, {
    position: "bottom-right",
    duration: 5000,
    theme: "bubble"
});
Vue.use(Loading);

require("./components");

window.axios = new Http().create();

let app = new Vue({
    el: "#app",

    router,

    store
});
