<template>
    <div>
        <h3>this is my list article</h3>
        <div>
            <table class="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col" colspan="2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(article, index) in myArticles" :key="article._id">
                        <th scope="row">{{index + 1}}</th>
                        <td>{{ article.title }}</td>
                        <td>
                            
                            <button type="button" class="btn btn-outline-secondary btn-sm ml-2 mr-2" v-on:click="showEdit(article._id)">Edit</button>
                            <button type="button" class="btn btn-outline-danger btn-sm ml-2 mr-2" v-on:click.prevent="remove(article._id)">Delete</button>
                            <button type="button" class="btn btn-outline-primary btn-sm ml-2 mr-2" v-on:click="showArticle(article._id)">Preview</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <router-link to="/myarticles/newarticle">
            <button type="button" class="btn btn-light">Add New Article</button>
        </router-link>
    </div>
</template>

<script>
    import blogAPI from '@/apis/connection.js'

    export default {
        data: function(){
            return {
                myArticles: []
            }
        },

        created: function () {
            this.loadArticle()
        },

        methods:{

            loadArticle: function(data){
                blogAPI.get('/articles/my',{
                    headers:{
                        jtoken: localStorage.getItem('jtoken')
                    }
                })
                .then((response) => {
                    this.myArticles = response.data
                    this.$router.push({ path: `/myarticles/listarticles` })
                })
                .catch(function (error) {
                    console.log(error);
                });
            },

            showEdit: function(id) {
                this.$router.push({ path: `/myarticles/editarticle/${id}` })
            },
            
            remove: function(id) {
                blogAPI.delete(`/articles/${id}`,{
                    headers:{
                        jtoken: localStorage.getItem('jtoken')
                    }
                })
                .then((response) => {
                    // this.$router.push({ path: `/myarticles/listarticles` })
                    this.loadArticle()
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

