<template>
  <div>
        <productItem
          v-for="(product, index) in products"
          :key="product.id"
          :index="index"
          :product="product"
          :showEdit="showEdit"
        >
          <span class="edit" slot="edit" @click="showing(product)">Edit</span>
          <span class="close" @click="removeProduct(product.id)">x</span>
        </productItem>

        <!-- <editProduct
          v-show="showEdit" 
          @close="close"
          :product="prod"
        ></editProduct> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import ProductItem from '@/components/Product.vue';
import EditProduct from '@/components/EditProduct.vue';

import {Product} from '@/types';
import {EditProd} from '@/types';




@Component({
    components: {
        ProductItem,
        EditProduct,
    },
})

export default class ProductList extends Vue {
    // data
    public showEdit: boolean = false;

    public prod!: EditProd;


    // computed
    get products() {
        return this.$store.getters.getProductsList;
    }
    // created
    public created() {
        this.$store.dispatch('getProducts');
    }
    // methods
    public removeProduct(id: string) {
        this.$store.dispatch('removeProduct', id);
    }
    public showing(product: Product) {
        this.prod = product;
        console.log(this.prod.name);
        this.showEdit = true;
    }
    public close() {
        this.showEdit = false;
        this.$store.dispatch('getProducts');
    }
}
</script>


<style>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
