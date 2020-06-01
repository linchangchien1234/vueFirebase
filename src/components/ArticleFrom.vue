<template>
    <div id="articleFrom">      
       <form>
            <div class="form-group">
                <label for="userName">Header</label>
                <input type="text" class="form-control" id="userName" aria-describedby="nameHelp" v-model.lazy="articles.header">
            </div>     
            <div>
            	<textarea v-model.lazy="articles.body"></textarea> 
            </div>
            <a href="/article/create" class="btn btn-success" @click.prevent="submut">Submit</a>
             <a href="/article" class="btn btn-primary" @click.prevent="submut">Back</a>
        </form>
    </div>
</template>

<script>

export default {
  data () {
    return {
        articles: {
            header: '',
            body: '',
            createtime:'',
            deletetime: '',
            userid: '',
            id:null
        }
    }
  },
  methods: {
        submut(){
          /*
          this.$store.dispatch('getArticleapi')
                .then((result) => {                    
                    var articleid = [];
                          for(let key in result.data){
                            articleid.push(key);
                          }
                          console.log(articleid);
                          this.articles.id = articleid.length + 1;
                          console.log(articleid.length);
                })
                .catch((err) => { console.error(err) });
          */
          this.$store.state.articles = this.articles;
          this.$store.dispatch('postArticleapi')
              .then((result) => {
                  //console.log(this.articles);
                  //console.log(result);
                  //console.log(result.data.name);
                  document.location.href = "/article/detail/" + result.data.name;                  
              })
              .catch((err) => { console.error(err) })

        }
  },
  created() {
  		var today=new Date();
  		var currentDateTime = today.getFullYear() +'/'+ (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getHours()+'/'+today.getMinutes();
  		//console.log(currentDateTime);
  		this.articles.createtime = currentDateTime;
      if(localStorage.getItem('userid')){
          this.articles.userid = localStorage.getItem('userid');
      }else{
        document.location.href = "/person";
      }
  		  
  		//console.log(this.articles.id);
  		//console.log(this.articles.createtime);
      this.$store.dispatch('getArticleapi')
                .then((result) => {                    
                    var articleid = [];
                          for(let key in result.data){
                            articleid.push(key);
                          }
                          //console.log(articleid); 
                          this.articles.id = articleid.length + 1;
                          //console.log(articleid.length); 

                    
                   //console.log(this.articlesLengths);
                   //console.log(data.data);
                    //console.table(result.data);
                })
                .catch((err) => { console.error(err) });

            var testname = "1,2,3,4";            
            var test = testname.split(',').join('');            
            console.log(test);
            console.log(test.length);
      
     
  }
       
}
</script>

<style>

</style>
