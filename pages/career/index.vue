<template>
    <div class="CareerBoardWrapper">
        <career-board />
        <career-board-item-add-button />
    </div>
</template>

<script>
    import ActionType from '~/constants/action-type.js';

    import CareerBoard from '~/components/page/career/board/CareerBoard.vue';
    import CareerBoardItemAddButton from '~/components/page/career/board/CareerBoardItemAddButton.vue';

    export default {
        components: {
            CareerBoard,
            CareerBoardItemAddButton
        },

        async asyncData({store}) {
            // 데이터 로드
            await store.dispatch(`career/board/list/${ActionType.GET_BOARD_LIST_ASYNC}`);
        }
    }
</script>

<style scoped>
    .CareerBoardWrapper {
        width: 100%;
        height: 100%;
        padding: 3px;
    }
</style>