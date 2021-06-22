import Vue from 'vue';
import App from './App.vue';
import router from "./router";
import './registerServiceWorker'
import store from './store';
import axios from 'axios'
import dotenv from 'dotenv'

Vue.prototype.$http = axios
Vue.prototype.$env = process.env

dotenv.config();

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
