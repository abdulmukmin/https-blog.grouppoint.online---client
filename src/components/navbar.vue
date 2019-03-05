<template>
    <div class="pos-f-t" id="navbarMenu">
        <div class="collapse" id="navbarToggleExternalContent">
            <div class="bg-light p-4">
                <router-link to="/">
                    <button type="button" class="btn btn-light ml-2 mr-2"
                        v-on:click="hideFormInput()"
                    >Home</button>
                </router-link> 
                <button type="button" class="btn btn-light" 
                    v-on:click="showLogin()"
                    v-if="!isLogin"> 
                        Login 
                </button> 
                <button type="button" class="btn btn-light ml-2 mr-2" 
                    v-on:click="showRegister()"
                    v-if="!isLogin"> 
                        Register 
                </button> 
                <router-link to="/myarticles">
                    <button type="button" class="btn btn-light ml-2 mr-2"
                    v-if="isLogin">
                        My Blog
                    </button>
                </router-link>
                <router-link to="/">
                    <button type="button" class="btn btn-light ml-2 mr-2"
                        v-if="isLogin"
                        v-on:click="doLogout()">
                        Logout
                    </button>
                </router-link>
                <!--login-->
                <user-information
                    v-if="showLoginForm"
                    v-on:hideForm="hideFormInput"
                    text="Login"
                    v-on:loginSuccess = "setLogin"
                    login = false
                    @foundErrorLogin = "showErrorLogin"
                />
                <!--register-->
                <user-information 
                    v-if = "showRegisterForm"
                    v-on:hideForm = "hideFormInput"
                    text = "Register"
                    attrib = false
                    @foundErrorRegister = "showErrorRegister"
                />
            </div>
        </div>
        <nav class="navbar navbar-fixed-top navbar-light bg-light">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        </nav>
    </div>
</template>

<script>
    import userInformation from '@/components/form.vue'

    export default {
        components: {
            userInformation,
        },

        data: function(){
            return {
                showRegisterForm:false,
                showLoginForm:false,
                nameLogin: 'Login',
                nameRegister: 'Register',
                isLogin: false
            }
        },

        created(){
            this.checkLogin()
        },

        methods: {
            checkLogin: function(){
                if (localStorage.getItem('jtoken')){
                    this.isLogin = true
                }
            },

            doLogout: function(){
                localStorage.clear()
                this.isLogin = false
            },

            showLogin: function(){
                if (this.showRegisterForm) {
                    this.showRegisterForm = false
                }
                this.showLoginForm = true
            },

            showRegister: function(){
                if (this.showLoginForm) {
                    this.showLoginForm = false
                }
                this.showRegisterForm = true
            },

            hideFormInput: function(){
                this.showLoginForm = false
                this.showRegisterForm = false
            },

            setLogin: function(data){
                this.hideFormInput()
                localStorage.setItem('jtoken', data.jtoken)
                localStorage.setItem('user', data.username)
                this.isLogin = true
            },

            showErrorLogin: function(errMsg){
                this.$emit('errorLoginToParent', errMsg)
            },

            showErrorRegister: function(errMsg){
                this.$emit('errorToRegisterParent', errMsg)
            }
        },

    }
</script>

<style>
#navbarMenu {
    padding-top: 40px;
}
</style>
