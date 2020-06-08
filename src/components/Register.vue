<template>
    <div class="container-fluid">
        <div v-if="error" class="alert alert-danger">{{error}}</div>
        <div class="row" style="padding-top:20px">
        <div class="col-sm-3"></div>
        <div v-if="success" class="alert">{{success}}</div>
        
        <div class="col-sm-6" style="border:1px solid black">
        <h3 style="padding-top:10px">Deferral Impact Manager</h3>

        <form method="POST" action='/login' id='registerForm' @submit.prevent="submit">
            <input class="input" required type="text" name="name" v-model="form.name" placeholder="Name">
            <br>
            <input class="input" required type="email" name="email" v-model="form.email" placeholder="Email">
            <br>
            <input class="input" required type="password" name="password" v-model="form.password" placeholder="Password">
            <br>
            <input type="submit" value="Register" class="iconButton" style="width:auto;padding-left:5px;padding-right:5px;margin-bottom:3em;">    
        </form>
        </div>
        </div>
    </div>
</template>>

<script>
import firebase from "firebase";
import {usersRef} from "../firebase";

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
                
                usersRef.push({name:this.form.name,
                              email:this.form.email,
                              //password:this.form.password,
                              value1:0,
                              mortgage:{
                                  balance:0,
                                  interestRate:0.1,
                                  numDefers:0,
                                  frequency:4,
                                  princ:0
                              },
                              cCard:{
                                balance:0,
                                minPay:1,
                                interestRate:0.1,
                                numDefers:0,
                              },
                              loan:{
                                balance:0,
                                interestRate:1,
                                numDefers:0,
                                frequency:4,
                                princ:0
                              }
                              
                              
                          })

                this.success = "Successfully Registered";
                this.error = null;
                this.$router.push({ path: "/login" });
            });
            
        })
        .catch(err => {

            //this.error = users;
          this.error = err.message;
        });
    }
  }
};
</script>