<template>
    <div id="article">
      <div>
        <a href="/article/create" class="btn btn-primary">Add article</a>
      </div>  
      <br>    
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Header</th>
                    <th scope="col">Author</th>
                </tr>
            </thead>
            
            <tbody>
                <tr v-for="(item, index) in articles" v-if="((item.id <= pageIndex) && (item.id >= (pageIndex-5)))">
                  <td scope="row">{{ item.id }}</td>
                  <td scope="row"><a v-bind:href="'/article/detail/'+index" class="btn btn-primary">{{ item.header }}</a></td>
                  <td scope="row"  v-for="(person,name) in persons" v-if="name === item.userid">{{ person.name }}</td>
                </tr>                
            </tbody>
            <tfoot>
                <tr>
                    <td>Sum</td>
                    <td>$180</td>
                </tr>
            </tfoot>
        </table>

        <!--­¶½X¥\¯à-->
        <div>
            <a href="/article" @click.prevent=" upPage()"><</a>
            <a href="/article" v-bind:id="'pageindex'+articlesLength" v-for="articlesLength in articlesLengths" @click.prevent=" changePage(articlesLength)">
                {{ articlesLength}}<span if="articlesLength != (articlesLength-1)">/</span>
            </a>

            <a href="/article" @click.prevent=" downPage()">></a>            
        </div>        
    </div>
</template>

<script>

export default {
  data () {
    return {
        //articles: [],
        //id: null,
        test:"123",
        articlesLengths: 1,
        pageStaute:1,
        pageIndex:5,
        articleid:[],
        nowStatePage:null

    }
  },
  methods: {  
  //選擇頁數
      changePage(nowPageIndex) {
          this.pageStaute = nowPageIndex;
          this.pageInexChange();
      },
      //上一頁
      downPage() {
          if (this.pageStaute === this.articlesLengths) {
              this.pageStaute = this.articlesLengths;
          } else {
              this.pageStaute += 1;
          }  
          this.pageInexChange();
      },
      //下一頁
      upPage() {
          if (this.pageStaute === 1) {
              this.pageStaute = 1;
          } else {
              this.pageStaute -= 1;
          }
          this.pageInexChange();
      },
      //直跳頁面
      pageInexChange() {
          this.pageIndex = 5;
          if (this.pageIndex !== this.articlesLengths * 5) {
              this.pageIndex += (this.pageStaute - 1) * 5;
          } else {
              this.pageIndex = this.articlesLengths * 5;
          }
      }
  },
        created() {
            
            //±qVuex §ì¨úAPI¸ê®Æ
            this.$store.dispatch('getArticleapi')
                .then((result) => {
                    //console.log(result.data['-M7jlYetYpC7wYvv17BI']);
                    var i = [];
                    i = result;
                    var j = "test";
                    //console.log(typeof(i)); 
                    for(let data in result.data){
                         // console.log(data);   
                    }
                    //console.log(i);
                    //±NAPI¸ê®Æ¦s¦Üarticles°}¦C¤¤
                    this.$store.state.articles = result.data;
                    console.log(this.$store.state.articles);
                    //­pºâ¸ê®Æªø«×
                    //¥H5ªº­¿¼Æ¬ö¿ý­¶½X
                    //console.log(this.$store.state.articles);
                    this.articleid = [];
                          for(let key in result.data){
                            this.articleid.push(key);
                          }
                          //console.log(this.articleid); 
                          //console.log(this.articleid.length); 
                    this.articlesLengths = this.articleid.length;
                    if ((this.articlesLengths / 5) === 0) {
                        this.articlesLengths = (this.articlesLengths / 5);
                    } else {
                        this.articlesLengths = Math.ceil(this.articlesLengths / 5);

                    }
                   //console.log(this.articlesLengths);
                   //console.log(data.data);
                    //console.table(result.data);
                })
                .catch((err) => { console.error(err) });


                 this.$store.dispatch('getPersonapi')
                .then((result) => {
                    this.$store.state.persons = result.data;
                    console.log(this.$store.state.persons);
                })
                .catch((err) => { console.error(err) });
            /*
            //ajax axios§ì¨úapi¸ê®Æ
            const api = 'https://localhost:44377/api/articleapi';
            this.$http.get(api)
                .then((data) => {
                    //±NAPI¸ê®Æ¦s¦Üarticles°}¦C¤¤
                    this.articles = data.data;
                    //­pºâ¸ê®Æªø«×
                    //¥H5ªº­¿¼Æ¬ö¿ý­¶½X
                    this.articlesLengths = this.articles.length;
                    if ((this.articlesLengths / 5) === 0) {
                        this.articlesLengths = (this.articlesLengths / 5);
                    } else {
                        this.articlesLengths = Math.ceil(this.articlesLengths / 5);

                    }
                   //console.log(this.articlesLengths);
                   //console.log(data.data);
                })
                .catch(function (error) {
                    console.log(error);
                });*/
        
        },
        computed: {
            //§ì¨úarticles¬ÛÃö¸ê®Æ
            articles() {
                return this.$store.state.articles;
            },
            persons() {
                return this.$store.state.persons;
            }
        }
   }
</script>

<style>

</style>
/*
<tr v-for="(item, name) in articles" v-if="(name < pageIndex) && (name >= (pageIndex-5))">                  
                    
                    <!--<td scope="row"><button id="changeUrl" @click.prevent="changeUrl">{{ item['n'].header}}</button></td>
                    <td scope="row"><a v-bind:href="'/article/detail/'+item.n.id" class="test btn btn-primary">{{ item['n'].header}}</a></td>
                    <td scope="row">{{ item.m.name}}</td>-->
                </tr>

//Æ[¬Ý¤º®eÂà§}
      
      changeUrl(event) {
          console.log(event.target);
          var changeUrl = event.target.innerHTML; 
          console.log(changeUrl);
          for (var item in this.$store.state.articles) {     
              console.log(this.$store.state.articles[item].n.header);
              if (changeUrl === this.$store.state.articles[item].n.header) {                  
                  console.log(this.$store.state.articles[item].n.header);
                  this.$store.commit('updateArticlesId', this.$store.state.articles[item].n.id);
                  console.log(this.$store.state.articles[item].n.id);
                  console.log(this.$store.state.ArticlesId);
                  //document.location.href = "/article/detail/" + this.$store.state.ArticlesId;
                  break;                  
              } else {
                  console.log("bad.....");
              }
          }
      },
      //¿ï¾Ü­¶¼Æ
      changePage(nowPageIndex) {
          this.pageStaute = nowPageIndex;
          this.pageInexChange();
      },
      //¤W¤@­¶
      downPage() {
          if (this.pageStaute === this.articlesLengths) {
              this.pageStaute = this.articlesLengths;
          } else {
              this.pageStaute += 1;
          }  
          this.pageInexChange();
      },
      //¤U¤@­¶
      upPage() {
          if (this.pageStaute === 1) {
              this.pageStaute = 1;
          } else {
              this.pageStaute -= 1;
          }
          this.pageInexChange();
      },
      //ª½¸õ­¶­±
      pageInexChange() {
          this.pageIndex = 5;
          if (this.pageIndex !== this.articlesLengths * 5) {
              this.pageIndex += (this.pageStaute - 1) * 5;
          } else {
              this.pageIndex = this.articlesLengths * 5;
          }
      }
*/