<template>
    <div id="articleDetailId">        
        <div>
            <h3>Article</h3>
            <h2>Header:{{ articles.header}}</h2>
            <p>Body:{{ articles.body}}</p>
            <h3  v-for="(person,name) in persons" v-if="name === articles.userid">User:{{ person.name}}</h3>                    
        </div>   
        <hr>
        <h3>Message</h3>
        <br>            
        <div  v-if="(stateLength !== 0)">
            <div v-for="(items,index) in messagelength">
                <div v-for="(item,name) in messages" v-if="(items === name)">
                    <h3 v-for="(person,name) in persons" v-if="name === item.userid">User:{{ person.name}}</h3>
                    <p>Body:{{ item.body}}</p>
                    <br>
                </div>     
            </div>
        </div>        
        <div v-else>
            <p>~~~No People Message!!~~~~</p>
        </div> 
        
        <div>
            <label>Message:</label>
            <input type="text" name="message" v-model="message.body" value="" />            
        </div>
        <div>
            <label>User:</label>
            <input type="text" name="username" v-model="username" value="" />
        </div> 
        <button @click="messageAdd" class="btn btn-danger">Submit</button>
        <a href="/article" class="btn btn-info">Back</a>       
        <p>{{ messages.body }}</p>
        <p>{{ username }}</p>

        
    </div>
</template>

<script>
/*
<div v-for="(item,name) in messagesToarticle">
                {{ item.article }} 
            </div> 
*/
    export default {
        data() {
            return {
                id: 1,
                idd:1,
                messagelength:[],
                //articles: [],
                //persons: [],
                personsLength:null,
                username: "", 
                stateLength:null,
                /*
                messagesToarticle: {
                    articleid: null,
                    messageid: null
                },
                messages: {
                    body: "",
                    userid:null
                },*/
                //articleid:1
            }
        },
        methods: {
            messageAdd() {                
                //console.log(this.persons);
                this.$store.state.messagesToarticle.articleid = this.id;
                /*
                for (var i = 0; i <= this.personsLength; i++) {
                    if (this.$store.state.persons[i].name == this.username) {
                        //console.log(this.$store.state.persons[i].id);
                        this.$store.state.messages.userid = this.$store.state.persons[i].id;
                        //console.log(this.$store.state.messages.userid);
                        break;
                    }
                }*/
                
                for (var key in this.$store.state.persons) {
                    //console.log(key);
                    //console.log(this.$store.state.persons[key].name);
                    //console.log(this.username);
                    
                    if (this.$store.state.persons[key].name === this.username) {
                        //console.log(this.$store.state.persons[i].id);
                        this.$store.state.message.userid = key;

                        console.log(this.$store.state.message.userid);
                        break;
                    }
                    
                }
                //console.log(this.$store.state.messages.body);
                //console.log(this.$store.state.messages.userid);

                console.log(this.message);

                //µ²¦XVuex action ajax
                
                this.$store.dispatch('postMessageapi')
                    .then((result) => {
                        this.$store.dispatch('getMessageapi')
                            .then((result) => {
                                //var length = result.data.length;
                                //console.table(length);
                                console.table(result.data);
                                var test = [];
                                for(let key in result.data){
                                    test.push(key);                      
                                }                                
                                var total = test[test.length-1];
                                this.$store.state.messagesToarticle.messageid = total;
                                //console.table(total);
                                //console.table(this.$store.state.messagesToarticle.messageid);

                                this.$store.dispatch('postMessagesToarticle')
                                    .then((result) => {
                                        this.$store.state.messages = {};
                                        //console.log(this.messagesToarticle);
                                        document.location.href = "/article/detail/" + this.id;
                                        //console.table(result.data);
                                    })
                                    .catch((err) => { console.error(err) });
                                   
                            })
                            .catch((err) => { console.error(err) });
                        //console.table(result.data);                                                
                    })
                    .catch((err) => { console.error(err) });
                 
                
                

                /*
                const api = 'https://localhost:44377/api/messageapi/';
                this.$http.post(api, this.messages)
                    .then((data) => {
                        this.$http.get(api)
                            .then((data) => {
                                var length = data.data.length;
                                this.messagesToarticle.messageid = data.data[length - 1].id;
                                const api2 = 'https://localhost:44377/api/messagesToarticle/';
                                this.$http.post(api2, this.messagesToarticle)
                                    .then((data) => {
                                        console.log("456");
                                        console.log(this.messagesToarticle);
                                        document.location.href = "/article/detail/" + this.id;
                                        console.log(data);
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    });
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });*/
            },
            Addidd(){
                return this.idd++;
            }
        },
        computed: {
            //§ì¨úarticles¬ÛÃö¸ê®Æ
            articles() {
                return this.$store.state.articles;
            },
            messages() {
                return this.$store.state.messages;
            },
            message: {
                get(){
                    return this.$store.state.message;
                },
                set(value){
                    this.$store.commit('updateMessage', value);
                }                
            },
            persons() {
                return this.$store.state.persons;
            },
            messagesToarticles() {
                return this.$store.state.messagesToarticles;
            }

        },
        created() {
            if(localStorage.getItem('userid')){
            }else{
                document.location.href = "/person";
            }
            this.hrefUrl = location.href;
            this.id = this.hrefUrl.substring(37, this.hrefUrl.length);   
            //console.table(this.id);     
            this.$store.state.articleid = this.id;
            //µ²¦XVuex action ajax
            this.$store.dispatch('getArticleapiId')
                .then((result) => {
                    this.$store.state.articles = result.data;                    
                    //console.log(this.$store.state.articles);
                })
                .catch((err) => { console.error(err) });                
            this.$store.dispatch('getPersonapi')
                .then((result) => {
                    this.$store.state.persons = result.data;
                    //this.personsLength = this.$store.state.persons.length;
                    //console.table(result.data);
                })
                .catch((err) => { console.error(err) })

            this.$store.dispatch('getMessageapi')
                .then((result) => {
                    this.$store.state.messages = result.data;
                    //this.personsLength = this.$store.state.persons.length;
                    //console.table(result.data);
                })
                .catch((err) => { console.error(err) })
            this.$store.dispatch('getMessagesToarticle')
                .then((result) => {
                    this.$store.state.messagesToarticles = result.data;
                    console.log(result.data); 
                    //this.personsLength = this.$store.state.persons.length;
                    for(let key in result.data){
                        console.log(result.data[key].articleid); 
                        console.log(this.id);
                        if(result.data[key].articleid === this.id){
                            this.messagelength.push(result.data[key].messageid);  
                        }                    
                    }
                    this.stateLength = this.messagelength.length;
                    console.log(this.stateLength);
                    console.log(this.messagelength.length);                          
                    //console.log(this.$store.state.messagesToarticles.length);
                })
                .catch((err) => { console.error(err) })
            /*vue axios
             * const api = 'https://localhost:44377/api/articleapi/' + this.id;
             * this.$http.get(api)
                .then((data) => {
                    this.articles = data.data;
                    //console.log(data.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
            const apiUser = 'https://localhost:44377/api/personapi/'
            this.$http.get(apiUser)
                .then((data) => {
                    this.persons = data.data;
                    this.personsLength = this.persons.length;
                })
                .catch(function (error) {
                    console.log(error);
                });*/
        }
    }
</script>

<style>
</style>
<!--

-->
