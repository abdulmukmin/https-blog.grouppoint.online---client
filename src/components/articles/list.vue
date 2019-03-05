<template>
    <div>
      <div class="list-group" v-for="(article, index) in articles" :key="index">
        <router-link :to="'/articles/' + article._id" class="list-group-item list-group-item-action flex-column align-items-start">
          <div class="d-flex w-100 justify-content-between">
            <small class="text-muted">{{article.title}}</small>
            <small class="text-muted">{{article.createdAt}}</small>
          </div>
        </router-link>
      </div>
    </div>
</template>

<script>


  export default {
    name: 'ListArticle',

    components: {
      
    },

    props: {
      articles: Array,

    },
    
    data:() => {
        return{


        }
    },

    methods: {

    }
  }

</script>
