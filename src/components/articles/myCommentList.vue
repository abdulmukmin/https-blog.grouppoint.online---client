<template>
    <div>
        <h3>This is my comment list</h3>
        <div>
            <table class="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col" colspan="2">Your comment</th>
                    <th scope="col" colspan="2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(comment, index) in myComments" :key="comment.index">
                        <th scope="row">{{index+1}}</th>
                        <td colspan="2">{{comment.content}}</td>
                        <td>
                            <button type="button" class="btn btn-outline-danger btn-sm ml-2 mr-2" @click="remove(comment._id)">Delete</button>
                            <button type="button" class="btn btn-outline-primary btn-sm ml-2 mr-2" @click="showArticle(comment.ArticleId)">Preview</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import blogAPI from '@/apis/connection.js'

    export default {
        data: function(){
            return {
                myComments: []
            }
        },

        created: function () {
            this.loadComment()
        },

        methods:{

            loadComment: function(data){
                blogAPI.get('/comments/my',{
                    headers:{
                        jtoken: localStorage.getItem('jtoken')
                    }
                })
                .then((response) => {
                    this.myComments = response.data
                    this.$router.push({ path: `/myarticles/listcomment` })
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            
            remove: function(id) {
                console.log(id)
                blogAPI.delete(`/comments/${id}`,{
                    headers:{
                        jtoken: localStorage.getItem('jtoken')
                    }
                })
                .then((response) => {
                    this.loadComment()
                })
                .catch(function (error) {
                    console.log(error);
                });
            },

            showArticle: function(id) {
                this.$router.push({ path: `/articles/${id}` })
            },
        },
    }
</script>

