//載入框架
import Vue from 'vue'

//Vuex方法載入
import Vuex from 'vuex'
Vue.use(Vuex);
Vue.config.devtools = true

//ajax axios方法載入
import Vueaxios from 'vue-axios'
import axios from 'axios'
Vue.use(Vueaxios, axios)



const userRequest = axios.create({
    baseURL: 'https://vueproject-134d8.firebaseio.com',
    headers: { 
        'Content-Type': 'application/json'
    }
});

export const store = new Vuex.Store({
    state: {
        //測試用
        tests: [],
        //測試用
        testid: 0,
        //測試用
        testname: {
            testname: "AAAA"
        },
        //測試用
        testtest: "aaaa",
        //cart資料
        carts: [],
        //articles資料
        articles: [],
        //Article轉址ID
        //ArticlesId:null,
        articleid: 1,
        personid: 1,
        cartid:1,
        carttest1:[],
        articles:[],
        persons: [],
        messages:[],
        messagesToarticles:[],
        personsform: {},
        messagesToarticle: {
            articleid: null,
            messageid: null
        },
        message: {
            body: "",
            userid: null
        },
        cart:{
            name:'',
            namedetail:'',
            price:null
        }
    },
    getters: {
        //測試用
        addTest: state => {
            var addTest = state.tests.map(test => {
                return '**' + test + '**'
            });
            return addTest;
        },
        //測試用
        addId: state => {
            return state.testid; 
        },
        //測試用
        testname: state => {
            return state.testname;
        },
        //測試用
        addArticleId: state => {
            return state.articleid; 
        },
        addPersonid: state => {
            return state.personid;
        },
        addCartId: state => {
            return state.cartid;
        },
        articles: state => {
            return state.articles;
        },
        message: state => {
            return state.message;
        },
        messages: state => {
            return state.messages;
        },
        messagesToarticle: state => {
            return state.messagesToarticle;
        },
        persons:state => {
            return state.persons;
        },
        personsform: state => {
            return state.personsform;
        },
        cart:state => {
            return state.cart;
        },
        carts:state => {
            return state.carts;
        }
        ,
        carttest1:state => {
            return state.carttest1;
        }
    },
    mutations: {
        //測試用
        reduceTest: state => {
            state.tests.forEach(test => {
                test.price -= 1;
            });
        },
        //測試用
        updateTest: (state, value) => {
            state.testtest = value;
        },
        updateName: (state, value) => {
            state.testname.testname = value;            
        },
        //Article轉址ID
        /*
        updateArticlesId: (state, value) => {
            state.ArticlesId = value;
        },*/
        updateMessage: (state, value) => {
            state.message = value; 
        },
        updatePerson: (state, value) => {
            state.persons = value; 
        },
        updateCart: (state, value) => {
            state.cart = value; 
        },
        updateCarttest1: (state, value) => {
            console.log(value);
            //var value = parseInt(value);
            
            //console.log(state.carttest1.length);
            for (var i = 0; i < state.carttest1.length; i++) {
                if (value == state.carttest1[i].id) {                    
                    state.carttest1[i].count++;                   
                }
            }
        }
    },
    actions: {
        //測試用
        reduceTest: state => { 
            setTimeout(function () {
                state.commit('reduceTest');
            }, 2000)
        },
        //api管理
        getCartapi() {
            return userRequest.get('/cartapi.json');
        },
        getCartapiid(state) {
            var id = state.getters.addCartId;
            console.log(id);
            return userRequest.get('/cartapi/' + id + '.json');
        },
        postCartapi(data) {            
            return userRequest.post('/cartapi.json', data.getters.cart);
        },
        getArticleapi() {
            return userRequest.get('/articleapi.json');
        },
        postArticleapi(data) {
            console.log(data);
            return userRequest.post('/articleapi.json', data.getters.articles);
        },
        getArticleapiId:state => {
            var id = state.getters.addArticleId;
            console.log(id);
            return userRequest.get('/articleapi/' + id +'.json');
        },
        postArticleapiId: state => {
            var id = state.getters.addArticleId;
            console.log(id);
            return userRequest.put('/articleapi/'+ id + '.json',data);
        },
        getPersonapi() {
            return userRequest.get('/personapi.json'); 
        },
        getPersonapiId:state => {
            var id = state.getters.addPersonid;
            console.log(id);
            return userRequest.get('/personapi/' + id + '.json');
            //return userRequest.get('/personapi/-M7ge_MrOslEEIWvY4-K.json/' );
        },
        postPersonapi(data) {
            console.log(data);
            return userRequest.post('/personapi.json', data.getters.persons);
        },
        putPersonapi(state){
            var id = state.getters.addPersonid;
            console.log(id);
            console.log(state);
            console.table(state.getters.persons);              
            return userRequest.put('/personapi/' + id+'.json', state.getters.persons);
        },
        getMessageapi() {
            return userRequest.get('/messageapi.json');
        },
        postMessageapi(data) {
            console.log(data);
            return userRequest.post('/messageapi.json', data.getters.message);
        },
        getMessagesToarticle() {
            return userRequest.get('/messagesToarticle.json');
        },
        postMessagesToarticle(data) {
            return userRequest.post('/messagesToarticle.json', data.getters.messagesToarticle);
        },
        postTest(data) {           
            userRequest.post('/test.json', data.getters.testname)
                .then((result) => {
                    console.log(result);
                })
                .catch((err) => { console.error(err) });
        }
    },
})