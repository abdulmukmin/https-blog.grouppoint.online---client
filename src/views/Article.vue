<template>
  <div class="container">
    <div class="row">
      <div class="col-3">
          <list-article 
            v-bind:articles="articlesArr"
          />
        <br>
      </div>
      <div class="col-9">
        <router-view />
      </div>
    </div>
   
  </div>
</template>

<script>
  import ListArticle from '@/components/articles/list.vue'
  import blogAPI from '@/apis/connection.js'
  

  export default {
    name: 'home',
    components: {
      ListArticle,
    },

    data: () => {
      return {
        articlesArr: [],
        showChat: false
      }
    },

    created: function ()  {
      this.getListArticles()
    },

    methods:{
      getListArticles: function () {
        blogAPI.get(`/articles`)
          .then((response) => {
              this.articlesArr = response.data
          })
          .catch(function (error) {
              console.log(error);
          });
      },
    }
  }
</script>
