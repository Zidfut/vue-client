<template>
    <div class="login-form">
        <input type="text" placeholder="name"
            v-model="userLogin.name"
        >
        <input type="text" placeholder="password"
            v-model="userLogin.password"
        >
        <button @click="login(userLogin)">login</button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import {User} from '@/types';

@Component
export default class Login extends Vue {
    // data
    public userLogin: User = {
        name: '',
        password: '',
    };

    // methods
    public login(userLogin: User) {
        this.$store.dispatch('userLogin', userLogin);
        // .then(response => {
        //     this.$router.push('/products')
        // })
        this.userLogin = {
            name: '',
            password: '',
        };
    }
    public created() {
        // this.$store.dispatch('getLogin')
        // .then(response => {
        //     this.$router.push('/products')
        // })
    }
}
</script>

<style scoped>
    .login-form {
        width: 500px;
        margin: 20px auto;
    }
    input {
        width: 100%;
        padding: 10px 20px;
        margin: 5px auto;
        border: 1px solid #aeaeae;
    }
    button {
        padding: 10px 40px;
        background-color: green;
        color: #ffffff;
        border: none;
        cursor: pointer;
    }
</style>