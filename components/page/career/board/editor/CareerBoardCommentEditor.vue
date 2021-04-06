<template>
    <v-bottom-sheet
        width="765px"
        persistent
        :value="addBottomSheetShow">
        <v-sheet
            class="CareerBoardCommentEditor d-flex flex-column pa-5"
            height="250px">
            <div class="RelationComment">
                <div class="Line"></div>
            </div>
            <div class="Head">
                <div class="Member">
                    <card-member 
                        v-if="detailData.user"
                        :avatar="detailData.user.avatar"
                        :account="detailData.user.account"
                        :name="detailData.user.name" />
                </div>
                <div class="Button">
                    <v-btn
                        text
                        color="#7666D1"
                        fab
                        width="35px"
                        height="35px"
                        @click="clickCareerBoardCommentEditorClose">
                        <v-icon>close</v-icon>
                    </v-btn>
                </div>
            </div>
            <div class="Body">
                <div class="Member mr-2">
                    <card-member
                        v-if="user"
                        type="xs"
                        :avatar="user.avatar"
                        :account="user.account"
                        :name="user.name"
                        color="#D3CDFF"/>
                    <v-btn
                        depressed
                        class="mt-2 font-weight-bold"
                        small
                        @click="clickSubmitCareerBoardComment">
                        {{ submitButtonText }}
                    </v-btn>
                </div>
                <div class="Editor">
                    <text-editor
                        :value="commentDetailData.content"
                        ref="hteditor"
                        :isToolbar="false" />
                </div>
            </div>
            <div class="Foot"></div>
        </v-sheet>
    </v-bottom-sheet>
</template>

<script>
    import ActionType from '~/constants/action-type.js';
    import { mapGetters } from "vuex";

    import CardMember from '~/components/common/card/CardMember.vue';
    import TextEditor from '~/components/common/editor/TextEditor.vue';

    export default {
        computed: {
            ...mapGetters({
                addBottomSheetShow: 'career/board/comment/list/addBottomSheetShow',
                addBottomSheetMode: 'career/board/comment/list/addBottomSheetMode',
                addBottomSheetEditSeq: 'career/board/comment/list/addBottomSheetEditSeq',
                commentDetailData: 'career/board/comment/detail/commentDetailData',
                detailData: 'career/board/detail/detailData',
                user: 'user/detail/info'
            }),

            submitButtonText() {
                return this.addBottomSheetMode == 'EDIT' ? '수정' : '등록';
            }
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

            clickCareerBoardCommentEditorClose() {
                this.initCareerBoardCommentEditor();
            },

            initCareerBoardCommentEditor() {
                this.$store.dispatch(`career/board/comment/detail/${ActionType.INIT_BAORD_DETAIL_COMMENT_DETAIL_ASYNC}`);
                this.$store.dispatch(`career/board/comment/list/${ActionType.CHANGE_BOARD_DETAIL_COMMENT_EDITOR_SHEET}`, {
                    show: false,
                    mode: 'ADD',
                    seq: null
                });
            },

            clickSubmitCareerBoardComment() {
                this.$refs.hteditor.clickButtonCareerBoardSave(async (content) => {
                    const cseq = this.detailData.cseq;
                    const mseq = this.user ? this.user.mseq : 0;

                    if(mseq === 0) {
                        this.openDialogAlert('로그인이<br>필요합니다.', () => {
                            this.$router.push("/signin");
                        });
                        return;
                    }

                    if(!content) {
                        this.openDialogAlert('내용을<br>입력해 주세요.');
                        return;
                    }

                    const payload = {
                        content: content,
                        career: {
                            cseq: cseq
                        },
                        user: {
                            mseq: mseq
                        }
                    }

                    switch(this.addBottomSheetMode) {
                        case 'EDIT':
                            payload.cmSeq = this.addBottomSheetEditSeq;
                            await this.$store.dispatch(`career/board/comment/submit/${ActionType.PUT_BOARD_COMMENT_ASYNC}`, payload);
                            break;
                        default: // ADD
                            await this.$store.dispatch(`career/board/comment/submit/${ActionType.POST_BOARD_COMMENT_ASYNC}`, payload);
                            break;
                    }
                    this.clickCareerBoardCommentEditorClose();
                });
            }
        },

        watch: {
            addBottomSheetEditSeq(value) {
                if(value) { // 수정 데이터 정보 조회(시퀀스 넘버기준)
                    this.$store.dispatch(`career/board/comment/detail/${ActionType.GET_BAORD_DETAIL_COMMENT_DETAIL_ASYNC}`, value);
                }
            }
        },

        beforeDestroy() {
            this.clickCareerBoardCommentEditorClose();
        }
    }
</script>

<style scoped>
    .CareerBoardCommentEditor {
        overflow: auto;
        position: relative;
    }

    .CareerBoardCommentEditor .RelationComment {
        background: #FFFFFF;
        position:absolute;
        width: 55px;
        height: 121px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .CareerBoardCommentEditor .RelationComment .Line {
        width: 2px;
        height: 15px;
        margin-right: 3px;
        background-color: #E9E9E9;
    }

    .CareerBoardCommentEditor .Head {
        flex: 0 0 50px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        border-bottom: 1px solid #E9E9E9;
        padding-bottom: 10px;
        margin-bottom: 10px;
    }

    .CareerBoardCommentEditor .Head .Member {
        flex: 1;
    }

    .CareerBoardCommentEditor .Body {
        flex: 1;
        display: flex;
    }

    .CareerBoardCommentEditor .Body .Member {
        flex: 0 0 50px;
    }

    .CareerBoardCommentEditor .Body .Editor {
        flex: 1;
        background-color: #EEEEEE;
        border-radius: 10px;
        padding: 10px;
    }
</style>