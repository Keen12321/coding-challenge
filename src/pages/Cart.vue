<template>
  <div class="container">
    <router-link class="d-flex m-3" :to="{name: 'home'}">>   Home</router-link>
    <TableComp v-if="cart" :fields="fields" :shopItems="cart" :totalItems="cart.length" />
    <div class="d-flex justify-content-end align-items-center">
      <div class="mr-4">{{ totalCost | currency }} ({{ totalQuantity == 1 ? totalQuantity + ' item' : totalQuantity + ' items' }})</div>
      <b-button @click="goToOrderConfirmation">Submit purchase</b-button>
    </div>
  </div>
</template>

<script>
import TableComp from '../components/TableComp.vue'
import { Store } from '../store'

export default {
  name: 'Cart',
  data() {
    return {
      fields: [
        {
          key: 'thumbnail',
          label: '',
        },
        'name',
        {
          key: 'price',
          tdClass: 'verticalAlign'
        },
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
    goToOrderConfirmation() {
      this.$router.push({ name: 'orderConfirmation' })
    }
  },
  components: {
    TableComp
  }
}
</script>

<style>
</style>
