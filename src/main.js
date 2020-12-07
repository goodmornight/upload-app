import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button,
    Tabbar,
    TabbarItem,
    Uploader,
    Field,
    Cell,
    CellGroup,
    Col,
    Row,
    Image as VanImage
  } from 'vant'

Vue.use(Button);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Uploader);
Vue.use(Field);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Col);
Vue.use(Row);
Vue.use(VanImage);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
