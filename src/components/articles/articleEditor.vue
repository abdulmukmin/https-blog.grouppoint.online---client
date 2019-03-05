<template>
    <div id="articleEditor" style="padding-bottom: 40px">
        <h2>{{text.pageName}} :</h2>
        <input type="text" v-model="article.title">    
        <vue-editor v-model="article.VueEditor"></vue-editor>
        <button type="button" class="btn btn-outline-primary mt-2 mr-2" v-on:click="$emit('content',article)">Save</button>
        <router-link to="/myarticles/listarticles">
            <button type="button" class="btn btn-outline-warning mt-2 ml-2">Cancel</button>
        </router-link>
    </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import blogAPI from '@/apis/connection.js'

export default {

    props: ['text'],

    components: {
        VueEditor

    },

    data() {
        return {
            article: {
                title: this.text.title, 
                VueEditor: this.text.description
            }
        }
    },

    mounted() { 
        this.populateArticle(this.text.id)
    },

    methods :{

        populateArticle: function(id) {

            blogAPI.get(`/articles/${id}`,{
                headers:{
                    jtoken: localStorage.getItem('jtoken')
                }
            })
            .then((response) => {
                this.article.title = response.data.title
                this.article.VueEditor = response.data.description
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    },


}
</script>

