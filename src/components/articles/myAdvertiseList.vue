<template>
    <div>
        <h3>this is my list of advertise</h3>
        <div>
            <table class="table table-hover" v-if="showTable">
                <thead>
                    <tr>
                    <th >#</th>
                    <th >Title</th>
                    <th >Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(advertise, index) in advertiseArr" :key="advertise._id">
                        <th>{{index + 1}}</th>
                        <td>{{ advertise.title }}</td>
                        <td>Active
<!--                             
                            <button type="button" class="btn btn-outline-secondary btn-sm ml-2 mr-2" v-on:click="showEdit(article._id)">Edit</button>
                            <button type="button" class="btn btn-outline-danger btn-sm ml-2 mr-2" v-on:click.prevent="remove(article._id)">Delete</button>
                            <button type="button" class="btn btn-outline-primary btn-sm ml-2 mr-2" >Preview</button> -->
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <button type="button" class="btn btn-light" v-if="showAdvertiseButton" v-on:click="addNew()">
            Add New Advertise
        </button>
        <advertise-editor 
            v-bind:addNew="'Create New'"
            v-on:hideAdvertiseEditor="hideEditor"
            v-if="showEditor"
            v-on:newAdvertiseArr="updateNewAdvertiseArr"
        />
    </div>
</template>

<script>
    import blogAPI from '@/apis/connection.js'
    import AdvertiseEditor from '@/components/AdvertiseEditor.vue'

    export default {

        components: {
            AdvertiseEditor,

        },

        data: function(){
            return {
                advertiseArr: [],
                showTable: true,
                showAdvertiseButton: true,
                showEditor: false
            }
        },

        created: function () {
            this.loadAdvertise()

        },

        methods:{

            updateNewAdvertiseArr: function(){
                this.loadAdvertise()
                this.hideEditor()
            },

            hideEditor: function(){
                this.showTable = true,
                this.showAdvertiseButton = true,
                this.showEditor = false                  
            },

            addNew: function(){
                this.showTable = false,
                this.showAdvertiseButton = false,
                this.showEditor = true                
            },

            loadAdvertise: function(data){
                blogAPI.get('/advertises/my',{
                    headers:{
                        jtoken: localStorage.getItem('jtoken')
                    }
                })
                .then((response) => {
                    console.log(response.data)
                    this.advertiseArr = response.data
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

