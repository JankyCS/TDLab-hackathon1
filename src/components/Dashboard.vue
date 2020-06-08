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
        <h1  style="padding-top:20px"> Welcome Back {{profile.name}}!</h1>
        <p>Current Total Balance Owing: ${{totalBalance}}</p>
        <p>Planned Total Balance Owing with Deferrals: ${{totalBalDefer}}</p>
        <div class="disclaimer"style="padding:5px 300px 0px 300px;text-align:center">
            *If you defer the selected payments you will owe an additional ${{totalBalDefer-totalBalance}}
            in total interest by the end of your deferral periods. We recommend talking to an advisor
            before going through the application process as this tool is for illustrative use only*
        </div>
        <hr>
        <div class="row">
            <div class="col-sm-4" style=text-align:right>
                <h2 style=bold>Mortgage Calculator</h2>
            </div>
            <div class="col-sm-7">
                <h2>Here's what that means...</h2>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-4" style=text-align:right>
                
            <form method="POST" id='updateForm' @submit.prevent="submit">
                <!-- $
                <input class="input" required type="number" name="value1" v-model="profile.value1" placeholder="0.00"> -->
                
                <!-- <br><br> -->
                Balance Owing $
                <input class="input" min=0 max=9000000 required type="number" name="mortBal" v-model="profile.mortgage.balance" >
                <br><br>
                Current interest rate %
                <input class="input" min=0 step=0.1 max=100 required type="number" name="mortInt" v-model="profile.mortgage.interestRate" >
                <br><br>
                Number of deferrals
                <input class="input" min=0 max=26 required type="number" name="mortDefer" v-model="profile.mortgage.numDefers" >



                <br><br>
                Payment Frequency: Every 
                <input class="input" min=1 max=4 required type="number" name="mortFreq" v-model="profile.mortgage.frequency" > Weeks
                <br><br>
                Principal + interest payment: $ 
                <input class="input" min=1 max=900000 required type="number" name="mortPrinc" v-model="profile.mortgage.princ" >
                <br><br>
                <input type="submit" value="Save" class="iconButton" style="width:auto;padding-left:5px;padding-right:5px;margin-bottom:3em;">    
            </form>
            </div>
            <div class="col-sm-7" style="padding-top:50px">
                <!-- <h2 bold> Here's what that means...</h2> -->
                <p style="text-align:left;padding-left:30px">
                    After <b>{{profile.mortgage.numDefers}} payment deferrals</b> ({{profile.mortgage.numDefers*profile.mortgage.frequency}} weeks)
                    , your new balance will be <b>${{mortCost}}</b>
                    <br><br>
                    <span v-if="mortCanPayNow">
                        With no deferrals, at <b>${{profile.mortgage.princ}}</b> per payment, it will take you <b>{{mortNumPay}} payments</b>, or <b>{{mortNumPay*profile.mortgage.frequency}} weeks</b> to pay off your mortgage
                    </span>
                    <span v-else>
                        With no deferrals, at <b>${{profile.mortgage.princ}}</b> per payment, <b>you will be unable to pay off your mortgage</b>, as the interest will accrue faster than your payments.
                    </span>
                    <br><br>
                    <span v-if="mortCanPayLater">
                        With <b>{{profile.mortgage.numDefers}}</b> deferrals, at <b>${{profile.mortgage.princ}}</b> per payment, it will take you <b>{{mortNumPayDeferred}} payments</b>, or <b>{{mortNumPayDeferred*profile.mortgage.frequency}} weeks</b> to pay off your mortgage
                    </span>
                    <span v-else>
                        With no deferrals, at <b>${{profile.mortgage.princ}}</b> per payment, <b>you will be unable to pay off your mortgage</b>, as the interest will accrue faster than your payments.
                    </span>
                    <div class="disclaimer"><br>
                        The results are intended for illustrative and general purposes only, and do not constitute, nor should they be relied upon as financial or other advice. As this is general advice and not advice personalized for you, please consider your own circumstances and seek advice from the appropriate professional, consultant or subject matter expert that addresses your own needs.
                        For the sake of this demo calculations have been done based on interest compounding once per payment period- in a real world setting calculations would need to be adjusted to each specific loan’s terms

                    </div>
                </p>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-4" style=text-align:right>
        <h2 style=bold>Credit Card Calculator</h2>

            <form method="POST" id='updateForm' @submit.prevent="submit">
                <!-- $
                <input class="input" required type="number" name="value1" v-model="profile.value1" placeholder="0.00"> -->
                
                <!-- <br><br> -->
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
            <div class="col-sm-7" style="padding-top:70px">
                <!-- <h2 bold> Here's what that means...</h2> -->
               
                <p style="text-align:left;padding-left:30px">After <b>{{profile.cCard.numDefers}} payment deferrals</b> ({{profile.cCard.numDefers}} months), your new balance will be <b>${{cCardCost}}</b></p>
                <p style="text-align:left;padding-left:30px">Alternatively, by paying the minimum payment, after <b>{{profile.cCard.numDefers}} months</b>, your new balance will be <b>${{cCardMin}}</b></p>
                <div class="disclaimer"><br>
                        The results are intended for illustrative and general purposes only, and do not constitute, nor should they be relied upon as financial or other advice. As this is general advice and not advice personalized for you, please consider your own circumstances and seek advice from the appropriate professional, consultant or subject matter expert that addresses your own needs.
                        For the sake of this demo calculations have been done based on interest compounding once per payment period- in a real world setting calculations would need to be adjusted to each specific loan’s terms

                    </div>
            </div>
        </div>

        
        <div class="row">
            <div class="col-sm-4" style=text-align:right>
                <h2 style=bold>Loan Calculator</h2>
            <form method="POST" id='updateForm' @submit.prevent="submit">
                <!-- $
                <input class="input" required type="number" name="value1" v-model="profile.value1" placeholder="0.00"> -->
                
                <!-- <br><br> -->
                Balance Owing $
                <input class="input" min=0 max=9000000 required type="number" name="loanBal" v-model="profile.loan.balance" >
                <br><br>
                Current interest rate %
                <input class="input" min=0 step=0.1 max=100 required type="number" name="loanInt" v-model="profile.loan.interestRate" >
                <br><br>
                Number of deferrals
                <input class="input" min=0 max=26 required type="number" name="loanDefer" v-model="profile.loan.numDefers" >



                <br><br>
                Payment Frequency: Every 
                <input class="input" min=1 max=4 required type="number" name="loanFreq" v-model="profile.loan.frequency" > Weeks
                <br><br>
                Principal + interest payment: $ 
                <input class="input" min=1 max=900000 required type="number" name="mortPrinc" v-model="profile.loan.princ" >
                <br><br>
                <input type="submit" value="Save" class="iconButton" style="width:auto;padding-left:5px;padding-right:5px;margin-bottom:3em;">    
            </form>
            </div>
            <div class="col-sm-7" style="padding-top:50px">
                <!-- <h2 bold> Here's what that means...</h2> -->
                <p style="text-align:left;padding-left:30px">
                    After <b>{{profile.loan.numDefers}} payment deferrals</b> ({{profile.loan.numDefers*profile.loan.frequency}} weeks)
                    , your new balance will be <b>${{loanCost}}</b>
                    <br><br>
                    <span v-if="loanCanPayNow">
                        With no deferrals, at <b>${{profile.loan.princ}}</b> per payment, it will take you <b>{{loanNumPay}} payments</b>, or <b>{{loanNumPay*profile.loan.frequency}} weeks</b> to pay off your loan
                    </span>
                    <span v-else>
                        With no deferrals, at <b>${{profile.loan.princ}}</b> per payment, <b>you will be unable to pay off your loan</b>, as the interest will accrue faster than your payments.
                    </span>
                    <br><br>
                    <span v-if="loanCanPayLater">
                        With <b>{{profile.loan.numDefers}}</b> deferrals, at <b>${{profile.loan.princ}}</b> per payment, it will take you <b>{{loanNumPayDeferred}} payments</b>, or <b>{{loanNumPayDeferred*profile.loan.frequency}} weeks</b> to pay off your loan
                    </span>
                    <span v-else>
                        With no deferrals, at <b>${{profile.loan.princ}}</b> per payment, <b>you will be unable to pay off your loan</b>, as the interest will accrue faster than your payments.
                    </span>

                    <div class="disclaimer"><br>
                        The results are intended for illustrative and general purposes only, and do not constitute, nor should they be relied upon as financial or other advice. As this is general advice and not advice personalized for you, please consider your own circumstances and seek advice from the appropriate professional, consultant or subject matter expert that addresses your own needs.
                        For the sake of this demo calculations have been done based on interest compounding once per payment period- in a real world setting calculations would need to be adjusted to each specific loan’s terms

                    </div>
                </p>
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
                                  frequency:this.profile.mortgage.frequency,
                                  princ:this.profile.mortgage.princ});

                var cCardRef=db.ref('users/'+this.profile.key+'/cCard')
                cCardRef.update({balance:this.profile.cCard.balance,
                                  minPay:this.profile.cCard.minPay,
                                  interestRate:this.profile.cCard.interestRate,
                                  numDefers:this.profile.cCard.numDefers});   
                                  
                var loanRef=db.ref('users/'+this.profile.key+'/loan')
                loanRef.update({balance:this.profile.loan.balance,
                                  interestRate:this.profile.loan.interestRate,
                                  numDefers:this.profile.loan.numDefers,
                                  frequency:this.profile.loan.frequency,
                                  princ:this.profile.loan.princ});
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
                        cCard: user.child("cCard").val(),
                        loan: user.child("loan").val()
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
                                    cCard:this.firebase.users[i]['cCard'],
                                    loan:this.firebase.users[i]['loan'],
                                    name:this.firebase.users[i]['name']};
                        }
                    }
                }
                return {key:null,value1:null};
            },
            cCardCost: function() {
                var t = this.profile.cCard.balance;

                for(var i=0;i<this.profile.cCard.numDefers;i++)
                {
                    t=(t*(1+this.profile.cCard.interestRate/100)).toFixed(2)
                }
                return t
                // return this.profile.cCard.numDefers*(this.profile.cCard.balance*this.profile.cCard.interestRate/100+10);
            },
            cCardMin: function() {
                var t = this.profile.cCard.balance;

                for(var i=0;i<this.profile.cCard.numDefers;i++)
                {
                    var r=t-this.profile.cCard.minPay >= 0 ?  t-this.profile.cCard.minPay: 0;
                    t=(r*(1+this.profile.cCard.interestRate/100)).toFixed(2)
                }
                return t
            },

            mortCost: function() {
                 var t = this.profile.mortgage.balance;

                for(var i=0;i<this.profile.mortgage.numDefers;i++)
                {
                    t=(t*(1+this.profile.mortgage.interestRate/100)).toFixed(2)
                }
                return t
            },

            mortCanPayNow: function() {
                if(this.profile.mortgage.princ<=this.profile.mortgage.balance*this.profile.mortgage.interestRate/100)
                {
                    return false;
                }
                return true;
            },
            mortCanPayLater: function() {
                if(this.profile.mortgage.princ<=this.mortCost*this.profile.mortgage.interestRate/100)
                {
                    return false;
                }
                return true;
            },
            mortNumPay: function(){
                var t = this.profile.mortgage.balance;
                var num=0;
                if(!this.mortCanPayNow)
                {
                    return num;
                }
               while(t>0)
                {
                    console.log(t);
                    t=((t-this.profile.mortgage.princ)*(1+this.profile.mortgage.interestRate/100)).toFixed(2);
                    num++;
                }
                return num
            },
            mortNumPayDeferred: function() {
                var t = this.mortCost;
                var num=0;
                if(!this.mortCanPayLater)
                {
                    return num;
                }
               while(t>0)
                {
                    console.log(t);
                    t=((t-this.profile.mortgage.princ)*(1+this.profile.mortgage.interestRate/100)).toFixed(2);
                    num++;
                }
                return num
            },
            //////
            loanCost: function() {
                 var t = this.profile.loan.balance;

                for(var i=0;i<this.profile.loan.numDefers;i++)
                {
                    t=(t*(1+this.profile.loan.interestRate/100)).toFixed(2)
                }
                return t
            },

            loanCanPayNow: function() {
                if(this.profile.loan.princ<=this.profile.loan.balance*this.profile.loan.interestRate/100)
                {
                    return false;
                }
                return true;
            },
            loanCanPayLater: function() {
                if(this.profile.loan.princ<=this.loanCost*this.profile.loan.interestRate/100)
                {
                    return false;
                }
                return true;
            },
            loanNumPay: function(){
                var t = this.profile.loan.balance;
                var num=0;
                if(!this.loanCanPayNow)
                {
                    return num;
                }
               while(t>0)
                {
                    console.log(t);
                    t=((t-this.profile.loan.princ)*(1+this.profile.loan.interestRate/100)).toFixed(2);
                    num++;
                }
                return num
            },
            loanNumPayDeferred: function() {
                var t = this.loanCost;
                var num=0;
                if(!this.loanCanPayLater)
                {
                    return num;
                }
               while(t>0)
                {
                    console.log(t);
                    t=((t-this.profile.loan.princ)*(1+this.profile.loan.interestRate/100)).toFixed(2);
                    num++;
                }
                return num
            },

            totalBalance: function() {
               //  console.log(this.profile.mortgage.balance+this.profile.cCard.balance+this.profile.loan.balance)
                return parseInt(this.profile.mortgage.balance)+parseInt(this.profile.cCard.balance)+parseInt(this.profile.loan.balance)
            
            },
            totalBalDefer: function() {
                return parseInt(this.mortCost)+parseInt(this.cCardCost)+parseInt(this.loanCost)
            }

           


        },
        mounted() {
            this.getFirebaseUsers();
        },
        

        
  }

        

    
    
</script>

<style>
    .info{
        padding-top:60px
    }
</style>