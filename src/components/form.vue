<template>
    <div class="d-flex justify-content-center">
        <form role="search" class="col-xs-4">
            <div class="form-group mt-3">
                <input type="text" class="form-control" name="username" placeholder="Username" v-model="username">
            </div>
            <div class="form-group">
                <input type="text" class="form-control" name="email" placeholder="Email" v-model="email" v-if="attrib">
            </div>
            <div class="form-group">
                <input type="password" class="form-control" name="password" placeholder="Password" v-model="password" v-if="login">
            </div>
            <button type="submit" class="btn btn-default mr-2" v-on:click.prevent="clicked()">{{text}}</button>
            <button type="submit" class="btn btn-default ml-2" v-on:click.prevent="$emit('hideForm')">Cancel</button>
        </form>
    </div>
</template>

<script>
    import blogAPI from '@/apis/connection.js'

    export default {
        props: [
            'text',
            'attrib',
            'login'
        ],

        data: function () {
            return {
                username:'',
                email:'',
                password:''
            }
        },

        mounted(){

        },

        methods: {

            clearForm: () => {
                this.username = ''
                this.email = ''
                this.password = ''
            },
            
            clicked: function() {
                console.log(this.text)
                if(this.text == 'Register') {
                    this.doRegister()
                } else {
                    this.doLogin()
                }
            },

            doRegister: function() {
                blogAPI.post('/users/register', {
                    username: this.username,
                    email: this.email,
                    password: this.password
                })
                .then( (response) => {
                    this.username = ''
                    this.email = ''
                    this.$emit('hideForm')
                })
                .catch( (error) => {
                    this.$emit('foundErrorRegister', error)
                });
            },

            doLogin: function() {
                blogAPI.post('/users/login', {
                    username: this.username,
                    password: this.password
                })
                .then( (response) => {
                    this.username = ''
                    this.password = ''
                    this.$emit('loginSuccess', response.data)
                })
                .catch( (error) => {
                    this.$emit('foundErrorLogin', error)
                });
            },

        }

        
    }
</script>
