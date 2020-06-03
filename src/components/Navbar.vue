<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#"></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <i class='fas fa-bars' style="color:white"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
       
        <ul class="navbar-nav">
            <li class="nav-item" v-if="!status.loggedIn">
            <a  class="nav-link" href="/login">Login</a>
            </li>
            <li class="nav-item" v-if="!status.loggedIn">
            <a class="nav-link" href="/Register">Register</a>
            </li>
            <li class="nav-item" v-if="status.loggedIn">
            <a  class="nav-link" href="/dashboard">Dashboard</a>
            </li>
            <!-- <li class="nav-item" v-if="status.loggedIn">
            <a class="nav-link" href="#contact">Logged In</a>
            </li> -->
            <li class="nav-item" v-if="status.loggedIn">
             <a class="nav-link" href="/login" @click.prevent="signOut">Sign out</a>
            </li>
           

        </ul>
        </div>
    </nav>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase"
export default {
     computed:{
            // status(){
            //     return this.$store.getters.status
            // }
            ...mapGetters(
                {status:'status'}
            )
        },
    methods:{
        signOut() {
            firebase
                .auth()
                .signOut()
                .then(() => {
                this.$router.replace({
                    name: "/login"
                });
                });
    }
    }
}
</script>