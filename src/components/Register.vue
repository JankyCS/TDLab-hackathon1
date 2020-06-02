<template>
    <div class="container-fluid">
        <div v-if="error" class="alert alert-danger">{{error}}</div>
        <div v-if="success" class="alert">{{success}}</div>
        <form method="POST" action='/login' id='registerForm' @submit.prevent="submit">
            <input class="input" required type="text" name="name" v-model="form.name" placeholder="Name">
            <input class="input" required type="email" name="email" v-model="form.email" placeholder="Email">
            <input class="input" required type="password" name="password" v-model="form.password" placeholder="Password">
            <input type="submit" value="Send" class="iconButton" style="width:auto;padding-left:5px;padding-right:5px;margin-bottom:3em;">    
        </form>
    </div>
</template>>

<script>
import firebase from "firebase";
import {users} from "../firebase"

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: ""
      },
      error: null,
      success: null
    };
  },
  methods: {
    submit() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          data.user
            .updateProfile({
              displayName: this.form.name
            })
            .then(() => {
                
                users.push({name:this.form.name,email:this.form.email,password:this.form.password,value1:0})

                this.success = "Successfully Registered";
                this.error = null;
                this.$router.push({ path: "/login" });
            });
            
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  }
};
</script>