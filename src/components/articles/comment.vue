<template>
    <div>
        <!-- Comments Form -->
        <div class="card my-4">
        <h5 class="card-header">Leave a Comment:</h5>
        <div class="card-body">
            <form>
            <div class="form-group">
                <textarea class="form-control" rows="3" v-model="content1"></textarea>
            </div>
            <button type="submit" class="btn btn-primary" v-on:click.prevent="saveComment">Submit</button>
            </form>
        </div>
        </div>

        <!-- Single Comment -->
        <div class="media mb-4" v-for="comment in comments" :key="comment._id">
            <img class="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="">
            <div class="media-body">
                <h5 class="mt-0">{{comment.username}}</h5>
                {{comment.description}}
            </div>
            <button type="button" class="btn btn-warning btn-sm" v-on:click="">Report this!</button>
        </div>

    </div>
</template>

<script>
    import blogAPI from '@/apis/connection.js'

    export default {
        props:{
            comments: Array,
            idArticle: String
        },

        created:() => {

        },

        data(){
            return {
                content1: '',
                
            }
        },

        methods: {
            saveComment: function(){
                if(!localStorage.jtoken){
                    console.log('please sign in to leave comment!')
                } else if (this.content1 === ''){
                    console.log('please input valid comment')
                } else {
                    blogAPI.post(`/comments/${this.idArticle}`, {
                        content: this.content1
                    }, {
                        headers:{
                            jtoken: localStorage.getItem('jtoken')
                        }
                    })
                    .then((response) => {
                        this.content1 = ''
                        this.$emit('updateComments',response.data)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
            },
        },

        mounted() {

        },
    }
</script>
