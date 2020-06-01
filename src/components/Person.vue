<template>
    <div id="person" class="container">
        <div class="d-flex justify-content-center align-items-center size">
            <div class="text-center w-50">
                <form action="/" method="post">
                    <h3>Person Registered</h3>
                    <div>
                        <input type="text" name="username" v-model="username" value="" />
                    </div>
                    <div>
                        <input type="password" name="userpassword" v-model="userpassword" value="" />
                    </div>
                    <p>{{ message }}</p>
                    <button class="btn btn-outline-success my-2 my-sm-0" @click.prevent="ckeckUser">Send</button>
                </form>
            </div>            
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                //persons: [],
                username: "",
                userpassword: "",
                message: "",
                id:null,
                PersonsLength:null,
                totalPersonsLength:null
            }
        },
        methods: {
            ckeckUser() {
                for (var i = 0; i <= this.totalPersonsLength; i++) { 
                    var ii = this.personsLength[i];

                    if ((this.username === this.$store.state.persons[ii].account) && (this.userpassword == this.$store.state.persons[ii].password)) {
                        this.message = "good job!";
                        this.id = ii;
                        console.log(this.id);
                        localStorage.setItem('userid', this.id);
                        document.location.href = "/person/detail/"+this.id;
                        break;
                    } else {
                        this.message = "bad!~~~~";
                    }
                } 
                /*
                for (var i = 0; i < this.persons.length; i++) {
                    this.message = this.persons[i].account;                    
                } */
            }
        },
        computed: {

        },
        created() {
            this.$store.dispatch('getPersonapi')
                .then((result) => {
                    this.$store.state.persons = result.data;
                    this.personsLength = Object.keys(this.$store.state.persons);
                    this.totalPersonsLength = Object.keys(this.$store.state.persons).length;
                    console.log(this.personsLength);
                    console.log(this.$store.state.persons);
                    //console.log(Object.keys(this.$store.state.persons).length);
                })
                .catch((err) => { console.error(err) })
            /*
            const api = 'https://localhost:44377/api/personapi/';

            this.$http.get(api)
                .then((data) => {                    
                    this.persons = data.data;  
                    console.log(data.data);
                    console.log(this.persons);
                    //console.log(this.persons[0].adress);
                })
                .catch(function (error) {
                    console.log(error);
                });*/
        }

    }
</script>

<style>
    .size {
        height: 500px;
    }
</style>

