<template>
    <div>
      Advertise :
      <div class="d-flex justify-content-between">
        <div v-for="(advertise, index) in advertiseArr" :key="index">{{advertise.description}}</div>
      </div>
    </div>
</template>

<script>
  import blogAPI from '@/apis/connection.js'

  export default {
    name: 'advertise',
    components: {
      

    },

    data: () => {
      return {
        advertiseArr: [],
      }
    },

    mounted: function ()  {
      this.getListArticles()
    },

    methods:{
      getListArticles: function () {
        blogAPI.get(`/advertises`)
          .then((response) => {
              this.advertiseArr = response.data
          })
          .catch(function (error) {
              console.log(error);
          });
      },
    }
  }
</script>
