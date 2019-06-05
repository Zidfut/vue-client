<template>
    <div class="add-form">
        <input class="wide" type="text" placeholder="enter product name"
            v-model="newProduct.name"
        >
        <input class="wide" type="number" placeholder="price"
            v-model.number="newProduct.price"
        >
        <input class="wide" type="text" placeholder="description"
            v-model="newProduct.description"
        >
        <!-- <input type="datetime-local"
            v-model="newProduct.date"
        > -->
        <v-menu
          ref="menu1"
          v-model="menu1"
          :close-on-content-click="true"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          max-width="290px"
          min-width="290px"
        >
        <template v-slot:activator="{ on }">
            <v-text-field
                v-model="newProduct.date"
                label="Date"
                readonly
                prepend-icon="event"
                v-on="on"
            ></v-text-field>
        </template>
            <v-date-picker
                color="green lighten-1"
                v-model="newProduct.date"
                no-title
            ></v-date-picker>
        </v-menu>

        <v-menu
            ref="menu"
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="time"
            lazy
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
        >
            <template v-slot:activator="{ on }">
                <v-text-field
                    v-model="newProduct.time"
                    label="Time"
                    prepend-icon="access_time"
                    readonly
                    v-on="on"
                ></v-text-field>
            </template>
            <v-time-picker
                format="24hr"
                color="green lighten-1"
                v-if="menu2"
                v-model="newProduct.time"
                @click:minute="$refs.menu.save(time)"
            ></v-time-picker>
        </v-menu>
        <!-- <v-date-picker v-model="picker" :landscape="landscape" :reactive="reactive" color="green lighten-1"></v-date-picker> -->
        <!-- <v-time-picker color="green lighten-1"></v-time-picker> -->
        <button class="add-btn" @click="addNewProduct(newProduct)">Add</button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {Product} from '@/types';


import moment from 'moment';

@Component
export default class AddProduct extends Vue {
    // data

    public landscape = false;
    public reactive = true;
    public menu1 = false;
    public time = null;
    public menu2 = false;

    public newProduct: Product =  {
        name: '',
        price: null,
        description: '',
        date: null,
        time: null,
    };

    // methods
    public addNewProduct(draftProduct: Product) {
        const prodDate = moment(draftProduct.date + 'T' + draftProduct.time).utc();
        console.log(draftProduct.date);
        console.log(draftProduct.time);
        console.log(prodDate);
        draftProduct.date = prodDate;
        this.$store.dispatch('addProduct', draftProduct);
        this.newProduct = {
            name: '',
            price: null,
            description: '',
            date: null,
            time: null,
        };
    }
}
</script>

<style>
    .add-form {
        width: 500px;
        margin: 20px auto;
    }
    .add-form input.wide {
        width: 100%;
        padding: 10px 20px;
        margin: 5px auto;
        border: 1px solid #aeaeae;
    }
    .add-form .add-btn {
        padding: 10px 40px;
        background-color: green;
        color: #ffffff;
        border: none;
        cursor: pointer;
    }
</style>