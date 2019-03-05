<template>
    <div>
        <editor 
            v-bind:text="data" 
            v-on:content="saveArticle"
        />
    </div>
</template>
 
<script>
    import editor from '@/components/articles/articleEditor.vue'
    import blogAPI from '@/apis/connection.js'

    export default {
        name: 'articleEditorNew',
        
        components: {
            editor
        },

        data(){
            return {
                data:{
                    pageName: 'Create New Article',
                    title: '',
                    description: '',
                    id: ''
                } 
            }
        },

        methods: {
            saveArticle: function(data){
                blogAPI.post('/articles', {
                    title: data.title,
                    description: data.VueEditor
                }, {
                    headers:{
                        jtoken: localStorage.getItem('jtoken')
                    }
                })
                .then((response) => {
                    this.$router.push({ path: `/myarticles/listarticles` })
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
        },

    }
</script> 