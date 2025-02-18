<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import Product from "./product/Product.vue";

const store = useStore();
const products = computed(() => store.state.products.list);
const total = computed(() => store.state.products.total);

onMounted(() => {
  store.dispatch("products/fetchAndLoadAllProductList");
});

const addToCart = (product) => {
  store.dispatch("cart/addProductToCart", product);
};
</script>

<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-9">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Search for Products, Brands and More"
            aria-label="Search"
            aria-describedby="button-addon2"
          />
          <button
            class="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
          >
            Search again
          </button>
        </div>
      </div>
    </div>
    <div v-if="total && products" class="row">
      <div class="col">
        Showing {{ products.length }} results from {{ total }}.
      </div>
    </div>
    <div class="row row-cols-auto">
      <template
        v-for="product in products"
        :key="`${product.title}_${product.id}`"
      >
        <Product :product="product" @add-to-cart="addToCart" />
      </template>
    </div>
  </div>
</template>

<style></style>
