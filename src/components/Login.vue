<template>
    <div class="container-fluid">
        <div v-if="error" class="alert alert-danger">{{error}}</div>
        <form method="POST" id='loginForm' @submit.prevent="submit">
            <input class="input" required type="email" name="email" v-model="form.email" placeholder="Email">
            <input class="input" required type="password" name="password" v-model="form.password" placeholder="Password">
            <input type="submit" value="Send" class="iconButton" style="width:auto;padding-left:5px;padding-right:5px;margin-bottom:3em;">    
        </form>
    </div>
</template>

<script>
    import firebase from "firebase";
    import {usersRef} from "../firebase"


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
            }
        }

    }
</script>