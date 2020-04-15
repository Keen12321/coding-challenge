<template>
  <div class="container">
    <div class="m-3 d-flex justify-content-between align-items-center">
      <b-button @click="navigateHome">Back to Home</b-button>
      <h1>Your order will arrive shortly!</h1>
      <div>Total: {{ totalCost | currency }}</div>
    </div>
    <TableComp :fields="fields" :shopItems="cart" :totalItems="cart.length" />
  </div>
</template>

<script>
import TableComp from '../components/TableComp.vue'
import { Store } from '../store'

export default {
  name: 'OrderConfirmation',
  data() {
    return {
      fields: [
        {
          key: 'thumbnail',
          label: '',
        },
        'name',
        'price',
        {
          key: 'purchase_amount',
          label: 'Quantity',
        },
      ],
    }
  },
  computed: {
    cart() {
      return Store.$data.cart
    },
    totalCost() {
      return Store.totalCost
    },
    totalQuantity() {
      return Store.totalQuantity
    },
  },
  methods: {
    navigateHome() {
      Store.$data.cart = []
      this.$router.push({ name: 'home' })
    }
  },
  components: {
    TableComp,
  }
}
</script>