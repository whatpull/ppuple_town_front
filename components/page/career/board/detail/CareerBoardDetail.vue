<template>
    <v-card
        v-if="detailData"
        class="CareerBoardDetail rounded-lg pa-5"
        style="overflow: hidden;"
        elevation="1">
        <div class="Head mb-2">
            <card-member
                :avatar="detailData.user.avatar"
                :account="detailData.user.account"
                :name="detailData.user.name" />
        </div>
        <div class="Body">
            <div class="Title text-h6 font-weight-bold">
                <span class="Type">
                    {{ detailData.type.text }}
                </span>
                <span>
                    {{ detailData.title }}
                </span>
            </div>
            <div
                class="Content" 
                v-html="detailData.content">
            </div>
        </div>
        <div class="Foot">
            <div class="Button">
                <v-tooltip 
                    z-index="1"
                    bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            elevation="0"
                            class="mr-2"
                            width="30px"
                            height="30px"
                            fab
                            outlined
                            color="#A79DF4"
                            v-bind="attrs"
                            v-on="on"
                            @click="clickCareerBoardCommentEditorOpen">
                            <v-icon 
                                size="23"
                                color="#7666D1">
                                mdi-chat
                            </v-icon>
                        </v-btn>
                    </template>
                    <span>댓글</span>
                </v-tooltip>
                <v-tooltip 
                    z-index="1"
                    bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            v-show="myWriting"
                            elevation="0"
                            class="mr-2"
                            width="30px"
                            height="30px"
                            fab
                            outlined
                            color="#A79DF4"
                            v-bind="attrs"
                            v-on="on"
                            @click="clickCareerBoardItemEditButton">
                            <v-icon 
                                size="23"
                                color="#7666D1">
                                <!-- mdi-draw -->
                                <!-- mdi-grease-pencil -->
                                mdi-fountain-pen-tip
                            </v-icon>
                        </v-btn>
                    </template>
                    <span>수정</span>
                </v-tooltip>
                <v-tooltip 
                    z-index="1"
                    bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            v-show="myWriting"
                            elevation="0"
                            width="30px"
                            height="30px"
                            fab
                            outlined
                            color="#A79DF4"
                            v-bind="attrs"
                            v-on="on"
                            @click="clickCareerBoardItemRemoveButton">
                            <v-icon 
                                size="23"
                                color="#7666D1">
                                mdi-delete-empty
                            </v-icon>
                        </v-btn>
                    </template>
                    <span>삭제</span>
                </v-tooltip>
            </div>
            <div class="Empty"></div>
            <div class="Date">
                {{ regDate }}
            </div>
        </div>
        <career-board-editor
            type="EDIT"
            :detailData="detailData"
            :showCareerBoardEditorDialog="showCareerBoardEditorDialog" 
            @clickCareerBoardItemActionButton="clickCareerBoardItemEditButton" />
    </v-card>
    <v-card
        v-else
        class="CareerBoardDetail rounded-lg pa-5 d-flex justify-center align-center headline font-weight-bold"
        style="overflow: hidden; height: 100%;"
        elevation="1">
        요청에의해 삭제된 게시글입니다.
    </v-card>
</template>

