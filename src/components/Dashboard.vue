<template>
    <div class="container-fluid">
        <form method="POST" id='registerForm' @submit.prevent="submit">
            <input class="input" required type="number" name="value1" v-model="form.name" placeholder="Name">
            <input class="input" required type="email" name="email" v-model="form.email" placeholder="Email">
            <input class="input" required type="password" name="password" v-model="form.password" placeholder="Password">
            <input type="submit" value="Send" class="iconButton" style="width:auto;padding-left:5px;padding-right:5px;margin-bottom:3em;">    
        </form>
    </div>
</template>