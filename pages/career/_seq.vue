<template>
    <div class="CareerBoardDetailWrapper pa-5">
        <career-board-detail />
        <career-board-comment :cSeq="cSeq" />
    </div>
</template>

<script>
    import ActionType from '~/constants/action-type.js';

    import CareerBoardDetail from '~/components/page/career/board/detail/CareerBoardDetail.vue';
    import CareerBoardComment from '~/components/page/career/board/detail/CareerBoardComment.vue';

    export default {
        validate({ params }) {
            return /^[0-9]*$/.test(params.seq);
        },

        components: {
            CareerBoardDetail
        },

        async asyncData({ store, route }) {
            const cSeq = route.params.seq;
            await store.dispatch(`career/board/detail/${ActionType.GET_BOARD_DETAIL_ASYNC}`, cSeq);
            await store.dispatch(`career/board/comment/list/${ActionType.GET_BOARD_DETAIL_COMMENT_LIST_ASYNC}`, cSeq);
        },

        computed: {
            cSeq() {
                return this.$route.params.seq;
            }
        }
    }
</script>

<style scoped>
    .CareerBoardDetailWrapper {
        width: 100%;
        height: 100%;
        padding: 3px;
    }
</style>