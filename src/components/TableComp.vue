<template>
  <div class="container">
    <b-table id="shop-table" hover :items="filteredShopItems" :fields="fields" :current-page="currentPage">
      <template v-slot:cell(thumbnail)="row">
        <b-img class="thumbnailSize" v-if="row.item.images[0]" :src="row.item.images[0].url" alt="" />
      </template>
      <template v-slot:cell(default_price)="row">
        <div class="strikethrough">{{ row.item.default_price | currency }}</div>
      </template>
      <template v-slot:cell(price)="row">
        {{ row.item.price | currency }}
      </template>
      <template v-slot:cell(purchase)="row">
        <b-form-select v-model="row.item.purchase_amount" :options="options"></b-form-select>
      </template>
      <template v-slot:cell(add_to_cart)="row">
        <b-button v-if="row.item.purchase_amount" variant="outline-primary" @click="addToCart(row.item)">Add to Cart</b-button>
        <b-button v-else disabled>Add to Cart</b-button>
      </template>
    </b-table>
    <b-pagination v-if="totalItems >= perPage" v-model="currentPage" :per-page="perPage" :total-rows="totalItems" @input="getShopItems"/>
  </div>
</template>

<script>
import { Store } from '../store'

export default {
  name: 'TableComp',
  props: {
    shopItems: Array,
    totalItems: Number,
    fields: Array,
  },
  data() {
    return {
      options: [1, 2, 3, 4, 5],
      currentPage: 1,
      perPage: 25,
    }
  },
  computed: {
    cart() {
      return Store.$data.cart
    },
    filteredShopItems() {
      return this.shopItems.map(item => {
        const matchingItem = this.cart.find(({ id }) => id === item.id)
        return matchingItem ? matchingItem : item;
      })
    }
  },
  methods: {
    getShopItems() {
      this.$emit('getShopItems', this.perPage, this.currentPage)
    },
    addToCart(item) {
      if (
        item.purchase_amount <= item.purchase_limit ||
        item.purchase_limit == 0 &&
        item.purchase_amount <= item.quantity
      ){
        item.purchase_amount == item.purchase_limit ? item.purchase_limit = null : null
        item.quantity = item.quantity - item.purchase_amount
        Store.addToCart(item)
        this.$toast.open('Item added to cart')
      } else {
        this.$toast.open({
          message: 'The number you chose exceeds amount available',
          type: 'error'
        })
      }
    },
  },
}
</script>

<style>
  .table > tbody > tr > td {
    vertical-align: middle;
  }
  .thumbnailSize {
    height: 2.75rem;
    width: 2.75rem;
  }
  .strikethrough {
    text-decoration: line-through;
  }
</style>
