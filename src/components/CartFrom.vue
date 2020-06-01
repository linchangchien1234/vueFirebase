<template>
    <div id="cart">
        <form>
            <div class="form-group">
                <label for="userName">Name</label>
                <input type="text" class="form-control" id="cartName" aria-describedby="nameHelp" v-model.lazy="cart.name">
            </div>
            <div class="form-group">
                <label for="userEmail">NameDetail</label>
                <input type="text" class="form-control" id="cartDetail" aria-describedby="nameHelp" v-model.lazy="cart.namedetail">
            </div>
            <div class="form-group">
                <label for="userAddress">Price</label>
                <input type="text" class="form-control" id="cartPrice" aria-describedby="nameHelp" v-model.lazy="cart.price">
            </div>                    
            <button type="submit" class="btn btn-primary" @click.prevent="submut">Submit</button>
        </form>
    </div>
</template>

<script>

export default {
  data () {
    return {
        
    }
  },
  methods: {
      submut(){
        this.$store.dispatch('postCartapi')
                .then((result) => {
                    console.log(result.data);
                })
                .catch((err) => { console.error(err) })
      }
  },
  computed: {
    cart: {
       get(){
           return this.$store.state.cart;
        },
        set(value){
            this.$store.commit('updateCart', value);
        }                
       }
    }
       
}
</script>

<style>
  
</style>
