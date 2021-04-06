<template>
    <div class="SigninWapper">
        <signin />
    </div>
</template>

<script>
    import Signin from '~/components/page/signin/Signin.vue';

    export default {
        components: {
            Signin
        },

        data() {
            return {
                title: '로그인'
            }
        },
        
        head() {
            return {
                title: this.title,
            }
        }
    }
</script>

<style scoped>
    .SigninWapper {
        width: 100%;
        height: 100%;
        padding: 3px;
    }
</style>