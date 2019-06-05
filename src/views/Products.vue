<template>
  <div>
    <addProduct></addProduct>
    <productList></productList>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import AddProduct from '@/components/AddProduct.vue';
import ProductList from '@/components/ProductList.vue';

@Component({
    components: {
        ProductList,
        AddProduct,
    },
})

export default class Products extends Vue {}
</script>