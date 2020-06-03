<template>
    <div class="container-fluid">
        <!-- {{status}} -->
        <!-- <div v-if="status&&status.loggedIn">
         <a class="nav-link" @click.prevent="signOut">Sign out</a>
        <p >Logged In</p>
        </div>
        <p v-else>Not Logged In</p> -->
        <!-- {{firebase.users}} -->
        <!-- <p>Balance as of last payment: ${{profile.value1}}</p> -->
        <!-- <ul>
        <li v-for="user in firebase.users"> {{user}} </li>
        </ul> -->
        <h1 style=bold>Mortgage Calculator</h1>
        <div class="row">
            <div class="col-sm-4" style=text-align:right>
            <form method="POST" id='updateForm' @submit.prevent="submit">
                <!-- $
                <input class="input" required type="number" name="value1" v-model="profile.value1" placeholder="0.00"> -->
                
                <br><br>
                Amount Owing $
                <input class="input" min=0 max=9000000 required type="number" name="mortBal" v-model="profile.mortgage.balance" >
                <br><br>
                Current interest rate %
                <input class="input" min=0 step=0.1 max=5 required type="number" name="mortInt" v-model="profile.mortgage.interestRate" >
                <br><br>
                Number of deferrals
                <input class="input" min=0 max=26 required type="number" name="mortDefer" v-model="profile.mortgage.numDefers" >



                <br><br>
                Payment Frequency: Every 
                <input class="input" min=1 max=4 required type="number" name="mortFreq" v-model="profile.mortgage.frequency" > Weeks
                <br><br>
                <input type="submit" value="Save" class="iconButton" style="width:auto;padding-left:5px;padding-right:5px;margin-bottom:3em;">    
            </form>
            </div>
            <div class="col-sm-6">
                <h2 bold> Here's what that means...</h2>
                <p style="text-align:left;padding-left:30px">Filler</p>
            </div>
        </div>

        <h1 style=bold>Credit Card Calculator</h1>
        <div class="row">
            <div class="col-sm-4" style=text-align:right>
            <form method="POST" id='updateForm' @submit.prevent="submit">
                <!-- $
                <input class="input" required type="number" name="value1" v-model="profile.value1" placeholder="0.00"> -->
                
                <br><br>
                Balance Owing $
                <input class="input" min=0 max=9000000 required type="number" name="cCardBal" v-model="profile.cCard.balance" >
                <br><br>
                Current interest rate %
                <input class="input" min=0 step=0.1 max=5 required type="number" name="cCardInt" v-model="profile.cCard.interestRate" >
                <br><br>
                Number of deferrals
                <input class="input" min=0 max=26 required type="number" name="cCardDefer" v-model="profile.cCard.numDefers" >



                <br><br>
                Minimum Payment $
                <input class="input" step=0.01 required type="number" name="cCardMin" v-model="profile.cCard.minPay" >
                <br><br>
                <input type="submit" value="Save" class="iconButton" style="width:auto;padding-left:5px;padding-right:5px;margin-bottom:3em;">    
            </form>
            </div>
            <div class="col-sm-6">
                <h2 bold> Here's what that means...</h2>
                <p style="text-align:left;padding-left:30px">After {{profile.cCard.numDefers}} payment deferrals ({{profile.cCard.numDefers}} months), your new balance will be ${{cCardCost}}</p>
            </div>
        </div>



    </div>
</template>

<script>
    import firebase from "firebase"
    import { db,usersRef } from "../firebase";
    import {firestorePlugin} from 'vuefire';
    import { mapGetters } from "vuex";
    
    export default {
        name: 'app',
        
        
        data() {
            return { 
            value1:1,
           // users:[],
             //users:[{email:'one'},{email:'two'}],
            firebase: {
                users:[]
            },
            // profile: {
            //     value1:-1
            // },

            error: null,
            success: null,  
            };
        },
        
        methods: {
            submit(){
                var newRef=db.ref('users/'+this.profile.key)
                newRef.update({value1:this.profile.value1})
                

                var mortRef=db.ref('users/'+this.profile.key+'/mortgage')
                mortRef.update({balance:this.profile.mortgage.balance,
                                  interestRate:this.profile.mortgage.interestRate,
                                  numDefers:this.profile.mortgage.numDefers,
                                  frequency:this.profile.mortgage.frequency});

                var cCardRef=db.ref('users/'+this.profile.key+'/cCard')
                cCardRef.update({balance:this.profile.cCard.balance,
                                  minPay:this.profile.cCard.minPay,
                                  interestRate:this.profile.cCard.interestRate,
                                  numDefers:this.profile.cCard.numDefers});                  
                this.getFirebaseUsers()
                //console.log(usersRef+"/"+this.profile.key)
            },
            getFirebaseUsers() {
                this.firebase.users = [];
                usersRef.once("value", users => {
                    users.forEach(user => {
                    this.firebase.users.push({
                        name: user.child("name").val(),
                        email: user.child("email").val(),
                        password: user.child("password").val(),
                        value1: user.child("value1").val(),
                        key: user.key,
                        mortgage: user.child("mortgage").val(),
                        cCard: user.child("cCard").val()
                    });
                    });
                });
            },
            // getProfile() {
            //     console.log('got here1')
            //     console.log(this.status.loggedIn)
            //     if(this.status.loggedIn==true)
            //     {
            //         console.log('got here2')
            //         for(var i=0;i<this.firebase.users.length;i++)
            //         {
            //             console.log('got here3')
            //             if(this.$store.getters.status.data.email==this.firebase.users[i]['email'])
            //             {
            //                 console.log('got here4')
            //                 this.profile.value1=this.firebase.users[i]['value1'];
            //             }
            //         }
            //     }
            // },
            
        },

        computed:{
            // status(){
            //     return this.$store.getters.status
            // }
            ...mapGetters(
                {status:'status'}
            ),
            profile: function() {
                console.log(this.$store);
                if(this.$store.getters.status.loggedIn==true)
                {
                    console.log('got here2')
                    for(var i=0;i<this.firebase.users.length;i++)
                    {
                        console.log('got here3')
                        if(this.$store.getters.status.data.email.toLowerCase()==this.firebase.users[i]['email'].toLowerCase())
                        {
                            console.log("Gawk")
                            console.log(this.firebase.users[i])
                            return {key:this.firebase.users[i]['key'],
                                    value1:this.firebase.users[i]['value1'],
                                    mortgage:this.firebase.users[i]['mortgage'],
                                    cCard:this.firebase.users[i]['cCard']};
                        }
                    }
                }
                return {key:null,value1:null};
            },
            cCardCost: function() {
                var t = this.profile.cCard.balance;

                for(var i=0;i<this.profile.cCard.numDefers;i++)
                {
                    t=(t*(1+this.profile.cCard.interestRate/100)+10).toFixed(2)
                }
                return t
                // return this.profile.cCard.numDefers*(this.profile.cCard.balance*this.profile.cCard.interestRate/100+10);
            }
        },
        mounted() {
            this.getFirebaseUsers();
        }

        
  }

        

    
    
</script>