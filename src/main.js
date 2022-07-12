import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import VueToastify from "vue-toastify";

Vue.use(VueToastify, {
  position: "top-right",
  theme: "light",
  withBackdrop: true,
});
Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount("#app");
