<template>
    <div class="HomeSweetHome">
        <profile />
        <profile-tab />
    </div>
</template>

<script>
    import ActionType from '~/constants/action-type.js';

    import Profile from '~/components/page/home/Profile.vue';
    import ProfileTab from '~/components/page/home/tab/ProfileTab.vue';

    export default {
        components: {
            Profile,
            ProfileTab
        },

        async asyncData({ store, route }) {
            const mseq = store.getters['user/detail/info'].mseq;
            const payload = {
                mseq: mseq
            }
            await store.dispatch(`user/career/list/${ActionType.GET_USER_BOARD_LIST_ASYNC}`, payload);
            await store.dispatch(`user/career/comment/${ActionType.GET_USER_COMMENT_LIST_ASYNC}`, payload);
        }
    }
</script>

<style scoped>
    .HomeSweetHome {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
</style>