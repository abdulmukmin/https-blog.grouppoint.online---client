<template>
    <div>
        <form-change-pass />
    </div>
</template>

<script>
    import blogAPI from '@/apis/connection.js'
    import formChangePass from '@/components/form.vue'

    export default {
        name: 'viewChangePassword',
        components: {
            formChangePass,
        },

        data: function(){
            return {
                
            }
        },

        created: function () {
           
        },

        methods:{

        },
    }
</script>

