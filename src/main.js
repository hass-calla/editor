import './scss/app.scss';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Api from "./api";
import Socket from "./socket";
import Icons from './icons';

import "./mixins/CallaEditorMixin";
import "./autoload";

Vue.config.productionTip = false;

Vue.prototype.$api = new Api;
Vue.prototype.$socket = new Socket;
Vue.prototype.$icons = new Icons;


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),

  async created() {
    await this.$api.check();
    await this.$socket.connect();

    let init = false;

    this.$socket.subscribe((state) => {
      if(! init) {
        init = true;
        this.$store.commit('appReady');
      }

      this.$store.commit('updateEntities', state);
    });

  }

}).$mount('#app')