<script>
    import ActionType from '~/constants/action-type.js';
    import { mapGetters } from "vuex";

    import CardMember from '~/components/common/card/CardMember.vue';
    import CareerBoardEditor from '~/components/page/career/board/editor/CareerBoardEditor.vue';

    export default {
        components: {
            CardMember,
            CareerBoardEditor
        },

        data() {
            return {
                showCareerBoardEditorDialog: false
            }
        },

        computed: {
            ...mapGetters({
                detailData: 'career/board/detail/detailData',
                user: 'user/detail/info'
            }),

            myWriting() {
                return (this.detailData && this.detailData.user ? this.detailData.user.mseq : 0) === (this.user ? this.user.mseq : 0);
            },

            regDate() {
                if(this.detailData) {
                    const now = this.$moment();
                    const reg = this.$moment(this.detailData.regDate);
                    
                    const days = this.$moment.duration(now.diff(reg)).days();
                    const hours = this.$moment.duration(now.diff(reg)).hours();
                    const minutes = this.$moment.duration(now.diff(reg)).minutes();
                    const seconds = this.$moment.duration(now.diff(reg)).seconds();

                    let result = this.$moment(this.detailData.regDate).format('YYYY년 MM월 DD일 HH:mm');
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
                } else {
                    return "";
                }
            }
        },

        mounted() {
            this.initCareerBoardType();
        },

        methods: {
            openDialogAlert(message, callback) {
                const payload = {
                    show: true,
                    message: message
                }
                if(typeof callback === "function") payload.btnFunc = callback;
                this.$store.dispatch(`dialog/alert/${ActionType.CHANGE_DIALOG_ALERT}`, payload);
            },

            clickCareerBoardCommentEditorOpen() {
                this.$store.dispatch(`career/board/comment/list/${ActionType.CHANGE_BOARD_DETAIL_COMMENT_EDITOR_SHEET}`, {
                    show: true,
                    mode: 'ADD',
                    seq: null
                });
            },

            clickCareerBoardItemEditButton() {
                this.initCareerBoardType();
                this.showCareerBoardEditorDialog = !this.showCareerBoardEditorDialog;
            },

            clickCareerBoardItemRemoveButton() {
                const payload = {
                    show: true,
                    message: '게시글을 정말<br>삭제하시겠습니까?',
                    btnYesFunc: async () => {
                        const cSeq = this.detailData.cseq;
                        if(cSeq) {
                            const payload = { cseq: cSeq }
                            await this.$store.dispatch(`career/board/submit/${ActionType.REMOVE_BOARD_ASYNC}`, payload).then(async (response) => {
                                const {data, status} = response;
                                if(status === 200) {
                                    this.$store.commit(`career/board/list/${ActionType.INIT_BOARD_LIST}`);
                                    await this.$store.dispatch(`career/board/detail/${ActionType.GET_BOARD_DETAIL_ASYNC}`, payload.cseq);
                                    this.openDialogAlert('삭제 처리가<br>완료되었습니다.');
                                    this.$router.push("/career");
                                }
                            });
                        }
                    },
                    btnNoFunc: () => {
                        console.log("NO");
                    }
                }
                this.$store.dispatch(`dialog/confirm/${ActionType.CHANGE_DIALOG_CONFIRM}`, payload);
            },

            initCareerBoardType() {
                if(this.showCareerBoardEditorDialog === true) {
                    this.$store.dispatch(`career/board/type/${ActionType.CHANGE_BOARD_TYPE_FILTER}`, null);
                } else {
                    if(this.detailData) {
                        const type = this.detailData.type.type;
                        if(type) this.$store.dispatch(`career/board/type/${ActionType.CHANGE_BOARD_TYPE_FILTER}`, type);
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .CareerBoardDetail {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .CareerBoardDetail .Head {
        width: 100%;
        flex: 0 0 50px;
        display: flex;
        align-items: center;
        background-size: auto 80%;
        background-repeat: no-repeat;
        background-position: right center;
    }

    .CareerBoardDetail .Body {
        width: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-bottom: 1px solid #E9E9E9;
        padding-bottom: 10px;
        margin-bottom: 10px;
    }

    .CareerBoardDetail .Body .Title {
        border-bottom: 1px solid #E9E9E9;
        padding-bottom: 10px;
        margin-bottom: 10px;
        line-height: 1.5rem;
    }

    .CareerBoardDetail .Body .Title .Type {
        color: #7666D1;
    }

    .CareerBoardDetail .Foot {
        flex: 30px;
        display: flex;
        align-items: center;
    }

    .CareerBoardDetail .Foot .Button {
        flex: 0 0 120px
    }

    .CareerBoardDetail .Foot .Empty {
        flex: 1;
    }

    .CareerBoardDetail .Foot .Date {
        font-size: 13px;
        font-weight: bold;
        color: #9E9E9E;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; /* 라인수 */
        -webkit-box-orient: vertical;
        word-wrap:break-word;
        height: 1.5em;
    }
</style>