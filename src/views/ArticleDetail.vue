<template>
  <div id="articleDetail"> 
        <!-- Title -->
        <h1 class="mt-4">{{detailArticle.title}}</h1>
        <!-- Author -->
        <p class="lead">
            by
            {{detailArticle.author}}<button type="button" class="btn btn-outline-info btn-sm"  data-toggle="modal" data-target="#exampleModalCenter"> follow author</button>
        </p>
        <hr>
        <!-- Datusernamee/Time -->
        <span class="badge badge-pill badge-info">Last Updated: {{detailArticle.updatedAt}}</span>
        <hr>
        <div v-html="detailArticle.description"></div>

        <hr>

        <comment 
          v-bind:comments = "commentsArr"
          v-bind:idArticle = "articleId"
          @updateComments = 'reloadComments'
        />
        <!--Modal follow-->
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel" aria-describedby="emailHelp">Input your email</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <input type="email" class="form-control" placeholder="email here.." v-model="email"/>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary" data-dismiss="modal" v-on:click.prevent="followAuthor(detailArticle.authorId)">Save</button>
              </div>
            </div>
          </div>
        </div>
        <!--end of modal follow-->
  </div>
</template>

<script>
  import blogAPI from '@/apis/connection.js'
  import comment from '@/components/articles/comment.vue'

  export default {
    name: 'home',
    components: {
      comment,
      
    },

    data: () => {
      return {
        detailArticle: {},
        commentsArr: [],
        articleId: '',
        email: ''

      }
    },

    created: function ()  {
      
    },

    methods:{

      reloadComments(arr){
        this.commentsArr = arr
      },

      getDetailArticle(id){
        console.log(`masuk get detail article`)
        this.articleId = id
        blogAPI.get(`/articles/${id}`,{
            headers:{
                jtoken: localStorage.getItem('jtoken')
            }
        })
        .then((response) => {
          console.log(response)
            this.detailArticle = response.data
             console.log(this.detailArticle)
            this.commentsArr = response.data.comments
        })
        .catch(function (error) {
            console.log(error);
        });
      },

      followAuthor(id){
        let emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
            isEmailValid = emailRegex.test(this.email);
        if (isEmailValid) {
          blogAPI.post(`/users/follow`,{
              authorId: id,
              followerEmail: this.email
          },{
              headers:{
                  jtoken: localStorage.getItem('jtoken')
              }
          })
          .then((response) => {
              this.email = ''
          })
          .catch(function (error) {
              console.log(error);
          });
        } else {
          console.log(`please enter valid email format!`)
        }
      },

    },

    mounted() {
        this.getDetailArticle(this.$route.params.id)
    },

    watch: {
      '$route.params.id': function () {
        this.getDetailArticle(this.$route.params.id)
      }
    },
  }
</script>

<style>
#articleDetail {
  padding-bottom: 30px;
}
</style>
