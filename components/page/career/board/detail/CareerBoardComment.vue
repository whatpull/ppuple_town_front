<template>
    <div 
        v-if="detailData"
        class="CareerBoardComment mt-5">
        <div class="Head">
            <div class="CommentCountTitle">
                Comment
            </div>
            <div class="CommentCount">
                {{ commentsTotalCount }}
            </div>
            <div class="Empty"></div>
            <div class="Refresh">
                <div class="Time">
                    <div class="text-center Chip">TODAY</div>
                    <div class="text-center">{{ refreshTime }}</div>
                </div>
                <div class="Button">
                    <v-btn
                        depressed
                        color="transparent"
                        width="35px"
                        height="35px"
                        fab
                        @click="refreshCommentList">
                        <v-icon
                            ref="update"
                            size="30px"
                            color="#7666D1">update</v-icon>
                    </v-btn>
                </div>
            </div>
        </div>
        <div class="Body">
            <career-board-comment-list :cSeq="cSeq"/>
        </div>
        <career-board-comment-editor />
    </div>
</template>

<script>
    import ActionType from '~/constants/action-type.js';
    import { mapGetters } from "vuex";

    import CareerBoardCommentList from '~/components/page/career/board/detail/CareerBoardCommentList.vue';
    import CareerBoardCommentEditor from '~/components/page/career/board/editor/CareerBoardCommentEditor.vue';

    export default {
        components: {
            CareerBoardCommentList,
            CareerBoardCommentEditor
        },

        props: {
            cSeq: {
                type: String,
                default: null
            }
        },

        computed: {
            ...mapGetters({
                refreshTime: 'career/board/comment/list/refreshTime',
                commentsPage: 'career/board/comment/list/commentsPage',
                detailData: 'career/board/detail/detailData'
            }),

            commentsTotalCount() {
                return this.commentsPage.totalElements > 99 ? '99+' : this.commentsPage.totalElements;
            }
        },

        methods: {
            refreshCommentList() {
                this.refreshIconAnimation();
                if(this.cSeq) this.$store.dispatch(`career/board/comment/list/${ActionType.GET_BOARD_DETAIL_COMMENT_LIST_ASYNC}`, this.cSeq);
            },

            refreshIconAnimation() {
                const target = this.$refs['update'].$el;
                target.classList.remove('Spin');
                void target.offsetWidth;
                target.classList.add('Spin');
            }
        }
    }
</script>

<style scoped>
    @-webkit-keyframes spin { 
        100%{ -webkit-transform: rotate(360deg); } 
    } 
    @-moz-keyframes spin { 
        100%{ -moz-transform: rotate(360deg); } 
    } 
    @-ms-keyframes spin { 
        100%{ -ms-transform: rotate(360deg); } 
    } 
    @keyframes spin { 
        100%{ transform: rotate(360deg); } 
    }

    .Spin {
        -webkit-animation:spin 1000ms linear; 
        -moz-animation:spin 1000ms linear; 
        -ms-animation:spin 1000ms linear; 
        animation:spin 1000ms linear;
    }

    .CareerBoardComment {
        display: flex;
        flex-direction: column;
    }

    .CareerBoardComment .Head {
        flex: 0 0 50px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #E9E9E9;
        padding-bottom: 10px;
    }

    .CareerBoardComment .Head .CommentCountTitle {
        flex: 0 0 80px;
        color: #7666D1;
        font-size: 14px;
        font-weight: bold;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .CareerBoardComment .Head .CommentCount {
        flex: 0 0 40px;
        height: 40px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: #7666D1;
        font-size: 14px;
        font-weight: bold;
        cursor: default;
    }

    .CareerBoardComment .Head .Empty {
        flex: 1;
    }

    .CareerBoardComment .Head .Refresh {
        flex: 0 0 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: default;
    }

    .CareerBoardComment .Head .Refresh .Time {
        flex: 1;
        color: #7E7272;
        font-size: 13px;
        font-weight: bold;
    }

    .CareerBoardComment .Head .Refresh .Time .Chip {
        background-color: #7666D1;
        color: #FFFFFF;
        border-radius: 2px;
    }

    .CareerBoardComment .Head .Refresh .Button {
        flex: 0 0 45px;
        display: flex;
        justify-content: flex-end;
    }

    .CareerBoardComment .Body {
        flex: 1;
    }
</style>