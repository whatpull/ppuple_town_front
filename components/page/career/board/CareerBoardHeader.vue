<template>
    <div class="CareerBoardHeader">
        <div class="Selectbox">
            <career-board-category />
        </div>
        <div class="Empty"></div>
        <div class="Button">
            <!-- <v-btn
                class="MyBoard"
                elevation="0"
                text
                color="#7666D1">
                내게시글
            </v-btn> -->
        </div>
    </div>
</template>

<script>
    import CareerBoardCategory from '~/components/page/career/selectbox/CareerBoardCategory.vue';

    export default {
        components: {
            CareerBoardCategory
        }
    }
</script>

<style scoped>
    .CareerBoardHeader {
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #EFECFF;
        border-radius: 0 !important;
        padding: 0px 20px;
    }

    .CareerBoardHeader .Selectbox {
        flex: 0 1 120px;
    }

    .CareerBoardHeader .Empty {
        flex: 1;
    }

    .CareerBoardHeader .Button .MyBoard {
        font-size: 13px;
        font-weight: bold;
    }
</style>