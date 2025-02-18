import axios from "axios";

const state = {
  list: [],
  total: 0,
};

const getters = {};

const actions = {
  async fetchAndLoadAllProductList({ commit }) {
    const url = `https://dummyjson.com/products`;
    const { data } = await axios.get(url);
    const { products, total } = data;
    if (products) {
      commit("setProductList", products);
    }
    if (total) {
      commit("setTotal", total);
    }
  },
};

const mutations = {
  setProductList(state, productList) {
    state.list = productList;
  },
  setTotal(state, total) {
    state.total = total;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
