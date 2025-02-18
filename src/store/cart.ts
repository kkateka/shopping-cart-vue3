const state = {
  items: [],
};

const getters = {
  cartProducts: (state, getters, rootState) => {
    return state.items.map(({ id, quantity }) => {
      const product = rootState.products.list.find(
        (product) => product.id === id
      );
      return {
        quantity,
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail ?? "",
        stock: product.stock,
      };
    });
  },

  cartTotalPrice: (state, getters) => {
    return getters.cartProducts.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  },
};

const actions = {
  addProductToCart({ state, commit }, product) {
    if (product.stock > 0) {
      const cartItem = state.items.find((item) => item.id === product.id);
      if (!cartItem) {
        commit("pushProductToCart", { id: product.id });
      } else {
        commit("updateItemQuantity", { id: product.id, type: "increment" });
      }
    }
  },

  decreaseProductQuantity({ state, commit }, product) {
    commit("updateItemQuantity", { id: product.id, type: "decrement" });
  },

  removeProductFromCart({ state, commit }, productId) {
    commit("removeProductFromCartItems", productId);
  },
};

const mutations = {
  pushProductToCart(state, { id }) {
    state.items.push({
      id,
      quantity: 1,
    });
  },
  updateItemQuantity(state, { id, type }) {
    state.items = state.items.map((item) => {
      if (item.id === id) {
        const updatedQuantity =
          type === "decrement"
            ? item.quantity - 1
            : type === "increment"
            ? item.quantity + 1
            : item.quantity;
        return { id, quantity: updatedQuantity };
      }
      return item;
    });
  },
  removeProductFromCartItems(state, id) {
    state.items = state.items.filter((item) => item.id !== id);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
