<template>
    <div>
        <div class="alert alert-warning alert-dismissible fade show" role="alert" v-if="showAlert">
            <strong>Uuppps sorry!</strong> {{errorMsg}}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            showAlert: false,
            errorMsg: ''
        }
    }
}
</script>
