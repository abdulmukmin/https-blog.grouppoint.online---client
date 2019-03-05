<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-3">
                    <div class="list-group">
                        <router-link to="/myarticles/listarticles" class="list-group-item list-group-item-action">List Article</router-link>
                        <router-link to="/myarticles/listcomment" class="list-group-item list-group-item-action">List Comment</router-link>
                        <!-- <router-link to="/myarticles/changePassword" class="list-group-item list-group-item-action">Change Password</router-link> -->
                        <router-link to="/myarticles/advertise" class="list-group-item list-group-item-action">My Advertise</router-link>
                        <router-link to="/myarticles/chatroom">
                            <div class="list-group" >
                            <div class="list-group-item list-group-item-action flex-column align-items-start">
                                Chat Room
                            </div>
                            </div>
                        </router-link>
                    </div>
                </div>
                <div class="col-9">
                    <router-view />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import blogAPI from '@/apis/connection.js'
    

    export default {

    data: () => {
      return {
        
      }
    },

    created: function ()  {

    },
        
    }
</script>

