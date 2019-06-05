<template>
    <div>
        <div class="product-item">
            <slot></slot>
            <slot name="edit" :showEdit="showEdit"></slot>
            <p class="name">{{product.name}}</p>
            <p>#{{index}}</p>
            <p class="price"><b>price:</b> {{product.price}} $</p>
            <p class="descr"><b>description:</b> {{product.description}}</p>
            <p class="descr"><b>date:</b> {{product.date | myDate }}</p>     
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import ProductList from '@/components/ProductList.vue';

const moment = require('moment');

import {Product} from '@/types';

@Component({
    filters: {
        myDate(value: string) {
            if (!value) { return ''; }
            return moment(value).local().format('ddd, DD MMMM YYYY HH:mm');
        },
    },
})

export default class ProductItem extends Vue {

    @Prop() private product!: Product;
    @Prop() private index!: number;
    @Prop() private showEdit!: boolean;

}
</script>

<style>
    .product-item {
        width: 500px;
        margin: 20px auto;
        padding: 20px;
        border: 1px solid #aeaeae;
        position: relative;
        font-size: 16px;
    }
    .close {
        position: absolute;
        top: 10px;
        right: 10px;
        color: red;
        cursor: pointer;
    }
    .edit {
        position: absolute;
        top: 10px;
        right: 30px;
        color: blue;
        cursor: pointer;
    }
</style>
