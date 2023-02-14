Vue.component('product', {
    template: `
    <div class="product">

    <div class="product-image">

       <img v-bind:src="image" v-bind:alt="altText" />

    </div>

    <div class="product-info">
    
       <h1>{{ title }}</h1>  
       <p>{{ description }}</p>
       <p>Shipping: {{ shipping }}</p>
   
       <a href="https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks">{{link}}</a>

        <p v-if="inventory > 10">In stock</p>

       <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
           
       <p :class="{ outOfStock: !inStock }"

        v-else 
           >    Out of stock</p>

       <span><p>{{OnSale}}</p>  </span>

       <ul>
           <li v-for="detail in details">{{ detail }}</li>
        </ul>
            
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

         <button v-on:click="deleteToCart">Delete from cart</button>
        

        

</div>
    </div>

</div> 
  `,
    data() {
        return {
            product: "Socks",
            brand: "Vue Mastery",
            description:"A pair of warm, fuzzy socks",
            selectedVariant: 0,
            altText: "A pair of socks",
            link: "More products like this",
            inStock: true,
            inventory: 0,
            onSale: "сейчас на распродаже",
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
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
            cart:0,        }
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
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return 2.99
            }
         }    },
        props: {
            premium: {
                type: Boolean,
                required: true
            }
        },
              })
    Vue.component('product-details',{
        template:`
        {{detail}}`,
        data(){
        return{
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        }
        }
    })
 
 let app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods:{
        updateCart(id){
            this.cart.push(id);
        },
        
        deleteCart(id){
            this.cart.pop(id);
        }
    }
 })
 