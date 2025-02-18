<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const products = computed(() => store.getters["cart/cartProducts"]);
const total = computed(() => store.getters["cart/cartTotalPrice"]);

const decrement = (product) => {
  store.dispatch("cart/decreaseProductQuantity", product);
};

const increment = (product) => {
  store.dispatch("cart/addProductToCart", product);
};

const removeProduct = (productId) => {
  store.dispatch("cart/removeProductFromCart", productId);
};

const decrementDisaled = (product) => {
  return product.quantity === 1;
};

const incremetDisaled = (product) => {
  return product.quantity === product.stock;
};
</script>

<template>
  <div class="container">
    <h2 class="text-center p-3">Your Cart</h2>

    <div class="container">
      <div class="row">
        <div class="col-9">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">PRODUCT</th>
                <th scope="col">PRICE</th>
                <th scope="col">QUANTITY</th>
                <th scope="col" colspan="2">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              <tr v-show="!products.length">
                <td colspan="5" class="text-center">NO ITEM ADDED</td>
              </tr>
              <tr v-for="product in products" :key="product.id">
                <th scope="row">
                  <img
                    v-if="product.thumbnail"
                    width="100px"
                    height="100px"
                    :src="product.thumbnail"
                    class="img-thumbnail"
                    alt="..."
                  />
                  {{ product.title }}
                </th>
                <td class="text-center fw-bold align-content-center">
                  ${{ product.price.toFixed(2) }}
                </td>
                <td class="text-center align-content-center">
                  <div
                    class="btn-group"
                    role="group"
                    aria-label="Basic outlined example"
                  >
                    <button
                      type="button"
                      class="btn btn-outline-secondary"
                      :disabled="decrementDisaled(product)"
                      @click="decrement(product)"
                    >
                      -
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-secondary"
                      disabled
                    >
                      {{ product.quantity }}
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-secondary"
                      :disabled="incremetDisaled(product)"
                      @click="increment(product)"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td class="text-center fw-bold align-content-center">
                  ${{ (product.price * product.quantity).toFixed(2) }}
                </td>
                <td class="text-center align-content-center">
                  <span
                    class="btn btn-secondary"
                    @click="removeProduct(product.id)"
                    >X</span
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-3">
          <!-- <div class="order-summary">
            <h4>Order Summary</h4>
            <hr />
            <p>Total: {{ total }}</p>
          </div> -->
          <div class="card text-dark bg-light mb-3" style="max-width: 18rem">
            <div class="card-header">Order Summary</div>
            <div class="card-body">
              <div class="section">
                <p>Subtotal</p>
                <p>${{ total.toFixed(2) }}</p>
              </div>
              <div class="section">
                <p>Shipping</p>
                <p>Free</p>
              </div>
            </div>
            <div class="card-footer section">
              <p>Total:</p>
              <p>${{ total.toFixed(2) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.align-content-center {
  align-content: center;
}

.section {
  display: flex;
  justify-content: space-between;
}
</style>
