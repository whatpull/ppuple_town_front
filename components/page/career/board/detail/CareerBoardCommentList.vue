<template>
    <div class="CareerBoardCommentList">
        <div class="Body">
            <career-board-comment-item 
                v-for="(comment, index) of comments"
                :key="index"
                :item="comment" />
        </div>
        <div 
            v-show="commentsPage.last === false"
            class="Foot">
            <v-btn
                class="font-weight-bold"
                tile
                depressed
                width="100%"
                @click="clickCareerBoardCommentListMore">
                답글 더보기
            </v-btn>
        </div>
    </div>
</template>

<script>
    import ActionType from '~/constants/action-type.js';
    import { mapGetters } from "vuex";

    import CareerBoardCommentItem from '~/components/page/career/board/detail/CareerBoardCommentItem.vue';

    export default {
        components: {
            CareerBoardCommentItem
        },

        props: {
            cSeq: {
                type: String,
                default: null
            }
        },

        computed: {
            ...mapGetters({
                comments: 'career/board/comment/list/comments',
                commentsPage: 'career/board/comment/list/commentsPage',
            })
        },

        methods: {
            clickCareerBoardCommentListMore() {
                if(this.cSeq) {
                    this.$store.dispatch(`career/board/comment/list/${ActionType.GET_BOARD_DETAIL_COMMENT_LIST}`, {
                        cSeq: this.cSeq,
                        type: "MORE"
                    });
                }
            }
        }
    }
</script>

<style scoped>
    .CareerBoardCommentList .Body {
        display: flex;
        flex-direction: column;
    }
</style>