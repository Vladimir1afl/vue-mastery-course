Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
  <div class="product">
    <div class="product-image">
        <img :src="image">
    </div>
    <div class="product-info">
        <h1>{{ title }}</h1>
        <p v-if="inStock">In stock</p>
        <p v-else>Out of stock</p>
        <p>Shipping: {{ shipping }}</p>

        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>

        <div class="color-box"
            v-for="(variant, index) in variants"
            :key="variant.variantId"
            :style="{ backgroundColor: variant.variantColor }"
            @mouseover="updateProduct(index)">
        </div>

        <button
          @click="addToCart"
          :disabled="!inStock"
          :class=" { disabledButton: !inStock } "
          >Add to cart</button>

          <product-review></product-review>
        
    </div>
  </div>
  `,
  data() {
    return {
      brand: 'Vue Mastery',
      product: 'Socks',
      selectedVariant: 0,
      details: [
          '80% cotton',
          '20% polyester',
          'Heneder-neutral'
      ],
      variants: [
          {
              variantId: 2234,
              variantColor: 'green',
              variantImage: './assets/vmSocks-green.jpg',
              variantQuantity: 10
          },
          {
              variantId: 2235,
              variantColor: 'blue',
              variantImage: './assets/vmSocks-blue.jpg',
              variantQuantity: 0
          }
      ]
    }
  },
  methods: {
    addToCart() {
        this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
    },
    updateProduct(index) {
        this.selectedVariant = index
    }
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product
    },
    image() {
      return this.variants[this.selectedVariant].variantImage
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity
    },
    shipping() {
      if (this.premium) {
        return "Free"
      } else {
        return "2.99$"
      }
    }
  }
})

Vue.component('product-review', {
  template: `
    <input v-model="name">
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null
    }
  }
})

var app = new Vue({
    el: '#app',
    data: {
      premium: true,
      cart: []
    },
    methods: {
      updateCart(id) {
        this.cart.push(id)
      }
    }
})