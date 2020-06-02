
import './firebase'

import Vue from 'vue'
import App from './App.vue'
//import Register from './components/Register.vue'
import router from './routes/index'
import { firestorePlugin } from 'vuefire'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


Vue.use(firestorePlugin);
 
new Vue({
  router,
  el: '#app',
  template: '<App/>',
  components: { App }
  //render: h => h(App)
})
