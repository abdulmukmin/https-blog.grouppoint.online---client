<template>
  <div id="app">
    <navbar 
      @errorLoginToParent = 'showErrorLogin'
      @errorRegisterToParent = 'showErrorRegister'
    />
    <alert-viewer />
    <advertise id="advertise"/>
      <div class="alert alert-warning alert-dismissible fade show" role="alert" v-if="showAlert">
        <strong>Uuppps sorry!</strong> {{errorMsg}}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
      </div>
    <router-view/>
    <my-footer />
  </div>
</template>

<script>
import navbar from '@/components/navbar.vue'
import myFooter from '@/components/footer.vue'
import alertViewer from '@/components/alerts.vue'
import advertise from '@/components/advertise.vue'

export default {
  
  components: {
    myFooter,
    navbar,
    alertViewer,
    advertise,
    //alert

  },

  data:function () {
    return {
      showAlert: false,
      errorMsg: ''
    }
  },

  methods:{
    showErrorLogin: function (msg) {
      this.showAlert = true
      this.errorMsg = msg.response.data
    },

    showErrorRegister: function (msg) {
      this.showAlert = true
      this.errorMsg = msg.response.data
    }
  },
}
</script>


<style>
#advertise {
  padding-top: 10px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
