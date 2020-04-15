import Vue from 'vue';

export const Store = new Vue({
  data() {
    return {
      cart: []
    };
  },
  computed: {
    totalCost() {
      return this.cart.reduce((accum, product) => {
        return accum + product.price * product.purchase_amount
      }, 0)
    },
    totalQuantity() {
      return this.cart.reduce((accum, product) => {
        return accum + product.purchase_amount
      }, 0)
    }
  },
  methods: {
    addToCart(product) {
      this.cart.push(product)
    },
  }
});