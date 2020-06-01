<template>
    <div id="cart">
      <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Count</th>
                    <th scope="col">Total</th>
                </tr>
            </thead>
            <tbody v-for="(item,name) in cartsdetail">
                    <tr v-for="(items, name,index) in carts" v-if="item === name"> 
                        <td>{{ index+1 }}</td>
                        <td>{{ items.name }}</td>
                        <td>{{ items.price }}</td>
                        <td class="totala">{{ cartCount[name]}}</td>
                        <td class="totalb">${{  cartCount[name] * items.price }}</td>
                    </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td>Total</td>
                    <td>${{ all }}</td>
                </tr>
            </tfoot>
        </table>
        <button @click.prevent="pay" class="btn btn-danger">Pay The $$</button>
        <a href="/cart" class="btn btn-info">Back</a>
        <p>{{ showMessage }}</p>
        



        <!--
        <p>{{ testname }}</p>
        <form action="" method="post">
            <input type="text" name="test1" v-model="storetestname" value="" />
            <button @click.prevent="postTest">Submit</button>
        </form>
        <p>{{ storetestname }}</p>
        <form action="" method="post">
            <input type="text" name="test1" v-model="testtest" value="" />
        </form>
        <p>{{ testtest }}</p>+
      -->
    </div>
</template>

<script>

export default {  
  data() {
    return {
        testname: "",
        cartnorepeat:[],
        cartCount:[],
        cartsdetail: [],
        count:[],
        all:null,
        showMessage:""
    }
  },
  methods: {
      addtestname() {
          
          this.$store.state.testname = this.testname;
      },
      postTest() { 
          this.$store.dispatch('postTest');
      },
      pay(){
          this.showMessage = "Success!!~~~~";
      }
  },
  computed: {
      storetestname: {
          get() {
              return this.$store.state.testname.testname;
          },
          set(value) {               
              this.$store.commit('updateName', value)
          }          
      },
      testtest: {
          get() {
              return this.$store.state.carts;
          },
          set(value) {
              this.$store.commit('updateCarts', value)
          }          
      },
      addTests() {
          return this.$store.getters.addTest;
      }

      
  },
        created() {
            if(localStorage.getItem('userid')){
            }else{
                document.location.href = "/person";
            }
            //抓取carts購買的產品
            this.testname = localStorage.getItem('carts');
            //this.test = this.testname.split(',').join('');
            //carts購買的產品的數值,將重複的過濾
            var test = this.testname.split(',');
            var array = Object.keys(test).map(item => test[item]);
            //console.log(array);
            
            var abc = array.reduce((array, item) => {
                array[item] = 1;
                return array;
            }, {});
            //console.log(test);
            this.cartnorepeat = Object.keys(abc);
            //this.cartnorepeat = Object.keys(abc).join('');
            //console.log(Object.keys(abc));
            //console.log(this.cartnorepeat);
            //console.log(typeof (test));
            //console.log(typeof(this.cartnorepeat));

            //carts購買的產品的數值,將重複的紀錄
            this.testname.split(',').forEach((item) => {
                this.cartCount[item] = this.cartCount[item] ? this.cartCount[item] + 1 : 1;
            });
            var tset = Object.keys(this.cartCount);
            //console.log(typeof (this.cartCount));
            //console.log(this.cartCount);
            //console.log(this.cartCount.length);
            //抓取getCartapi數值
            this.$store.dispatch('getCartapi')
                .then((result) => {
                    //console.log(result.data);
                    this.carts = result.data;
                    //console.log(this.carts);
                    //console.log(this.cartnorepeat);
                    //console.log(this.test.length);
                    //console.log(this.test);
                    //console.log(this.cartnorepeat.length);
                    for (var i = 0; i < this.cartnorepeat.length; i++) {
                        //this.$store.state.cartid = this.test[i];
                        this.id = this.cartnorepeat[i];
                        //console.log(this.test[i]);
                        //console.log(this.carts[i]);
                        for (var key in this.carts) {
                            if (this.id == key) {
                                this.cartsdetail.push(key);
                                //console.log(this.carts[i]);
                            }
                        }                        
                        //this.cartsdetail.push(this.carts[id]);
                    }
                    //console.log(this.carts);
                    for (var i = 0; i < this.cartsdetail.length; i++) {
                        for (var key in this.cartCount) {
                            //console.log(key);
                            //console.log(this.cartsdetail[i]);

                            if (key === this.cartsdetail[i]) {
                                //console.log(this.carts[key].price);
                                //console.log(this.cartCount[key]);
                                var count = this.carts[key].price * this.cartCount[key];
                                //console.log(count);
                                this.count.push(count);
                                //console.log(this.count);
                            }
                        }
                    }
                    //console.log(this.count);
                    this.$store.state.carttest1
                    var total = 0;
                    for (var i = 0; i < this.count.length; i++) {
                        var count = this.count[i];
                        //console.log(count);                        
                        total = total + count;
                        //console.log(total);
                    }
                    this.all = total;
                    //console.log(this.all);
                })
                .catch((err) => { console.error(err) })


        }
       
}
</script>

<style>

</style>
