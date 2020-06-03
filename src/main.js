
import usersRef from './firebase'
import store from "./store";
import * as firebase from "firebase";

import Vue from 'vue'
import App from './App.vue'

//import Register from './components/Register.vue'

import router from './routes/index'
import { firestorePlugin } from 'vuefire'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import Vuex from "vuex";
Vue.use(Vuex);

Vue.use(firestorePlugin);


 
firebase.auth().onAuthStateChanged(user => {
  console.log("store is..")
  console.log(store.getters.status)
  store.dispatch("fetchUser", user);
});

new Vue({
  store,
  router,
  el: '#app',
  //template: '<App/>',
  //components: { App },
  render: h => h(App)
})
