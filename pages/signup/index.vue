<template>
    <div class="SignupWrapper">
        <signup />
    </div>
</template>

<script>
    import Signup from '~/components/page/signup/Signup.vue';

    export default {
        components: {
            Signup
        },

        data() {
            return {
                title: '회원가입'
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
    .SignupWrapper {
        width: 100%;
        height: 100%;
        padding: 3px;
    }
</style>