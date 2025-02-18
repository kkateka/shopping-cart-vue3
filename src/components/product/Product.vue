<script setup lang="ts">
const props = defineProps<{
  product: any;
}>();

const emit = defineEmits(["add-to-cart"]);

const { title, price, images } = props.product;
const imgsrc = images?.length ? images[0] : "";

const addToCart = (product) => {
  emit("add-to-cart", product);
};
</script>

<template>
  <div class="card border-light m-3" style="width: 15rem; height: 18rem">
    <img
      v-if="imgsrc"
      :src="imgsrc"
      class="card-img-top"
      alt=""
      width="150px"
      height="150px"
    />
    <div class="card-body">
      <h6 class="card-title">{{ title }}</h6>
      <p class="card-text">${{ price }}</p>
      <button
        type="button"
        class="btn btn-primary btn-sm"
        @click="addToCart(props.product)"
      >
        ADD TO CART
      </button>
    </div>
  </div>
</template>
