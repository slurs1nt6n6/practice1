let eventBus = new Vue()


Vue.component('product-tabs', {
    template: `
    <div>   
       <ul>
         <span class="tab"
               :class="{ activeTab: selectedTab === tab }"
               v-for="(tab, index) in tabs"
               @click="selectedTab = tab"
         >{{ tab }}</span>
       </ul>
       
       <div v-show="selectedTab === 'Reviews'">
       <h2>Reviews</h2>
         <ul>
           <li v-for="review in reviews">
        
           <p>{{ review.name }}</p>
           <p>{{ review.review }}</p>
           <p>Rating: {{ review.rating }}</p>
           <p>{{review.recomend}}</p>
           </li>
         </ul>
       </div>
       <div v-show="selectedTab === 'Make a Review'">
       <product-review></product-review>
       </div>
       <div v-show="selectedTab === 'Shipping'">
       <p>Shipping: {{ shipping }}</p>
       </div>

       <div v-show="selectedTab === 'Details'">
       <product-details/>
       <div
       class="color-box"
       v-for="(variant, index) in variants"
       :key="variant.variantId"
       :style="{ backgroundColor:variant.variantColor }"
       @mouseover="updateProduct(index)">
       </div>
       </div>
     </div>
  `,
    data() {
        return {
            tabs: ['Reviews', 'Make a Review','Shipping','Details'],
            selectedTab: 'Reviews',
            selectedVariant:0
,
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: ".//img/vmSocks-green-onWhite.jpg",
                    variantQuantity: 100


                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: ".//img/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 0

                }
            ],
        }
    },
    props: {

        reviews: {
            type: Array,
            required: false,
            },

        premium: {
            type: Boolean,
            required: true
        },
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        },
    },
    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
     },
     
    computed: {

        shipping() {
            if (this.selectedVariant == 0) {
                return 200;
            } else {
                return 100;
            }
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
    }

})

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

       <img v-bind:src="image" v-bind:alt="altText" />

    </div>

    <div class="product-info">
    <p>Shipping:{{ shipping }}</p>

       <h1>{{ title }}</h1>  
       <p>{{ description }}</p>
        
       <a href="https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks">{{link}}</a>

        <p v-if="inventory > 10">In stock</p>

       <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
           
       <p :class="{ outOfStock: !inStock }"

        v-else 
           >    Out of stock</p>

       <span><p>{{OnSale}}</p>  </span>

    
            
       <ul>
           <li v-for="size in sizes">{{ size }}</li>
       </ul>
              
       <div
       class="color-box"
       v-for="(variant, index) in variants"
       :key="variant.variantId"
       :style="{ backgroundColor:variant.variantColor }"
       @mouseover="updateProduct(index)">
       </div>
       
      
        <button v-on:click="addToCart"
        :disabled="!inStock"
        :class="{ disabledButton: !inStock }">    
       Add to cart</button>
          <div class="delete">
         <button v-on:click="deleteToCart">Delete from cart</button>
        </div>
          <div>
         
        <product-tabs :reviews="reviews" :premium="premium"></product-tabs>

    </div>
    </div>
    </div>`,
    data() {
        return {
            product: "Socks",
            brand: "Vue Mastery",
            description: "A pair of warm, fuzzy socks",
            selectedVariant: 0,
            altText: "A pair of socks",
            link: "More products like this",
            inStock: true,
            inventory: 0,
            onSale: "сейчас на распродаже",
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            reviews: [],
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: ".//img/vmSocks-green-onWhite.jpg",
                    variantQuantity: 100


                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: ".//img/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 0

                }
            ],
           
            cart: 0,
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart',
                this.variants[this.selectedVariant].variantId)

        },
        deleteToCart() {
            this.$emit('delete-from-cart',
                this.variants[this.selectedVariant].variantId)

        },
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        },
    },
    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
     },
     
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        OnSale() {
            return this.brand + ' ' + this.product + ' ' + this.onSale;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping() {
            if (this.selectedVariant == 0) {
                return 200;
            } else {
                return 100
            }
        }
    },
})
Vue.component('product-details', {
    template: `
      <ul>
      <li v-for="detail in details"> {{ detail }}</li>  <!-- v-for - перебирает массив -->
      </ul>`,
    data() {
        return {
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        }
    }
})

Vue.component('product-review', {
    template: `
 
 <form class="review-form" @submit.prevent="onSubmit">
 
 <p v-if="errors.length">
  <b>Please correct the following error(s):</b>
  <ul>
    <li v-for="error in errors">{{ error }}</li>
  </ul>
 </p>
 
  <p>
    <label for="name">Name:</label>
    <input id="name" v-model="name" placeholder="name">
  </p>
 
  <p>
    <label for="review">Review:</label>
    <textarea id="review" v-model="review"></textarea>
  </p>

  <p>
  <label for="recomend">Recomend:</label>
  <select id="recomend" v-model.number="recomend">
    <option>yes</option>
    <option>no</option>

  </select>
</p>

  <p>
    <label for="rating">Rating:</label>
    <select id="rating" v-model.number="rating">
      <option>5</option>
      <option>4</option>
      <option>3</option>
      <option>2</option>
      <option>1</option>
    </select>
  </p>
 
  <p>
    <input type="submit" value="Submit"> 
  </p>
 
 </form>
  `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating && this.recomend) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recomend: this.recomend
                }
                eventBus.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
                this.recomend = null
            } else {
                if (!this.name) this.errors.push("Name required.")
                if (!this.review) this.errors.push("Review required.")
                if (!this.rating) this.errors.push("Rating required.")
                if (!this.recomend) this.errors.push("Recomend required.")

            }
        }
    }
})



let app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },

        deleteCart(id) {
            this.cart.pop(id);
        }
    }
})
