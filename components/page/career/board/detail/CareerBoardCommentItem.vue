<template>
    <div class="CareerBoardCommentItem py-5 px-2 px-sm-4">
        <div class="Head">
            <div class="Member">
                <card-member
                    v-if="item.user"
                    :avatar="item.user.avatar"
                    :account="item.user.account"
                    :name="item.user.name" />
            </div>
            <div class="Time">
                <div>{{ regDate }}</div> 
            </div>
            <div class="Empty"></div>
            <div 
                v-show="myWriting"
                class="Button">
                <v-menu
                    bottom
                    left>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            depressed
                            color="transparent"
                            width="30px"
                            height="30px"
                            fab
                            v-bind="attrs"
                            v-on="on">
                            <v-icon color="#7E7272">more_horiz</v-icon>
                        </v-btn>
                    </template>

                    <v-list 
                        class="pa-0"
                        dense>
                        <v-list-item
                            link
                            color="#7666D1"
                            v-for="(item, index) in items"
                            :key="index"
                            @click="clickCareerBoardCommentItemOption(item.type)">
                            <v-list-item-title>{{ item.text }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
        </div>
        <div class="Body">
            <div 
                class="Content"
                v-html="summary">
            </div>
        </div>
    </div>
</template>

<script>
    import ActionType from '~/constants/action-type.js';
    import { mapGetters } from "vuex";

    import CardMember from '~/components/common/card/CardMember.vue';

    export default {
        components: {
            CardMember
        },

        props: {
            item: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },

        data() {
            return {
                items: [
                    {
                        type: 'EDIT',
                        text: '수정'
                    },
                    {
                        type: 'REMOVE',
                        text: '삭제'
                    }
                ]
            }
        },

        computed: {
            ...mapGetters({
                user: 'user/detail/info'
            }),

            summary() {
                return this.item.content.replace(/(<([^>]+)>)/ig,"").substring(0, 300);
            },

            myWriting() {
                return this.item.user.mseq === (this.user ? this.user.mseq : 0);
            },

            regDate() {
                const now = this.$moment();
                const reg = this.$moment(this.item.regDate);
                
                const days = this.$moment.duration(now.diff(reg)).days();
                const hours = this.$moment.duration(now.diff(reg)).hours();
                const minutes = this.$moment.duration(now.diff(reg)).minutes();
                const seconds = this.$moment.duration(now.diff(reg)).seconds();

                let result = this.$moment(this.item.regDate).format('MM월 DD일');
                if(days === 0) {
                    if(hours > 0) {
                        result = `${hours}시간 전`;
                    } else if(minutes > 0) {
                        result = `${minutes}분 전`;
                    } else if(seconds > 0) {
                        result = `${seconds}초 전`;
                    }
                }
                return result;
            }
        },

        methods: {
            async clickCareerBoardCommentItemOption(type) {
                await this.$store.dispatch(`career/board/detail/${ActionType.GET_BOARD_DETAIL_ASYNC}`, this.item.career.cseq);
                switch(type) {
                    case 'EDIT': // 댓글 수정
                        this.$store.dispatch(`career/board/comment/list/${ActionType.CHANGE_BOARD_DETAIL_COMMENT_EDITOR_SHEET}`, {
                            show: true,
                            mode: 'EDIT',
                            seq: this.item.cmSeq
                        });
                        break;
                    case 'REMOVE': // 댓글 삭제
                        const payload = {
                            show: true,
                            message: '댓글을 정말<br>삭제하시겠습니까?',
                            btnYesFunc: async() => {
                                const cmSeq = this.item.cmSeq;
                                const cseq = this.item.career.cseq;
                                const mseq = this.item.user.mseq;
                                const payload = {
                                    cmSeq: cmSeq,
                                    cseq: cseq,
                                    mseq: mseq
                                }
                                await this.$store.dispatch(`career/board/comment/submit/${ActionType.REMOVE_BAORD_COMMENT_ASYNC}`, payload);
                            },
                            btnNoFunc: () => {
                                console.log("NO");
                            }
                        }
                        this.$store.dispatch(`dialog/confirm/${ActionType.CHANGE_DIALOG_CONFIRM}`, payload);
                        break;
                    default:
                        break;
                }
            }
        }
    }
</script>

<style scoped>
    .CareerBoardCommentItem {
        flex: 1;
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid #E9E9E9;
        cursor: pointer;
    }

    .CareerBoardCommentItem:hover {
        background-color: rgba(219, 219, 219, 0.1);
    }

    .CareerBoardCommentItem .Head {
        flex: 0 0 50px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .CareerBoardCommentItem .Head .Member {
        flex: 0 1 200px;
        min-width: 100px;
    }

    .CareerBoardCommentItem .Head .Time {
        flex: 0 0 70px;
        height: 25px;
        font-size: 12px;
        font-weight: bold;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: left;
        color: #9E9E9E;
    }

    .CareerBoardCommentItem .Head .Empty {
        flex: 1;
    }

    .CareerBoardCommentItem .Head .Button {
        flex: 0 0 35px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .CareerBoardCommentItem .Body {
        flex: 1;
        width: 100%;
        padding-top: 15px;
        padding-left: calc(50px + 8px);
        padding-right: 30px;
        font-size: 15px;
    }

    .CareerBoardCommentItem .Body .Content {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* 라인수 */
        -webkit-box-orient: vertical;
        word-wrap:break-word;
        word-break:break-all;
        max-height: 3em;
        color: #000000;
    }
</style>