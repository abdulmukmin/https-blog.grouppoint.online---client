<template>
    <div>
        <form>
            <div class="form-group">
                <label for="recipient-name" class="col-form-label">Title:</label>
                <input type="text" class="form-control" v-model="title" maxlength="20" size="35"  placeholder="title here (max 10 characters)">
            </div>
            <div class="form-group">
                <label for="message-text" class="col-form-label">Description:</label>
                <input type="text" class="form-control" maxlength="40" v-model="description" placeholder="description here (max 40 characters)" >
            </div>
        </form>
        <div>
            <button type="button" class="btn btn-secondary mr-2" data-dismiss="modal" v-on:click="$emit('hideAdvertiseEditor')">Close</button>
            <button type="button" class="btn btn-primary ml-2" v-on:click="saveAdvertise()">{{buttonName}}</button>
        </div>
    </div>
</template>

<script>
    import blogAPI from '@/apis/connection.js'

    export default {

        props:[ 'addNew' ],

        data: function(){
            return {
                title: '',
                description: '',
                buttonName: ''
            }
        },

        created: function () {
            
        },

        methods:{

            saveAdvertise: function(){
                if( this.buttonName === 'Create New'){
                    this.saveNewArticle()
                } else {
                    this.saveEditArticle()
                }
            },

            saveEditArticle: function(data){
                blogAPI.put(`/articles/${this.$route.params.id}`, {
                    title: this.title,
                    description: this.description
                },{
                    headers: {
                        jtoken: localStorage.getItem('jtoken')
                    }
                })
                .then((response) => {
                    console.log(`edit success`)
                })
                .catch(function (error) {
                    console.log(error);
                });
            },

            saveNewArticle: function(data){
                blogAPI.post(`/advertises`, {
                    title: this.title,
                    description: this.description
                },{
                    headers: {
                        jtoken: localStorage.getItem('jtoken')
                    }
                })
                .then((response) => {
                    this.title = '',
                    this.description = ''
                    this.$emit('newAdvertiseArr')
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
        },

        mounted:function(){
            if (this.addNew === 'Create New'){
                this.buttonName = 'Create New'
            } else {
                this.buttonName = 'Save'
            }
        },
    }
</script>

