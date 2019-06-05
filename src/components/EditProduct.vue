<template>
    <transition name="modal">
        <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                <div class="product-item">
                    <p class="name"><b>name:</b></p>
                    <input type="text" placeholder="enter new product name" v-model="product.name">
                    <p class="price"><b>price:</b> $</p>
                    <input type="text" placeholder="new price" v-model="product.price">
                    <p class="descr"><b>description:</b></p>
                    <input type="text" placeholder="new description" v-model="product.description">
                </div>
                <button class="ok-btn modal-btn" @click="updateProduct(product)">OK</button>
                <button class="cancel-btn modal-btn" @click="closeEdit">Cancel</button>
            </div>
        </div>
        </div>
    </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ProductList from '@/components/ProductList.vue';
import {Product} from '@/types';

@Component({
    components: {
        ProductList,
    },
})

export default class EditProduct extends Vue {

    @Prop() private product!: Product;
    @Prop() private index!: number;

    // methods
    public updateProduct(product: any) {
        console.log(product);
        this.$store.dispatch('updateProductDetails', product);
        this.$emit('close');
    }
    public closeEdit() {
        this.$emit('close');
    }
}
</script>

<style>
    .modal-container .product-item {
        border: none;
    }
    .modal-btn {
        margin: 0 5px;
        padding: 10px 30px;
        text-transform: uppercase;
    }
    .cancel-btn {
        background-color: red;
    }
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
        width: 600px;
        margin: 0px auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
    }

    .modal-header h3 {
        margin-top: 0;
        color: #42b983;
    }

    .modal-body {
        margin: 20px 0;
    }

    .modal-default-button {
        float: right;
    }

    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>