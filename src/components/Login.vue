<template>
    <div class="container-fluid">
        <div v-if="error" class="alert alert-danger">{{error}}</div>
        <div class="row" style="padding-top:20px">
        <div class="col-sm-3"></div>
        <div class="col-sm-6" style="border:1px solid black">
        <h3 style="padding-top:10px">Deferral Impact Manager</h3>
        <form method="POST" id='loginForm' @submit.prevent="submit">
            <input class="input" required type="email" name="email" v-model="form.email" placeholder="Email">
            <br>
            <input class="input" required type="password" name="password" v-model="form.password" placeholder="Password">
            <br>
            <input type="submit" value="Login" class="iconButton" style="width:auto;padding-left:5px;padding-right:5px;margin-bottom:3em;">    
        </form>
        </div>
        </div>
    </div>
</template>

<script>
    import firebase from "firebase";
    import {usersRef} from "../firebase"
    import { mapGetters } from "vuex";

    export default {
        data() {
            return{
                form: {
                    email:"",
                    password:""
                },
                error:null
            }
        },
        methods: {
            submit() {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.form.email, this.form.password)
                .then(data => {
                   this.$store.dispatch("fetchUser",{email:this.form.email});
                    this.$router.replace({ name: "Dashboard" });
                })
                .catch(err => {
                    console.log(this.$store.getters.status);
                   
                this.error = err.message;
                });
            },
            redirect() {
            if(this.status.loggedIn==true)
            {

                this.$router.replace({ name: "Dashboard" });
            }
            

            // else
            // {
            //     this.$router.replace({ name: "/" });
            // }
        }

        },
        computed: {
            ...mapGetters(
                {status:'status'}
            )
        },
        mounted: function() {
            console.log("pog")
            console.log(this.status)
            redirect();
        }

    }
</script>
<style>
    
</style>