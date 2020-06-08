<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view></router-view>
    <!-- <ul>
      pok
        <li v-for="user in users" v-bind:key="user['.key']">{{user}}</li>
        </ul> -->
    <!-- <button type="button" class="btn btn-primary">Primary</button> -->
  </div>
</template>

<script>

// import router from './routes/index'
// import {usersRef} from './firebase'
import VueFire from 'vuefire'
import Navbar from './components/Navbar'
//////////
export default {
  name: 'app',
  // firebase:{
  //   users:usersRef
  // },
  data () {
    return {
    
      msg: 'Welcome to Your Vue.js App'
    };
  },
  components: {
    Navbar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

input{
        margin:7px;
    }
.disclaimer{
  font-style: italic;
  color:#575757;
  font-size: 0.5em;
  padding-top:40px;
  padding-left:30px;
  text-align:left;

}
</style>
