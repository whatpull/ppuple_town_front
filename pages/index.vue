<template>
    <div class="Main">
        <main-animation />
        <main-footer />
    </div>
</template>

<script>
// 컴포넌트
import AnimationMain from '~/components/page/main/MainAnimation.vue';
import AnimationFooter from '~/components/page/main/MainFooter.vue';

export default {
    layout: 'empty',

    components: {
        AnimationMain,
        AnimationFooter
    },

    data() {
        return {
            title: '메인'
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
    .Main {
        width: 100%;
        height: calc(100vh + 200px);
        overflow-x: hidden;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
    }
</style>