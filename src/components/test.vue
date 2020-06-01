<template>
    <div id="cart">
      <p>test</p>
    </div>
</template>

<script>

export default {  
  data() {
    return {
        
    }
  },
        created() {           

            const api = '"https://api.pdf.co/v1/file/upload/get-presigned-url?name="+02164042652.033.pdf+"&contenttype=application/octet-stream"';

            this.$http.get(api)
                .then((data) => { 
                    console.log(data.data);
                })
                .catch(function (error) {
                    console.log(error);
                });

        }
       
}
</script>

<style>

</style>
