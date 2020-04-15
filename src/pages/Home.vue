<template>
  <div class="container">
    <div class="m-3">
      <b-button v-if="cart" class="mr-2" disabled>{{ totalQuantity }} Items in Cart ({{ totalCost | currency }})</b-button>
      <router-link :to="{name: 'cart', params: { cart: this.cart }}">Checkout</router-link>
    </div>
    <TableComp :fields="fields" :shopItems="shopItems" :totalItems="totalItems" @getShopItems="getShopItems" />
  </div>
</template>

<script>
import axios from 'axios'
import TableComp from '../components/TableComp.vue'
import { Store } from '../store'

export default {
  name: 'Home',
  data() {
    return {
      fields: [
        {
          key: 'thumbnail',
          label: '',
        },
        'name',
        'default_price',
        'price',
        'quantity',
        'purchase_limit',
        'purchase',
        {
          key: 'add_to_cart',
          label: ''
        }
      ],
      shopItems: [],
      totalItems: 0,
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
    getShopItems(perPage, currentPage) {
      axios
        .get('https://app.vshred.com/api/offers?include=images&per_page=' + perPage + '&page=' + currentPage)
        .then(response => {
          this.shopItems = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    getTotalItems() {
      axios
        .get('https://app.vshred.com/api/offers?include=images')
        .then(response => {
          this.totalItems = response.data.length
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
  mounted() {
    this.getShopItems(25, 1)
    this.getTotalItems()
  },
  components: {
    TableComp
  }
}
</script>

<style>
</style>
