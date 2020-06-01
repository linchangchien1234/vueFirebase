<template>
    <div id="cuteimg" class="container">      
      <!--
        <div class="card" v-for="(item, index) in carts">
            <div class="card-body">
                <h3>{{ index }}</h3>
                <span v-bind:class="'item'+item.id +' test123'">{{ item.id}}</span>
                <h5 class="card-title">{{ item.name }}</h5>
                <p class="card-text">{{ item.namedetail }}</p>
                <p class="card-text">{{ item.price }}</p>
                <button v-bind:id="item.id" class="btn btn-primary" @click.prevent="addcart">Go somewhere</button>
            </div>
        </div>
        <div v-for="(item, name) in addTests">
            <h1>{{ item }}</h1>
        </div>
        <button class="test btn btn-primary" @click.prevent="reduceTest">Submit</button>
        <a href="/cart/detail">GO</a>-->
       <div class="card-deck">
        <div class="card" v-for="(item, name) in carts">
            <div class="card-body">
              
                <div v-for="(item,index) in cartlength" v-if="name === item">
                    <img class="card-img-top" v-bind:src="'/dist/cuet'+(index+1)+'.jpg'"  alt="Card image" style="width: 100%">
                    <p  v-bind:class="'item'+(index+1)+' test123'">{{ name }}</p>
                    <h3>{{ index +1}}</h3>
                    <button v-bind:id="index+1" class="btn btn-primary" @click.prevent="addcart">Go somewhere</button>
                </div>          
                <h5 class="card-title">{{ item.name }}</h5>
                <p class="card-text">{{ item.namedetail }}</p>
                <p class="card-text">{{ item.price }}</p>
                <div v-for="items in carttest1" v-if="items.id === name">
                    <p>Count:<span>{{ items.count }}</span></p>
                </div>
            </div>
        </div>
        </div>
        <button class="test btn btn-primary" @click.prevent="reduceTest">Submit</button>
    </div>
</template>

<script>
/*

*/
export default {
  data () {
    return {
        //carts: [],
        //testPush: {}
        tests:[],
        cartlength:[],
        test:2
    }
  },
  methods: {
      addcart(event) {
          var id = event.target.id;
          console.log(id);          
          var nameValue = document.getElementsByClassName("item" + id)[0].innerText;
          console.log(nameValue);
          this.tests.push(nameValue);
          //console.log(this.tests);   
          this.$store.commit('updateCarttest1', nameValue);       
      },
      reduceTest() {
        if (this.$store.state.personid === null) {
              document.location.href = "/person";
          } else {
              localStorage.setItem('carts', this.tests);
              //console.table(this.tests);
              //this.$store.dispatch('reduceTest');
              document.location.href = "/cart/detail";
          }
          //this.$store.dispatch('reduceTest');
      },
      getUsers() {
          this.$store.dispatch('getUsers');
      }

        },
        created() {  
            this.$store.dispatch('getCartapi')
                .then((result) => {
                    var testaa = {};
                    var testbb;
                    this.$store.state.carts = result.data;
                    for (var key in this.$store.state.carts) {
                      testaa.id = key;
                      testaa.count = 0;
                      testbb = Object.assign({}, testaa);
                      this.$store.state.carttest1.push(testbb);
                      this.cartlength.push(key);
                    }
                    console.log(this.$store.state.carttest1);
                    //console.table(this.cartlength);                    
                    //console.table(result.data);
                })
                .catch((err) => { console.error(err) })
        },
        computed: {
            /*
            tests() {
                return this.$store.state.tests;
            },*/
            addTests() {
                return this.$store.getters.addTest;
            },
            carts() {
                return this.$store.state.carts;
            },
            carttest1() {
                return this.$store.state.carttest1;
            }
        }
       
}
</script>

<style scoped>
    .test123 {
        display: none;
    }
  @media screen and (max-width: 1200px) and (min-width: 768px) {
        #cuteimg {
            margin-top: 150px;
        }
    }

    @media screen and (max-width: 767px) and (min-width: 320px) {
        #cuteimg {
            margin-top: 80px;
        }
    }

    main div div:nth-of-type(1) {
        margin-bottom: 15px;
    }

    main div div.card {
        width: 300px;
    }

    @media screen and (min-width: 576px) {
        main div div.card {
            width: 400px;
        }
    }
</style>
